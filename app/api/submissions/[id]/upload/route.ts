import { writtenQuestionMarks } from '@/lib/assessment';
import { getBucket, getDatabase, getRequestUser, jsonError, sameOrigin } from '@/lib/server';

const safeId = /^[a-zA-Z0-9-]{10,100}$/;
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']);
const maxFileSize = 10 * 1024 * 1024;

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const user = getRequestUser(request);
    if (!user) return jsonError('Please sign in first.', 401);
    const { id } = await context.params;
    const url = new URL(request.url);
    const question = Number(url.searchParams.get('question'));
    const uploadId = request.headers.get('x-upload-id') ?? '';
    const contentType = request.headers.get('content-type')?.split(';')[0] ?? '';
    const size = Number(request.headers.get('x-file-size'));
    const encodedName = request.headers.get('x-file-name') ?? '';
    let fileName = 'answer';
    try { fileName = decodeURIComponent(encodedName).slice(0, 180) || 'answer'; } catch {}

    if (!safeId.test(id) || !safeId.test(uploadId)) return jsonError('Invalid upload request.', 400);
    if (!(question in writtenQuestionMarks)) return jsonError('Invalid written-answer question.', 400);
    if (!allowedTypes.has(contentType)) return jsonError('Upload a JPG, PNG, WebP or PDF file.', 400);
    if (!Number.isFinite(size) || size <= 0 || size > maxFileSize) return jsonError('Each file must be 10 MB or smaller.', 400);
    if (!request.body) return jsonError('The selected file is empty.', 400);

    const db = getDatabase();
    const submission = await db.prepare('SELECT user_id, status FROM submissions WHERE id = ?')
      .bind(id).first<{ user_id: string; status: string }>();
    if (!submission || submission.user_id !== user.userId) return jsonError('Submission not found.', 404);
    if (submission.status !== 'draft') return jsonError('This test has already been submitted.', 409);

    const objectKey = `submissions/${id}/${question}/${uploadId}`;
    await getBucket().put(objectKey, request.body, { httpMetadata: { contentType } });
    await db.prepare(`
      INSERT INTO answer_uploads
        (id, submission_id, user_id, question_number, object_key, file_name, content_type, size_bytes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        object_key = excluded.object_key, file_name = excluded.file_name,
        content_type = excluded.content_type, size_bytes = excluded.size_bytes
    `).bind(uploadId, id, user.userId, question, objectKey, fileName, contentType, size).run();

    return Response.json({ uploaded: true, id: uploadId });
  } catch (error) {
    console.error('answer upload failed', error);
    return jsonError('This answer file could not be uploaded. Please try again.', 500);
  }
}
