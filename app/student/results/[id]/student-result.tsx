'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, Loader2 } from 'lucide-react';
import { paperDefinitionsById } from '@/lib/papers';
import type { PaperDefinition } from '@/lib/papers';

type ResultPayload = {
  submission: { paper_id: keyof typeof paperDefinitionsById; student_name: string; status: string; mcq_answers: Record<string, number>; mcq_score: number; written_score: number | null; total_score: number | null; teacher_feedback: string; submitted_at: string };
  correctAnswers: Record<string, number>;
  writtenSolutions: Record<string, string>;
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
    <header><p>{paper?.chapter ?? 'Chapter test'}</p><h1>Test review</h1><span>{new Date(result.submission.submitted_at).toLocaleString()}</span></header>
    <section className="student-score-card">
      <div><span>MCQ</span><strong>{result.submission.mcq_score}/16</strong></div>
      <div><span>Written</span><strong>{result.submission.written_score ?? 'Pending'}/24</strong></div>
      <div><span>Total</span><strong>{result.submission.total_score ?? 'Pending'}{result.submission.total_score !== null ? '/40' : ''}</strong></div>
    </section>
    {result.submission.status === 'marked' ? <div className="student-marked-status"><CheckCircle2 /> Marked by teacher</div> : <div className="student-pending-status"><Clock3 /> Written answers are awaiting teacher review.</div>}
    {result.submission.teacher_feedback && <section className="student-feedback-card"><h2>Teacher feedback</h2><p>{result.submission.teacher_feedback}</p></section>}
    <section className="student-result-section"><h2>Objective-question review</h2><div className="student-mcq-review">{paper?.mcqs.map((question) => {
      const chosen = result.submission.mcq_answers[String(question.number)];
      const correct = result.correctAnswers[String(question.number)];
      return <article className={chosen === correct ? 'correct' : 'incorrect'} key={question.number}><strong>Question {question.number}</strong><p>{question.question}</p><span>Your answer: {String.fromCharCode(65 + chosen)} · Correct: {String.fromCharCode(65 + correct)}</span></article>;
    })}{paper?.assertions.map((question) => {
      const chosen = result.submission.mcq_answers[String(question.number)];
      const correct = result.correctAnswers[String(question.number)];
      return <article className={chosen === correct ? 'correct' : 'incorrect'} key={question.number}><strong>Question {question.number}</strong><p>Assertion: {question.assertion} Reason: {question.reason}</p><span>Your answer: {String.fromCharCode(65 + chosen)} · Correct: {String.fromCharCode(65 + correct)}</span></article>;
    })}</div></section>
    <section className="student-result-section"><h2>Written marks and model solutions</h2><div className="student-written-review">{[17,18,19,20,21,22,23,24].map((number) => {
      const mark = result.marks.find((entry) => entry.question_number === number);
      const value = paper?.written[number];
      return <article key={number}><div><strong>Question {number}</strong><em>{mark ? `${mark.marks_awarded} marks` : 'Awaiting marks'}</em></div><p>{Array.isArray(value) ? value.join(' ') : value}</p><span>{result.writtenSolutions[String(number)]}</span></article>;
    })}</div></section>
  </main>;
}
