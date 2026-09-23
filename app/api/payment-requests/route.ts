import { getPaperAssessment } from '@/lib/assessment';
import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';

const idPattern = /^[a-zA-Z0-9-]{20,80}$/;
const transactionPattern = /^[a-zA-Z0-9-]{8,50}$/;

function textField(value: unknown) {
  return typeof value === 'string' ? value : '';
}

export async function GET(request: Request) {
  try {
    const id = new URL(request.url).searchParams.get('id')?.trim() ?? '';
    if (!idPattern.test(id)) return jsonError('Invalid payment request.', 400);

    const row = await getDatabase().prepare(
      'SELECT id, user_id, paper_id, status, created_at, reviewed_at FROM payment_requests WHERE id = ? LIMIT 1',
    ).bind(id).first<Record<string, string | null>>();

    if (!row || !ownsAttempt(request, String(row.user_id))) return jsonError('Payment request not found.', 404);
    return Response.json({
      request: {
        id: row.id,
        paperId: row.paper_id,
        status: row.status,
        createdAt: row.created_at,
        reviewedAt: row.reviewed_at,
      },
    });
  } catch (error) {
    console.error('Payment status error', error);
    return jsonError('Payment status could not be checked.', 500);
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);

  try {
    const owner = getAttemptOwner(request);
    if (!owner) return jsonError('This browser could not start payment verification. Please refresh and try again.', 401);

    const body = await request.json() as Record<string, unknown>;
    const id = textField(body.id).trim();
    const studentName = textField(body.studentName).trim();
    const paperId = textField(body.paperId).trim();
    const transactionId = textField(body.transactionId).trim().replace(/\s+/g, '').toUpperCase();

    if (!idPattern.test(id)) return jsonError('Invalid payment request.', 400);
    if (studentName.length < 2 || studentName.length > 80) return jsonError('Please enter the student name.', 400);
    if (!getPaperAssessment(paperId)) return jsonError('This question paper is unavailable.', 400);
    if (!transactionPattern.test(transactionId)) return jsonError('Enter a valid UPI transaction ID (at least 8 letters or numbers).', 400);

    const database = getDatabase();
    const duplicate = await database.prepare(
      'SELECT id FROM payment_requests WHERE transaction_id = ? LIMIT 1',
    ).bind(transactionId).first<{ id: string }>();
    if (duplicate) return jsonError('This transaction ID has already been submitted.', 409);

    await database.prepare(
      `INSERT INTO payment_requests
        (id, user_id, student_name, paper_id, transaction_id, amount_paise, status)
       VALUES (?, ?, ?, ?, ?, 3000, 'pending')`,
    ).bind(id, owner.userId, studentName, paperId, transactionId).run();

    return Response.json({ request: { id, paperId, status: 'pending' } }, { status: 201 });
  } catch (error) {
    console.error('Payment request error', error);
    const message = error instanceof Error && /unique/i.test(error.message)
      ? 'This transaction ID has already been submitted.'
      : 'Payment details could not be submitted. Please try again.';
    return jsonError(message, error instanceof Error && /unique/i.test(error.message) ? 409 : 500);
  }
}
