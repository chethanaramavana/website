import { getDatabase, jsonError } from '@/lib/server';
import { paperDefinitionsById } from '@/lib/papers';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const fallback = paperDefinitionsById[id as keyof typeof paperDefinitionsById];
    if (!fallback) return jsonError('Question paper not found.', 404);
    const row = await getDatabase().prepare('SELECT content_json, updated_at FROM paper_content WHERE paper_id = ?').bind(id).first<{ content_json: string; updated_at: string }>();
    const saved = row ? JSON.parse(row.content_json) as { paper?: unknown } : null;
    return Response.json({ paper: saved?.paper ?? saved ?? fallback, updatedAt: row?.updated_at ?? null });
  } catch (error) {
    console.error('question paper load failed', error);
    return jsonError('The latest question paper could not be loaded.', 500);
  }
}
