import { requireChatGPTUser } from '@/app/chatgpt-auth';
import StudentDashboard from './student-dashboard';

export const dynamic = 'force-dynamic';

export default async function StudentPage() {
  const user = await requireChatGPTUser('/student');
  return <StudentDashboard displayName={user.displayName} email={user.email} />;
}
