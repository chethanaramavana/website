import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';

const ratingKeys = ['uploadEase', 'questionQuality', 'difficultyFit', 'mathClarity', 'notesSolutions'] as const;

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Student sign in is required.', 401);
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await db.prepare('SELECT user_id FROM submissions WHERE id = ? AND status != \'draft\'')
      .bind(id).first<{ user_id: string }>();
    if (!submission || !await ownsAttempt(request, submission.user_id)) return jsonError('Submission not found.', 404);
    const feedback = await db.prepare(`
      SELECT upload_ease, question_quality, difficulty_fit, math_clarity, notes_solutions
      FROM submission_feedback WHERE submission_id = ?
    `).bind(id).first();
    return Response.json({ feedback });
  } catch (error) {
    console.error('load submission feedback failed', error);
    return jsonError('Feedback could not be loaded.', 500);
  }
}

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Student sign in is required.', 401);
    const { id } = await context.params;
    const payload = await request.json() as Record<string, unknown>;
    if (ratingKeys.some((key) => !Number.isInteger(payload[key]) || Number(payload[key]) < 1 || Number(payload[key]) > 5)) {
      return jsonError('Please give a rating from 1 to 5 for all five questions.', 400);
    }
    const db = getDatabase();
    const submission = await db.prepare('SELECT user_id, paper_id, status FROM submissions WHERE id = ?')
      .bind(id).first<{ user_id: string; paper_id: string; status: string }>();
    if (!submission || !await ownsAttempt(request, submission.user_id)) return jsonError('Submission not found.', 404);
    if (submission.status === 'draft') return jsonError('Feedback is available after the test is submitted.', 409);
    await db.prepare(`
      INSERT INTO submission_feedback
        (submission_id, user_id, paper_id, upload_ease, question_quality, difficulty_fit, math_clarity, notes_solutions)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(submission_id) DO UPDATE SET
        upload_ease = excluded.upload_ease,
        question_quality = excluded.question_quality,
        difficulty_fit = excluded.difficulty_fit,
        math_clarity = excluded.math_clarity,
        notes_solutions = excluded.notes_solutions,
        updated_at = CURRENT_TIMESTAMP
    `).bind(
      id,
      submission.user_id,
      submission.paper_id,
      Number(payload.uploadEase),
      Number(payload.questionQuality),
      Number(payload.difficultyFit),
      Number(payload.mathClarity),
      Number(payload.notesSolutions),
    ).run();
    return Response.json({ saved: true });
  } catch (error) {
    console.error('save submission feedback failed', error);
    return jsonError('Your feedback could not be saved. Please try again.', 500);
  }
}
