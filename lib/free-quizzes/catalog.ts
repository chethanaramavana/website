export const freeQuizChapters = ['Real Numbers', 'Polynomials', 'Pair of Linear Equations in Two Variables', 'Quadratic Equations', 'Arithmetic Progressions', 'Triangles', 'Coordinate Geometry', 'Introduction to Trigonometry', 'Some Applications of Trigonometry', 'Circles', 'Areas Related to Circles', 'Surface Areas and Volumes', 'Statistics', 'Probability'];
export const quizPath = (chapter: number) => `/cbse/grade-10/ch-${chapter}/free-mcq`;
export const quizId = (chapter: number) => `cbse-10-ch-${chapter}-50`;

export function quizTitle(id:string) { const chapter = Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return freeQuizChapters[chapter-1] ?? (id === 'cbse-10-real-numbers-50' ? 'Real Numbers' : 'Free quiz'); }

export function quizChapter(id:string) { const n=Number(/^cbse-10-ch-(\d+)-50$/.exec(id)?.[1]); return Number.isInteger(n)&&n>=1&&n<=14 ? n : null; }
export function quizPrice(chapter:number) { return chapter === 1 ? 0 : 2000; }
