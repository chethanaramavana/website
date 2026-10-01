import { getDatabase, getRequestUser, jsonError } from '@/lib/server';

export async function GET(request: Request) {
  const user = await getRequestUser(request);
  if (!user) return Response.json({ signedIn: false, access: [], payments: [], submissions: [] });
  try {
    const db = getDatabase();
    const [payments, submissions] = await Promise.all([
      db.prepare(`SELECT paper_id, student_name, transaction_id, amount_paise, created_at, reviewed_at,
        CASE WHEN substr(transaction_id, 1, 6) = 'order_' THEN 'razorpay' ELSE 'manual' END AS payment_source
        FROM payment_requests WHERE user_id = ? AND status = 'approved' ORDER BY created_at DESC`)
        .bind(user.userId).all<{ paper_id: string; student_name: string; transaction_id: string; amount_paise: number; created_at: string; reviewed_at: string | null; payment_source: 'razorpay' | 'manual' }>(),
      db.prepare(`SELECT id, paper_id, student_name, status, mcq_score, written_score, total_score,
        teacher_feedback, submitted_at, marked_at FROM submissions
        WHERE (user_id = ? OR lower(user_email) = ?) AND status != 'draft' ORDER BY submitted_at DESC`).bind(user.userId, user.email).all<{ paper_id: string }>(),
    ]);
    const latestPayments = [...new Map(payments.results.map((payment) => [payment.paper_id, payment])).values()];
    const access = new Set(latestPayments.map((row) => row.paper_id));
    for (const submission of submissions.results) access.add(submission.paper_id);
    const fallbackName = latestPayments.find((payment) => payment.student_name.trim())?.student_name.trim()
      || user.email.split('@')[0];
    return Response.json({
      signedIn: true,
      email: user.email,
      displayName: user.fullName ?? fallbackName,
      access: [...access],
      payments: latestPayments,
      submissions: submissions.results,
    });
  } catch (error) {
    console.error('student records failed', error);
    return jsonError('Your student account could not be loaded.', 500);
  }
}
