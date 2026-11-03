import partA from './icse6-part-a.json';
import partB from './icse6-part-b.json';
import partC from './icse6-part-c.json';
import extraPapers from './icse6-extra-papers.json';
import type { PaperDefinition } from './papers';

type IcsePaperSeed = PaperDefinition & {
  answerKey: number[];
  solutions: Record<number, string>;
};

const seeds = [...partA.papers, ...partB.papers, ...partC.papers, ...extraPapers.papers] as unknown as IcsePaperSeed[];

// Paper 01 keeps the original `ICSE:<chapter>` key. Later papers of the same chapter add their paper number.
const paperKey = (paper: IcsePaperSeed) => paper.paperNumber === '01' ? `ICSE:${paper.chapter}` : `ICSE:${paper.chapter}:${paper.paperNumber}`;

export const icse6PaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [paperKey(paper as IcsePaperSeed), paper]),
);

export const icse6PaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · ICSE Grade 6 · Paper ${paper.paperNumber}`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));
