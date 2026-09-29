import { requireGoogleUser } from '@/app/google-auth';
import StudentResult from './student-result';

export const dynamic = 'force-dynamic';

export default async function StudentResultPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await requireGoogleUser(`/student/results/${encodeURIComponent(id)}`);
  return <StudentResult id={id} />;
}
