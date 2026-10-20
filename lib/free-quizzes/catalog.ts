export const freeQuizChapters = ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'];
export const quizPath = (chapter: number, grade = 10) => `/cbse/grade-${grade}/ch-${chapter}/free-mcq`;
export const quizId = (chapter: number, grade = 10) => `cbse-${grade}-ch-${chapter}-50`;

export function quizTitle(id:string) { if(id===quizId(7,12)) return "Class 12 — Integrals"; if (id === quizId(2,11)) return "Class 11 — Relations and Functions"; const chapter = Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return freeQuizChapters[chapter-1] ?? (id === 'cbse-10-real-numbers-50' ? 'Real Numbers' : 'Free quiz'); }

export function quizChapter(id:string) { const n=Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return Number.isInteger(n)&&n>=1&&n<=14 ? n : null; }
export function quizPrice(chapter:number, grade=10) { if ((grade === 11 && chapter === 2)||(grade===12&&chapter===7)) return 0; return chapter <= 5 ? 0 : 2000; }

/** Navigation metadata without importing the complete question banks. */
export const quizListings = [
  ...freeQuizChapters.map((title,i) => ({grade:10,chapter:i+1,title,id:quizId(i+1),path:quizPath(i+1)})),
  {grade:11,chapter:2,title:'Relations and Functions',id:quizId(2,11),path:quizPath(2,11)},
  {grade:12,chapter:7,title:'Integrals',id:quizId(7,12),path:quizPath(7,12)},
];
