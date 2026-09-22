import { mcqAnswerKey, scoreMcqs, writtenQuestionMarks, writtenSolutions } from '@/lib/assessment';
import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const owner = getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await db.prepare(`
      SELECT user_id, status, mcq_answers, mcq_score FROM submissions WHERE id = ?
    `).bind(id).first<{ user_id: string; status: string; mcq_answers: string; mcq_score: number }>();
    if (!submission || !ownsAttempt(request, submission.user_id)) return jsonError('Submission not found.', 404);
    if (submission.status !== 'draft') {
      return Response.json({
        id,
        status: submission.status,
        mcqScore: submission.mcq_score,
        mcqMaximum: 16,
        correctAnswers: mcqAnswerKey,
        writtenSolutions,
      });
    }

    const answers = JSON.parse(submission.mcq_answers) as Record<string, number>;
    if (Object.keys(answers).length !== Object.keys(mcqAnswerKey).length) return jsonError('Please answer every MCQ.', 400);
    const uploads = await db.prepare(`
      SELECT question_number, COUNT(*) AS file_count FROM answer_uploads
      WHERE submission_id = ? GROUP BY question_number
    `).bind(id).all<{ question_number: number; file_count: number }>();
    const uploadedQuestions = new Set(uploads.results.map((row) => row.question_number));
    const missing = Object.keys(writtenQuestionMarks).map(Number).filter((question) => !uploadedQuestions.has(question));
    if (missing.length) return jsonError(`Upload an answer for question${missing.length > 1 ? 's' : ''} ${missing.join(', ')}.`, 400);

    const score = scoreMcqs(answers);
    await db.prepare(`
      UPDATE submissions SET status = 'submitted', mcq_score = ?, submitted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(score, id, submission.user_id).run();
    return Response.json({
      id,
      status: 'submitted',
      mcqScore: score,
      mcqMaximum: 16,
      correctAnswers: mcqAnswerKey,
      writtenSolutions,
    });
  } catch (error) {
    console.error('finalize submission failed', error);
    return jsonError('The completed test could not be submitted. Please try again.', 500);
  }
}
