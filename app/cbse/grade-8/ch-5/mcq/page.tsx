import type { Metadata } from 'next';
import FreeQuizPage from '@/app/free-quiz-page';
import { quizPath } from '@/lib/free-quizzes/catalog';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: '₹30 Number Play Quiz — 30 MCQs | CBSE Class 8 | Ramavana Mathematical Center',
  description: 'CBSE Class 8 Number Play: 30 MCQs with worked solutions. Sign in and unlock access for ₹30.',
  alternates: { canonical: quizPath(5, 8) },
};

export default function Page() {
  return <FreeQuizPage chapter={5} grade={8} />;
}
