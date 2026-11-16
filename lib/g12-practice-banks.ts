import type { IntegralQuestion } from './integrals-score';
import ch1Papers from './g12-practice/ch1-papers.json';
import ch2Papers from './g12-practice/ch2-papers.json';

/** Paid paper banks for the Grade 12 practice sets, keyed by product id. Import only from server code that shows a paper. */
export const g12PracticeBanks: Record<string, IntegralQuestion[]> = {
  ...(ch1Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch2Papers as unknown as Record<string, IntegralQuestion[]>),
};
