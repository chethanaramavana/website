// Corrections to built-in papers, kept as data so that the original sources stay untouched.
// CBSE Grade 10: removes topics deleted from the current CBSE syllabus and fixes one answer key.
import fixes from './cbse10-paper-fixes.json';
import type { PaperDefinition } from './papers';

type Mcq = { question: string; options: string[]; answer: number };
type Ar = { assertion: string; reason: string; answer: number };
type Written = { text: string; solution: string };
type PaperFix = {
  focus?: string;
  answers?: Record<string, number>;
  mcqs?: Record<string, Mcq>;
  assertions?: Record<string, Ar>;
  written?: Record<string, Written>;
  /** New option order per MCQ: newOptions[i] = oldOptions[order[i]]. */
  orders?: Record<string, number[]>;
  dropVisuals?: string[];
};
type AssessmentSource = { title: string; mcqAnswerKey: Record<number, number>; writtenSolutions: Record<number, string> };

const paperFixes = fixes as Record<string, PaperFix>;

export function fixPaperDefinition(paper: PaperDefinition): PaperDefinition {
  const fix = paperFixes[paper.id];
  if (!fix) return paper;
  return {
    ...paper,
    focus: fix.focus ?? paper.focus,
    mcqs: paper.mcqs.map((item) => {
      const replacement = fix.mcqs?.[item.number];
      const base = replacement ? { number: item.number, question: replacement.question, options: replacement.options } : item;
      const order = fix.orders?.[item.number];
      return order ? { ...base, options: order.map((index) => base.options[index]) } : base;
    }),
    questionVisuals: paper.questionVisuals && fix.dropVisuals
      ? Object.fromEntries(Object.entries(paper.questionVisuals).filter(([number]) => !fix.dropVisuals!.includes(number)))
      : paper.questionVisuals,
    assertions: paper.assertions.map((item) => {
      const replacement = fix.assertions?.[item.number];
      return replacement ? { number: item.number, assertion: replacement.assertion, reason: replacement.reason } : item;
    }),
    written: Object.fromEntries(Object.entries(paper.written).map(([number, text]) => [number, fix.written?.[number]?.text ?? text])),
  };
}

export function fixAssessment<T extends AssessmentSource>(paperId: string, assessment: T): T {
  const fix = paperFixes[paperId];
  if (!fix) return assessment;
  const mcqAnswerKey = { ...assessment.mcqAnswerKey };
  for (const [number, answer] of Object.entries(fix.answers ?? {})) mcqAnswerKey[Number(number)] = answer;
  for (const [number, item] of Object.entries(fix.mcqs ?? {})) mcqAnswerKey[Number(number)] = item.answer;
  for (const [number, item] of Object.entries(fix.assertions ?? {})) mcqAnswerKey[Number(number)] = item.answer;
  for (const [number, order] of Object.entries(fix.orders ?? {})) mcqAnswerKey[Number(number)] = order.indexOf(mcqAnswerKey[Number(number)]);
  const writtenSolutions = { ...assessment.writtenSolutions };
  for (const [number, item] of Object.entries(fix.written ?? {})) writtenSolutions[Number(number)] = item.solution;
  return { ...assessment, mcqAnswerKey, writtenSolutions };
}
