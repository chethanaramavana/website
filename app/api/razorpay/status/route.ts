import { recoverPurchase } from '@/lib/payment-recovery';
import {getBasicsProduct} from '@/lib/basics-catalog';
import { getIntegralsProduct } from '@/lib/integrals-products';
import { quizPriceById } from '@/lib/free-quizzes/catalog';
import { getPaperAssessment } from '@/lib/assessment';
import { getRazorpayConfiguration, isRazorpayTestUser } from '@/lib/razorpay';
import { getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);

  try {
    const user = await getRequestUser(request);
    if (!user) return jsonError('Please log in again to check the payment.', 401);
    const config = getRazorpayConfiguration();
    if (!config) return jsonError('Razorpay is not configured.', 503);
    if (config.testMode && !isAdmin(user) && !isRazorpayTestUser(user.email)) {
      return jsonError('This test payment account is not authorised.', 403);
    }

    const body = await request.json() as { paperId?: unknown };
    const paperId = typeof body.paperId === 'string' ? body.paperId.trim() : '';
    const quizAmount = quizPriceById(paperId);
    if (!(quizAmount && quizAmount > 0) && !getPaperAssessment(paperId) && !getIntegralsProduct(paperId) && !getBasicsProduct(paperId)) return jsonError('This question paper is unavailable.', 400);

    return Response.json({ ...await recoverPurchase(user.userId, paperId, config, true), paperId });
  } catch (error) {
    console.error('Razorpay recovery error', error);
    return jsonError('An earlier payment could not be confirmed yet. Please check again before paying again.', 502);
  }
}
