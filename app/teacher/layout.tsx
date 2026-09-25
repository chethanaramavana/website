import { env } from 'cloudflare:workers';
import { requireChatGPTUser } from '@/app/chatgpt-auth';

export const dynamic = 'force-dynamic';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const user = await requireChatGPTUser('/teacher');
  const teacherEmail = env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!teacherEmail || user.email !== teacherEmail) {
    return (
      <main className="teacher-access-denied">
        <h1>Teacher access only</h1>
        <p>Please sign in using the teacher email address.</p>
        <a href="/signout-with-chatgpt?return_to=%2Fteacher" target="_top">Use a different account</a>
      </main>
    );
  }
  return children;
}
