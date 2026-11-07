import integrals from './integrals.json';
import { relationsFunctions } from './relations-functions';
import { questions } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
import { polynomials, linearPairs, quadratics, progressions } from './algebra';
import { triangles, coordinates, circles } from './geometry';
import { trigonometry, applications } from './trigonometry';
import { circleAreas, solids } from './mensuration';
import { statistics, probability } from './data-chance';
import icse7 from './icse7.json';
import { freeQuizChapters, quizId, quizPath, type QuizBoard } from './catalog';
import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';

const banks = [questions, polynomials(), linearPairs(), quadratics(), progressions(), triangles(), coordinates(), trigonometry(), applications(), circles(), circleAreas(), solids(), statistics(), probability()];
type FreeQuiz = { board: QuizBoard; grade: number; chapter: number; title: string; id: string; path: string; questions: Question[] };
export const freeQuizzes: FreeQuiz[] = banks.map((questions, i) => ({ board: 'CBSE' as QuizBoard, grade: 10, chapter: i + 1, title: freeQuizChapters[i], id: quizId(i + 1), path: quizPath(i + 1), questions })).concat([{board:'CBSE' as QuizBoard,grade:11,chapter:2,title:"Relations and Functions",id:quizId(2,11),path:quizPath(2,11),questions:relationsFunctions},{board:'CBSE' as QuizBoard,grade:12,chapter:7,title:"Integrals",id:quizId(7,12),path:quizPath(7,12),questions:integrals}]).concat((icse7 as {chapter:number;title:string;questions:Question[]}[]).map((q) => ({board:'ICSE' as QuizBoard,grade:7,chapter:q.chapter,title:q.title,id:quizId(q.chapter,7,'ICSE'),path:quizPath(q.chapter,7,'ICSE'),questions:q.questions})));
