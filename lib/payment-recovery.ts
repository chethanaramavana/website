import { getDatabase } from '@/lib/server';
import { razorpayAuthorization } from '@/lib/razorpay';

type Configuration = { keyId: string; keySecret: string };
type StoredPayment = { id: string; transaction_id: string; amount_paise: number };
type Payment = { id?: string; order_id?: string; amount?: number; currency?: string; status?: string };

// An approved purchase remains valid at its original price.
export async function recoverPurchase(userId: string, paperId: string, config: Configuration, captureAuthorized = false) {
  const db = getDatabase();
  const approved = () => db.prepare("SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1").bind(userId, paperId).first();
  if (await approved()) return { approved: true, status: 'approved' };
  const rows = await db.prepare(`SELECT id, transaction_id, amount_paise FROM payment_requests
    WHERE user_id = ? AND paper_id = ? AND status = 'pending'
      AND substr(transaction_id, 1, 6) = 'order_'
    ORDER BY created_at DESC, id DESC`).bind(userId, paperId).all<StoredPayment>();
  const headers = { authorization: razorpayAuthorization(config.keyId, config.keySecret) };
  const matches = (p: Payment, row: StoredPayment) => p.order_id === row.transaction_id && p.amount === row.amount_paise && p.currency === 'INR';
  const confirm = async (row: StoredPayment) => {
    await db.prepare(`UPDATE payment_requests SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ? AND paper_id = ? AND transaction_id = ? AND status = 'pending'`)
      .bind(row.id, userId, paperId, row.transaction_id).run();
    if (!await approved()) throw new Error('Payment approval could not be saved.');
    return { approved: true, status: 'approved' };
  };
  const authorizations: { row: StoredPayment; payment: Payment }[] = [];
  let uncertain = false;
  for (const row of rows.results ?? []) {
    try {
      if (!/^order_[a-zA-Z0-9]+$/.test(row.transaction_id)) throw new Error('Invalid stored payment order.');
      const response = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(row.transaction_id)}/payments`, { headers });
      if (!response.ok) throw new Error('Payment lookup failed.');
      const list = await response.json() as { items?: Payment[] };
      if (!Array.isArray(list.items)) throw new Error('Invalid payment lookup response.');
      const captured = list.items.find(p => matches(p, row) && p.status === 'captured');
      if (captured?.id) return await confirm(row);
      const authorized = list.items.find(p => matches(p, row) && p.status === 'authorized');
      if (authorized?.id) authorizations.push({ row, payment: authorized });
      if (list.items.some(p => (p.status === 'captured' || p.status === 'authorized') && (!matches(p, row) || !p.id))) uncertain = true;
    } catch {
      // Continue: a failed newer lookup must not hide an older captured payment.
      uncertain = true;
    }
  }
  // Search every order for a captured payment before capturing another one.
  // If a lookup failed, do not risk taking another payment.
  if (!uncertain && captureAuthorized && authorizations.length) {
    if (await approved()) return { approved: true, status: 'approved' };
    const { row, payment } = authorizations[authorizations.length - 1];
    const capture = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(payment.id!)}/capture`, {
      method: 'POST', headers: { ...headers, 'content-type': 'application/json' },
      body: JSON.stringify({ amount: row.amount_paise, currency: 'INR' }),
    });
    if (!capture.ok) throw new Error('Payment capture pending.');
    const result = await capture.json() as Payment;
    if (!matches(result, row) || result.status !== 'captured') throw new Error('Payment capture mismatch.');
    return confirm(row);
  }
  if (uncertain || authorizations.length) throw new Error('An earlier payment is still being checked. Use Check completed payment before paying again.');
  return { approved: false, status: rows.results?.length ? 'pending' : 'none' };
}
