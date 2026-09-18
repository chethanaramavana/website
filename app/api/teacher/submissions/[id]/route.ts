import { writtenQuestionMarks } from '@/lib/assessment';
import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const user = getRequestUser(request);
    if (!user || !isAdmin(user)) return jsonError('Teacher access only.', 403);
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await db.prepare(`
      SELECT id, student_name, user_email, status, mcq_score, written_score, total_score,
        teacher_feedback, submitted_at, marked_at FROM submissions WHERE id = ? AND status != 'draft'
    `).bind(id).first();
    if (!submission) return jsonError('Submission not found.', 404);
    const [uploads, marks] = await Promise.all([
      db.prepare(`SELECT id, question_number, file_name, content_type, size_bytes FROM answer_uploads WHERE submission_id = ? ORDER BY question_number, created_at`).bind(id).all(),
      db.prepare(`SELECT question_number, marks_awarded, feedback FROM question_marks WHERE submission_id = ? ORDER BY question_number`).bind(id).all(),
    ]);
    return Response.json({ submission, uploads: uploads.results, marks: marks.results });
  } catch (error) {
    console.error('teacher submission detail failed', error);
    return jsonError('This submission could not be loaded.', 500);
  }
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const user = getRequestUser(request);
    if (!user || !isAdmin(user)) return jsonError('Teacher access only.', 403);
    const { id } = await context.params;
    const payload = await request.json() as { marks?: Record<string, number>; feedback?: string };
    const marks = payload.marks ?? {};
    for (const [questionText, maximum] of Object.entries(writtenQuestionMarks)) {
      const awarded = marks[questionText];
      if (!Number.isInteger(awarded) || awarded < 0 || awarded > maximum) {
        return jsonError(`Enter a mark from 0 to ${maximum} for question ${questionText}.`, 400);
      }
    }
    const feedback = (payload.feedback ?? '').trim().slice(0, 2000);
    const db = getDatabase();
    const submission = await db.prepare(`SELECT mcq_score FROM submissions WHERE id = ? AND status != 'draft'`)
      .bind(id).first<{ mcq_score: number }>();
    if (!submission) return jsonError('Submission not found.', 404);

    const statements = Object.keys(writtenQuestionMarks).map((questionText) => db.prepare(`
      INSERT INTO question_marks (submission_id, question_number, marks_awarded, feedback)
      VALUES (?, ?, ?, '')
      ON CONFLICT(submission_id, question_number) DO UPDATE SET marks_awarded = excluded.marks_awarded
    `).bind(id, Number(questionText), marks[questionText]));
    const writtenScore = Object.values(marks).reduce((sum, mark) => sum + mark, 0);
    statements.push(db.prepare(`
      UPDATE submissions SET status = 'marked', written_score = ?, total_score = ?, teacher_feedback = ?,
        marked_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(writtenScore, submission.mcq_score + writtenScore, feedback, id));
    await db.batch(statements);
    return Response.json({ saved: true, writtenScore, totalScore: submission.mcq_score + writtenScore });
  } catch (error) {
    console.error('teacher marking failed', error);
    return jsonError('Marks could not be saved. Please try again.', 500);
  }
}
