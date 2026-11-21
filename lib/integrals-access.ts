import { getDatabase, isAdmin, type RequestUser } from '@/lib/server';
import { getIntegralsProduct } from './integrals-products';
import { hasGrade12Package, isGrade12BoardProduct } from './grade12-package-access';

export async function hasIntegralsAccess(user: RequestUser, productId: string) {
  if (!getIntegralsProduct(productId)) return false;
  if (isAdmin(user)) return true;
  if (isGrade12BoardProduct(productId) && await hasGrade12Package(user)) return true;
  return Boolean(await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1").bind(user.userId, productId).first());
}
