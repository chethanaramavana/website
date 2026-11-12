/** Data shape for exam figures in the sample papers. Rendering lives in app/paper-figure.tsx. */
export const paperFigureKinds = ['tangents', 'concentric', 'bpt', 'sector', 'annulus-sector', 'segment', 'elevation', 'observers-same', 'observers-opposite', 'poles-road', 'building-tower', 'depression-two', 'building-and-tower', 'circum-quad', 'points', 'toy', 'capsule', 'tent', 'vessel', 'cone-cavity', 'playground', 'altitude', 'trapezium'] as const;
export type PaperFigureKind = (typeof paperFigureKinds)[number];
export type PaperFigureSpec = { kind: PaperFigureKind; marks?: Record<string, string>; values?: number[]; names?: string[]; caption?: string };

export function isPaperFigureSpec(value: unknown): value is PaperFigureSpec {
  if (!value || typeof value !== 'object') return false;
  const spec = value as Record<string, unknown>;
  if (!(paperFigureKinds as readonly string[]).includes(spec.kind as string)) return false;
  if (spec.caption !== undefined && (typeof spec.caption !== 'string' || spec.caption.length > 300)) return false;
  if (spec.values !== undefined && (!Array.isArray(spec.values) || spec.values.length > 16 || spec.values.some(n => typeof n !== 'number' || !Number.isFinite(n)))) return false;
  if (spec.names !== undefined && (!Array.isArray(spec.names) || spec.names.length > 8 || spec.names.some(s => typeof s !== 'string' || s.length > 12))) return false;
  if (spec.marks !== undefined && (typeof spec.marks !== 'object' || spec.marks === null || Object.values(spec.marks).some(s => typeof s !== 'string' || s.length > 40))) return false;
  return true;
}
