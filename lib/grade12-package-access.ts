import { getDatabase, type RequestUser } from '@/lib/server';
import { GRADE12_PACKAGE, grade12PackageOnSale } from './grade12-package';
import { paperDefinitionsById } from './papers';
import { quizInfo } from './free-quizzes/catalog';
import { getG12PracticeProduct } from './g12-practice-catalog';
import { getIntegralsProduct } from './integrals-products';

const BOARD_STANDARDS = new Set(['CBSE', 'CBSE MCQ']);

/** Grade 12 written chapter papers in the main paper system. */
export function isGrade12Paper(id: string) {
  const p = paperDefinitionsById[id];
  return !!p && (p.board ?? 'CBSE') === 'CBSE' && p.grade === 12;
}
/** Grade 12 CBSE board practice: 40-mark papers and 20-mark MCQ tests. JEE Main and JEE Advanced papers are excluded. */
export function isGrade12BoardProduct(id: string) {
  const g = getG12PracticeProduct(id);
  if (g) return g.grade === 12 && BOARD_STANDARDS.has(g.standard);
  const i = getIntegralsProduct(id);
  return !!i && BOARD_STANDARDS.has(i.standard);
}
/** Every paid item that the Grade 12 package unlocks. */
export function isGrade12PackageTest(id: string) {
  const q = quizInfo(id);
  return isGrade12Paper(id) || isGrade12BoardProduct(id) || (!!q && q.board === 'CBSE' && q.grade === 12);
}
export async function hasGrade12Package(user: RequestUser, now = Date.now()) {
  if (!grade12PackageOnSale(now)) return false;
  return !!await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id=? AND paper_id=? AND status='approved' AND amount_paise=? LIMIT 1")
    .bind(user.userId, GRADE12_PACKAGE.id, GRADE12_PACKAGE.amount).first();
}
