import { notFound } from 'next/navigation';
import FreeQuizPage from '@/app/free-quiz-page';
import { freeQuizChapters, quizPath } from '@/lib/free-quizzes/catalog';
export const dynamic = 'force-dynamic';
type Props = {params:Promise<{gradeSlug:string;chapterSlug:string}>};
async function chapterOf({params}:Props) {const p=await params;const chapter=Number(/^ch-(\d+)$/.exec(p.chapterSlug)?.[1]);if(p.gradeSlug!=='grade-10'||chapter<1||chapter>14||!Number.isInteger(chapter))notFound();return chapter;}
export async function generateMetadata(props:Props) {const chapter=await chapterOf(props);return {title:`${chapter<=2?"Free":"₹20"} ${freeQuizChapters[chapter-1]} Quiz — 50 MCQs | Ramavana Mathematical Centre`,description:`CBSE Class 10 practice with 8 assertion–reason questions, marks and worked solutions. Google login. ${chapter<=2?"Free":"₹20 per chapter"}.`,alternates:{canonical:quizPath(chapter)}};}
export default async function Page(props:Props){return <FreeQuizPage chapter={await chapterOf(props)}/>;}
