import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getGoogleUserFromCookieHeader, safeReturnTo, type GoogleUser } from '@/lib/google-auth';

export async function getGoogleUser(): Promise<GoogleUser | null> {
  const requestHeaders = await headers();
  return getGoogleUserFromCookieHeader(requestHeaders.get('cookie'), requestHeaders.get('host'));
}

export async function requireGoogleUser(returnTo: string): Promise<GoogleUser> {
  const user = await getGoogleUser();
  if (user) return user;
  redirect(googleSignInPath(returnTo));
}

export function googleSignInPath(returnTo: string): string {
  return `/api/auth/google?return_to=${encodeURIComponent(safeReturnTo(returnTo))}`;
}
