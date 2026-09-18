import { env } from 'cloudflare:workers';

export type RequestUser = { userId: string; email: string };

export function getRequestUser(request: Request): RequestUser | null {
  const userId = request.headers.get('oai-authenticated-user-id');
  const email = request.headers.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  return { userId, email: email.toLowerCase() };
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
