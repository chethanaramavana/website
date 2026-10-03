import { paperAssessments } from '../lib/assessment';
import { chapterNotesBySlug } from '../lib/chapter-notes';
import { paperDefinitionsById } from '../lib/papers';

const errors: string[] = [];
const papers = Object.values(paperDefinitionsById);

if (papers.length !== 57) errors.push(`Expected 57 papers, found ${papers.length}.`);

const paperIds = papers.map((paper) => paper.id);
if (new Set(paperIds).size !== paperIds.length) errors.push('Paper IDs are not unique.');

const icsePapers = papers.filter((paper) => paper.board === 'ICSE');
if (icsePapers.length !== 18) errors.push(`Expected 18 ICSE Grade 6 papers, found ${icsePapers.length}.`);
if (icsePapers.some((paper) => paper.grade !== 6)) errors.push('Every ICSE paper in this release must be Grade 6.');
if (new Set(icsePapers.map((paper) => paper.chapterNumber)).size !== 18) errors.push('ICSE Grade 6 chapter numbers must be unique.');
const expectedIcseChapters = [
  'Knowing Our Numbers', 'Whole Numbers', 'Playing with Numbers', 'Integers', 'Sets', 'Fractions',
  'Decimals', 'Ratio and Proportion', 'Percentage and Unitary Method', 'Speed, Time and Distance',
  'Algebraic Expressions', 'Simple Linear Equations', 'Basic Geometrical Ideas',
  'Angles, Triangles and Quadrilaterals', 'Three-Dimensional Shapes and Nets',
  'Symmetry and Practical Geometry', 'Perimeter, Area and Unit Conversions', 'Data Handling',
];
for (const [index, chapter] of expectedIcseChapters.entries()) {
  const paper = icsePapers.find((candidate) => candidate.chapterNumber === index + 1);
  if (paper?.chapter !== chapter) errors.push(`ICSE Chapter ${index + 1}: expected “${chapter}”, found “${paper?.chapter ?? 'missing'}”.`);
}

for (const paper of papers) {
  const assessment = paperAssessments[paper.id];
  if (!assessment) {
    errors.push(`${paper.id}: missing assessment.`);
    continue;
  }

  const objectiveNumbers = [...paper.mcqs.map(({ number }) => number), ...paper.assertions.map(({ number }) => number)];
  if (objectiveNumbers.join(',') !== Array.from({ length: 16 }, (_, index) => index + 1).join(',')) {
    errors.push(`${paper.id}: objective question numbering is incomplete or out of order.`);
  }

  for (const mcq of paper.mcqs) {
    const answer = assessment.mcqAnswerKey[mcq.number];
    if (!Number.isInteger(answer) || answer < 0 || answer >= mcq.options.length) {
      errors.push(`${paper.id} Q${mcq.number}: answer index ${String(answer)} is invalid.`);
    }
    if (new Set(mcq.options).size !== mcq.options.length) {
      errors.push(`${paper.id} Q${mcq.number}: duplicate answer options.`);
    }
  }

  for (const assertion of paper.assertions) {
    const answer = assessment.mcqAnswerKey[assertion.number];
    if (!Number.isInteger(answer) || answer < 0 || answer > 3) {
      errors.push(`${paper.id} Q${assertion.number}: assertion answer index ${String(answer)} is invalid.`);
    }
  }

  for (let number = 17; number <= 24; number += 1) {
    const question = paper.written[number];
    const solution = assessment.writtenSolutions[number];
    const questionText = Array.isArray(question) ? question.join(' ') : question;
    if (!questionText?.trim()) errors.push(`${paper.id} Q${number}: missing written question.`);
    if (!solution?.trim()) errors.push(`${paper.id} Q${number}: missing model solution.`);
  }

  for (const [question, visual] of Object.entries(paper.questionVisuals ?? {})) {
    const number = Number(question);
    if (!paper.mcqs.some((item) => item.number === number)) {
      errors.push(`${paper.id} Q${question}: visual ${visual} is not attached to an MCQ.`);
    }
  }

  if (paper.board === 'ICSE') {
    const paperText = JSON.stringify(paper);
    if (/\d\s*\*\s*\d/.test(paperText)) errors.push(`${paper.id}: use × instead of an asterisk in displayed mathematics.`);
    if (/<=|>=|!=|\^\d/.test(paperText)) errors.push(`${paper.id}: contains unformatted ASCII mathematical notation.`);
  }
}

const icseNotes = Object.values(chapterNotesBySlug).filter((notes) => notes.board === 'ICSE');
if (icseNotes.length !== 18) errors.push(`Expected 18 ICSE Grade 6 note sets, found ${icseNotes.length}.`);
for (const notes of icseNotes) {
  if (notes.grade !== 6) errors.push(`${notes.slug}: ICSE notes must be Grade 6.`);
  if (notes.concepts.length < 4 || notes.formulas.length < 3 || notes.method.length < 4 || notes.practice.length !== 6 || notes.tips.length < 3) {
    errors.push(`${notes.slug}: notes are missing required concepts, formulae, method steps, practice or tips.`);
  }
  const notesText = JSON.stringify(notes);
  if (/\d\s*\*\s*\d/.test(notesText) || /<=|>=|!=|\^\d/.test(notesText)) errors.push(`${notes.slug}: contains unformatted ASCII mathematical notation.`);
}
for (const paper of icsePapers) {
  const notesSlug = paper.id.replace(/-01$/, '');
  const notes = chapterNotesBySlug[notesSlug];
  if (!notes || notes.chapter !== paper.chapter || notes.number !== paper.chapterNumber) errors.push(`${paper.id}: matching notes are missing or misnumbered.`);
}

const byBoardAndGrade = papers.reduce<Record<string, number>>((counts, paper) => {
  const key = `${paper.board ?? 'CBSE'} Grade ${paper.grade ?? 10}`;
  counts[key] = (counts[key] ?? 0) + 1;
  return counts;
}, {});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${papers.length} papers: ${Object.entries(byBoardAndGrade).map(([group, count]) => `${count} ${group}`).join(', ')}.`);
  console.log(`Checked ${papers.length * 16} objective answers and ${papers.length * 8} written model solutions.`);
  console.log(`Checked ${icseNotes.length} ICSE Grade 6 note sets.`);
}
