import { paperDefinitionsById } from './papers';
import { getIntegralsProduct, integralsPath } from './integrals-products';
import { quizListings } from './free-quizzes/catalog';
import type { StudentRecordsPayload } from './student-records';

export type ReportRow = {
  id: string;
  chapter: string;
  paper: string;
  context: string;
  grade?: number;
  book?: string;
  score?: number;
  maximum?: number;
  remark: string;
  pending: boolean;
  href: string;
  action: string;
};
export function reportRows(
  records: Pick<
    StudentRecordsPayload,
    'submissions' | 'mcqResults' | 'mcqDrafts' | 'access'
  >,
): ReportRow[] {
  const rows: ReportRow[] = [];
  for (const submission of records.submissions) {
    const paper = paperDefinitionsById[submission.paper_id];
    const marked =
      submission.status === 'marked' && submission.total_score !== null;
    rows.push({
      id: submission.id,
      chapter: paper?.chapter ?? 'Chapter test',
      paper: `Written paper ${paper?.paperNumber ?? ''}`,
      context: paper
        ? `${paper.board ?? 'CBSE'} · Class ${paper.grade ?? 10}`
        : 'Saved paper',
      grade: paper ? (paper.grade ?? 10) : undefined,
      book: paper
        ? (paper.book ?? `${paper.board ?? 'CBSE'} Mathematics`)
        : undefined,
      score: marked ? submission.total_score! : submission.mcq_score,
      maximum: marked ? 40 : 16,
      remark:
        submission.teacher_feedback ||
        (marked
          ? 'Marked. Open the paper for question-wise feedback.'
          : 'MCQs scored. Written answers awaiting marking.'),
      pending: !marked,
      href: `/student/results/${submission.id}`,
      action: 'Review paper',
    });
  }
  for (const quiz of records.mcqResults) {
    const definition = quizListings.find((q) => q.id === quiz.quizId);
    rows.push({
      id: quiz.id,
      chapter: quiz.title,
      paper: 'MCQ practice',
      context: definition
        ? `CBSE · Class ${definition.grade}`
        : 'Saved MCQ result',
      grade: definition?.grade,
      score: quiz.score,
      maximum: quiz.total,
      remark: 'Automatically scored. Worked solutions are available.',
      pending: false,
      href: `/student/mcq/${quiz.id}`,
      action: 'Review answers',
    });
  }
  for (const draft of records.mcqDrafts) {
    const definition = quizListings.find((q) => q.id === draft.quizId);
    rows.push({
      id: `draft-${draft.quizId}`,
      chapter: definition?.title ?? draft.title,
      paper: 'MCQ practice',
      context: definition ? `CBSE · Class ${definition.grade}` : 'Saved quiz',
      grade: definition?.grade,
      remark: `${draft.answered} of ${draft.total} answered. Your answers are saved.`,
      pending: true,
      href: draft.path,
      action: 'Continue test',
    });
  }
  for (const id of records.access) {
    if (records.submissions.some((s) => s.paper_id === id)) continue;
    const paper = paperDefinitionsById[id];
    const integrals = getIntegralsProduct(id);
    const quiz = quizListings.find((q) => q.id === id);
    if (
      quiz &&
      (records.mcqDrafts.some((q) => q.quizId === id) ||
        records.mcqResults.some((q) => q.quizId === id))
    )
      continue;
    const basics = id.startsWith('maths-basics-');
    if (!paper && !integrals && !quiz && !basics) continue;
    rows.push({
      id: `access-${id}`,
      chapter:
        paper?.chapter ??
        (integrals ? 'Integrals' : (quiz?.title ?? 'Maths Basics')),
      paper: paper
        ? `Written paper ${paper.paperNumber}`
        : (integrals?.title ?? (quiz ? 'MCQ practice' : 'Learning materials')),
      context: paper
        ? `${paper.board ?? 'CBSE'} · Class ${paper.grade ?? 10}`
        : integrals
          ? 'CBSE · Class 12'
          : quiz
            ? `CBSE · Class ${quiz.grade}`
            : 'Your purchased course',
      grade: paper?.grade ?? (integrals ? 12 : quiz?.grade),
      book: paper
        ? (paper.book ?? `${paper.board ?? 'CBSE'} Mathematics`)
        : undefined,
      remark: 'Access available. Not yet taken.',
      pending: true,
      href: paper
        ? `/${(paper.board ?? 'CBSE').toLowerCase()}/grade-${paper.grade ?? 10}/ch-${paper.chapterNumber}`
        : integrals
          ? `${integralsPath}/papers/${integrals.id}`
          : (quiz?.path ?? '/maths-basics'),
      action: basics ? 'Open course' : 'Open chapter',
    });
  }
  return rows;
}
