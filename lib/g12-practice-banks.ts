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
import ch12Papers from './g12-practice/ch12-papers.json';
import ch13Papers from './g12-practice/ch13-papers.json';
import g11ch1Papers from './g11-practice/ch1-papers.json';
import g11ch2Papers from './g11-practice/ch2-papers.json';
import g11ch3Papers from './g11-practice/ch3-papers.json';
import g11ch4Papers from './g11-practice/ch4-papers.json';
import g11ch5Papers from './g11-practice/ch5-papers.json';
import g11ch6Papers from './g11-practice/ch6-papers.json';
import g11ch7Papers from './g11-practice/ch7-papers.json';
import g11ch8Papers from './g11-practice/ch8-papers.json';
import g11ch9Papers from './g11-practice/ch9-papers.json';
import g11ch10Papers from './g11-practice/ch10-papers.json';
import g11ch11Papers from './g11-practice/ch11-papers.json';
import g11ch12Papers from './g11-practice/ch12-papers.json';
import g11ch13Papers from './g11-practice/ch13-papers.json';
import g11ch14Papers from './g11-practice/ch14-papers.json';

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
  ...(ch12Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(ch13Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch1Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch2Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch3Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch4Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch5Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch6Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch7Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch8Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch9Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch10Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch11Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch12Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch13Papers as unknown as Record<string, IntegralQuestion[]>),
  ...(g11ch14Papers as unknown as Record<string, IntegralQuestion[]>),
};
