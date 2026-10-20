import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { localPreviewEnabled } from '@/lib/local-preview-auth';
import { safeReturnTo } from '@/lib/google-auth';
import Brand from '../brand';

export default async function PreviewLogin({
  searchParams,
}: {
  searchParams: Promise<{ return_to?: string }>;
}) {
  const requestHeaders = await headers();
  if (!localPreviewEnabled(requestHeaders.get('host'))) notFound();
  const returnTo = safeReturnTo((await searchParams).return_to);
  return (
    <main className="preview-login">
      <Brand />
      <p className="rmc-eyebrow">Local preview only</p>
      <h1>Choose a test account</h1>
      <p>No Google account or real payment needed.</p>
      <form action="/api/dev/login" method="post">
        <input type="hidden" name="return_to" value={returnTo} />
        <button className="rmc-button" name="role" value="student">
          Student · with chapter access
        </button>
        <button
          className="rmc-button rmc-button-outline"
          name="role"
          value="teacher"
        >
          Teacher · marking & editing
        </button>
      </form>
      <a href="/">Back to the website</a>
    </main>
  );
}
