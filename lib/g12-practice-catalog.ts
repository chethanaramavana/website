/** Grade 12 chapter practice sets (same format as the Integrals practice page). Metadata only; the question banks live in g12-practice-banks.ts. */
export const g12PracticeChapters = [
  { number: 1, title: 'Relations and Functions', notes: 'g12-relations-functions' },
  { number: 2, title: 'Inverse Trigonometric Functions', notes: 'g12-inverse-trigonometric-functions' },
  { number: 3, title: 'Matrices', notes: 'g12-matrices' },
  { number: 4, title: 'Determinants', notes: 'g12-determinants' },
  { number: 5, title: 'Continuity and Differentiability', notes: 'g12-continuity-differentiability' },
  { number: 6, title: 'Applications of Derivatives', notes: 'g12-applications-derivatives' },
  { number: 8, title: 'Applications of Integrals', notes: 'g12-applications-integrals' },
  { number: 9, title: 'Differential Equations', notes: 'g12-differential-equations' },
  { number: 10, title: 'Vector Algebra', notes: 'g12-vector-algebra' },
  { number: 11, title: 'Three Dimensional Geometry', notes: 'g12-three-dimensional-geometry' },
  { number: 12, title: 'Linear Programming', notes: 'g12-linear-programming' },
  { number: 13, title: 'Probability', notes: 'g12-probability' },
] as const;

/** Chapters whose practice set is published. Add a chapter number here when its bank is added to g12-practice-banks.ts. */
export const g12PracticeReady: ReadonlySet<number> = new Set([1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13]);

export type G12PracticeProduct = { id: string; chapter: number; chapterTitle: string; title: string; standard: string; detail: string; total: number };

export const g12PracticePath = (chapter: number) => `/cbse/grade-12/practice/ch-${chapter}`;
export const g12PaperPath = (id: string) => { const p = getG12PracticeProduct(id); return p ? `${g12PracticePath(p.chapter)}/papers/${id}` : '/cbse/grade-12'; };

export function g12PracticeChapter(chapter: number) {
  return g12PracticeChapters.find((c) => c.number === chapter && g12PracticeReady.has(c.number));
}

export function g12PracticeProducts(chapter: number): G12PracticeProduct[] {
  const c = g12PracticeChapter(chapter);
  if (!c) return [];
  const base = { chapter, chapterTitle: c.title };
  return [
    { ...base, id: `g12-ch${chapter}-mcq-20-01`, title: `${c.title} 20-Mark MCQ Test`, standard: 'CBSE MCQ', detail: '20 questions · 20 marks · Suggested 40 minutes', total: 20 },
    ...[1, 2, 3].map((k) => ({ ...base, id: `g12-ch${chapter}-board-0${k}`, title: `CBSE 40-Mark Paper ${k}`, standard: 'CBSE', detail: '24 questions · 40 marks · 90 minutes', total: 24 })),
    ...[1, 2].map((k) => ({ ...base, id: `g12-ch${chapter}-main-0${k}`, title: `JEE Main Paper ${k}`, standard: 'JEE Main', detail: '25 questions · 100 marks · Suggested 75 minutes', total: 25 })),
    ...[1, 2].map((k) => ({ ...base, id: `g12-ch${chapter}-advanced-0${k}`, title: `JEE Advanced Paper ${k}`, standard: 'JEE Advanced', detail: '16 questions · 60 marks · Suggested 90 minutes', total: 16 })),
  ];
}

export const g12AllPracticeProducts: G12PracticeProduct[] = g12PracticeChapters.flatMap((c) => g12PracticeProducts(c.number));

export function getG12PracticeProduct(id: string) {
  return g12AllPracticeProducts.find((p) => p.id === id);
}

export function g12PracticePricePaise(id: string) {
  return /-mcq-20-01$/.test(id) ? 2000 : 3000;
}
