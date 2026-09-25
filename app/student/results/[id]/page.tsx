import { requireChatGPTUser } from '@/app/chatgpt-auth';
import StudentResult from './student-result';

export const dynamic = 'force-dynamic';

export default async function StudentResultPage({ params }: { params: Promise<{ id: string }> }) {
  await requireChatGPTUser('/student');
  const { id } = await params;
  return <StudentResult id={id} />;
}
