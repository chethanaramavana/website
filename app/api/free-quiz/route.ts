import { hasMcqAccess } from '@/lib/mcq-access';
import { getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';
import { freeQuizzes } from '@/lib/free-quizzes';

export async function POST(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
  const user = await getRequestUser(request);
  if (!user) return jsonError('Please sign in again before submitting. Your answers are still on this page.', 401);
  const raw = await request.text();
  if (raw.length > 5000) return jsonError('Submission is too large.', 400);
  let body;
  try { body = JSON.parse(raw); } catch { return jsonError('Invalid submission.', 400); }
  if (!body || typeof body.id !== 'string' || !/^[a-f0-9-]{36}$/i.test(body.id) || !body.answers || typeof body.answers !== 'object' || Array.isArray(body.answers)) return jsonError('Invalid submission.', 400);
  const quiz = freeQuizzes.find(q => q.id === body.quizId);
  if (!quiz) return jsonError('Invalid quiz.', 400);
  const { questions } = quiz;
  const answers: Record<number, number> = {};
  for (const [key, value] of Object.entries(body.answers)) {
    const index = Number(key);
    if (!/^\d+$/.test(key) || !Number.isInteger(index) || index < 0 || index >= questions.length || typeof value !== 'number' || !Number.isInteger(value) || value < 0 || value > 3) return jsonError('Invalid answer.', 400);
    answers[index] = value;
  }
  const score = questions.filter((q, i) => answers[i] === q.answer).length;
  try {
    if (!await hasMcqAccess(user, quiz.chapter)) return jsonError('Pay ₹20 to unlock this chapter’s MCQ quiz.', 402);
    const db = getDatabase();
    // A retry after a lost response must not create a second teacher record.
    await db.prepare(`INSERT INTO free_quiz_attempts (id, user_id, user_email, student_name, quiz_id, answers_json, questions_json, score, total, answered, submitted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING`)
      .bind(body.id, user.userId, user.email, user.displayName, quiz.id, JSON.stringify(answers), JSON.stringify(questions), score, questions.length, Object.keys(answers).length, new Date().toISOString()).run();
    const saved = await db.prepare('SELECT score, total, answers_json FROM free_quiz_attempts WHERE id = ? AND user_id = ? AND quiz_id = ?').bind(body.id, user.userId, quiz.id).first<{score:number;total:number;answers_json:string}>();
    if (!saved) return jsonError('Please start a new attempt.', 409);
    return Response.json({ id: body.id, score: saved.score, total: saved.total, answers: JSON.parse(saved.answers_json) }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    console.error('Free quiz save failed', error);
    return jsonError('Your result could not be saved. Keep this page open and try submitting again.', 503);
  }
}
