import { getDatabase, isAdmin, type RequestUser } from '@/lib/server';
import { getG12PracticeProduct } from './g12-practice-catalog';

export async function hasG12PracticeAccess(user: RequestUser, productId: string) {
  if (!getG12PracticeProduct(productId)) return false;
  if (isAdmin(user)) return true;
  return Boolean(await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1").bind(user.userId, productId).first());
}
