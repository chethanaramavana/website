export type QuizBoard = 'CBSE' | 'ICSE';
export const freeQuizChapters = ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'];
/** ICSE Grade 7 (Selina Concise) chapters with 30-question MCQ sets. */
export const icse7QuizChapters = ['Integers', 'Rational Numbers', 'Fractions', 'Decimals', 'Exponents', 'Set Concepts', 'Ratio and Proportion', 'Unitary Method', 'Percent and Percentage', 'Profit, Loss and Discount', 'Simple Interest', 'Speed, Distance and Time', 'Fundamental Concepts', 'Simple Linear Equations', 'Inequalities', 'Lines and Angles', 'Triangles', 'Pythagoras Theorem', 'Symmetry', 'Recognition of Solids', 'Congruency: Congruent Triangles', 'Constructions', 'Mensuration', 'Data Handling', 'Probability'];
export const icse7FreeChapters: ReadonlySet<number> = new Set([1, 9, 14, 17, 23]);

export const quizPath = (chapter: number, grade = 10, board: QuizBoard = 'CBSE') => board === 'ICSE' ? `/icse/grade-${grade}/ch-${chapter}/mcq` : `/cbse/grade-${grade}/ch-${chapter}/free-mcq`;
export const quizId = (chapter: number, grade = 10, board: QuizBoard = 'CBSE') => board === 'ICSE' ? `icse-${grade}-ch-${chapter}-30` : `cbse-${grade}-ch-${chapter}-50`;
export const quizCount = (board: QuizBoard = 'CBSE') => board === 'ICSE' ? 30 : 50;

/** Board, grade and chapter of a quiz id, or null. */
export function quizInfo(id: string): { board: QuizBoard; grade: number; chapter: number } | null {
  const icse = /^icse-7-ch-(\d+)-30$/.exec(id);
  if (icse) { const chapter = Number(icse[1]); return chapter >= 1 && chapter <= icse7QuizChapters.length ? { board: 'ICSE', grade: 7, chapter } : null; }
  const cbse = /^cbse-(10|11|12)-ch-(\d+)-50$/.exec(id);
  if (!cbse) return null;
  const grade = Number(cbse[1]), chapter = Number(cbse[2]);
  if (grade === 10 && chapter >= 1 && chapter <= 14) return { board: 'CBSE', grade, chapter };
  if ((grade === 11 && chapter === 2) || (grade === 12 && chapter === 7)) return { board: 'CBSE', grade, chapter };
  return null;
}

export function quizTitle(id:string) {
  if(id===quizId(7,12)) return "Class 12 — Integrals"; if (id === quizId(2,11)) return "Class 11 — Relations and Functions";
  const info = quizInfo(id);
  if (info?.board === 'ICSE') return `ICSE Grade 7 — ${icse7QuizChapters[info.chapter-1]}`;
  const chapter = Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return freeQuizChapters[chapter-1] ?? (id === 'cbse-10-real-numbers-50' ? 'Real Numbers' : 'Free quiz');
}

/** CBSE Grade 10 chapter number of a quiz id (kept for older callers). */
export function quizChapter(id:string) { const n=Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return Number.isInteger(n)&&n>=1&&n<=14 ? n : null; }
export function quizPrice(chapter:number, grade=10, board: QuizBoard = 'CBSE') {
  if (board === 'ICSE') return icse7FreeChapters.has(chapter) ? 0 : 3000;
  if ((grade === 11 && chapter === 2)||(grade===12&&chapter===7)) return 0; return chapter <= 5 ? 0 : 2000;
}
/** Price in paise of a quiz id, or null when the id is not a quiz. */
export function quizPriceById(id: string) { const info = quizInfo(id); return info ? quizPrice(info.chapter, info.grade, info.board) : null; }

/** Navigation metadata without importing the complete question banks. */
export const quizListings = [
  ...freeQuizChapters.map((title,i) => ({board:'CBSE' as QuizBoard,grade:10,chapter:i+1,title,id:quizId(i+1),path:quizPath(i+1),count:50})),
  {board:'CBSE' as QuizBoard,grade:11,chapter:2,title:'Relations and Functions',id:quizId(2,11),path:quizPath(2,11),count:50},
  {board:'CBSE' as QuizBoard,grade:12,chapter:7,title:'Integrals',id:quizId(7,12),path:quizPath(7,12),count:50},
  ...icse7QuizChapters.map((title,i) => ({board:'ICSE' as QuizBoard,grade:7,chapter:i+1,title,id:quizId(i+1,7,'ICSE'),path:quizPath(i+1,7,'ICSE'),count:30})),
];
