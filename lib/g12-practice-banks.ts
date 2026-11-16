import type { IntegralQuestion } from './integrals-score';
import ch1Papers from './g12-practice/ch1-papers.json';
import ch2Papers from './g12-practice/ch2-papers.json';
import ch3Papers from './g12-practice/ch3-papers.json';
import ch4Papers from './g12-practice/ch4-papers.json';
import ch5Papers from './g12-practice/ch5-papers.json';
import ch6Papers from './g12-practice/ch6-papers.json';
import ch8Papers from './g12-practice/ch8-papers.json';
import ch9Papers from './g12-practice/ch9-papers.json';
import ch10Papers from './g12-practice/ch10-papers.json';
import ch11Papers from './g12-practice/ch11-papers.json';

/** Paid paper banks for the Grade 12 practice sets, keyed by product id. Import only from server code that shows a paper. */
export const g12PracticeBanks: Record<string, IntegralQuestion[]> = {
  ...(ch1Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch2Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch3Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch4Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch5Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch6Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch8Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch9Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch10Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch11Papers as unknown as Record<string, IntegralQuestion[]>),
};
