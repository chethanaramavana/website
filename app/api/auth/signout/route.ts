import { SESSION_COOKIE, clearAuthCookie, safeReturnTo } from '@/lib/google-auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const destination = new URL(safeReturnTo(url.searchParams.get('return_to')), url.origin);
  return new Response(null, {
    status: 302,
    headers: {
      location: destination.toString(),
      'set-cookie': clearAuthCookie(SESSION_COOKIE, request),
      'cache-control': 'no-store',
    },
  });
}
