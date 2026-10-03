import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';
import { finalizeSubmission, getSubmissionPhase, getTimedSubmission } from '@/lib/submission-lifecycle';

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);
    const { id } = await context.params;
    const db = getDatabase();
    const submission = await getTimedSubmission(db, id);
    if (!submission || !await ownsAttempt(request, submission.user_id)) return jsonError('Submission not found.', 404);

    let payload: { answers?: unknown } = {};
    const rawPayload = await request.text();
    if (rawPayload) {
      try { payload = JSON.parse(rawPayload); } catch { return jsonError('Invalid submission data.', 400); }
    }
    const phase = getSubmissionPhase(submission);
    const result = await finalizeSubmission(db, submission, {
      answers: phase === 'answering' ? payload.answers : undefined,
      reason: phase === 'expired' ? 'timeout' : 'manual',
    });
    if (!result) return jsonError('This question paper is no longer available.', 400);
    return Response.json({ ...result, timedOut: result.submissionReason === 'timeout' });
  } catch (error) {
    console.error('finalize submission failed', error);
    return jsonError('The completed test could not be submitted. Please try again.', 500);
  }
}
