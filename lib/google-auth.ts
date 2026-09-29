import { env } from 'cloudflare:workers';
import { normalizeAccountEmail } from '@/lib/identity';

export type GoogleUser = {
  userId: string;
  email: string;
  displayName: string;
  fullName: string | null;
};

type SessionPayload = {
  sub: string;
  email: string;
  name?: string;
  exp: number;
};

type OAuthStatePayload = {
  state: string;
  nonce: string;
  returnTo: string;
  exp: number;
};

type GoogleIdTokenClaims = {
  iss?: string;
  sub?: string;
  aud?: string | string[];
  azp?: string;
  email?: string;
  email_verified?: boolean;
  exp?: number;
  nonce?: string;
};

type GoogleJwk = JsonWebKey & { kid?: string; alg?: string; use?: string };

let googleJwksCache: { keys: GoogleJwk[]; expiresAt: number } | null = null;

export const SESSION_COOKIE = 'rmc_google_session';
export const OAUTH_STATE_COOKIE = 'rmc_google_oauth';
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
export const OAUTH_STATE_MAX_AGE = 60 * 10;

const encoder = new TextEncoder();

export function getGoogleConfiguration() {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  const clientSecret = env.GOOGLE_CLIENT_SECRET?.trim();
  const authSecret = env.AUTH_SECRET?.trim();
  if (!clientId || !clientSecret || !authSecret) return null;
  return { clientId, clientSecret, authSecret };
}

export function safeReturnTo(value: string | null | undefined, fallback = '/') {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : fallback;
}

export function googleCallbackUrl(request: Request) {
  const url = new URL(request.url);
  if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
    return `${url.origin}/api/auth/google/callback`;
  }
  return 'https://ramavanamath.com/api/auth/google/callback';
}

export async function createGoogleSession(user: { sub: string; email: string; name?: string | null }) {
  const config = getGoogleConfiguration();
  if (!config) throw new Error('Google authentication is not configured.');
  return signPayload<SessionPayload>({
    sub: user.sub,
    email: normalizeAccountEmail(user.email),
    ...(user.name ? { name: user.name.slice(0, 120) } : {}),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  }, config.authSecret);
}

export async function createOAuthState(returnTo: string) {
  const config = getGoogleConfiguration();
  if (!config) throw new Error('Google authentication is not configured.');
  const payload: OAuthStatePayload = {
    state: randomToken(32),
    nonce: randomToken(32),
    returnTo: safeReturnTo(returnTo),
    exp: Math.floor(Date.now() / 1000) + OAUTH_STATE_MAX_AGE,
  };
  return { payload, cookieValue: await signPayload(payload, config.authSecret) };
}

export async function readOAuthState(cookieHeader: string | null) {
  const config = getGoogleConfiguration();
  if (!config) return null;
  return verifyPayload<OAuthStatePayload>(readCookie(cookieHeader, OAUTH_STATE_COOKIE), config.authSecret);
}

export async function getGoogleUserFromRequest(request: Request): Promise<GoogleUser | null> {
  return getGoogleUserFromCookieHeader(request.headers.get('cookie'));
}

export async function getGoogleUserFromCookieHeader(cookieHeader: string | null): Promise<GoogleUser | null> {
  const config = getGoogleConfiguration();
  if (!config) return null;
  const payload = await verifyPayload<SessionPayload>(readCookie(cookieHeader, SESSION_COOKIE), config.authSecret);
  if (!payload?.sub || !payload.email) return null;
  const email = normalizeAccountEmail(payload.email);
  const fullName = payload.name?.trim() || null;
  return {
    userId: `google:${payload.sub}`,
    email,
    fullName,
    displayName: fullName ?? email,
  };
}

export async function verifyGoogleIdToken(idToken: string, clientId: string, nonce: string) {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;
  try {
    const header = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[0]))) as { alg?: string; kid?: string };
    const claims = JSON.parse(new TextDecoder().decode(decodeBase64Url(parts[1]))) as GoogleIdTokenClaims;
    if (header.alg !== 'RS256' || !header.kid) return null;
    const keyData = (await getGoogleJwks()).find((key) => key.kid === header.kid && key.alg === 'RS256');
    if (!keyData) return null;
    const key = await crypto.subtle.importKey(
      'jwk', keyData, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify'],
    );
    const signatureValid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5', key, decodeBase64Url(parts[2]), encoder.encode(`${parts[0]}.${parts[1]}`),
    );
    const issuerValid = claims.iss === 'https://accounts.google.com' || claims.iss === 'accounts.google.com';
    const audienceValid = typeof claims.aud === 'string'
      ? claims.aud === clientId
      : Array.isArray(claims.aud) && claims.aud.includes(clientId) && claims.azp === clientId;
    if (!signatureValid
      || !issuerValid
      || !audienceValid
      || claims.nonce !== nonce
      || !claims.sub
      || !claims.email
      || claims.email_verified !== true
      || !claims.exp
      || claims.exp <= Math.floor(Date.now() / 1000)) return null;
    return { sub: claims.sub, email: claims.email };
  } catch {
    return null;
  }
}

export function authCookie(name: string, value: string, maxAge: number, request: Request) {
  const secure = new URL(request.url).protocol === 'https:' ? '; Secure' : '';
  return `${name}=${value}; Path=/; HttpOnly${secure}; SameSite=Lax; Max-Age=${maxAge}`;
}

export function clearAuthCookie(name: string, request: Request) {
  return authCookie(name, '', 0, request);
}

function randomToken(bytes: number) {
  const value = new Uint8Array(bytes);
  crypto.getRandomValues(value);
  return encodeBase64Url(value);
}

async function getGoogleJwks() {
  if (googleJwksCache && googleJwksCache.expiresAt > Date.now()) return googleJwksCache.keys;
  const response = await fetch('https://www.googleapis.com/oauth2/v3/certs');
  if (!response.ok) throw new Error('Google signing keys are unavailable.');
  const document = await response.json() as { keys?: GoogleJwk[] };
  if (!Array.isArray(document.keys) || !document.keys.length) throw new Error('Google signing keys are invalid.');
  const maxAge = Number(response.headers.get('cache-control')?.match(/max-age=(\d+)/)?.[1] ?? 3600);
  googleJwksCache = { keys: document.keys, expiresAt: Date.now() + Math.max(60, maxAge) * 1000 };
  return googleJwksCache.keys;
}

async function signPayload<T extends object>(payload: T, secret: string) {
  const encodedPayload = encodeBase64Url(encoder.encode(JSON.stringify(payload)));
  const signature = await hmac(encodedPayload, secret);
  return `${encodedPayload}.${encodeBase64Url(signature)}`;
}

async function verifyPayload<T extends { exp?: number }>(token: string | null, secret: string): Promise<T | null> {
  if (!token) return null;
  const [payloadText, signatureText, extra] = token.split('.');
  if (!payloadText || !signatureText || extra) return null;
  try {
    const expected = await hmac(payloadText, secret);
    const actual = decodeBase64Url(signatureText);
    if (!constantTimeEqual(expected, actual)) return null;
    const payload = JSON.parse(new TextDecoder().decode(decodeBase64Url(payloadText))) as T;
    if (!payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

async function hmac(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  return new Uint8Array(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

function constantTimeEqual(left: Uint8Array, right: Uint8Array) {
  if (left.length !== right.length) return false;
  let result = 0;
  for (let index = 0; index < left.length; index += 1) result |= left[index] ^ right[index];
  return result === 0;
}

function readCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  for (const item of cookieHeader.split(';')) {
    const [key, ...rest] = item.trim().split('=');
    if (key === name) return rest.join('=') || null;
  }
  return null;
}

function encodeBase64Url(value: Uint8Array) {
  let binary = '';
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value: string) {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}
