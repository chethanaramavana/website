// ICSE / ISC papers and notes for grades other than Grade 6 (Selina Concise Mathematics).
// Each grade has one 30-mark paper per chapter: Questions 1–6 objective, written slots 17–24 shown as 7–14.
import g10a from './icse10-part-a.json';
import g10b from './icse10-part-b.json';
import g10c from './icse10-part-c.json';
import g10d from './icse10-part-d.json';
import g10e from './icse10-part-e.json';
import g10na from './icse10-notes-detail-a.json';
import g10nb from './icse10-notes-detail-b.json';
import g10nc from './icse10-notes-detail-c.json';
import g10nd from './icse10-notes-detail-d.json';
import g10ne from './icse10-notes-detail-e.json';
import type { ChapterNotes } from './chapter-notes';
import type { PaperDefinition } from './papers';

type PaperSeed = PaperDefinition & { answerKey: number[]; solutions: Record<number, string> };
type Part = { papers: unknown[]; notes: unknown[] };

const parts: Part[] = [g10a, g10b, g10c, g10d, g10e];

const seeds = parts.flatMap((part) => part.papers as PaperSeed[]);

export const icseUpperPaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [`ICSE${paper.grade}:${paper.chapter}`, paper]),
);

export const icseUpperPaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · ICSE Grade ${paper.grade} · Paper ${paper.paperNumber}`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));

// Detailed study notes (lessons, solved exam questions, mistakes, checklist, longer practice), keyed by notes slug.
const noteDetails = { ...g10na, ...g10nb, ...g10nc, ...g10nd, ...g10ne } as Record<string, Partial<ChapterNotes>>;

export const icseUpperNotes = parts.flatMap((part) => (part.notes as ChapterNotes[]).map((notes) => ({ ...notes, ...(noteDetails[notes.slug] ?? {}) })));

/** Chapter names in book order, by grade. */
export const icseUpperChapters: Record<number, string[]> = seeds.reduce<Record<number, string[]>>((byGrade, paper) => {
  const grade = paper.grade ?? 10;
  (byGrade[grade] ??= []).push(paper.chapter);
  return byGrade;
}, {});
for (const grade of Object.keys(icseUpperChapters)) {
  const order = new Map(seeds.filter((paper) => paper.grade === Number(grade)).map((paper) => [paper.chapter, paper.chapterNumber]));
  icseUpperChapters[Number(grade)].sort((a, b) => (order.get(a) ?? 0) - (order.get(b) ?? 0));
}

/** Paper ids that use the 30-mark format. */
export const icseUpperPaperIds: ReadonlySet<string> = new Set(seeds.map((paper) => paper.id));
