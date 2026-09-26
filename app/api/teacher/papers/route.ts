import { getDatabase, getRequestUser, isAdmin, jsonError, sameOrigin } from '@/lib/server';
import { isPaperDefinition, paperDefinitionsById, type PaperDefinition } from '@/lib/papers';
import { getPaperAssessment } from '@/lib/assessment';

type PaperDocument = { paper: PaperDefinition; answerKey: Record<number, number>; writtenSolutions: Record<number, string> };

function requireAdmin(request: Request) {
  const user = getRequestUser(request);
  return user && isAdmin(user) ? user : null;
}

export async function GET(request: Request) {
  if (!requireAdmin(request)) return jsonError('Teacher access is required.', 403);
  try {
    const rows = await getDatabase().prepare('SELECT paper_id, content_json, updated_at FROM paper_content').all<{ paper_id: string; content_json: string; updated_at: string }>();
    const saved = new Map(rows.results.map((row) => [row.paper_id, row]));
    const papers = Object.values(paperDefinitionsById).sort((left, right) => left.chapterNumber - right.chapterNumber).map((fallback) => {
      const row = saved.get(fallback.id);
      const assessment = getPaperAssessment(fallback.id)!;
      const savedDocument = row ? JSON.parse(row.content_json) as Partial<PaperDocument> : null;
      return {
        paper: savedDocument?.paper ?? fallback,
        answerKey: savedDocument?.answerKey ?? assessment.mcqAnswerKey,
        writtenSolutions: savedDocument?.writtenSolutions ?? assessment.writtenSolutions,
        updatedAt: row?.updated_at ?? null,
      };
    });
    return Response.json({ papers });
  } catch (error) {
    console.error('teacher paper list failed', error);
    return jsonError('Question papers could not be loaded.', 500);
  }
}

export async function PATCH(request: Request) {
  if (!sameOrigin(request)) return jsonError('Invalid request origin.', 403);
  const user = requireAdmin(request);
  if (!user) return jsonError('Teacher access is required.', 403);
  try {
    const body = await request.json() as { paper?: unknown; answerKey?: Record<number, number>; writtenSolutions?: Record<number, string> };
    if (!isPaperDefinition(body.paper)) return jsonError('Please check the question paper fields.', 400);
    const paper = body.paper;
    const fallback = paperDefinitionsById[paper.id];
    if (!fallback || fallback.chapter !== paper.chapter) return jsonError('This question paper cannot be changed.', 400);
    if (!body.answerKey || !Array.from({ length: 16 }, (_, index) => index + 1).every((number) => Number.isInteger(body.answerKey?.[number]) && Number(body.answerKey?.[number]) >= 0 && Number(body.answerKey?.[number]) <= 3)) return jsonError('Choose the correct option for every objective question.', 400);
    if (!body.writtenSolutions || ![17,18,19,20,21,22,23,24].every((number) => typeof body.writtenSolutions?.[number] === 'string' && String(body.writtenSolutions?.[number]).length <= 3000)) return jsonError('Add a model solution for every written question.', 400);
    const document: PaperDocument = { paper, answerKey: body.answerKey, writtenSolutions: body.writtenSolutions };
    await getDatabase().prepare(`INSERT INTO paper_content (paper_id, content_json, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(paper_id) DO UPDATE SET content_json = excluded.content_json,
        updated_by = excluded.updated_by, updated_at = CURRENT_TIMESTAMP`).bind(paper.id, JSON.stringify(document), user.email).run();
    return Response.json({ saved: true, ...document });
  } catch (error) {
    console.error('teacher paper save failed', error);
    return jsonError('The question paper could not be saved.', 500);
  }
}
