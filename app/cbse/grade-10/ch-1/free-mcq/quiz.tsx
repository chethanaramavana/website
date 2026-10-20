'use client';

import Brand from '@/app/brand';
import TeacherTick from '@/app/teacher-mark';
import { useRef, useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Question } from './questions';
import { quizId, quizPath, quizPrice } from '@/lib/free-quizzes/catalog';
import MathText from '@/app/notes/math-text';
import SolutionSteps from '@/app/solution-steps';
import { useTestActivity } from '@/app/student-activity';
import {useMcqDraft} from '@/app/use-mcq-draft';

export default function Quiz({ email,userId, displayName, questions, chapter, title, grade = 10 }: { email:string;userId:string; displayName: string; questions: Question[]; chapter: number; title: string; grade?: number }) {
  const instantOnly = grade === 12 && chapter === 7;
  const {state:draft,update,flush,ready,message,error}=useMcqDraft(quizId(chapter,grade),userId);
  const {answers,submitted}=draft;
  const setAnswers=(fn:(a:Record<number,number>)=>Record<number,number>)=>update(d=>({...d,answers:fn(d.answers)}));
  const [confirm, setConfirm] = useState(false);
  const [copied, setCopied] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [savedScore, setSavedScore] = useState<number | null>(null);

  const result = useRef<HTMLElement>(null);
  const answered = Object.keys(answers).length;
  useTestActivity(quizId(chapter,grade),answered,submitted);
  const score = savedScore ?? questions.filter((q, i) => answers[i] === q.answer).length;
  async function submit() {
    if (saving || !ready) return;
    setSaving(true);
    if(!await flush()){setSaving(false);return;}
    if (instantOnly) {
      update(d=>({...d,submitted:true})); await flush(); setSaving(false); setConfirm(false);
      setTimeout(() => { result.current?.focus(); result.current?.scrollIntoView({ block: 'start' }); }, 0);
      return;
    }
    setSaving(true); setSaveError('');

    try {
      const response = await fetch('/api/free-quiz', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: draft.attemptId, quizId: quizId(chapter,grade), answers }) });
      const payload = await response.json() as { error?: string; answers: Record<number, number>; score: number };
      if (!response.ok) throw new Error(payload.error || 'Your result could not be saved. Please try again.');
      setSavedScore(payload.score); update(d=>({...d,answers:payload.answers,submitted:true})); await flush(); setSaving(false); setConfirm(false);
      setTimeout(() => { result.current?.focus(); result.current?.scrollIntoView({ block: 'start' }); }, 0);
    } catch (error) { setSaveError(error instanceof Error ? error.message : 'Unable to connect. Please try submitting again.'); }
    finally { setSaving(false); }
  }
  async function share() {
    try { await navigator.clipboard.writeText(window.location.href.split('?')[0].split('#')[0]); setCopied('Link copied'); }
    catch { setCopied('Copy the address from your browser to share this quiz.'); }
  }
  if(!ready)return <div className="free-quiz"><main><h1>{title}</h1><p>Answers save automatically to this Google account.</p><p role="status">{message}</p>{error&&<button onClick={()=>window.location.reload()}>Retry loading answers</button>}</main></div>;
  return <div className="free-quiz" onClickCapture={async e=>{const anchor=(e.target as HTMLElement).closest('a');if(!anchor||anchor.target==='_blank'||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey||anchor.getAttribute('href')?.startsWith('#'))return;const url=new URL(anchor.href);if(url.origin!==window.location.origin)return;e.preventDefault();if(saving)return;setSaving(true);if(await flush())window.location.assign(url.href);else setSaving(false);}}>
    <header className="fq-header"><Brand /><button onClick={share}>Copy student link</button><span role="status">{copied}</span></header>
    <main><p>Signed in as <strong>{displayName}</strong> ({email}) · <a href="/student">My tests</a> · <a href={`/api/auth/signout?return_to=${encodeURIComponent(quizPath(chapter,grade))}`}>Sign out</a></p><p className="activity-student-notice">Your teacher can see when you open, attempt and submit this test.</p>
      <nav aria-label="Breadcrumb"><a href={`/cbse/grade-${grade}`}>CBSE Class {grade}</a><span> / </span><a href={`/cbse/grade-${grade}/ch-${chapter}`}>{title}</a><span> / MCQ practice</span></nav>
      <section className="fq-intro"><span className="fq-badge">{quizPrice(chapter,grade) === 0?'FREE · NO PAYMENT':'MCQ ACCESS UNLOCKED'}</span><h1>{title}</h1><h2>50-question MCQ practice</h2><p>Practise concepts and applications from this chapter. {questions.some(q=>q.assertion) && <>Includes {questions.filter(q => q.assertion).length} assertion–reason questions.</>}</p><p><strong>50 marks</strong> · 1 mark each · No negative marking · Untimed</p><p>{instantOnly ? "Choose one answer for each question. Submit to see your score, correct answers and worked solutions." : "Submit when you are ready to see your overall marks and a worked solution for every question. Your submitted answers and score are saved for your teacher. You can return using the same Google account to continue your saved answers."}</p></section>
      <p>Answers save automatically to this Google account.</p><p role="status">{message}{error&&<> <button onClick={()=>void flush()}>Retry saving</button></>}</p>
      {!submitted&&<button disabled={saving} onClick={async()=>{setSaving(true);if(await flush())window.location.assign("/student");else setSaving(false);}}>Save and return later</button>}
      {submitted ? <section className="fq-result" ref={result} tabIndex={-1} aria-label="Quiz results"><span>Your result</span><h2>{score} / {questions.length}</h2><p>{Math.round(score / questions.length * 100)}% · {score} correct · {answered - score} incorrect · {questions.length - answered} unanswered</p><p>{instantOnly ? "Your quiz has been scored automatically." : "Your result has been saved for your teacher."} Review all solutions below, including questions you skipped.</p><button onClick={() => { update(()=>({answers:{},submitted:false,attemptId:crypto.randomUUID()})); setSavedScore(null); window.scrollTo({ top: 0 }); }}>Try again</button></section> : <div className="fq-progress" aria-live="polite"><strong>{answered} / {questions.length} answered</strong><a href="#submit-quiz">Go to submit</a><progress value={answered} max={questions.length} aria-label="Questions answered" /></div>}
      <div className="fq-questions">{questions.map((q, i) => <section className="fq-question" key={i} aria-labelledby={`question-${i}`}>
        <div className="fq-question-meta"><span>Question {i + 1}</span>{!instantOnly && <span>{q.assertion ? 'Assertion–reason' : q.topic} · 1 mark</span>}</div>
        <h2 id={`question-${i}`}><MathText>{q.prompt}</MathText></h2>
        {!submitted ? <RadioGroup disabled={saving} aria-labelledby={`question-${i}`} value={answers[i] === undefined ? null : String(answers[i])} onValueChange={value => { if (value !== null) { setAnswers(a => ({ ...a, [i]: Number(value) })); setConfirm(false); } }}>
          {q.options.map((option, j) => <label className={`fq-option ${answers[i] === j ? 'selected' : ''}`} key={j}><RadioGroupItem value={String(j)} /><span><b>{String.fromCharCode(65 + j)}.</b> <MathText>{option}</MathText></span></label>)}
        </RadioGroup> : <><ul className="fq-review-options">{q.options.map((option, j) => <li key={j} className={j === q.answer ? 'correct' : answers[i] === j ? 'incorrect' : ''}><b>{String.fromCharCode(65 + j)}.</b> <MathText>{option}</MathText>{j === q.answer && <strong> — Correct answer</strong>}{answers[i] === j && <em> — Your answer</em>}</li>)}</ul><div className="fq-solution"><strong className={answers[i]===undefined?"":answers[i]===q.answer?"fq-correct":"fq-incorrect"}>{answers[i] === undefined ? 'Unanswered · 0/1' : answers[i] === q.answer ? 'Correct · 1/1' : 'Incorrect · 0/1'}</strong>{answers[i] === q.answer && <TeacherTick />}<h3>Worked solution</h3><SolutionSteps solution={q.solution} /></div></>}
        {!submitted && answers[i] !== undefined && <button className="fq-clear" disabled={saving} onClick={() => { setAnswers(a => { const next = { ...a }; delete next[i]; return next; }); setConfirm(false); }}>Clear answer</button>}
      </section>)}</div>
      {!submitted && <section className="fq-submit" id="submit-quiz"><h2>Ready to check your answers?</h2>{saveError && <p role="alert">{saveError} <a href={`/api/auth/google?return_to=${encodeURIComponent(quizPath(chapter,grade))}`} target="_blank" rel="noreferrer">Sign in again in a new tab</a>, then return here and submit.</p>}<p>{answered} answered · {questions.length - answered} unanswered. Unanswered questions receive 0 marks.</p>{confirm ? <div role="alert"><p>You still have {questions.length - answered} unanswered questions. Submit this attempt?</p><button disabled={saving} onClick={submit}>{saving ? "Saving result…" : "Submit and see results"}</button><button className="fq-secondary" onClick={() => setConfirm(false)}>Keep answering</button></div> : <button disabled={saving} onClick={() => answered < questions.length ? setConfirm(true) : submit()}>{saving ? "Saving result…" : "Submit quiz"}</button>}</section>}
      <footer><p>Original practice questions by Ramavana Mathematical Centre. CBSE-aligned practice, not an official CBSE paper.</p><a href={grade >= 11 ? "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf" : "https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart1/Maths_SecP1X_2026-27.pdf"} target="_blank" rel="noreferrer">CBSE Class {grade} syllabus, 2026–27</a><span> · </span><a href={grade===10?"/cbse/grade-10/free-mcq":`/cbse/grade-${grade}`}>{grade===10?"MCQ quizzes for all 14 chapters":`Back to Class ${grade} chapters`}</a></footer>
    </main>
  </div>;
}


