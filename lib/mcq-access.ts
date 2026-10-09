import { getDatabase, isAdmin, type RequestUser } from '@/lib/server';
import { quizId, quizPrice } from '@/lib/free-quizzes/catalog';
export async function hasMcqAccess(user:RequestUser, chapter:number, grade=10) {
  if (quizPrice(chapter,grade) === 0 || isAdmin(user)) return true;
  const paid = await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND amount_paise = ? AND status = 'approved' LIMIT 1").bind(user.userId,quizId(chapter,grade),quizPrice(chapter,grade)).first();
  return Boolean(paid);
}
