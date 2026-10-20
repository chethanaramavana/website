import { headers } from 'next/headers';
import { localPreviewEnabled, previewUser } from '@/lib/local-preview-auth';
export default async function LocalPreviewBanner() {
  if (!import.meta.env.DEV) return null;
  const h = await headers();
  if (!localPreviewEnabled(h.get('host'))) return null;
  const user = previewUser(h.get('cookie'), h.get('host'));
  if (!user) return null;
  return (
    <aside className="local-preview-banner">
      Local test account · {user.displayName}
      <a href="/dev-login?return_to=%2Fstudent">Switch account</a>
      <a href="/api/auth/signout?return_to=%2F">Sign out</a>
    </aside>
  );
}
