import { env } from 'cloudflare:workers';
import { getGoogleUserFromRequest } from '@/lib/google-auth';
import { isTeacherEmail } from '@/lib/identity';

export type RequestUser = { userId: string; email: string; displayName: string; fullName: string | null };

const attemptKeyPattern = /^[a-zA-Z0-9-]{20,80}$/;

export async function getRequestUser(request: Request): Promise<RequestUser | null> {
  const user = await getGoogleUserFromRequest(request);
  return user ? { userId: user.userId, email: user.email, displayName: user.displayName, fullName: user.fullName } : null;
}

export async function getAttemptOwner(request: Request): Promise<RequestUser | null> {
  const signedInUser = await getRequestUser(request);
  if (signedInUser) return signedInUser;
  const attemptKey = request.headers.get('x-attempt-key')?.trim() ?? '';
  if (!attemptKeyPattern.test(attemptKey)) return null;
  return {
    userId: `attempt:${attemptKey}`,
    email: 'Not provided',
    displayName: 'Student',
    fullName: null,
  };
}

export async function ownsAttempt(request: Request, storedUserId: string): Promise<boolean> {
  const signedInUser = await getRequestUser(request);
  const attemptKey = request.headers.get('x-attempt-key')?.trim() ?? '';
  const attemptUserId = attemptKeyPattern.test(attemptKey) ? `attempt:${attemptKey}` : '';
  return Boolean(
    (attemptUserId && storedUserId === attemptUserId)
    || (signedInUser && storedUserId === signedInUser.userId),
  );
}

export function isAdmin(user: RequestUser): boolean {
  return isTeacherEmail(user.email);
}

export function getDatabase(): D1Database {
  if (!env.DB) throw new Error('Student submission storage is unavailable.');
  return env.DB;
}

export function getBucket(): R2Bucket {
  if (!env.BUCKET) throw new Error('Answer-sheet storage is unavailable.');
  return env.BUCKET;
}

export function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  return !origin || origin === new URL(request.url).origin;
}

export function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
