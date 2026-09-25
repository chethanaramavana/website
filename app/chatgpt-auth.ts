import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type ChatGPTUser = { userId: string; displayName: string; email: string; fullName: string | null };

const SIGN_IN_PATH = '/signin-with-chatgpt';

export async function getChatGPTUser(): Promise<ChatGPTUser | null> {
  const requestHeaders = await headers();
  const userId = requestHeaders.get('oai-authenticated-user-id');
  const email = requestHeaders.get('oai-authenticated-user-email');
  if (!userId || !email) return null;
  const encodedFullName = requestHeaders.get('oai-authenticated-user-full-name');
  const fullName = encodedFullName && requestHeaders.get('oai-authenticated-user-full-name-encoding') === 'percent-encoded-utf-8'
    ? safeDecode(encodedFullName)
    : null;
  return { userId, email: email.toLowerCase(), fullName, displayName: fullName ?? email };
}

export async function requireChatGPTUser(returnTo: string): Promise<ChatGPTUser> {
  const user = await getChatGPTUser();
  if (user) return user;
  redirect(chatGPTSignInPath(returnTo));
}

export function chatGPTSignInPath(returnTo: string): string {
  const safeReturnTo = returnTo.startsWith('/') && !returnTo.startsWith('//') ? returnTo : '/';
  return `${SIGN_IN_PATH}?return_to=${encodeURIComponent(safeReturnTo)}`;
}

function safeDecode(value: string) {
  try { return decodeURIComponent(value); } catch { return null; }
}
