import type { Metadata } from 'next';
import Quiz from './quiz';
import './quiz.css';

export const metadata: Metadata = {
  title: 'Free Real Numbers Quiz — 50 MCQs | Ramavana Mathematical Centre',
  description: 'Free CBSE Class 10 Real Numbers practice: 50 exam-style MCQs, including assertion–reason questions, instant marks and worked solutions. No login or payment.',
  alternates: { canonical: '/cbse/grade-10/ch-1/free-mcq' },
  openGraph: { title: 'Free Class 10 Real Numbers Quiz — 50 MCQs', description: 'Practise, see your marks out of 50, and learn from every worked solution.', url: '/cbse/grade-10/ch-1/free-mcq' },
};

export default function FreeRealNumbersPage() { return <Quiz />; }
