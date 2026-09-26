import { env } from 'cloudflare:workers';
import { constantTimeEqual, hmacSha256Hex } from '@/lib/razorpay';
import { getDatabase, jsonError } from '@/lib/server';

export async function POST(request: Request) {
  try {
    const webhookSecret = env.RAZORPAY_WEBHOOK_SECRET?.trim();
    if (!webhookSecret) return jsonError('Webhook is not configured.', 503);
    const signature = request.headers.get('x-razorpay-signature')?.trim() ?? '';
    const rawBody = await request.text();
    const expected = await hmacSha256Hex(webhookSecret, rawBody);
    if (!signature || !constantTimeEqual(expected.toLowerCase(), signature.toLowerCase())) return jsonError('Invalid webhook signature.', 401);

    const event = JSON.parse(rawBody) as {
      event?: string;
      payload?: { payment?: { entity?: { id?: string; order_id?: string; amount?: number; currency?: string; status?: string } } };
    };
    const payment = event.payload?.payment?.entity;
    if ((event.event === 'payment.captured' || event.event === 'order.paid') && payment?.order_id && payment.amount === 3000 && payment.currency === 'INR' && payment.status === 'captured') {
      await getDatabase().prepare(
        `UPDATE payment_requests SET status = 'approved', reviewed_at = CURRENT_TIMESTAMP WHERE transaction_id = ? AND amount_paise = 3000`,
      ).bind(payment.order_id).run();
    }
    return Response.json({ received: true });
  } catch (error) {
    console.error('Razorpay webhook error', error);
    return jsonError('Webhook could not be processed.', 500);
  }
}
