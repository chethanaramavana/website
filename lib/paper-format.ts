export const RELATIONS_TEST_ID = 'g11-relations-free-30';
// 30-mark papers: Questions 1–6 are objective (1 mark each). Written answers reuse slots 17–24 and display as 7–14.
export const THIRTY_MARK_PAPER_IDS: ReadonlySet<string> = new Set([RELATIONS_TEST_ID, 'icse6-algebraic-expressions-02']);
// ICSE papers for grades other than 6 (ids icse5-…, icse7-… to icse12-…) all use the 30-mark format.
export const isThirtyMarkPaper = (id: string) => THIRTY_MARK_PAPER_IDS.has(id) || /^icse(?:5|7|8|9|10|11|12)-/.test(id) || /^g(?:7|8|9)-/.test(id);
export const writtenQuestionMarks: Record<number, number> = {17:2,18:2,19:2,20:3,21:3,22:3,23:5,24:4};
export const objectiveMaximum = (id: string) => isFullPaper(id) ? 20 : isThirtyMarkPaper(id) ? 6 : 16;
export const paperMaximum = (id: string) => objectiveMaximum(id) + writtenMaximum(id);
export const answeringMinutes = (id: string) => isFullPaper(id) ? 180 : isThirtyMarkPaper(id) ? 60 : 90;
export const displayQuestion = (id: string, number: number) => isThirtyMarkPaper(id) && number >= 17 ? number - 10 : number;

// Full CBSE Class 10 sample papers (80 marks, 3 hours): Questions 1–20 objective, 21–38 written.
export const isFullPaper = (id: string) => /^cbse10-sp-\d\d$/.test(id);
const fullPaperWrittenMarks: Record<number, number> = {
  21: 2, 22: 2, 23: 2, 24: 2, 25: 2, 26: 3, 27: 3, 28: 3, 29: 3, 30: 3, 31: 3,
  32: 5, 33: 5, 34: 5, 35: 5, 36: 4, 37: 4, 38: 4,
};
/** Marks for each written question of a paper. */
export const writtenMarksFor = (id: string): Record<number, number> => isFullPaper(id) ? fullPaperWrittenMarks : writtenQuestionMarks;
export const writtenNumbers = (id: string) => Object.keys(writtenMarksFor(id)).map(Number).sort((a, b) => a - b);
export const writtenMaximum = (id: string) => Object.values(writtenMarksFor(id)).reduce((sum, marks) => sum + marks, 0);
export type WrittenSection = { title: string; subtitle: string; numbers: number[]; marks: number; caseStudy?: boolean };
/** The written sections (B to E) of a paper, in order. */
export function writtenSections(id: string): WrittenSection[] {
  if (isFullPaper(id)) return [
    { title: 'Section B', subtitle: 'Questions 21–25 are Very Short Answer questions carrying 2 marks each.', numbers: [21, 22, 23, 24, 25], marks: 2 },
    { title: 'Section C', subtitle: 'Questions 26–31 are Short Answer questions carrying 3 marks each.', numbers: [26, 27, 28, 29, 30, 31], marks: 3 },
    { title: 'Section D', subtitle: 'Questions 32–35 are Long Answer questions carrying 5 marks each.', numbers: [32, 33, 34, 35], marks: 5 },
    { title: 'Section E', subtitle: 'Questions 36–38 are case-study questions carrying 4 marks each.', numbers: [36, 37, 38], marks: 4, caseStudy: true },
  ];
  const n = (number: number) => displayQuestion(id, number);
  return [
    { title: 'Section B', subtitle: `Questions ${n(17)}–${n(19)} are Very Short Answer questions carrying 2 marks each.`, numbers: [17, 18, 19], marks: 2 },
    { title: 'Section C', subtitle: `Questions ${n(20)}–${n(22)} are Short Answer questions carrying 3 marks each.`, numbers: [20, 21, 22], marks: 3 },
    { title: 'Section D', subtitle: `Question ${n(23)} is a Long Answer question carrying 5 marks.`, numbers: [23], marks: 5 },
    { title: 'Section E', subtitle: `Question ${n(24)} is a case-study question carrying 4 marks.`, numbers: [24], marks: 4, caseStudy: true },
  ];
}
