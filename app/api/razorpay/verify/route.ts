import { constantTimeEqual, getRazorpayConfiguration, hmacSha256Hex, razorpayAuthorization } from '@/lib/razorpay';
import { getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';

const idPattern = /^(order|pay)_[a-zA-Z0-9]+$/;

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);

  try {
    const user = getRequestUser(request);
    if (!user) return jsonError('Please log in again to verify the payment.', 401);
    const config = getRazorpayConfiguration();
    if (!config) return jsonError('Razorpay is not configured.', 503);

    const body = await request.json() as Record<string, unknown>;
    const orderId = typeof body.razorpay_order_id === 'string' ? body.razorpay_order_id : '';
    const paymentId = typeof body.razorpay_payment_id === 'string' ? body.razorpay_payment_id : '';
    const signature = typeof body.razorpay_signature === 'string' ? body.razorpay_signature : '';
    if (!idPattern.test(orderId) || !idPattern.test(paymentId) || !/^[a-f0-9]{64}$/i.test(signature)) return jsonError('Invalid Razorpay response.', 400);

    const database = getDatabase();
    const paymentRequest = await database.prepare(
      `SELECT id, paper_id, amount_paise, status FROM payment_requests WHERE transaction_id = ? AND user_id = ? LIMIT 1`,
    ).bind(orderId, user.userId).first<{ id: string; paper_id: string; amount_paise: number; status: string }>();
    if (!paymentRequest) return jsonError('This payment order was not found.', 404);
    if (paymentRequest.status === 'approved') return Response.json({ approved: true, paperId: paymentRequest.paper_id });

    const expectedSignature = await hmacSha256Hex(config.keySecret, `${orderId}|${paymentId}`);
    if (!constantTimeEqual(expectedSignature.toLowerCase(), signature.toLowerCase())) return jsonError('Payment verification failed.', 400);

    let paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`, {
      headers: { authorization: razorpayAuthorization(config.keyId, config.keySecret) },
    });
    let payment = await paymentResponse.json() as { id?: string; order_id?: string; amount?: number; currency?: string; status?: string };
    if (payment.status === 'authorized') {
      paymentResponse = await fetch(`https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`, {
        method: 'POST',
        headers: { authorization: razorpayAuthorization(config.keyId, config.keySecret), 'content-type': 'application/json' },
        body: JSON.stringify({ amount: paymentRequest.amount_paise, currency: 'INR' }),
      });
      payment = await paymentResponse.json() as typeof payment;
    }
    if (!paymentResponse.ok || payment.status !== 'captured' || payment.order_id !== orderId || payment.amount !== paymentRequest.amount_paise || payment.currency !== 'INR') {
      console.error('Razorpay payment status mismatch', payment);
      return jsonError('The payment has not been captured yet. Please wait a moment and try again.', 409);
    }

    await database.prepare(
      `UPDATE payment_requests SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?`,
    ).bind(paymentRequest.id, user.userId).run();
    return Response.json({ approved: true, paperId: paymentRequest.paper_id });
  } catch (error) {
    console.error('Razorpay verification error', error);
    return jsonError('The payment could not be verified. Please try again.', 500);
  }
}
