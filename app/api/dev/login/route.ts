import {
  localPreviewEnabled,
  PREVIEW_COOKIE,
  PREVIEW_STUDENT_ID,
} from '@/lib/local-preview-auth';
import { authCookie, safeReturnTo } from '@/lib/google-auth';
import { getDatabase, sameOrigin } from '@/lib/server';
import { paperDefinitionsById } from '@/lib/papers';
import { quizListings, quizPrice } from '@/lib/free-quizzes/catalog';
import {
  integralsProducts,
  integralsPricePaise,
} from '@/lib/integrals-products';
import { basicsProducts } from '@/lib/basics-catalog';

export async function POST(request: Request) {
  if (!localPreviewEnabled(new URL(request.url).host))
    return new Response(null, { status: 404 });
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const form = await request.formData();
  const role = form.get('role');
  if (role !== 'student' && role !== 'teacher')
    return new Response('Choose student or teacher.', { status: 400 });
  if (role === 'student') {
    // Local fixture access only: no Razorpay requests and no production identities.
    const products = [
      ...Object.keys(paperDefinitionsById).map((id) => ({ id, amount: 3000 })),
      ...quizListings.map((q) => ({
        id: q.id,
        amount: quizPrice(q.chapter, q.grade),
      })),
      ...integralsProducts.map((p) => ({
        id: p.id,
        amount: integralsPricePaise(p.id),
      })),
      ...basicsProducts.map((p) => ({ id: p.id, amount: p.amount })),
    ];
    const db = getDatabase();
    try {
      await db.batch(
        products.map((p) =>
          db
            .prepare(
              "INSERT OR IGNORE INTO payment_requests (id,user_id,student_name,paper_id,transaction_id,amount_paise,status,reviewed_at) VALUES (?,?,'Preview student',?,?,?,'approved',CURRENT_TIMESTAMP)",
            )
            .bind(
              `preview-${p.id}`,
              PREVIEW_STUDENT_ID,
              p.id,
              `local-preview-${p.id}`,
              p.amount,
            ),
        ),
      );
    } catch {
      return new Response(
        'The local test database needs its migrations. Run the local database setup described in AGENTS.md.',
        { status: 503 },
      );
    }
  }
  const returnTo = safeReturnTo(String(form.get('return_to') ?? '/student'));
  return new Response(null, {
    status: 303,
    headers: {
      location: role === 'teacher' ? '/teacher' : returnTo,
      'set-cookie': authCookie(PREVIEW_COOKIE, role, 60 * 60 * 12, request),
      'cache-control': 'no-store',
    },
  });
}
