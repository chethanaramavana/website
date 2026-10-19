export const TEACHER_EMAIL = 'chethanamanasa21@gmail.com';

export function normalizeAccountEmail(value: string): string {
  const email = value.trim().toLowerCase();
  return email;
}

export function isTeacherEmail(value: string): boolean {
  return normalizeAccountEmail(value) === TEACHER_EMAIL;
}
