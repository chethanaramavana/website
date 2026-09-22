import { env } from 'cloudflare:workers';

export type RequestUser = { userId: string; email: string };

const attemptKeyPattern = /^[a-zA-Z0-9-]{20,80}$/;

export function getRequestUser(request: Request): RequestUser | null {
  const userId = request.headers.get('oai-authenticated-user-id');
  const email = request.headers.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  return { userId, email: email.toLowerCase() };
}

export function getAttemptOwner(request: Request): RequestUser | null {
  const attemptKey = request.headers.get('x-attempt-key')?.trim() ?? '';
  if (!attemptKeyPattern.test(attemptKey)) return null;
  const signedInUser = getRequestUser(request);
  return {
    userId: `attempt:${attemptKey}`,
    email: signedInUser?.email ?? 'Not provided',
  };
}

export function ownsAttempt(request: Request, storedUserId: string): boolean {
  const attemptOwner = getAttemptOwner(request);
  const signedInUser = getRequestUser(request);
  return Boolean(
    (attemptOwner && storedUserId === attemptOwner.userId)
    || (signedInUser && storedUserId === signedInUser.userId),
  );
}

export function isAdmin(user: RequestUser): boolean {
  const adminEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  return Boolean(adminEmail && user.email === adminEmail);
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
