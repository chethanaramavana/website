import { authCookie, renewedGoogleSession, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/google-auth';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  const allowed = new URL(request.url).origin;
  if (!origin || (origin !== allowed && origin !== 'https://ramavanamath.com')) {
    return new Response(null, { status: 403 });
  }
  const session = await renewedGoogleSession(request);
  const headers = new Headers({ 'cache-control': 'no-store' });
  if (session) headers.set('set-cookie', authCookie(SESSION_COOKIE, session, SESSION_MAX_AGE, request));
  return new Response(null, { status: 204, headers });
}
