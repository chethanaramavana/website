import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
import ch1 from '../g12-practice/ch1-free.json';
import ch2 from '../g12-practice/ch2-free.json';

/** Free 50-question MCQ sets for Grade 12 chapters, keyed by NCERT chapter number. */
export const g12FreeBanks: Record<number, Question[]> = {
  1: ch1 as Question[],
  2: ch2 as Question[],
};
