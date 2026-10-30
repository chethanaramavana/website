import { notFound } from 'next/navigation';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import ReportCard from '../student/report-card';
import type { StudentRecordsPayload } from '@/lib/student-records';
import TeacherTick from '../teacher-mark';
import { paperDefinitionsById } from '@/lib/papers';
import MathText from '../notes/math-text';
import '../cbse/grade-10/ch-1/free-mcq/quiz.css';

/** Local visual review only. No accounts, payments, drafts or submissions are created. */
export default function DesignReview() {
  if (process.env.NODE_ENV !== 'development') notFound();
  const records: StudentRecordsPayload = {
    signedIn: true,
    email: 'example.invalid',
    displayName: 'Example student · preview',
    payments: [],
    access: ['real-numbers-01', 'g6-number-play-01'],
    submissions: [
      {
        id: 'example-paper',
        paper_id: 'real-numbers-01',
        student_name: 'Example student',
        status: 'marked',
        mcq_score: 14,
        written_score: 20,
        total_score: 34,
        teacher_feedback:
          'Good use of prime factorisation. Show each division in the HCF working.',
        submitted_at: '2026-10-20T09:00:00Z',
        marked_at: '2026-10-20T12:00:00Z',
      },
    ],
    mcqDrafts: [
      {
        quizId: 'cbse-10-ch-2-50',
        title: 'Polynomials',
        path: '/cbse/grade-10/ch-2/free-mcq',
        answered: 12,
        total: 50,
        updated: 0,
      },
    ],
    mcqResults: [
      {
        id: 'example-quiz',
        quizId: 'cbse-10-ch-1-50',
        title: 'Real Numbers',
        score: 38,
        total: 50,
        submitted: '2026-10-20T09:00:00Z',
      },
    ],
  };
  const paper = paperDefinitionsById['real-numbers-01'];
  return (
    <div className="identity-learning">
      <LearningHeader />
      <main className="report-shell">
        <aside className="design-review-notice">
          Local design preview · All records below are examples. No live student
          data or test submissions.
          <nav>
            <a href="#report-preview">Report card</a> ·{' '}
            <a href="#paper-preview">Paper</a> ·{' '}
            <a href="#quiz-preview">MCQ feedback</a>
          </nav>
        </aside>
        <div id="report-preview">
          <ReportCard preview records={records} name={records.displayName} />
        </div>
        <article id="paper-preview" className="question-paper">
          <header className="paper-heading">
            <img
              src="/ramavana-paper-logo.png"
              width="170"
              height="170"
              alt="Ramavana Mathematical Center"
            />
            <p>CBSE Mathematics · Grade 10 · Local preview</p>
            <h1>Chapter 1 — Real Numbers</h1>
            <div className="paper-meta">
              <span>Time: 90 minutes</span>
              <span>Maximum marks: 40</span>
            </div>
          </header>
          <h2>Section A · Multiple choice</h2>
          {paper.mcqs.slice(0, 2).map((q) => (
            <section key={q.number} className="preview-paper-question">
              <h3>Question {q.number}</h3>
              <MathText>{q.question}</MathText>
              <ol type="A">
                {q.options.map((option) => (
                  <li key={option}>
                    <MathText>{option}</MathText>
                  </li>
                ))}
              </ol>
            </section>
          ))}
          <p>Preview extract. Open a chapter to attempt the complete paper.</p>
        </article>
        <section id="quiz-preview" className="free-quiz">
          <article className="fq-question">
            <h2>Example MCQ feedback</h2>
            <p>HCF of 40, 110 and 360</p>
            <ul className="fq-review-options">
              <li className="correct">10 — Correct answer</li>
            </ul>
            <div className="fq-solution">
              <strong className="fq-correct">Correct · 1/1</strong>
              <TeacherTick />
              <h3>Worked solution</h3>
              <p>The common prime factors are 2 and 5. HCF = 2 × 5 = 10.</p>
            </div>
          </article>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
