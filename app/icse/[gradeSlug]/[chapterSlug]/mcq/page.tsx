import { notFound } from 'next/navigation';
import FreeQuizPage from '@/app/free-quiz-page';
import { icse6QuizChapters, icse7QuizChapters, quizPath, quizPrice } from '@/lib/free-quizzes/catalog';

type Props = { params: Promise<{ gradeSlug: string; chapterSlug: string }> };
async function chapterOf({ params }: Props) {
  const { gradeSlug, chapterSlug } = await params;
  const chapter = Number(/^ch-(\d+)$/.exec(chapterSlug)?.[1]);
  const grade = gradeSlug === 'grade-6' ? 6 : gradeSlug === 'grade-7' ? 7 : 0;
  const names = grade === 6 ? icse6QuizChapters : icse7QuizChapters;
  if (!grade || !Number.isInteger(chapter) || chapter < 1 || chapter > names.length) notFound();
  return { grade, chapter, name: names[chapter - 1] };
}
export async function generateMetadata(props: Props) {
  const { grade, chapter, name } = await chapterOf(props), free = quizPrice(chapter, grade, 'ICSE') === 0;
  return { title: `${free ? 'Free' : '₹30'} ${name} MCQs — ICSE Grade ${grade} | Ramavana Mathematical Center`, description: `30 MCQs for ICSE Grade ${grade} ${name}, with 10 higher-order questions and worked solutions. ${free ? 'Free' : '₹30 per chapter'}.`, alternates: { canonical: quizPath(chapter, grade, 'ICSE') } };
}
export default async function Page(props: Props) { const { grade, chapter } = await chapterOf(props); return <FreeQuizPage chapter={chapter} grade={grade} board="ICSE" />; }
