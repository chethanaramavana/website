import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';

function requireAdmin(request: Request) {
  const user = getRequestUser(request);
  return user && isAdmin(user) ? user : null;
}

function textField(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export async function GET(request: Request) {
  if (!requireAdmin(request)) return jsonError('Teacher access is required.', 403);

  try {
    const result = await getDatabase().prepare(
      `SELECT id, student_name, paper_id, transaction_id, amount_paise, status, created_at, reviewed_at
       FROM payment_requests
       ORDER BY CASE status WHEN 'pending' THEN 0 ELSE 1 END, created_at DESC
       LIMIT 100`,
    ).all();
    return Response.json({ payments: result.results ?? [] });
  } catch (error) {
    console.error('Teacher payment list error', error);
    return jsonError('Payment requests could not be loaded.', 500);
  }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
  if (!requireAdmin(request)) return jsonError('Teacher access is required.', 403);

  try {
    const body = await request.json() as Record<string, unknown>;
    const id = textField(body.id).trim();
    const status = textField(body.status).trim();
    if (!/^[a-zA-Z0-9-]{20,80}$/.test(id)) return jsonError('Invalid payment request.', 400);
    if (status !== 'approved' && status !== 'rejected') return jsonError('Choose approve or reject.', 400);

    const result = await getDatabase().prepare(
      `UPDATE payment_requests
       SET status = ?, reviewed_at = CURRENT_TIMESTAMP
       WHERE id = ? AND status = 'pending'`,
    ).bind(status, id).run();

    if (!result.meta.changes) return jsonError('This payment request was already reviewed.', 409);
    return Response.json({ id, status });
  } catch (error) {
    console.error('Teacher payment review error', error);
    return jsonError('The payment decision could not be saved.', 500);
  }
}
