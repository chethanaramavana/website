import { getDatabase, isAdmin, type RequestUser } from '@/lib/server';
import { quizId, quizPrice, type QuizBoard } from '@/lib/free-quizzes/catalog';
import { hasGrade10Package } from './grade10-package-access';
export async function hasMcqAccess(user:RequestUser, chapter:number, grade=10, board:QuizBoard='CBSE') {
  if (quizPrice(chapter,grade,board) === 0 || isAdmin(user)) return true;
  if (board === 'CBSE' && grade === 10 && await hasGrade10Package(user)) return true;
  const paid = await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1").bind(user.userId,quizId(chapter,grade,board)).first();
  return Boolean(paid);
}
