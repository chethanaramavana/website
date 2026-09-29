import {
  OAUTH_STATE_COOKIE,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  authCookie,
  clearAuthCookie,
  createGoogleSession,
  getGoogleConfiguration,
  googleCallbackUrl,
  readOAuthState,
  verifyGoogleIdToken,
} from '@/lib/google-auth';

type GoogleTokenResponse = {
  access_token?: string;
  id_token?: string;
  error?: string;
  error_description?: string;
};

export async function GET(request: Request) {
  const config = getGoogleConfiguration();
  if (!config) return authError('Google login is temporarily unavailable.', request, 503);
  const url = new URL(request.url);
  const storedState = await readOAuthState(request.headers.get('cookie'));
  const state = url.searchParams.get('state');
  const code = url.searchParams.get('code');
  const oauthError = url.searchParams.get('error');
  if (oauthError) return authError('Google sign-in was cancelled. Please try again.', request, 400);
  if (!storedState || !state || state !== storedState.state || !code) {
    return authError('This Google sign-in request expired or could not be verified. Please try again.', request, 400);
  }

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: googleCallbackUrl(request),
      }),
    });
    const tokens = await tokenResponse.json() as GoogleTokenResponse;
    if (!tokenResponse.ok || !tokens.id_token) {
      console.error('Google token exchange failed', tokens.error, tokens.error_description);
      return authError('Google could not complete sign-in. Please try again.', request, 502);
    }

    const identity = await verifyGoogleIdToken(tokens.id_token, config.clientId, storedState.nonce);
    if (!identity) {
      console.error('Google identity verification failed');
      return authError('Google could not verify this email address.', request, 403);
    }

    const session = await createGoogleSession({ sub: identity.sub, email: identity.email });
    const destination = new URL(storedState.returnTo, new URL(request.url).origin);
    const response = new Response(null, {
      status: 302,
      headers: { location: destination.toString() },
    });
    response.headers.append('set-cookie', authCookie(SESSION_COOKIE, session, SESSION_MAX_AGE, request));
    response.headers.append('set-cookie', clearAuthCookie(OAUTH_STATE_COOKIE, request));
    response.headers.set('cache-control', 'no-store');
    return response;
  } catch (error) {
    console.error('Google sign-in callback failed', error);
    return authError('Google login is temporarily unavailable. Please try again.', request, 502);
  }
}

function authError(message: string, request: Request, status: number) {
  const response = new Response(`<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Google sign-in</title></head><body style="font-family:system-ui;padding:40px;line-height:1.55"><h1>Sign-in problem</h1><p>${escapeHtml(message)}</p><p><a href="/">Return to Ramavana</a></p></body></html>`, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  });
  response.headers.append('set-cookie', clearAuthCookie(OAUTH_STATE_COOKIE, request));
  return response;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] ?? character);
}
