'use client';

import { useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  Download,
  GraduationCap,
  LockKeyhole,
  Printer,
  QrCode,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const chapters = [
  'Real Numbers',
  'Polynomials',
  'Pair of Linear Equations in Two Variables',
  'Quadratic Equations',
  'Arithmetic Progressions',
  'Triangles',
  'Coordinate Geometry',
  'Introduction to Trigonometry',
  'Some Applications of Trigonometry',
  'Circles',
  'Areas Related to Circles',
  'Surface Areas and Volumes',
  'Statistics',
  'Probability',
];

const mcqs = [
  {
    question: 'The HCF of 26 and 91 is:',
    options: ['7', '13', '17', '26'],
    answer: 1,
  },
  {
    question: 'Which of the following is an irrational number?',
    options: ['√9', '0.25', '√5', '7/11'],
    answer: 2,
  },
];

export default function Home() {
  const [gradeSelected, setGradeSelected] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [checked, setChecked] = useState(false);
  const chapterSection = useRef<HTMLElement>(null);
  const paperSection = useRef<HTMLElement>(null);

  function selectGrade() {
    setGradeSelected(true);
    requestAnimationFrame(() => chapterSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function selectChapter(chapter: string) {
    setSelectedChapter(chapter);
    setAnswers({});
    setChecked(false);
    requestAnimationFrame(() => paperSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  }

  function resetAnswers() {
    setAnswers({});
    setChecked(false);
  }

  return (
    <main className="site-shell">
      <header className="site-header print:hidden">
        <a className="brand" href="#top" aria-label="Ramavana Mathematical Centre home">
          <span className="brand-mark">R</span>
          <span><strong>Ramavana</strong><small>Mathematical Centre</small></span>
        </a>
        <div className="header-actions">
          <span className="private-badge"><LockKeyhole /> Private</span>
          <QrDialog />
        </div>
      </header>

      <div className="page" id="top">
        <section className="page-heading print:hidden">
          <p className="kicker">CBSE Mathematics Practice</p>
          <h1>Choose your grade.<br />Choose your chapter.</h1>
          <p>Select a chapter to open its question paper.</p>
        </section>

        <nav className="steps print:hidden" aria-label="Selection progress">
          <button className="step active" type="button" onClick={() => setGradeSelected(false)}>
            <span>1</span><strong>Grade</strong><small>{gradeSelected ? 'Grade 10 · CBSE' : 'Choose grade'}</small>
          </button>
          <span className="step-line" />
          <button className={`step ${gradeSelected ? 'active' : ''}`} type="button" disabled={!gradeSelected} onClick={() => chapterSection.current?.scrollIntoView({ behavior: 'smooth' })}>
            <span>2</span><strong>Chapter</strong><small>{selectedChapter ?? 'Choose chapter'}</small>
          </button>
          <span className="step-line" />
          <div className={`step ${selectedChapter ? 'active' : ''}`}>
            <span>3</span><strong>Questions</strong><small>{selectedChapter ? 'Paper opened' : 'Start practice'}</small>
          </div>
        </nav>

        <section className="grade-section print:hidden" aria-labelledby="grade-title">
          <div className="section-copy">
            <span className="section-number">01</span>
            <div><h2 id="grade-title">Select grade</h2><p>More grades can be added later.</p></div>
          </div>
          <button className={`grade-card ${gradeSelected ? 'selected' : ''}`} type="button" onClick={selectGrade} aria-pressed={gradeSelected}>
            <span className="grade-icon"><GraduationCap /></span>
            <span className="grade-copy"><small>CBSE</small><strong>Grade 10</strong><em>Mathematics</em></span>
            <span className="grade-action">{gradeSelected ? <><Check /> Selected</> : <>Choose grade <ArrowRight /></>}</span>
          </button>
        </section>

        {gradeSelected && (
          <section className="chapter-section print:hidden" ref={chapterSection} aria-labelledby="chapter-title">
            <div className="section-copy">
              <span className="section-number">02</span>
              <div><h2 id="chapter-title">Select a chapter</h2><p>Grade 10 · CBSE Mathematics</p></div>
            </div>
            <div className="chapter-grid">
              {chapters.map((chapter, index) => {
                const ready = chapter === 'Real Numbers';
                const selected = selectedChapter === chapter;
                return (
                  <button key={chapter} type="button" className={`chapter-card ${selected ? 'selected' : ''}`} onClick={() => selectChapter(chapter)}>
                    <span className="chapter-no">{String(index + 1).padStart(2, '0')}</span>
                    <strong>{chapter}</strong>
                    <small>{ready ? 'Draft questions ready' : 'Format to be added'}</small>
                    <ArrowRight className="chapter-arrow" />
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {selectedChapter && (
          <section className="paper-stage" ref={paperSection} aria-live="polite">
            <div className="paper-toolbar print:hidden">
              <button type="button" onClick={() => { setSelectedChapter(null); chapterSection.current?.scrollIntoView({ behavior: 'smooth' }); }}><ArrowLeft /> Chapters</button>
              <span>Grade 10 · CBSE</span>
              <Button variant="outline" onClick={() => window.print()}><Printer /> Print</Button>
            </div>
            {selectedChapter === 'Real Numbers' ? (
              <RealNumbersPaper answers={answers} setAnswers={setAnswers} checked={checked} setChecked={setChecked} resetAnswers={resetAnswers} />
            ) : (
              <article className="empty-paper">
                <span className="empty-icon"><BookOpen /></span>
                <p>Chapter {chapters.indexOf(selectedChapter) + 1}</p>
                <h2>{selectedChapter}</h2>
                <div className="empty-rule" />
                <strong>The chapter is ready for your question format.</strong>
                <span>Questions will appear here after the pattern is added.</span>
                <button type="button" onClick={() => selectChapter('Real Numbers')}>View Real Numbers draft <ArrowRight /></button>
              </article>
            )}
          </section>
        )}
      </div>

      <footer className="site-footer print:hidden">
        <span>Ramavana Mathematical Centre</span>
        <span>Grade 10 · CBSE Mathematics</span>
      </footer>
    </main>
  );
}

function RealNumbersPaper({ answers, setAnswers, checked, setChecked, resetAnswers }: {
  answers: Record<number, number>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  checked: boolean;
  setChecked: (value: boolean) => void;
  resetAnswers: () => void;
}) {
  const score = mcqs.reduce((total, question, index) => total + (answers[index] === question.answer ? 1 : 0), 0);
  return (
    <article className="question-paper">
      <header className="paper-header">
        <div className="paper-brand"><span>RMC</span><div><strong>RAMAVANA MATHEMATICAL CENTRE</strong><small>CBSE Mathematics Practice</small></div></div>
        <div className="paper-label"><small>GRADE</small><strong>10</strong></div>
      </header>
      <div className="paper-title"><p>CHAPTER 01</p><h2>Real Numbers</h2><span>Draft question set</span></div>
      <div className="student-details"><label>Name <input aria-label="Student name" /></label><label>Date <input type="date" aria-label="Date" /></label></div>
      <div className="draft-note print:hidden"><BookOpen /><span><strong>Draft paper</strong>The exact sections and question pattern will be updated next.</span></div>

      <section className="paper-section">
        <div className="paper-section-title"><span>A</span><h3>Choose the correct answer</h3><small>2 × 1 = 2</small></div>
        {mcqs.map((question, qIndex) => (
          <fieldset className="mcq" key={question.question}>
            <legend><span>{qIndex + 1}.</span>{question.question}</legend>
            <div className="options">
              {question.options.map((option, oIndex) => {
                const selected = answers[qIndex] === oIndex;
                const correct = checked && question.answer === oIndex;
                const wrong = checked && selected && question.answer !== oIndex;
                return (
                  <label key={option} className={`${selected ? 'selected' : ''} ${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`}>
                    <input type="radio" name={`q-${qIndex}`} checked={selected} onChange={() => { setAnswers((current) => ({ ...current, [qIndex]: oIndex })); setChecked(false); }} />
                    <span>{String.fromCharCode(65 + oIndex)}</span>{option}{correct && <Check className="answer-check" />}
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </section>

      <section className="paper-section">
        <div className="paper-section-title"><span>B</span><h3>Answer the following</h3><small>2 × 2 = 4</small></div>
        <ol start={3} className="written-questions">
          <li><p>Use Euclid’s division algorithm to find the HCF of 135 and 225.</p><AnswerLines count={3} /></li>
          <li><p>Prove that 3 + 2√5 is an irrational number.</p><AnswerLines count={4} /></li>
        </ol>
      </section>

      <div className="paper-actions print:hidden">
        <button type="button" onClick={resetAnswers}><RotateCcw /> Reset answers</button>
        {checked && <span className="score"><Check /> MCQ score: <strong>{score}/2</strong></span>}
        <Button onClick={() => setChecked(true)} disabled={Object.keys(answers).length < mcqs.length}>Check MCQs <ArrowRight /></Button>
      </div>
      <footer className="paper-end">— End of draft paper —</footer>
    </article>
  );
}

function AnswerLines({ count }: { count: number }) {
  return <div className="answer-lines">{Array.from({ length: count }).map((_, index) => <span key={index} />)}</div>;
}

function QrDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<button className="qr-trigger" type="button" />}><QrCode /><span>QR code</span></DialogTrigger>
      <DialogContent className="qr-dialog">
        <DialogHeader>
          <span className="qr-dialog-icon"><QrCode /></span>
          <DialogTitle>Scan to open the website</DialogTitle>
          <DialogDescription>This QR code opens the private Ramavana Mathematical Centre website.</DialogDescription>
        </DialogHeader>
        <div className="qr-image-wrap"><img src="/ramavana-private-qr.svg" alt="QR code for the private Ramavana Mathematical Centre website" /></div>
        <div className="qr-private-note"><ShieldCheck /><span><strong>Private access stays on</strong>Only authorised viewers can open it.</span></div>
        <DialogFooter><a className="qr-download" href="/ramavana-private-qr.svg" download="ramavana-mathematical-centre-qr.svg"><Download /> Download QR code</a></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
