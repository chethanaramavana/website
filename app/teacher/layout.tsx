import { env } from 'cloudflare:workers';
import { requireGoogleUser } from '@/app/google-auth';

export const dynamic = 'force-dynamic';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = await requireGoogleUser('/teacher');
  const teacherEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!teacherEmail || user.email !== teacherEmail) {
    return (
      <main className="teacher-access-denied">
        <h1>Teacher access only</h1>
        <p>Please sign in using the teacher email address.</p>
        <a href="/api/auth/signout?return_to=%2Fteacher">Use a different Google account</a>
      </main>
    );
  }
  return children;
}
