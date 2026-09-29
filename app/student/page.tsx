import { requireGoogleUser } from '@/app/google-auth';
import StudentDashboard from './student-dashboard';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const user = await requireGoogleUser('/student');
  return <StudentDashboard displayName={user.displayName} email={user.email} />;
}
