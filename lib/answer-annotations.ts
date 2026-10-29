export type Point = { x: number; y: number };
export type AnswerAnnotation = { id: string; page: number; kind: 'pen' | 'tick' | 'cross' | 'comment'; points: Point[]; text?: string };
export type AnnotationDocument = { version: 1; annotations: AnswerAnnotation[] };

export function validateAnnotations(value: unknown): value is AnnotationDocument {
  if (!value || typeof value !== 'object') return false;
  const doc = value as AnnotationDocument;
  if (doc.version !== 1 || !Array.isArray(doc.annotations) || doc.annotations.length > 1000) return false;
  let points = 0;
  const ids = new Set<string>();
  return doc.annotations.every(a => {
    if (!a || typeof a.id !== 'string' || a.id.length > 80 || ids.has(a.id)) return false;
    ids.add(a.id);
    if (!Number.isInteger(a.page) || a.page < 1 || a.page > 500 || !['pen', 'tick', 'cross', 'comment'].includes(a.kind)) return false;
    if (!Array.isArray(a.points) || !a.points.length || a.points.length > 3000 || (a.kind !== 'pen' && a.points.length !== 1)) return false;
    points += a.points.length;
    if (points > 50000 || !a.points.every(p => p && Number.isFinite(p.x) && Number.isFinite(p.y) && p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1)) return false;
    return a.kind !== 'comment' || (typeof a.text === 'string' && a.text.trim().length > 0 && a.text.length <= 240);
  });
}
