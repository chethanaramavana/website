import { getPaperAssessment } from '@/lib/assessment';
import { getRazorpayConfiguration, isRazorpayTestUser, razorpayAuthorization } from '@/lib/razorpay';
import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';

const orderIdPattern = /^order_[a-zA-Z0-9]+$/;

type StoredPayment = {
  id: string;
  paper_id: string;
  transaction_id: string;
  amount_paise: number;
  status: string;
};

type RazorpayPayment = {
  id?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  status?: string;
};

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);

  try {
    const user = getRequestUser(request);
    if (!user) return jsonError('Please log in again to check the payment.', 401);
    const config = getRazorpayConfiguration();
    if (!config) return jsonError('Razorpay is not configured.', 503);
    if (config.testMode && !isAdmin(user) && !isRazorpayTestUser(user.email)) {
      return jsonError('This test payment account is not authorised.', 403);
    }

    const body = await request.json() as { paperId?: unknown };
    const paperId = typeof body.paperId === 'string' ? body.paperId.trim() : '';
    if (!getPaperAssessment(paperId)) return jsonError('This question paper is unavailable.', 400);

    const database = getDatabase();
    const paymentRequest = await database.prepare(
      `SELECT id, paper_id, transaction_id, amount_paise, status
       FROM payment_requests
       WHERE user_id = ? AND paper_id = ? AND substr(transaction_id, 1, 6) = 'order_'
         AND status IN ('pending', 'approved')
       ORDER BY CASE status WHEN 'approved' THEN 0 ELSE 1 END, created_at DESC
       LIMIT 1`,
    ).bind(user.userId, paperId).first<StoredPayment>();

    if (!paymentRequest) return Response.json({ approved: false, status: 'none' });
    if (paymentRequest.status === 'approved') {
      return Response.json({ approved: true, status: 'approved', paperId: paymentRequest.paper_id });
    }

    const orderId = paymentRequest.transaction_id;
    if (!orderIdPattern.test(orderId)) return jsonError('The Razorpay order is invalid.', 400);

    const paymentsResponse = await fetch(`https://api.razorpay.com/v1/orders/${encodeURIComponent(orderId)}/payments`, {
      headers: { authorization: razorpayAuthorization(config.keyId, config.keySecret) },
    });
    const paymentList = await paymentsResponse.json() as { items?: RazorpayPayment[]; error?: { description?: string } };
    if (!paymentsResponse.ok) {
      console.error('Razorpay recovery lookup error', paymentList);
      return jsonError(paymentList.error?.description ?? 'Razorpay payment status could not be checked.', 502);
    }

    let payment = paymentList.items?.find((item) =>
      item.order_id === orderId
      && item.amount === paymentRequest.amount_paise
      && item.currency === 'INR'
      && (item.status === 'captured' || item.status === 'authorized'),
    );

    if (!payment?.id) return Response.json({ approved: false, status: 'pending' });

    if (payment.status === 'authorized') {
      const captureResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(payment.id)}/capture`, {
        method: 'POST',
        headers: { authorization: razorpayAuthorization(config.keyId, config.keySecret), 'content-type': 'application/json' },
        body: JSON.stringify({ amount: paymentRequest.amount_paise, currency: 'INR' }),
      });
      payment = await captureResponse.json() as RazorpayPayment;
      if (!captureResponse.ok) {
        console.error('Razorpay recovery capture error', payment);
        return jsonError('The payment is authorised but could not be captured yet. Please try again shortly.', 409);
      }
    }

    if (payment.status !== 'captured' || payment.order_id !== orderId || payment.amount !== paymentRequest.amount_paise || payment.currency !== 'INR') {
      console.error('Razorpay recovery status mismatch', payment);
      return jsonError('The completed payment could not be matched to this paper.', 409);
    }

    await database.prepare(
      `UPDATE payment_requests
       SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP
       WHERE id = ? AND user_id = ? AND status = 'pending' AND transaction_id = ?`,
    ).bind(paymentRequest.id, user.userId, orderId).run();

    return Response.json({ approved: true, status: 'approved', paperId: paymentRequest.paper_id });
  } catch (error) {
    console.error('Razorpay recovery error', error);
    return jsonError('The payment status could not be checked. Please try again.', 500);
  }
}
