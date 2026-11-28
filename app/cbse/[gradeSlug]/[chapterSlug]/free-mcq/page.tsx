import { notFound } from 'next/navigation';
import FreeQuizPage from '@/app/free-quiz-page';
import { cbse6QuizChapters, cbse7QuizChapters, cbse8QuizChapters, freeQuizChapters, quizPath, quizPrice } from '@/lib/free-quizzes/catalog';
export const dynamic = 'force-dynamic';
type Props = {params:Promise<{gradeSlug:string;chapterSlug:string}>};
// Grade 10 (₹20 or free), Grade 6 and Grade 7 (₹30) chapter MCQ sets.
async function chapterOf({params}:Props) {
  const p = await params; const chapter = Number(/^ch-(\d+)$/.exec(p.chapterSlug)?.[1]);
  const grade = p.gradeSlug === 'grade-10' ? 10 : p.gradeSlug === 'grade-6' ? 6 : p.gradeSlug === 'grade-7' ? 7 : p.gradeSlug === 'grade-8' ? 8 : 0;
  const count = grade === 10 ? 14 : grade === 6 ? cbse6QuizChapters.length : grade === 7 ? cbse7QuizChapters.length : 0;
  if (!grade || !Number.isInteger(chapter) || (grade === 8 ? !cbse8QuizChapters[chapter] : chapter < 1 || chapter > count)) notFound();
  return { grade, chapter };
}
export async function generateMetadata(props:Props) {
  const { grade, chapter } = await chapterOf(props);
  if (grade === 6 || grade === 7 || grade === 8) { const names: Record<number, string> = grade === 6 ? {...cbse6QuizChapters} : grade === 7 ? {...cbse7QuizChapters} : Object.fromEntries(Object.entries(cbse8QuizChapters).map(([k, v]) => [Number(k) - 1, v])); return { title: `₹30 ${names[chapter-1]} Quiz — 30 MCQs | CBSE Class ${grade} | Ramavana Mathematical Center`, description: `CBSE Class ${grade} ${names[chapter-1]} practice: 30 MCQs with 10 higher-order questions, 4 assertion–reason questions and worked solutions. Google login. ₹30 per chapter.`, alternates: { canonical: quizPath(chapter, grade) } }; }
  return { title: `${quizPrice(chapter) === 0 ? "Free" : "₹20"} ${freeQuizChapters[chapter-1]} Quiz — 30 MCQs | Ramavana Mathematical Center`, description: `CBSE Class 10 practice with 4 assertion–reason questions, marks and worked solutions. Google login. ${quizPrice(chapter) === 0 ? "Free" : "₹20 per chapter"}.`, alternates: { canonical: quizPath(chapter) } };
}
export default async function Page(props:Props){ const { grade, chapter } = await chapterOf(props); return <FreeQuizPage chapter={chapter} grade={grade}/>; }
