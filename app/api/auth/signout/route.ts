import { SESSION_COOKIE, clearAuthCookie, safeReturnTo } from '@/lib/google-auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const destination = new URL(safeReturnTo(url.searchParams.get('return_to')), url.origin);
  const response = Response.redirect(destination, 302);
  response.headers.append('set-cookie', clearAuthCookie(SESSION_COOKIE, request));
  response.headers.set('cache-control', 'no-store');
  return response;
}
