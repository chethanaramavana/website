import { getPaperAssessment, scoreMcqs } from '@/lib/assessment';

export const ANSWERING_TIME_MS = 90 * 60 * 1000;
export const UPLOAD_BUFFER_MS = 5 * 60 * 1000;

export type SubmissionPhase = 'answering' | 'upload-only' | 'expired';

export type TimedSubmission = {
  id: string;
  user_id: string;
  paper_id: string;
  status: string;
  mcq_answers: string;
  mcq_score: number;
  started_at_ms: number | null;
  work_deadline_at_ms: number | null;
  upload_deadline_at_ms: number | null;
};

export function getSubmissionPhase(submission: Pick<TimedSubmission, 'work_deadline_at_ms' | 'upload_deadline_at_ms'>, nowMs = Date.now()): SubmissionPhase {
  if (submission.upload_deadline_at_ms !== null && nowMs >= submission.upload_deadline_at_ms) return 'expired';
  if (submission.work_deadline_at_ms !== null && nowMs >= submission.work_deadline_at_ms) return 'upload-only';
  return 'answering';
}

export function freshTiming(nowMs = Date.now()) {
  return {
    startedAtMs: nowMs,
    workDeadlineAtMs: nowMs + ANSWERING_TIME_MS,
    uploadDeadlineAtMs: nowMs + ANSWERING_TIME_MS + UPLOAD_BUFFER_MS,
  };
}

function safeAnswers(value: unknown, answerKey: Record<number, number>) {
  const source = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return Object.fromEntries(Object.entries(source).filter(([question, answer]) => (
    Number(question) in answerKey && Number.isInteger(answer) && Number(answer) >= 0 && Number(answer) <= 3
  )).map(([question, answer]) => [question, Number(answer)]));
}

async function assessmentSnapshot(db: D1Database, paperId: string) {
  const assessment = getPaperAssessment(paperId);
  if (!assessment) return null;
  const savedPaper = await db.prepare('SELECT content_json FROM paper_content WHERE paper_id = ?')
    .bind(paperId).first<{ content_json: string }>();
  let savedDocument: { answerKey?: Record<number, number>; writtenSolutions?: Record<number, string> } | null = null;
  if (savedPaper) {
    try { savedDocument = JSON.parse(savedPaper.content_json); } catch {}
  }
  return {
    answerKey: savedDocument?.answerKey ?? assessment.mcqAnswerKey,
    writtenSolutions: savedDocument?.writtenSolutions ?? assessment.writtenSolutions,
  };
}

export async function finalizeSubmission(
  db: D1Database,
  submission: TimedSubmission,
  options: { answers?: unknown; reason: 'manual' | 'timeout' },
) {
  const snapshot = await assessmentSnapshot(db, submission.paper_id);
  if (!snapshot) return null;
  let parsedAnswers: unknown = {};
  try { parsedAnswers = JSON.parse(submission.mcq_answers || '{}'); } catch {}
  const answers = safeAnswers(options.answers ?? parsedAnswers, snapshot.answerKey);

  if (submission.status === 'draft') {
    const score = scoreMcqs(answers, snapshot.answerKey);
    await db.prepare(`
      UPDATE submissions SET mcq_answers = ?, status = 'submitted', mcq_score = ?,
        submitted_at = COALESCE(submitted_at, CURRENT_TIMESTAMP), submission_reason = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND status = 'draft'
    `).bind(JSON.stringify(answers), score, options.reason, submission.id).run();
  }

  const canonical = await db.prepare(`
    SELECT id, paper_id, status, mcq_answers, mcq_score, submission_reason
    FROM submissions WHERE id = ?
  `).bind(submission.id).first<{
    id: string;
    paper_id: string;
    status: string;
    mcq_answers: string;
    mcq_score: number;
    submission_reason: string | null;
  }>();
  if (!canonical) return null;
  return {
    id: canonical.id,
    status: canonical.status,
    mcqScore: canonical.mcq_score,
    mcqMaximum: Object.keys(snapshot.answerKey).length,
    correctAnswers: snapshot.answerKey,
    writtenSolutions: snapshot.writtenSolutions,
    answers: safeAnswers(JSON.parse(canonical.mcq_answers || '{}'), snapshot.answerKey),
    submissionReason: canonical.submission_reason,
  };
}

export async function getTimedSubmission(db: D1Database, id: string) {
  return db.prepare(`
    SELECT id, user_id, paper_id, status, mcq_answers, mcq_score,
      started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
    FROM submissions WHERE id = ?
  `).bind(id).first<TimedSubmission>();
}

export async function finalizeExpiredSubmissions(db: D1Database, userId?: string) {
  const query = userId
    ? db.prepare(`
        SELECT id, user_id, paper_id, status, mcq_answers, mcq_score,
          started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
        FROM submissions
        WHERE user_id = ? AND status = 'draft' AND upload_deadline_at_ms IS NOT NULL AND upload_deadline_at_ms <= ?
        ORDER BY upload_deadline_at_ms LIMIT 50
      `).bind(userId, Date.now())
    : db.prepare(`
        SELECT id, user_id, paper_id, status, mcq_answers, mcq_score,
          started_at_ms, work_deadline_at_ms, upload_deadline_at_ms
        FROM submissions
        WHERE status = 'draft' AND upload_deadline_at_ms IS NOT NULL AND upload_deadline_at_ms <= ?
        ORDER BY upload_deadline_at_ms LIMIT 100
      `).bind(Date.now());
  const expired = await query.all<TimedSubmission>();
  for (const submission of expired.results) await finalizeSubmission(db, submission, { reason: 'timeout' });
  return expired.results.length;
}
