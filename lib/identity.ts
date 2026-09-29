const EMAIL_CORRECTIONS: Record<string, string> = {
  'chethanamanasa21@gmil.com': 'chethanamanasa21@gmail.com',
};

export const TEACHER_EMAIL = 'chethanamanasa21@gmail.com';

export function normalizeAccountEmail(value: string): string {
  const email = value.trim().toLowerCase();
  return EMAIL_CORRECTIONS[email] ?? email;
}

export function isTeacherEmail(value: string): boolean {
  return normalizeAccountEmail(value) === TEACHER_EMAIL;
}
