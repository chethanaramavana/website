// ICSE / ISC papers and notes for grades other than Grade 6 (Selina Concise Mathematics).
// Each grade has one 30-mark paper per chapter: Questions 1–6 objective, written slots 17–24 shown as 7–14.
import g10a from './icse10-part-a.json';
import g10b from './icse10-part-b.json';
import g10c from './icse10-part-c.json';
import g10d from './icse10-part-d.json';
import g10e from './icse10-part-e.json';
import g7a from './cbse7-part-a.json';
import g7b from './cbse7-part-b.json';
import g7c from './cbse7-part-c.json';
import g7p2 from './cbse7-papers-02.json';
import g10na from './icse10-notes-detail-a.json';
import g10nb from './icse10-notes-detail-b.json';
import g10nc from './icse10-notes-detail-c.json';
import g10nd from './icse10-notes-detail-d.json';
import g10ne from './icse10-notes-detail-e.json';
import type { ChapterNotes } from './chapter-notes';
import type { PaperDefinition } from './papers';

type PaperSeed = PaperDefinition & { answerKey: number[]; solutions: Record<number, string> };
type Part = { papers: unknown[]; notes: unknown[] };

// ICSE Grade 10 (Selina) and CBSE Grade 7 (Ganita Prakash). Papers and notes carry their own board and grade.
const parts: Part[] = [g10a, g10b, g10c, g10d, g10e, g7a, g7b, g7c, g7p2];

const seeds = parts.flatMap((part) => part.papers as PaperSeed[]);

export const icseUpperPaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [`${paper.board ?? 'ICSE'}${paper.grade}:${paper.chapter}${paper.paperNumber === '01' ? '' : `:${paper.paperNumber}`}`, paper]),
);

export const icseUpperPaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · ${paper.board ?? 'ICSE'} Grade ${paper.grade} · Paper ${paper.paperNumber}`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));

// Detailed study notes (lessons, solved exam questions, mistakes, checklist, longer practice), keyed by notes slug.
const noteDetails = { ...g10na, ...g10nb, ...g10nc, ...g10nd, ...g10ne } as Record<string, Partial<ChapterNotes>>;

export const icseUpperNotes = parts.flatMap((part) => (part.notes as ChapterNotes[]).map((notes) => ({ ...notes, ...(noteDetails[notes.slug] ?? {}) })));

/** Chapter names in book order, by board and grade. */
function chaptersByGrade(board: 'CBSE' | 'ICSE') {
  const byGrade: Record<number, string[]> = {};
  for (const paper of seeds.filter((seed) => (seed.board ?? 'ICSE') === board && seed.paperNumber === '01').sort((a, b) => (a.chapterNumber ?? 0) - (b.chapterNumber ?? 0))) {
    (byGrade[paper.grade ?? 10] ??= []).push(paper.chapter);
  }
  return byGrade;
}
export const icseUpperChapters = chaptersByGrade('ICSE');
export const cbseExtraChapters = chaptersByGrade('CBSE');

/** Second and later papers of a chapter (Paper 02, …). */
export const icseUpperAdditionalPaperIds: string[] = seeds.filter((paper) => paper.paperNumber !== '01').map((paper) => paper.id);

/** Paper ids that use the 30-mark format. */
export const icseUpperPaperIds: ReadonlySet<string> = new Set(seeds.map((paper) => paper.id));
