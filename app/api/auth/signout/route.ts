import { SESSION_COOKIE, clearAuthCookie, safeReturnTo } from '@/lib/google-auth';
import { PREVIEW_COOKIE } from '@/lib/local-preview-auth';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const destination = new URL(safeReturnTo(url.searchParams.get('return_to')), url.origin);
  const response = new Response(null, {
    status: 302,
    headers: {
      location: destination.toString(),
      'set-cookie': clearAuthCookie(SESSION_COOKIE, request),
      'cache-control': 'no-store',
    },
  });
  response.headers.append('set-cookie', clearAuthCookie(PREVIEW_COOKIE, request));
  return response;
}
