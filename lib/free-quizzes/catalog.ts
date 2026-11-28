import { g12PracticeChapter, g12PracticeChapters, g12PracticeReady } from '../g12-practice-catalog';
export type QuizBoard = 'CBSE' | 'ICSE';
export const freeQuizChapters = ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'];
/** ICSE Grade 7 (Selina Concise) chapters with 30-question MCQ sets. */
export const icse7QuizChapters = ['Integers', 'Rational Numbers', 'Fractions', 'Decimals', 'Exponents', 'Set Concepts', 'Ratio and Proportion', 'Unitary Method', 'Percent and Percentage', 'Profit, Loss and Discount', 'Simple Interest', 'Speed, Distance and Time', 'Fundamental Concepts', 'Simple Linear Equations', 'Inequalities', 'Lines and Angles', 'Triangles', 'Pythagoras Theorem', 'Symmetry', 'Recognition of Solids', 'Congruency: Congruent Triangles', 'Constructions', 'Mensuration', 'Data Handling', 'Probability'];
/** CBSE Grade 6 (NCERT Ganita Prakash) chapters with 30-question MCQ sets, ₹30 each. */
export const cbse6QuizChapters = ['Patterns in Mathematics', 'Lines and Angles', 'Number Play', 'Data Handling and Presentation', 'Prime Time', 'Perimeter and Area', 'Fractions', 'Playing with Constructions', 'Symmetry', 'The Other Side of Zero'];
/** CBSE Grade 7 (NCERT Ganita Prakash) chapters with 30-question MCQ sets, ₹30 each. */
/** CBSE Grade 8 (NCERT Ganita Prakash) chapters that have a 30-question MCQ set, ₹30 each. */
export const cbse8QuizChapters: Record<number, string> = {5: 'Number Play'};
export const cbse7QuizChapters = ['Large Numbers Around Us', 'Arithmetic Expressions', 'A Peek Beyond the Point', 'Expressions using Letter-Numbers', 'Parallel and Intersecting Lines', 'Number Play', 'A Tale of Three Intersecting Lines', 'Working with Fractions', 'Geometric Twins', 'Operations with Integers', 'Finding Common Ground', 'Another Peek Beyond the Point', 'Connecting the Dots…', 'Constructions and Tilings', 'Finding the Unknown'];
/** ICSE Grade 6 (CISCE) chapters with 30-question MCQ sets, ₹30 each. */
export const icse6QuizChapters = ['Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Integers', 'Sets', 'Fractions', 'Decimals', 'Ratio and Proportion', 'Percentage and Unitary Method', 'Speed, Time and Distance', 'Algebraic Expressions', 'Simple Linear Equations', 'Basic Geometrical Ideas', 'Angles, Triangles and Quadrilaterals', 'Three-Dimensional Shapes and Nets', 'Symmetry and Practical Geometry', 'Perimeter, Area and Unit Conversions', 'Data Handling'];
export const icse7FreeChapters: ReadonlySet<number> = new Set([1, 9, 14, 17, 23]);

export const quizPath = (chapter: number, grade = 10, board: QuizBoard = 'CBSE') => board === 'ICSE' ? `/icse/grade-${grade}/ch-${chapter}/mcq` : `/cbse/grade-${grade}/ch-${chapter}/free-mcq`;
export const quizId = (chapter: number, grade = 10, board: QuizBoard = 'CBSE') => board === 'ICSE' ? `icse-${grade}-ch-${chapter}-30` : `cbse-${grade}-ch-${chapter}-50`;
export const quizCount = (_board: QuizBoard = 'CBSE') => 30;

/** Board, grade and chapter of a quiz id, or null. */
export function quizInfo(id: string): { board: QuizBoard; grade: number; chapter: number } | null {
  const icse = /^icse-(6|7)-ch-(\d+)-30$/.exec(id);
  if (icse) { const grade = Number(icse[1]), chapter = Number(icse[2]); const count = grade === 6 ? icse6QuizChapters.length : icse7QuizChapters.length; return chapter >= 1 && chapter <= count ? { board: 'ICSE', grade, chapter } : null; }
  const g6 = /^cbse-(6|7)-ch-(\d+)-50$/.exec(id);
  const g8 = /^cbse-8-ch-(\d+)-50$/.exec(id);
  if (g8) { const chapter = Number(g8[1]); return cbse8QuizChapters[chapter] ? { board: 'CBSE', grade: 8, chapter } : null; }
  if (g6) { const grade = Number(g6[1]), chapter = Number(g6[2]); const count = grade === 6 ? cbse6QuizChapters.length : cbse7QuizChapters.length; return chapter >= 1 && chapter <= count ? { board: 'CBSE', grade, chapter } : null; }
  const cbse = /^cbse-(10|11|12)-ch-(\d+)-50$/.exec(id);
  if (!cbse) return null;
  const grade = Number(cbse[1]), chapter = Number(cbse[2]);
  if (grade === 10 && chapter >= 1 && chapter <= 14) return { board: 'CBSE', grade, chapter };
  if ((grade === 11 && chapter === 2) || (grade === 12 && chapter === 7) || (grade === 12 && g12PracticeChapter(chapter))) return { board: 'CBSE', grade, chapter };
  return null;
}

export function quizTitle(id:string) {
  if(id===quizId(7,12)) return "Class 12 — Integrals"; const g12 = /^cbse-12-ch-(\d+)-50$/.exec(id); if (g12 && g12PracticeChapter(Number(g12[1]))) return `Class 12 — ${g12PracticeChapter(Number(g12[1]))!.title}`; if (id === quizId(2,11)) return "Class 11 — Relations and Functions";
  const info = quizInfo(id);
  if (info?.board === 'ICSE') return `ICSE Grade ${info.grade} — ${(info.grade === 6 ? icse6QuizChapters : icse7QuizChapters)[info.chapter-1]}`;
  if (info?.grade === 6) return `Class 6 — ${cbse6QuizChapters[info.chapter-1]}`;
  if (info?.grade === 7) return `Class 7 — ${cbse7QuizChapters[info.chapter-1]}`;
  if (info?.grade === 8) return `Class 8 — ${cbse8QuizChapters[info.chapter]}`;
  const chapter = Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return freeQuizChapters[chapter-1] ?? (id === 'cbse-10-real-numbers-50' ? 'Real Numbers' : 'Free quiz');
}

/** CBSE Grade 10 chapter number of a quiz id (kept for older callers). */
export function quizChapter(id:string) { const n=Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return Number.isInteger(n)&&n>=1&&n<=14 ? n : null; }
export function quizPrice(chapter:number, grade=10, board: QuizBoard = 'CBSE') {
  if (board === 'ICSE') return grade === 6 ? 3000 : icse7FreeChapters.has(chapter) ? 0 : 3000;
  if (grade === 6 || grade === 7 || grade === 8) return 3000;
  if (grade === 10) return chapter % 2 === 1 ? 0 : 2000;
  if ((grade === 11 && chapter === 2)||(grade===12&&chapter===7)) return 0;
  if (grade === 12 && g12PracticeChapter(chapter)) return 3000; return chapter <= 5 ? 0 : 2000;
}
/** Price in paise of a quiz id, or null when the id is not a quiz. */
export function quizPriceById(id: string) { const info = quizInfo(id); return info ? quizPrice(info.chapter, info.grade, info.board) : null; }

/** Navigation metadata without importing the complete question banks. */
export const quizListings = [
  ...freeQuizChapters.map((title,i) => ({board:'CBSE' as QuizBoard,grade:10,chapter:i+1,title,id:quizId(i+1),path:quizPath(i+1),count:30})),
  {board:'CBSE' as QuizBoard,grade:11,chapter:2,title:'Relations and Functions',id:quizId(2,11),path:quizPath(2,11),count:30},
  {board:'CBSE' as QuizBoard,grade:12,chapter:7,title:'Integrals',id:quizId(7,12),path:quizPath(7,12),count:30},
  ...g12PracticeChapters.filter((c) => g12PracticeReady.has(c.number)).map((c) => ({board:'CBSE' as QuizBoard,grade:12,chapter:c.number,title:c.title as string,id:quizId(c.number,12),path:quizPath(c.number,12),count:30})),
  ...cbse6QuizChapters.map((title,i) => ({board:'CBSE' as QuizBoard,grade:6,chapter:i+1,title,id:quizId(i+1,6),path:quizPath(i+1,6),count:30})),
  ...Object.entries(cbse8QuizChapters).map(([n,title]) => ({board:'CBSE' as QuizBoard,grade:8,chapter:Number(n),title,id:quizId(Number(n),8),path:quizPath(Number(n),8),count:30})),
  ...cbse7QuizChapters.map((title,i) => ({board:'CBSE' as QuizBoard,grade:7,chapter:i+1,title,id:quizId(i+1,7),path:quizPath(i+1,7),count:30})),
  ...icse6QuizChapters.map((title,i) => ({board:'ICSE' as QuizBoard,grade:6,chapter:i+1,title,id:quizId(i+1,6,'ICSE'),path:quizPath(i+1,6,'ICSE'),count:30})),
  ...icse7QuizChapters.map((title,i) => ({board:'ICSE' as QuizBoard,grade:7,chapter:i+1,title,id:quizId(i+1,7,'ICSE'),path:quizPath(i+1,7,'ICSE'),count:30})),
];
