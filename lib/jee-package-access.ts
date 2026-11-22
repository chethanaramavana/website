import { getDatabase, type RequestUser } from '@/lib/server';
import { JEE_PACKAGE, jeePackageOnSale } from './jee-package';
import { getG12PracticeProduct } from './g12-practice-catalog';
import { getIntegralsProduct } from './integrals-products';
import { getJeeEntranceProduct } from './jee-entrance';

const JEE_STANDARDS = new Set(['JEE Main', 'JEE Advanced']);

/** Grade 11 and Grade 12 JEE Main and JEE Advanced chapter papers, Integrals included. CBSE papers and MCQ tests are excluded. */
export function isJeeChapterProduct(id: string) {
  const g = getG12PracticeProduct(id);
  if (g) return JEE_STANDARDS.has(g.standard);
  const i = getIntegralsProduct(id);
  return !!i && JEE_STANDARDS.has(i.standard);
}
/** Every paid item that the JEE package unlocks. */
export function isJeePackageTest(id: string) {
  return isJeeChapterProduct(id) || !!getJeeEntranceProduct(id);
}
export async function hasJeePackage(user: RequestUser, now = Date.now()) {
  if (!jeePackageOnSale(now)) return false;
  return !!await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id=? AND paper_id=? AND status='approved' AND amount_paise=? LIMIT 1")
    .bind(user.userId, JEE_PACKAGE.id, JEE_PACKAGE.amount).first();
}
