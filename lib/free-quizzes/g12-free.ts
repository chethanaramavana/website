import type { Question } from '@/app/cbse/grade-10/ch-1/free-mcq/questions';
import ch1 from '../g12-practice/ch1-free.json';
import ch2 from '../g12-practice/ch2-free.json';
import ch3 from '../g12-practice/ch3-free.json';
import ch4 from '../g12-practice/ch4-free.json';
import ch5 from '../g12-practice/ch5-free.json';
import ch6 from '../g12-practice/ch6-free.json';
import ch8 from '../g12-practice/ch8-free.json';
import ch9 from '../g12-practice/ch9-free.json';
import ch10 from '../g12-practice/ch10-free.json';
import ch11 from '../g12-practice/ch11-free.json';
import ch12 from '../g12-practice/ch12-free.json';
import ch13 from '../g12-practice/ch13-free.json';

/** Free 50-question MCQ sets for Grade 12 chapters, keyed by NCERT chapter number. */
export const g12FreeBanks: Record<number, Question[]> = {
  1: ch1 as Question[],
  2: ch2 as Question[],
  3: ch3 as Question[],
  4: ch4 as Question[],
  5: ch5 as Question[],
  6: ch6 as Question[],
  8: ch8 as Question[],
  9: ch9 as Question[],
  10: ch10 as Question[],
  11: ch11 as Question[],
  12: ch12 as Question[],
  13: ch13 as Question[],
};
