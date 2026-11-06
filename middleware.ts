import { NextResponse, type NextRequest } from 'next/server';
import { getGoogleUserFromCookieHeader, safeReturnTo } from '@/lib/google-auth';

// Every learning page needs a Google sign-in. The home page, Careers, Terms,
// Privacy, the sign-in pages and the API routes are not matched, so they stay open.
export async function middleware(request: NextRequest) {
  const user = await getGoogleUserFromCookieHeader(request.headers.get('cookie'), request.headers.get('host'));
  if (user) return NextResponse.next();
  const { pathname, search } = request.nextUrl;
  const login = new URL('/login', request.url);
  login.searchParams.set('return_to', safeReturnTo(pathname + search));
  return NextResponse.redirect(login);
}

export const config = {
  matcher: [
    '/cbse/:path*',
    '/icse/:path*',
    '/notes/:path*',
    '/maths-basics/:path*',
    '/previous-papers/:path*',
    '/problems/:path*',
    '/worksheets/:path*',
  ],
};
