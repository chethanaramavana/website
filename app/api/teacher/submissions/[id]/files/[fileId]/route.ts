import { getBucket, getDatabase, getRequestUser, isAdmin, jsonError } from '@/lib/server';

export async function GET(request: Request, context: { params: Promise<{ id: string; fileId: string }> }) {
  try {
    const user = getRequestUser(request);
    if (!user || !isAdmin(user)) return jsonError('Teacher access only.', 403);
    const { id, fileId } = await context.params;
    const file = await getDatabase().prepare(`
      SELECT object_key, file_name, content_type FROM answer_uploads WHERE id = ? AND submission_id = ?
    `).bind(fileId, id).first<{ object_key: string; file_name: string; content_type: string }>();
    if (!file) return jsonError('Answer file not found.', 404);
    const object = await getBucket().get(file.object_key);
    if (!object) return jsonError('Answer file is unavailable.', 404);
    const headers = new Headers();
    headers.set('content-type', file.content_type);
    headers.set('content-disposition', `inline; filename*=UTF-8''${encodeURIComponent(file.file_name)}`);
    headers.set('cache-control', 'private, no-store');
    return new Response(object.body, { headers });
  } catch (error) {
    console.error('teacher answer file failed', error);
    return jsonError('Answer file could not be opened.', 500);
  }
}
