import { TEACHER_EMAIL } from './identity';

export const PREVIEW_COOKIE = 'rmc_local_preview';
export const PREVIEW_STUDENT_ID = 'preview:student';
export const PREVIEW_TEACHER_ID = 'preview:teacher';

export function isLoopbackHost(host: string | null | undefined): boolean {
  if (!host || !/^(localhost|127\.0\.0\.1|\[::1\])(?::\d{1,5})?$/.test(host))
    return false;
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(
      new URL(`http://${host}`).hostname,
    );
  } catch {
    return false;
  }
}

export function localPreviewEnabled(host: string | null | undefined): boolean {
  // Vite replaces this constant with false in every production build.
  return import.meta.env.DEV && isLoopbackHost(host);
}

export function previewUser(cookie: string | null, host?: string | null) {
  if (!localPreviewEnabled(host)) return null;
  const role = cookie
    ?.split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${PREVIEW_COOKIE}=`))
    ?.slice(PREVIEW_COOKIE.length + 1);
  if (role === 'student')
    return {
      userId: PREVIEW_STUDENT_ID,
      email: 'student@ramavana.test',
      fullName: 'Preview student',
      displayName: 'Preview student',
    };
  if (role === 'teacher')
    return {
      userId: PREVIEW_TEACHER_ID,
      email: TEACHER_EMAIL,
      fullName: 'Preview teacher',
      displayName: 'Preview teacher',
    };
  return null;
}
