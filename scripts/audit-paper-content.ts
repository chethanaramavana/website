import { paperAssessments } from '../lib/assessment';
import { paperDefinitionsById } from '../lib/papers';

const errors: string[] = [];
const papers = Object.values(paperDefinitionsById);

if (papers.length !== 24) errors.push(`Expected 24 papers, found ${papers.length}.`);

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
}

const byGrade = papers.reduce<Record<string, number>>((counts, paper) => {
  const grade = String(paper.grade ?? 10);
  counts[grade] = (counts[grade] ?? 0) + 1;
  return counts;
}, {});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Validated ${papers.length} papers (${byGrade['6']} Grade 6, ${byGrade['10']} Grade 10).`);
  console.log(`Checked ${papers.length * 16} objective answers and ${papers.length * 8} written model solutions.`);
}
