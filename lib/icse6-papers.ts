import partA from './icse6-part-a.json';
import partB from './icse6-part-b.json';
import partC from './icse6-part-c.json';
import type { PaperDefinition } from './papers';

type IcsePaperSeed = PaperDefinition & {
  answerKey: number[];
  solutions: Record<number, string>;
};

const seeds = [...partA.papers, ...partB.papers, ...partC.papers] as unknown as IcsePaperSeed[];

export const icse6PaperDefinitions: Record<string, PaperDefinition> = Object.fromEntries(
  seeds.map(({ answerKey: _answerKey, solutions: _solutions, ...paper }) => [`ICSE:${paper.chapter}`, paper]),
);

export const icse6PaperAssessments = Object.fromEntries(seeds.map((paper) => [paper.id, {
  title: `${paper.chapter} · ICSE Grade 6 · Paper 01`,
  mcqAnswerKey: Object.fromEntries(paper.answerKey.map((answer, index) => [index + 1, answer])),
  writtenSolutions: paper.solutions,
}]));
