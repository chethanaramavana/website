import { notFound } from 'next/navigation';
import FreeQuizPage from '@/app/free-quiz-page';
import { icse7QuizChapters, quizPath, quizPrice } from '@/lib/free-quizzes/catalog';

type Props = { params: Promise<{ gradeSlug: string; chapterSlug: string }> };
async function chapterOf({ params }: Props) {
  const { gradeSlug, chapterSlug } = await params;
  const chapter = Number(/^ch-(\d+)$/.exec(chapterSlug)?.[1]);
  if (gradeSlug !== 'grade-7' || !Number.isInteger(chapter) || chapter < 1 || chapter > icse7QuizChapters.length) notFound();
  return chapter;
}
export async function generateMetadata(props: Props) {
  const chapter = await chapterOf(props), free = quizPrice(chapter, 7, 'ICSE') === 0;
  return { title: `${free ? 'Free' : '₹30'} ${icse7QuizChapters[chapter - 1]} MCQs — ICSE Grade 7 | Ramavana Mathematical Center`, description: `30 MCQs for ICSE Grade 7 ${icse7QuizChapters[chapter - 1]} with marks and worked solutions. ${free ? 'Free' : '₹30 per chapter'}.`, alternates: { canonical: quizPath(chapter, 7, 'ICSE') } };
}
export default async function Page(props: Props) { return <FreeQuizPage chapter={await chapterOf(props)} grade={7} board="ICSE" />; }
