import { getPaperAssessment } from '@/lib/assessment';
import { getRazorpayConfiguration, razorpayAuthorization } from '@/lib/razorpay';
import { getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';

const AMOUNT_PAISE = 3000;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);

  try {
    const user = getRequestUser(request);
    if (!user) return jsonError('Please log in or sign up before paying.', 401);
    const config = getRazorpayConfiguration();
    if (!config) return jsonError('Razorpay is waiting for account approval. Please use the temporary QR option.', 503);

    const body = await request.json() as { studentName?: unknown; paperId?: unknown };
    const studentName = typeof body.studentName === 'string' ? body.studentName.trim() : '';
    const paperId = typeof body.paperId === 'string' ? body.paperId.trim() : '';
    if (studentName.length < 2 || studentName.length > 80) return jsonError('Please enter the student name.', 400);
    if (!getPaperAssessment(paperId)) return jsonError('This question paper is unavailable.', 400);

    const database = getDatabase();
    const existing = await database.prepare(
      `SELECT id FROM payment_requests WHERE user_id = ? AND paper_id = ? AND status = 'approved' LIMIT 1`,
    ).bind(user.userId, paperId).first<{ id: string }>();
    if (existing) return Response.json({ alreadyPaid: true, paperId });

    const requestId = crypto.randomUUID();
    const orderResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        authorization: razorpayAuthorization(config.keyId, config.keySecret),
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        amount: AMOUNT_PAISE,
        currency: 'INR',
        receipt: `rmc-${requestId}`,
        notes: { paper_id: paperId, student_email: user.email },
      }),
    });
    const order = await orderResponse.json() as { id?: string; amount?: number; currency?: string; error?: { description?: string } };
    if (!orderResponse.ok || !order.id || order.amount !== AMOUNT_PAISE || order.currency !== 'INR') {
      console.error('Razorpay order error', order);
      return jsonError(order.error?.description ?? 'Razorpay could not start the payment.', 502);
    }

    await database.prepare(
      `INSERT INTO payment_requests
        (id, user_id, student_name, paper_id, transaction_id, amount_paise, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
    ).bind(requestId, user.userId, studentName, paperId, order.id, AMOUNT_PAISE).run();

    return Response.json({ keyId: config.keyId, orderId: order.id, amount: AMOUNT_PAISE, currency: 'INR', paperId });
  } catch (error) {
    console.error('Razorpay order creation error', error);
    return jsonError('Razorpay could not start the payment. Please try again.', 500);
  }
}
