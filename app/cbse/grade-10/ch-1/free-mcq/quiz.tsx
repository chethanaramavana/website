'use client';

import { useRef, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Question } from './questions';
import { quizId, quizPath } from '@/lib/free-quizzes/catalog';
import MathText from '@/app/notes/math-text';
import SolutionSteps from '@/app/solution-steps';

export default function Quiz({ displayName, questions, chapter, title }: { displayName: string; questions: Question[]; chapter: number; title: string }) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedScore, setSavedScore] = useState<number | null>(null);
  const attemptId = useRef<string | null>(null);
  const result = useRef<HTMLElement>(null);
  const answered = Object.keys(answers).length;
  const score = savedScore ?? questions.filter((q, i) => answers[i] === q.answer).length;
  async function submit() {
    if (saving) return;
    setSaving(true); setSaveError('');
    attemptId.current ??= crypto.randomUUID();
    try {
      const response = await fetch('/api/free-quiz', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: attemptId.current, quizId: quizId(chapter), answers }) });
      const payload = await response.json() as { error?: string; answers: Record<number, number>; score: number };
      if (!response.ok) throw new Error(payload.error || 'Your result could not be saved. Please try again.');
      setAnswers(payload.answers); setSavedScore(payload.score); setSubmitted(true); setConfirm(false);
      setTimeout(() => { result.current?.focus(); result.current?.scrollIntoView({ block: 'start' }); }, 0);
    } catch (error) { setSaveError(error instanceof Error ? error.message : 'Unable to connect. Please try submitting again.'); }
    finally { setSaving(false); }
  }
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href.split('?')[0].split('#')[0]); setCopied('Link copied'); }
    catch { setCopied('Copy the address from your browser to share this quiz.'); }
  }
  return <div className="free-quiz">
    <header className="fq-header"><a href="/">Ramavana <span>Mathematical Centre</span></a><button onClick={share}>Copy student link</button><span role="status">{copied}</span></header>
    <main><p>Signed in as <strong>{displayName}</strong> · <a href={`/api/auth/signout?return_to=${encodeURIComponent(quizPath(chapter))}`}>Sign out</a></p>
      <nav aria-label="Breadcrumb"><a href="/cbse/grade-10">CBSE Class 10</a><span> / </span><a href={`/cbse/grade-10/ch-${chapter}`}>{title}</a><span> / MCQ practice</span></nav>
      <section className="fq-intro"><span className="fq-badge">{chapter===1?'FREE · NO PAYMENT':'MCQ ACCESS UNLOCKED'}</span><h1>{title}</h1><h2>50-question MCQ practice</h2><p>Practise concepts and applications from this chapter. Includes 8 assertion–reason questions.</p><p><strong>50 marks</strong> · 1 mark each · No negative marking · Untimed</p><p>Submit when you are ready to see your overall marks and a worked solution for every question. Your submitted answers and score are saved for your teacher. Keep this page open until you submit.</p></section>
      {submitted ? <section className="fq-result" ref={result} tabIndex={-1} aria-label="Quiz results"><span>Your result</span><h2>{score} / {questions.length}</h2><p>{Math.round(score / questions.length * 100)}% · {score} correct · {answered - score} incorrect · {questions.length - answered} unanswered</p><p>Your result has been saved for your teacher. Review all solutions below, including questions you skipped.</p><button onClick={() => { setSubmitted(false); setAnswers({}); setSavedScore(null); attemptId.current = null; window.scrollTo({ top: 0 }); }}>Try again</button></section> : <div className="fq-progress" aria-live="polite"><strong>{answered} / {questions.length} answered</strong><a href="#submit-quiz">Go to submit</a><progress value={answered} max={questions.length} aria-label="Questions answered" /></div>}
      <div className="fq-questions">{questions.map((q, i) => <section className="fq-question" key={i} aria-labelledby={`question-${i}`}>
        <div className="fq-question-meta"><span>Question {i + 1}</span><span>{q.assertion ? 'Assertion–reason' : q.topic} · 1 mark</span></div>
        <h2 id={`question-${i}`}><MathText>{q.prompt}</MathText></h2>
        {!submitted ? <RadioGroup disabled={saving} aria-labelledby={`question-${i}`} value={answers[i] === undefined ? null : String(answers[i])} onValueChange={value => { if (value !== null) { setAnswers(a => ({ ...a, [i]: Number(value) })); setConfirm(false); } }}>
          {q.options.map((option, j) => <label className={`fq-option ${answers[i] === j ? 'selected' : ''}`} key={j}><RadioGroupItem value={String(j)} /><span><b>{String.fromCharCode(65 + j)}.</b> <MathText>{option}</MathText></span></label>)}
        </RadioGroup> : <><ul className="fq-review-options">{q.options.map((option, j) => <li key={j} className={j === q.answer ? 'correct' : answers[i] === j ? 'incorrect' : ''}><b>{String.fromCharCode(65 + j)}.</b> <MathText>{option}</MathText>{j === q.answer && <strong> — Correct answer</strong>}{answers[i] === j && <em> — Your answer</em>}</li>)}</ul><div className="fq-solution"><strong>{answers[i] === undefined ? 'Unanswered · 0/1' : answers[i] === q.answer ? 'Correct · 1/1' : 'Incorrect · 0/1'}</strong><h3>Worked solution</h3><SolutionSteps solution={q.solution} /></div></>}
        {!submitted && answers[i] !== undefined && <button className="fq-clear" disabled={saving} onClick={() => { setAnswers(a => { const next = { ...a }; delete next[i]; return next; }); setConfirm(false); }}>Clear answer</button>}
      </section>)}</div>
      {!submitted && <section className="fq-submit" id="submit-quiz"><h2>Ready to check your answers?</h2>{saveError && <p role="alert">{saveError} <a href={`/api/auth/google?return_to=${encodeURIComponent(quizPath(chapter))}`} target="_blank" rel="noreferrer">Sign in again in a new tab</a>, then return here and submit.</p>}<p>{answered} answered · {questions.length - answered} unanswered. Unanswered questions receive 0 marks.</p>{confirm ? <div role="alert"><p>You still have {questions.length - answered} unanswered questions. Submit this attempt?</p><button disabled={saving} onClick={submit}>{saving ? "Saving result…" : "Submit and see results"}</button><button className="fq-secondary" onClick={() => setConfirm(false)}>Keep answering</button></div> : <button disabled={saving} onClick={() => answered < questions.length ? setConfirm(true) : submit()}>{saving ? "Saving result…" : "Submit quiz"}</button>}</section>}
      <footer><p>Original practice questions by Ramavana Mathematical Centre. CBSE-aligned practice, not an official CBSE paper.</p><a href="https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf" target="_blank" rel="noreferrer">CBSE Class 10 syllabus, 2026–27</a><span> · </span><a href="/cbse/grade-10/free-mcq">MCQ quizzes for all 14 chapters</a></footer>
    </main>
  </div>;
}


