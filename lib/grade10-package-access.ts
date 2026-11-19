import { getDatabase, type RequestUser } from '@/lib/server';
import { GRADE10_PACKAGE, grade10PackageOnSale } from './grade10-package';
import { paperDefinitionsById } from './papers';
import { quizInfo } from './free-quizzes/catalog';

export function isGrade10Paper(id: string) {
  const p = paperDefinitionsById[id];
  return !!p && (p.board ?? 'CBSE') === 'CBSE' && (p.grade ?? 10) === 10;
}
export function isGrade10PackageTest(id: string) {
  const q = quizInfo(id);
  return isGrade10Paper(id) || !!q && q.board === 'CBSE' && q.grade === 10;
}
export async function hasGrade10Package(user: RequestUser, now = Date.now()) {
  if (!grade10PackageOnSale(now)) return false;
  return !!await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id=? AND paper_id=? AND status='approved' AND amount_paise=? LIMIT 1")
    .bind(user.userId, GRADE10_PACKAGE.id, GRADE10_PACKAGE.amount).first();
}
