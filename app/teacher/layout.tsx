import { requireGoogleUser } from '@/app/google-auth';
import { isTeacherEmail } from '@/lib/identity';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';

export const dynamic = 'force-dynamic';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = await requireGoogleUser('/teacher');
  if (!isTeacherEmail(user.email)) {
    return (
      <main className="teacher-access-denied">
        <h1>Teacher access only</h1>
        <p>Please sign in using the teacher email address.</p>
        <a href="/api/auth/signout?return_to=%2Fteacher">Use a different Google account</a>
      </main>
    );
  }
  return <div className="identity-learning"><LearningHeader signedIn />{children}<SiteFooter /></div>;
}
