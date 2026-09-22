import { getAttemptOwner, getDatabase, jsonError, ownsAttempt, sameOrigin } from '@/lib/server';

const attemptIdPattern = /^[a-zA-Z0-9-]{20,80}$/;

export async function GET(request: Request) {
  try {
    const owner = getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);
    const id = new URL(request.url).searchParams.get('attemptId')?.trim() ?? '';
    if (!attemptIdPattern.test(id)) return jsonError('Invalid test attempt.', 400);

    const db = getDatabase();
    const submission = await db.prepare(`
      SELECT id, user_id, student_name, status, mcq_answers
      FROM submissions WHERE id = ?
    `).bind(id).first<{
      id: string;
      user_id: string;
      student_name: string;
      status: string;
      mcq_answers: string;
    }>();
    if (!submission) return Response.json({ found: false });
    if (!ownsAttempt(request, submission.user_id)) return jsonError('This saved test belongs to another student.', 403);

    const uploads = await db.prepare(`
      SELECT id, question_number, file_name FROM answer_uploads
      WHERE submission_id = ? ORDER BY question_number, created_at
    `).bind(id).all<{ id: string; question_number: number; file_name: string }>();

    return Response.json({
      found: true,
      status: submission.status,
      studentName: submission.student_name,
      answers: JSON.parse(submission.mcq_answers),
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
    const owner = getAttemptOwner(request);
    if (!owner) return jsonError('Please reopen the test page and try again.', 401);

    const payload = await request.json() as {
      attemptId?: string;
      studentName?: string;
      answers?: Record<string, number>;
    };
    const id = payload.attemptId?.trim() ?? '';
    const studentName = payload.studentName?.trim() ?? '';
    const answers = payload.answers ?? {};
    if (!attemptIdPattern.test(id)) return jsonError('Invalid test attempt.', 400);
    if (studentName.length > 80) return jsonError('The student name is too long.', 400);
    if (Object.keys(answers).length > 16) return jsonError('Too many MCQ answers were received.', 400);
    if (Object.entries(answers).some(([q, a]) => !/^(?:[1-9]|1[0-6])$/.test(q) || !Number.isInteger(a) || a < 0 || a > 3)) {
      return jsonError('One or more MCQ answers are invalid.', 400);
    }

    const db = getDatabase();
    await db.prepare(`
      INSERT OR IGNORE INTO submissions
        (id, user_id, user_email, student_name, paper_id, status, mcq_answers)
      VALUES (?, ?, ?, ?, 'real-numbers-01', 'draft', ?)
    `).bind(id, owner.userId, owner.email, studentName, JSON.stringify(answers)).run();

    const row = await db.prepare('SELECT id, user_id, status FROM submissions WHERE id = ?')
      .bind(id).first<{ id: string; user_id: string; status: string }>();
    if (!row || !ownsAttempt(request, row.user_id)) return jsonError('This test attempt belongs to another student.', 403);
    if (row.status !== 'draft') return Response.json({ id, status: row.status });

    await db.prepare(`
      UPDATE submissions SET student_name = ?, user_email = ?, mcq_answers = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(studentName, owner.email, JSON.stringify(answers), id, row.user_id).run();

    return Response.json({ id, status: 'draft' }, { status: 201 });
  } catch (error) {
    console.error('create submission failed', error);
    return jsonError('The test could not be prepared for submission. Please try again.', 500);
  }
}
