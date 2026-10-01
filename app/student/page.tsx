import { requireGoogleUser } from '@/app/google-auth';
import { getStudentRecordsForUser } from '@/lib/student-records';
import StudentDashboard from './student-dashboard';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const user = await requireGoogleUser('/student');
  const initialRecords = await getStudentRecordsForUser(user).catch(() => null);
  return <StudentDashboard displayName={user.displayName} email={user.email} initialRecords={initialRecords} />;
}
