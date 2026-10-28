import questions from './relations-paper-questions.json';
import { RELATIONS_TEST_ID } from './paper-format';
import type { PaperDefinition } from './papers';

// Only question content belongs in shared/client code. Solutions stay on the server.
export const relationsTestDefinition: PaperDefinition = {
  id: RELATIONS_TEST_ID, chapter: 'Relations and Functions', chapterNumber: 2,
  paperNumber: 'Free 30', board: 'CBSE', grade: 11, book: 'CBSE Mathematics',
  focus: 'Free 60-minute chapter test. Submit your answers before reviewing solutions.',
  mcqs: questions.filter(q => q.number <= 4).map(q => ({number:q.number, question:q.question, options:q.options!})),
  assertions: questions.filter(q => q.number === 5 || q.number === 6).map(q => {
    const [assertion, reason] = q.question.split('\nReason: ');
    return {number:q.number, assertion:assertion.replace('Assertion: ', ''), reason};
  }),
  // Reuse existing written-marking slots (17–24); display labels remain 7–14.
  written: Object.fromEntries(questions.filter(q => q.number >= 7).map(q => [q.number + 10, q.question])),
  caseStudy: '',
};
