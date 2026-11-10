export const RELATIONS_TEST_ID = 'g11-relations-free-30';
// 30-mark papers: Questions 1–6 are objective (1 mark each). Written answers reuse slots 17–24 and display as 7–14.
export const THIRTY_MARK_PAPER_IDS: ReadonlySet<string> = new Set([RELATIONS_TEST_ID, 'icse6-algebraic-expressions-02']);
// ICSE papers for grades other than 6 (ids icse5-…, icse7-… to icse12-…) all use the 30-mark format.
export const isThirtyMarkPaper = (id: string) => THIRTY_MARK_PAPER_IDS.has(id) || /^icse(?:5|7|8|9|10|11|12)-/.test(id) || /^g(?:7|8|9)-/.test(id);
export const writtenQuestionMarks: Record<number, number> = {17:2,18:2,19:2,20:3,21:3,22:3,23:5,24:4};
export const objectiveMaximum = (id: string) => isThirtyMarkPaper(id) ? 6 : 16;
export const paperMaximum = (id: string) => objectiveMaximum(id) + 24;
export const answeringMinutes = (id: string) => isThirtyMarkPaper(id) ? 60 : 90;
export const displayQuestion = (id: string, number: number) => isThirtyMarkPaper(id) && number >= 17 ? number - 10 : number;
