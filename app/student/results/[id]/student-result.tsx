'use client';

import TeacherTick from '@/app/teacher-mark';
import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, Loader2, Minus, X } from 'lucide-react';
import { paperDefinitionsById } from '@/lib/papers';
import type { PaperDefinition } from '@/lib/papers';
import { writtenQuestionMarks, objectiveMaximum, paperMaximum, displayQuestion } from '@/lib/paper-format';
import { getBriefMcqSolution } from '@/lib/brief-solutions';
import SolutionSteps from '@/app/solution-steps';
import MathText from '@/app/notes/math-text';

const assertionReasonOptions = [
  'Both Assertion and Reason are true, and Reason is the correct explanation of Assertion.',
  'Both Assertion and Reason are true, but Reason is not the correct explanation of Assertion.',
  'Assertion is true, but Reason is false.',
  'Assertion is false, but Reason is true.',
];

type ResultPayload = {
  submission: { paper_id: keyof typeof paperDefinitionsById; student_name: string; status: string; mcq_answers: Record<string, number>; mcq_score: number; written_score: number | null; total_score: number | null; teacher_feedback: string; submitted_at: string };
  correctAnswers: Record<string, number>;
  writtenSolutions: Record<string, string>;
  objectiveSolutions?: Record<string, string>;
  marks: Array<{ question_number: number; marks_awarded: number; feedback: string }>;
};

export default function StudentResult({ id }: { id: string }) {
  const [result, setResult] = useState<ResultPayload | null>(null);
  const [savedPaper, setSavedPaper] = useState<PaperDefinition | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    void fetch(`/api/student/submissions/${encodeURIComponent(id)}`, { cache: 'no-store' }).then(async (response) => {
      const payload = await response.json() as ResultPayload & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Result could not be loaded.');
      setResult(payload);
      const paperResponse = await fetch(`/api/papers/${encodeURIComponent(payload.submission.paper_id)}`, { cache: 'no-store' });
      if (paperResponse.ok) {
        const paperPayload = await paperResponse.json() as { paper: PaperDefinition };
        setSavedPaper(paperPayload.paper);
      }
    }).catch((reason) => setError(reason instanceof Error ? reason.message : 'Result could not be loaded.'));
  }, [id]);

  if (error) return <main className="student-result-page"><a href="/student"><ArrowLeft /> Account</a><div className="student-account-error">{error}</div></main>;
  if (!result) return <main className="student-result-page"><div className="student-account-loading"><Loader2 /> Loading your result…</div></main>;
  const paper = savedPaper ?? paperDefinitionsById[result.submission.paper_id];
  return <main className="student-result-page">
    <a className="student-result-back" href="/student"><ArrowLeft /> Student account</a>
    <header><img src="/ramavana-paper-logo.png" alt="Ramavana Mathematical Centre" width="170" height="170" /><p>{paper?.chapter ?? 'Chapter test'}</p><h1>Test review</h1><span>{new Date(result.submission.submitted_at).toLocaleString()}</span></header>
    <section className="student-score-card">
      <div><span>MCQ</span><strong>{result.submission.mcq_score}/{objectiveMaximum(result.submission.paper_id)}</strong></div>
      <div><span>Written</span><strong>{result.submission.written_score ?? 'Pending'}/24</strong></div>
      <div><span>Total</span><strong>{result.submission.total_score ?? 'Pending'}{result.submission.total_score !== null ? `/${paperMaximum(result.submission.paper_id)}` : ''}</strong></div>
    </section>
    {result.submission.status === 'marked' ? <div className="student-marked-status"><CheckCircle2 /> Marked by teacher</div> : <div className="student-pending-status"><Clock3 /> Your teacher will review your written answers within 24 hours of submission. Written marks and the final score will appear here after review.</div>}
    {result.submission.teacher_feedback && <section className="student-feedback-card"><h2>Teacher feedback</h2><p>{result.submission.teacher_feedback}</p></section>}
    <section className="student-result-section"><h2>Objective-question review</h2><div className="student-mcq-review">{paper?.mcqs.map((question) => {
      const chosen = result.submission.mcq_answers[String(question.number)];
      const correct = result.correctAnswers[String(question.number)];
      const isCorrect = chosen === correct;
      const status = isCorrect ? 'Correct' : chosen === undefined ? 'Not answered' : 'Incorrect';
      const outcome = isCorrect ? 'correct' : chosen === undefined ? 'unanswered' : 'incorrect';
      const briefSolution = result.objectiveSolutions?.[question.number] ?? getBriefMcqSolution(result.submission.paper_id, question.number);
      return <article className={outcome} key={question.number}>
        <span className="student-review-icon" aria-hidden="true">{isCorrect ? <TeacherTick /> : chosen === undefined ? <Minus /> : <X />}</span>
        <div className="student-review-copy">
          <div className="student-review-heading"><strong>Question {question.number}</strong><em>{status}</em></div>
          <p><MathText>{question.question}</MathText></p>
          <div className="student-quick-solution"><span>Answer</span><b>{String.fromCharCode(65 + correct)}. <MathText>{question.options[correct]}</MathText>{briefSolution && <> — <MathText>{briefSolution}</MathText></>}</b></div>
        </div>
      </article>;
    })}{paper?.assertions.map((question) => {
      const chosen = result.submission.mcq_answers[String(question.number)];
      const correct = result.correctAnswers[String(question.number)];
      const isCorrect = chosen === correct;
      const status = isCorrect ? 'Correct' : chosen === undefined ? 'Not answered' : 'Incorrect';
      const outcome = isCorrect ? 'correct' : chosen === undefined ? 'unanswered' : 'incorrect';
      const briefSolution = result.objectiveSolutions?.[question.number] ?? getBriefMcqSolution(result.submission.paper_id, question.number);
      return <article className={outcome} key={question.number}>
        <span className="student-review-icon" aria-hidden="true">{isCorrect ? <TeacherTick /> : chosen === undefined ? <Minus /> : <X />}</span>
        <div className="student-review-copy">
          <div className="student-review-heading"><strong>Question {question.number}</strong><em>{status}</em></div>
          <p><b>Assertion:</b> <MathText>{question.assertion}</MathText> <b>Reason:</b> <MathText>{question.reason}</MathText></p>
          <div className="student-quick-solution"><span>Answer</span><b>{String.fromCharCode(65 + correct)}. {assertionReasonOptions[correct]}{briefSolution && <> — <MathText>{briefSolution}</MathText></>}</b></div>
        </div>
      </article>;
    })}</div></section>
    <section className="student-result-section"><h2>Written answers — step-by-step solutions</h2><p className="student-solution-note">Use these model solutions to practise writing your method clearly. They are not marks for your uploaded work; your teacher will assess that separately and award partial marks where appropriate.</p><div className="student-written-review">{[17,18,19,20,21,22,23,24].map((number) => {
      const mark = result.marks.find((entry) => entry.question_number === number);
      const value = paper?.written[number];
      const maximum = writtenQuestionMarks[number];
      const outcome = !mark ? 'pending' : mark.marks_awarded === maximum ? 'full' : mark.marks_awarded > 0 ? 'partial' : 'zero';
      return <article className={outcome} key={number}>
        <span className="student-written-number">{displayQuestion(result.submission.paper_id, number)}</span>
        <div className="student-written-copy">
          <div className="student-written-heading"><strong>Question {displayQuestion(result.submission.paper_id, number)}</strong><em>{mark ? `${mark.marks_awarded}/${maximum} marks` : 'Awaiting marks'}</em></div>
          <p className="student-written-question"><MathText>{Array.isArray(value) ? value.join(' ') : value ?? ''}</MathText></p>
          {number === 24 && paper?.caseStudy && <p className="student-written-question"><MathText>{paper.caseStudy}</MathText></p>}
          <div className="student-written-solution"><span>Model solution</span><SolutionSteps solution={result.writtenSolutions[String(number)] ?? ''} /></div>
        </div>
      </article>;
    })}</div></section>
  </main>;
}
