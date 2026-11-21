import integrals from './integrals.json';
import { relationsFunctions } from './relations-functions';
import { questions } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
import { polynomials, linearPairs, quadratics, progressions } from './algebra';
import { triangles, coordinates, circles } from './geometry';
import { trigonometry, applications } from './trigonometry';
import { circleAreas, solids } from './mensuration';
import { statistics, probability } from './data-chance';
import icse7 from './icse7.json';
import { g12FreeBanks } from './g12-free';
import { g12PracticeChapters } from '../g12-practice-catalog';
import { freeQuizChapters, quizId, quizPath, type QuizBoard } from './catalog';
import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';

const banks = [questions, polynomials(), linearPairs(), quadratics(), progressions(), triangles(), coordinates(), trigonometry(), applications(), circles(), circleAreas(), solids(), statistics(), probability()];
type FreeQuiz = { board: QuizBoard; grade: number; chapter: number; title: string; id: string; path: string; questions: Question[] };
const fullQuizzes: FreeQuiz[] = banks.map((questions, i) => ({ board: 'CBSE' as QuizBoard, grade: 10, chapter: i + 1, title: freeQuizChapters[i], id: quizId(i + 1), path: quizPath(i + 1), questions })).concat([{board:'CBSE' as QuizBoard,grade:11,chapter:2,title:"Relations and Functions",id:quizId(2,11),path:quizPath(2,11),questions:relationsFunctions},{board:'CBSE' as QuizBoard,grade:12,chapter:7,title:"Integrals",id:quizId(7,12),path:quizPath(7,12),questions:integrals}]).concat(g12PracticeChapters.filter((c) => g12FreeBanks[c.number]).map((c) => ({board:'CBSE' as QuizBoard,grade:12,chapter:c.number,title:c.title as string,id:quizId(c.number,12),path:quizPath(c.number,12),questions:g12FreeBanks[c.number]}))).concat((icse7 as {chapter:number;title:string;questions:Question[]}[]).map((q) => ({board:'ICSE' as QuizBoard,grade:7,chapter:q.chapter,title:q.title,id:quizId(q.chapter,7,'ICSE'),path:quizPath(q.chapter,7,'ICSE'),questions:q.questions})));

/** Number of questions in each chapter quiz. The full banks stay in the source files. */
export const QUIZ_LENGTH = 30;
/** Number of assertion–reason questions kept in a trimmed quiz. */
export const QUIZ_ASSERTIONS = 4;
const isAssertion = (q: Question) => /^Assertion/.test(q.prompt);
function spread<T>(items: T[], k: number): T[] {
  if (k >= items.length) return items;
  if (k <= 0) return [];
  if (k === 1) return [items[0]];
  return Array.from({ length: k }, (_, j) => items[Math.round(j * (items.length - 1) / (k - 1))]);
}
/** Keeps every topic, QUIZ_ASSERTIONS assertion–reason questions, and shares the rest across topics in proportion to their size. */
export function trimQuiz(questions: Question[], n = QUIZ_LENGTH, assertions = QUIZ_ASSERTIONS): Question[] {
  if (questions.length <= n) return questions;
  const all = questions.map((_, i) => i);
  const ar = all.filter((i) => isAssertion(questions[i]));
  const keep = spread(ar, Math.min(ar.length, assertions));
  const rest = n - keep.length;
  const groups = new Map<string, number[]>();
  for (const i of all) if (!isAssertion(questions[i])) { const t = questions[i].topic ?? ''; groups.set(t, [...(groups.get(t) ?? []), i]); }
  const list = [...groups.values()];
  // More topics than places: take one question from topics spread evenly through the chapter.
  if (list.length >= rest) { spread(list, rest).forEach((g) => keep.push(g[0])); return keep.sort((a, b) => a - b).map((i) => questions[i]); }
  const total = list.reduce((s, g) => s + g.length, 0);
  const share = list.map((g) => rest * g.length / total);
  const quota = list.map((g, k) => Math.min(g.length, Math.max(1, Math.floor(share[k]))));
  let sum = quota.reduce((s, q) => s + q, 0);
  while (sum < rest) { let best = -1; for (let k = 0; k < list.length; k++) if (quota[k] < list[k].length && (best < 0 || share[k] - quota[k] > share[best] - quota[best])) best = k; if (best < 0) break; quota[best]++; sum++; }
  while (sum > rest) { let best = -1; for (let k = 0; k < list.length; k++) if (quota[k] > 1 && (best < 0 || quota[k] - share[k] > quota[best] - share[best])) best = k; if (best < 0) break; quota[best]--; sum--; }
  list.forEach((g, k) => keep.push(...spread(g, quota[k])));
  return keep.sort((a, b) => a - b).map((i) => questions[i]);
}
export const freeQuizzes: FreeQuiz[] = fullQuizzes.map((quiz) => ({ ...quiz, questions: trimQuiz(quiz.questions) }));
