import { getDatabase, getRequestUser, isAdmin, jsonError } from '@/lib/server';

export async function GET(request: Request) {
  try {
    const user = getRequestUser(request);
    if (!user || !isAdmin(user)) return jsonError('Teacher access only.', 403);
    const rows = await getDatabase().prepare(`
      SELECT id, student_name, user_email, status, mcq_score, written_score, total_score,
        submitted_at, marked_at FROM submissions
      WHERE status != 'draft' ORDER BY submitted_at DESC LIMIT 100
    `).all();
    return Response.json({ submissions: rows.results });
  } catch (error) {
    console.error('teacher submission list failed', error);
    return jsonError('Submissions could not be loaded.', 500);
  }
}
