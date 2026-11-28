import { getDatabase, isAdmin, type RequestUser } from '../server';
import { getWorksheetProduct } from './catalog';

/** True when the user is an admin or has an approved payment for this worksheet. */
export async function hasWorksheetAccess(user: RequestUser, id: string) {
  if (!getWorksheetProduct(id)) return false;
  if (isAdmin(user)) return true;
  return !!await getDatabase().prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1").bind(user.userId, id).first();
}
