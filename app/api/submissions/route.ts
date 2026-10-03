import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';
import { getPaperAssessment } from '@/lib/assessment';
import { finalizeSubmission, getSubmissionPhase, getTimedSubmission } from '@/lib/submission-lifecycle';

const attemptIdPattern = /^[a-zA-Z0-9-]{20,80}$/;

export async function GET(request: Request) {
  try {
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);
    const id = new URL(request.url).searchParams.get('attemptId')?.trim() ?? '';
    if (!attemptIdPattern.test(id)) return jsonError('Invalid test attempt.', 400);

    const db = getDatabase();
    const submission = await db.prepare(`
      SELECT id, user_id, student_name, paper_id, status, mcq_answers, mcq_score,
        started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
      FROM submissions WHERE id = ?
    `).bind(id).first<{
      id: string;
      user_id: string;
      student_name: string;
      paper_id: string;
      status: string;
      mcq_answers: string;
      mcq_score: number;
      started_at_ms: number | null;
      work_deadline_at_ms: number | null;
      upload_deadline_at_ms: number | null;
    }>();
    if (!submission) return Response.json({ found: false });
    if (!await ownsAttempt(request, submission.user_id)) return jsonError('This saved test belongs to another student.', 403);

    const nowMs = Date.now();
    if (submission.status !== 'draft' || getSubmissionPhase(submission, nowMs) === 'expired') {
      const result = await finalizeSubmission(db, submission, { reason: submission.status === 'draft' ? 'timeout' : 'manual' });
      if (!result) return jsonError('This question paper is no longer available.', 400);
      return Response.json({ found: true, ...result, serverNowMs: nowMs, timedOut: result.submissionReason === 'timeout' });
    }

    const uploads = await db.prepare(`
      SELECT id, question_number, file_name FROM answer_uploads
      WHERE submission_id = ? ORDER BY question_number, created_at
    `).bind(id).all<{ id: string; question_number: number; file_name: string }>();

    return Response.json({
      found: true,
      status: submission.status,
      studentName: submission.student_name,
      paperId: submission.paper_id,
      answers: JSON.parse(submission.mcq_answers),
      serverNowMs: nowMs,
      startedAtMs: submission.started_at_ms,
      workDeadlineAtMs: submission.work_deadline_at_ms,
      uploadDeadlineAtMs: submission.upload_deadline_at_ms,
      uploads: uploads.results.map((upload) => ({
        id: upload.id,
        question: upload.question_number,
        fileName: upload.file_name,
      })),
    });
  } catch (error) {
    console.error('load submission draft failed', error);
    return jsonError('Your saved answers could not be loaded. You can still continue the test.', 500);
  }
}

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const owner = await getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);

    const payload = await request.json() as {
      attemptId?: string;
      paperId?: string;
      studentName?: string;
      answers?: Record<string, number>;
    };
    const id = payload.attemptId?.trim() ?? '';
    const paperId = payload.paperId?.trim() ?? '';
    const studentName = payload.studentName?.trim() ?? '';
    const answers = payload.answers ?? {};
    const assessment = getPaperAssessment(paperId);
    if (!attemptIdPattern.test(id)) return jsonError('Invalid test attempt.', 400);
    if (!assessment) return jsonError('This question paper is not available.', 400);
    if (studentName.length > 80) return jsonError('The student name is too long.', 400);
    if (Object.keys(answers).length > Object.keys(assessment.mcqAnswerKey).length) return jsonError('Too many MCQ answers were received.', 400);
    if (Object.entries(answers).some(([q, a]) => !(Number(q) in assessment.mcqAnswerKey) || !Number.isInteger(a) || a < 0 || a > 3)) {
      return jsonError('One or more MCQ answers are invalid.', 400);
    }

    const db = getDatabase();
    const row = await getTimedSubmission(db, id);
    if (!row || !await ownsAttempt(request, row.user_id)) return jsonError('This test attempt belongs to another student.', 403);
    if (row.paper_id !== paperId) return jsonError('This saved attempt belongs to a different question paper.', 409);
    if (row.status !== 'draft') return Response.json({ id, status: row.status });
    const phase = getSubmissionPhase(row);
    if (phase === 'expired') {
      const result = await finalizeSubmission(db, row, { reason: 'timeout' });
      if (!result) return jsonError('The timed test could not be submitted.', 500);
      return Response.json({ ...result, timedOut: true });
    }
    if (phase === 'upload-only') {
      return Response.json({ error: 'Answering time has ended. You can still save your remaining answer scans.', code: 'WORK_TIME_ENDED' }, { status: 409 });
    }

    await db.prepare(`
      UPDATE submissions SET student_name = ?, user_email = ?, mcq_answers = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(studentName, owner.email, JSON.stringify(answers), id, row.user_id).run();

    return Response.json({
      id,
      status: 'draft',
      serverNowMs: Date.now(),
      startedAtMs: row.started_at_ms,
      workDeadlineAtMs: row.work_deadline_at_ms,
      uploadDeadlineAtMs: row.upload_deadline_at_ms,
    }, { status: 201 });
  } catch (error) {
    console.error('create submission failed', error);
    return jsonError('The test could not be prepared for submission. Please try again.', 500);
  }
}
