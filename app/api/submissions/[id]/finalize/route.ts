import { getPaperAssessment, scoreMcqs } from '@/lib/assessment';
import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await db.prepare(`
      SELECT user_id, paper_id, status, mcq_answers, mcq_score FROM submissions WHERE id = ?
    `).bind(id).first<{ user_id: string; paper_id: string; status: string; mcq_answers: string; mcq_score: number }>();
    if (!submission || !await ownsAttempt(request, submission.user_id)) return jsonError('Submission not found.', 404);
    const assessment = getPaperAssessment(submission.paper_id);
    if (!assessment) return jsonError('This question paper is no longer available.', 400);
    const savedPaper = await db.prepare('SELECT content_json FROM paper_content WHERE paper_id = ?').bind(submission.paper_id).first<{ content_json: string }>();
    const savedDocument = savedPaper ? JSON.parse(savedPaper.content_json) as { answerKey?: Record<number, number>; writtenSolutions?: Record<number, string> } : null;
    const savedAnswerKey = savedDocument?.answerKey ?? null;
    const answerKey = savedAnswerKey ?? assessment.mcqAnswerKey;
    const writtenSolutions = savedDocument?.writtenSolutions ?? assessment.writtenSolutions;
    if (submission.status !== 'draft') {
      return Response.json({
        id,
        status: submission.status,
        mcqScore: submission.mcq_score,
        mcqMaximum: Object.keys(answerKey).length,
        correctAnswers: answerKey,
        writtenSolutions,
      });
    }

    const answers = JSON.parse(submission.mcq_answers) as Record<string, number>;
    const score = scoreMcqs(answers, answerKey);
    await db.prepare(`
      UPDATE submissions SET status = 'submitted', mcq_score = ?, submitted_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(score, id, submission.user_id).run();
    return Response.json({
      id,
      status: 'submitted',
      mcqScore: score,
      mcqMaximum: Object.keys(answerKey).length,
      correctAnswers: answerKey,
      writtenSolutions,
    });
  } catch (error) {
    console.error('finalize submission failed', error);
    return jsonError('The completed test could not be submitted. Please try again.', 500);
  }
}
