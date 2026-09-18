import { getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';

const attemptIdPattern = /^[a-zA-Z0-9-]{20,80}$/;

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const user = getRequestUser(request);
    if (!user) return jsonError('Please open the private student link and sign in first.', 401);

    const payload = await request.json() as {
      attemptId?: string;
      studentName?: string;
      answers?: Record<string, number>;
    };
    const id = payload.attemptId?.trim() ?? '';
    const studentName = payload.studentName?.trim() ?? '';
    const answers = payload.answers ?? {};
    if (!attemptIdPattern.test(id)) return jsonError('Invalid test attempt.', 400);
    if (studentName.length < 2 || studentName.length > 80) return jsonError('Enter the student name.', 400);
    if (Object.keys(answers).length !== 16) return jsonError('Please answer all 16 MCQs.', 400);
    if (Object.entries(answers).some(([q, a]) => !/^(?:[1-9]|1[0-6])$/.test(q) || !Number.isInteger(a) || a < 0 || a > 3)) {
      return jsonError('One or more MCQ answers are invalid.', 400);
    }

    const db = getDatabase();
    await db.prepare(`
      INSERT OR IGNORE INTO submissions
        (id, user_id, user_email, student_name, paper_id, status, mcq_answers)
      VALUES (?, ?, ?, ?, 'real-numbers-01', 'draft', ?)
    `).bind(id, user.userId, user.email, studentName, JSON.stringify(answers)).run();

    const row = await db.prepare('SELECT id, user_id, status FROM submissions WHERE id = ?')
      .bind(id).first<{ id: string; user_id: string; status: string }>();
    if (!row || row.user_id !== user.userId) return jsonError('This test attempt belongs to another student.', 403);
    if (row.status !== 'draft') return Response.json({ id, status: row.status });

    await db.prepare(`
      UPDATE submissions SET student_name = ?, user_email = ?, mcq_answers = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ? AND status = 'draft'
    `).bind(studentName, user.email, JSON.stringify(answers), id, user.userId).run();

    return Response.json({ id, status: 'draft' }, { status: 201 });
  } catch (error) {
    console.error('create submission failed', error);
    return jsonError('The test could not be prepared for submission. Please try again.', 500);
  }
}
