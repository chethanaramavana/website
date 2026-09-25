import { getDatabase, getRequestUser, jsonError } from '@/lib/server';

export async function GET(request: Request) {
  const user = getRequestUser(request);
  if (!user) return Response.json({ signedIn: false, access: [], submissions: [] });
  try {
    const db = getDatabase();
    const [payments, submissions] = await Promise.all([
      db.prepare(`SELECT paper_id FROM payment_requests WHERE user_id = ? AND status = 'approved' GROUP BY paper_id`).bind(user.userId).all<{ paper_id: string }>(),
      db.prepare(`SELECT id, paper_id, student_name, status, mcq_score, written_score, total_score,
        teacher_feedback, submitted_at, marked_at FROM submissions
        WHERE user_id = ? AND status != 'draft' ORDER BY submitted_at DESC`).bind(user.userId).all(),
    ]);
    return Response.json({
      signedIn: true,
      email: user.email,
      access: payments.results.map((row) => row.paper_id),
      submissions: submissions.results,
    });
  } catch (error) {
    console.error('student records failed', error);
    return jsonError('Your student account could not be loaded.', 500);
  }
}
