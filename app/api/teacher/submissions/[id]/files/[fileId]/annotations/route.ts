import { getBucket, getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';
import { validateAnnotations } from '@/lib/answer-annotations';

type Context = { params: Promise<{ id: string; fileId: string }> };
async function authorize(request: Request, context: Context) {
  const user = await getRequestUser(request);
  if (!user || !isAdmin(user)) return { error: jsonError('Teacher access only.', 403) };
  const { id, fileId } = await context.params;
  const file = await getDatabase().prepare(`SELECT a.id FROM answer_uploads a JOIN submissions s ON s.id = a.submission_id WHERE a.id = ? AND a.submission_id = ? AND s.status != 'draft'`).bind(fileId, id).first();
  if (!file) return { error: jsonError('Submitted answer file not found.', 404) };
  return { key: `answer-annotations/${encodeURIComponent(id)}/${encodeURIComponent(fileId)}.json` };
}
export async function GET(request: Request, context: Context) {
  try {
    const access = await authorize(request, context);
    if (access.error) return access.error;
    const object = await getBucket().get(access.key!);
    const document = object ? await object.json() : { version: 1, annotations: [] };
    return Response.json({ document, revision: object?.etag ?? null }, { headers: { 'cache-control': 'private, no-store' } });
  } catch { return jsonError('Corrections could not be loaded.', 500); }
}
export async function PUT(request: Request, context: Context) {
  try {
    if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
    const access = await authorize(request, context);
    if (access.error) return access.error;
    if (Number(request.headers.get('content-length')) > 2000000) return jsonError('Too many corrections in one file.', 413);
    const raw = await request.text();
    if (raw.length > 2000000) return jsonError('Too many corrections in one file.', 413);
    let payload;
    try { payload = JSON.parse(raw); } catch { return jsonError('Invalid corrections.', 400); }
    if (!validateAnnotations(payload.document) || !(payload.revision === null || (typeof payload.revision === 'string' && /^[a-f0-9]{32}$/i.test(payload.revision)))) return jsonError('Invalid corrections.', 400);
    const saved = await getBucket().put(access.key!, JSON.stringify(payload.document), {
      httpMetadata: { contentType: 'application/json' },
      onlyIf: payload.revision === null ? { etagDoesNotMatch: '*' } : { etagMatches: payload.revision },
    });
    if (!saved) return jsonError('Corrections changed in another window. Reload this paper before editing again.', 409);
    return Response.json({ revision: saved.etag }, { headers: { 'cache-control': 'private, no-store' } });
  } catch { return jsonError('Corrections could not be saved. Please retry.', 500); }
}
