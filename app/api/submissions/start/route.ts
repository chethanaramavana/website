import { getPaperAssessment } from '@/lib/assessment';
import { getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';
import { finalizeSubmission, freshTiming, getSubmissionPhase, type TimedSubmission } from '@/lib/submission-lifecycle';

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const user = await getRequestUser(request);
    if (!user) return jsonError('Student sign in is required to start the test.', 401);
    const payload = await request.json() as { paperId?: string };
    const paperId = payload.paperId?.trim() ?? '';
    if (!getPaperAssessment(paperId)) return jsonError('This question paper is not available.', 404);

    const db = getDatabase();
    const access = await db.prepare(`
      SELECT 1 AS allowed FROM payment_requests
      WHERE user_id = ? AND paper_id = ? AND status = 'approved'
      UNION ALL
      SELECT 1 AS allowed FROM submissions
      WHERE (user_id = ? OR lower(user_email) = ?) AND paper_id = ? AND status != 'draft'
      LIMIT 1
    `).bind(user.userId, paperId, user.userId, user.email.toLowerCase(), paperId).first<{ allowed: number }>();
    if (!access) return jsonError('Payment or prior chapter access is required before starting this test.', 403);

    let submission = await db.prepare(`
      SELECT id, user_id, paper_id, status, mcq_answers, mcq_score,
        started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
      FROM submissions
      WHERE user_id = ? AND paper_id = ? AND status = 'draft'
      ORDER BY created_at DESC LIMIT 1
    `).bind(user.userId, paperId).first<TimedSubmission>();

    if (!submission) {
      const id = crypto.randomUUID();
      const timing = freshTiming();
      const studentName = (user.fullName ?? user.displayName ?? user.email.split('@')[0]).trim().slice(0, 80);
      await db.prepare(`
        INSERT INTO submissions
          (id, user_id, user_email, student_name, paper_id, status, mcq_answers,
            started_at_ms, work_deadline_at_ms, upload_deadline_at_ms)
        VALUES (?, ?, ?, ?, ?, 'draft', '{}', ?, ?, ?)
      `).bind(id, user.userId, user.email, studentName, paperId, timing.startedAtMs, timing.workDeadlineAtMs, timing.uploadDeadlineAtMs).run();
      submission = await db.prepare(`
        SELECT id, user_id, paper_id, status, mcq_answers, mcq_score,
          started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
        FROM submissions WHERE id = ?
      `).bind(id).first<TimedSubmission>();
    } else if (submission.started_at_ms === null || submission.work_deadline_at_ms === null || submission.upload_deadline_at_ms === null) {
      const timing = freshTiming();
      await db.prepare(`
        UPDATE submissions SET started_at_ms = ?, work_deadline_at_ms = ?, upload_deadline_at_ms = ?,
          updated_at = CURRENT_TIMESTAMP WHERE id = ? AND status = 'draft'
      `).bind(timing.startedAtMs, timing.workDeadlineAtMs, timing.uploadDeadlineAtMs, submission.id).run();
      submission = { ...submission, started_at_ms: timing.startedAtMs, work_deadline_at_ms: timing.workDeadlineAtMs, upload_deadline_at_ms: timing.uploadDeadlineAtMs };
    }
    if (!submission) return jsonError('The test attempt could not be created.', 500);

    const nowMs = Date.now();
    if (getSubmissionPhase(submission, nowMs) === 'expired') {
      const result = await finalizeSubmission(db, submission, { reason: 'timeout' });
      if (!result) return jsonError('The timed test could not be submitted.', 500);
      return Response.json({ ...result, serverNowMs: nowMs, timedOut: true });
    }

    const [details, uploads] = await Promise.all([
      db.prepare('SELECT student_name, mcq_answers FROM submissions WHERE id = ?').bind(submission.id).first<{ student_name: string; mcq_answers: string }>(),
      db.prepare(`SELECT id, question_number, file_name FROM answer_uploads WHERE submission_id = ? ORDER BY question_number, created_at`).bind(submission.id).all<{ id: string; question_number: number; file_name: string }>(),
    ]);
    return Response.json({
      id: submission.id,
      status: submission.status,
      studentName: details?.student_name ?? user.displayName,
      answers: JSON.parse(details?.mcq_answers ?? '{}'),
      uploads: uploads.results.map((upload) => ({ id: upload.id, question: upload.question_number, fileName: upload.file_name })),
      serverNowMs: nowMs,
      startedAtMs: submission.started_at_ms,
      workDeadlineAtMs: submission.work_deadline_at_ms,
      uploadDeadlineAtMs: submission.upload_deadline_at_ms,
    }, { status: 201 });
  } catch (error) {
    console.error('start submission failed', error);
    return jsonError('The timed test could not be started. Please try again.', 500);
  }
}
