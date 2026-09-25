import { getPaperAssessment } from '@/lib/assessment';
import { getDatabase, getRequestUser, jsonError } from '@/lib/server';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const user = getRequestUser(request);
  if (!user) return jsonError('Student sign in is required.', 401);
  try {
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await db.prepare(`SELECT id, paper_id, student_name, status, mcq_answers, mcq_score,
      written_score, total_score, teacher_feedback, submitted_at, marked_at
      FROM submissions WHERE id = ? AND user_id = ? AND status != 'draft'`).bind(id, user.userId).first<Record<string, unknown>>();
    if (!submission) return jsonError('This result was not found in your account.', 404);
    const assessment = getPaperAssessment(String(submission.paper_id));
    if (!assessment) return jsonError('This question paper is unavailable.', 404);
    const [marks, savedPaper] = await Promise.all([
      db.prepare(`SELECT question_number, marks_awarded, feedback FROM question_marks WHERE submission_id = ? ORDER BY question_number`).bind(id).all(),
      db.prepare('SELECT content_json FROM paper_content WHERE paper_id = ?').bind(String(submission.paper_id)).first<{ content_json: string }>(),
    ]);
    const savedDocument = savedPaper ? JSON.parse(savedPaper.content_json) as { answerKey?: Record<number, number>; writtenSolutions?: Record<number, string> } : null;
    return Response.json({
      submission: { ...submission, mcq_answers: JSON.parse(String(submission.mcq_answers ?? '{}')) },
      correctAnswers: savedDocument?.answerKey ?? assessment.mcqAnswerKey,
      writtenSolutions: savedDocument?.writtenSolutions ?? assessment.writtenSolutions,
      marks: marks.results,
    });
  } catch (error) {
    console.error('student result failed', error);
    return jsonError('Your result could not be loaded.', 500);
  }
}
