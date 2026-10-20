import {
  OAUTH_STATE_COOKIE,
  OAUTH_STATE_MAX_AGE,
  authCookie,
  createOAuthState,
  getGoogleConfiguration,
  googleCallbackUrl,
  safeReturnTo,
} from '@/lib/google-auth';
import { localPreviewEnabled } from '@/lib/local-preview-auth';

export async function GET(request: Request) {
  const localUrl = new URL(request.url);
  if (localPreviewEnabled(localUrl.host)) return new Response(null, {status:302,headers:{location:`/dev-login?return_to=${encodeURIComponent(safeReturnTo(localUrl.searchParams.get('return_to')))}`,'cache-control':'no-store'}});
  const config = getGoogleConfiguration();
  if (!config) return new Response('Google login is temporarily unavailable.', { status: 503 });
  const requestUrl = new URL(request.url);
  const returnTo = safeReturnTo(requestUrl.searchParams.get('return_to'));
  const { payload, cookieValue } = await createOAuthState(returnTo);
  const authorizationUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authorizationUrl.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: googleCallbackUrl(request),
    response_type: 'code',
    scope: 'openid email profile',
    state: payload.state,
    nonce: payload.nonce,
    prompt: 'select_account',
  }).toString();

  const response = new Response(null, {
    status: 302,
    headers: { location: authorizationUrl.toString() },
  });
  response.headers.append('set-cookie', authCookie(OAUTH_STATE_COOKIE, cookieValue, OAUTH_STATE_MAX_AGE, request));
  response.headers.set('cache-control', 'no-store');
  return response;
}
