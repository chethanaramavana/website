'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, Clock3, Download, ExternalLink, MapPin, Printer, QrCode, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

type QuestionPaper = {
  title: string;
  chapterNo: string;
  mcqs: { question: string; options: string[]; answer: number }[];
  oneMarks: string[];
  twoMarks: string[];
  fiveMarks: string[];
};

const papers: Record<string, Record<string, QuestionPaper>> = {
  '10': {
    'Real Numbers': {
      title: 'Real Numbers', chapterNo: 'Chapter 1',
      mcqs: [
        { question: 'The HCF of 26 and 91 is', options: ['7', '13', '17', '26'], answer: 1 },
        { question: 'The decimal expansion of 13/125 is', options: ['0.104', '0.014', '1.04', '0.13'], answer: 0 },
        { question: 'If HCF(a, b) = 12 and LCM(a, b) = 72, then a × b is', options: ['84', '144', '864', '720'], answer: 2 },
        { question: 'Which number is irrational?', options: ['√9', '0.25', '√5', '7/11'], answer: 2 },
      ],
      oneMarks: ['State Euclid’s division lemma.', 'Write the prime factorisation of 156.', 'Without actual division, say whether 77/210 has a terminating decimal expansion.'],
      twoMarks: ['Use Euclid’s division algorithm to find the HCF of 135 and 225.', 'Prove that 3 + 2√5 is irrational.'],
      fiveMarks: ['A school has 96 boys and 72 girls. They must be arranged in rows so that every row has the same number of students and each row contains only boys or only girls. Find the greatest possible number of students in each row and the total number of rows.'],
    },
    Polynomials: {
      title: 'Polynomials', chapterNo: 'Chapter 2',
      mcqs: [
        { question: 'The degree of 5x³ − 2x + 7 is', options: ['1', '2', '3', '5'], answer: 2 },
        { question: 'A zero of p(x) = x − 4 is', options: ['−4', '0', '1', '4'], answer: 3 },
        { question: 'The sum of zeroes of x² − 7x + 10 is', options: ['−7', '7', '10', '−10'], answer: 1 },
        { question: 'If one zero of x² − 5x + 6 is 2, the other is', options: ['1', '3', '4', '6'], answer: 1 },
      ],
      oneMarks: ['Find p(2) for p(x) = x² − 3x + 4.', 'Write a quadratic polynomial whose zeroes are 2 and −3.', 'State the relation between the product of zeroes and coefficients of ax² + bx + c.'],
      twoMarks: ['Find the zeroes of x² − 8x + 15 and verify their relationship with the coefficients.', 'Divide 2x³ + 3x² − 5x + 6 by x + 2.'],
      fiveMarks: ['If α and β are the zeroes of 2x² − 7x + 3, form a quadratic polynomial whose zeroes are α² and β². Show every step.'],
    },
    'Quadratic Equations': {
      title: 'Quadratic Equations', chapterNo: 'Chapter 4',
      mcqs: [
        { question: 'The roots of x² − 9 = 0 are', options: ['3 only', '−3 only', '±3', '±9'], answer: 2 },
        { question: 'For equal roots, the discriminant is', options: ['positive', 'zero', 'negative', 'one'], answer: 1 },
        { question: 'x² + 4x + 5 = 0 has', options: ['two real roots', 'equal roots', 'no real roots', 'one root'], answer: 2 },
        { question: 'The product of roots of 2x² − 5x + 3 is', options: ['3/2', '−3/2', '5/2', '−5/2'], answer: 0 },
      ],
      oneMarks: ['Write the standard form of a quadratic equation.', 'Find the discriminant of 3x² − 2x + 1 = 0.', 'Determine the nature of roots of x² − 6x + 9 = 0.'],
      twoMarks: ['Solve x² − 7x + 12 = 0 by factorisation.', 'Find two consecutive positive integers whose product is 306.'],
      fiveMarks: ['A train travels 360 km at a uniform speed. If the speed had been 5 km/h more, the journey would have taken one hour less. Find the original speed of the train.'],
    },
  },
  '11': {
    Sets: {
      title: 'Sets', chapterNo: 'Chapter 1',
      mcqs: [
        { question: 'If A = {1, 2, 3}, then n(P(A)) is', options: ['3', '6', '8', '9'], answer: 2 },
        { question: 'A ∩ ∅ equals', options: ['A', '∅', 'U', '{∅}'], answer: 1 },
        { question: 'If A ⊂ B, then A ∪ B is', options: ['A', 'B', '∅', 'A ∩ B'], answer: 1 },
        { question: 'The interval {x : −2 < x ≤ 3} is', options: ['[−2,3]', '(−2,3]', '[−2,3)', '(−2,3)'], answer: 1 },
      ],
      oneMarks: ['Write {2, 4, 6, 8} in set-builder form.', 'Define two disjoint sets.', 'Find A − B if A = {1,2,3} and B = {2,4}.'],
      twoMarks: ['Verify De Morgan’s law for A = {1,2,3}, B = {2,3,4}, and U = {1,2,3,4,5}.', 'In a class, 22 study Mathematics, 18 study Physics, and 10 study both. How many study at least one subject?'],
      fiveMarks: ['In a survey of 60 students, 35 like cricket, 28 like football, and 12 like both. Find how many like only cricket, only football, at least one, and neither. Represent the information using a Venn diagram.'],
    },
    'Trigonometric Functions': {
      title: 'Trigonometric Functions', chapterNo: 'Chapter 3',
      mcqs: [
        { question: '180° in radians is', options: ['π/2', 'π', '2π', '1'], answer: 1 },
        { question: 'sin(−x) equals', options: ['sin x', '−sin x', 'cos x', '−cos x'], answer: 1 },
        { question: 'The period of tan x is', options: ['π/2', 'π', '2π', '4π'], answer: 1 },
        { question: 'cos²x + sin²x equals', options: ['0', '1', '2', 'cos 2x'], answer: 1 },
      ],
      oneMarks: ['Convert 75° into radians.', 'Find the value of sin 7π/6.', 'State the domain of tan x.'],
      twoMarks: ['Prove that (1 − cos 2x) / (1 + cos 2x) = tan²x.', 'Find the general solution of sin x = 1/2.'],
      fiveMarks: ['Prove that sin 3x = 3 sin x − 4 sin³x. Hence find the exact value of sin 18°.'],
    },
    'Sequences and Series': {
      title: 'Sequences and Series', chapterNo: 'Chapter 8',
      mcqs: [
        { question: 'The nth term of 3, 7, 11, … is', options: ['4n−1', '4n+1', '3n+1', 'n+3'], answer: 0 },
        { question: 'The common ratio of 2, 6, 18, … is', options: ['2', '3', '4', '6'], answer: 1 },
        { question: 'The arithmetic mean of 8 and 14 is', options: ['10', '11', '12', '22'], answer: 1 },
        { question: '1 + 2 + … + n equals', options: ['n²', 'n(n+1)/2', 'n(n−1)/2', '2n'], answer: 1 },
      ],
      oneMarks: ['Find the 12th term of the AP 5, 9, 13, …', 'Insert one geometric mean between 4 and 16.', 'Write the sum of the first n terms of a GP.'],
      twoMarks: ['Find three numbers in AP whose sum is 24 and product is 440.', 'Find the sum 1 + 1/2 + 1/4 + … up to 8 terms.'],
      fiveMarks: ['If the pth, qth and rth terms of an AP are a, b and c respectively, prove that a(q−r) + b(r−p) + c(p−q) = 0.'],
    },
  },
  '12': {
    'Relations and Functions': {
      title: 'Relations and Functions', chapterNo: 'Chapter 1',
      mcqs: [
        { question: 'A function f: A → B is one-one if', options: ['every b has a preimage', 'f(x₁)=f(x₂) implies x₁=x₂', 'A=B', 'f is constant'], answer: 1 },
        { question: 'The identity function on R is', options: ['f(x)=0', 'f(x)=1', 'f(x)=x', 'f(x)=x²'], answer: 2 },
        { question: 'If f(x)=2x+1, then f⁻¹(x) is', options: ['(x−1)/2', '(x+1)/2', '2x−1', '1/(2x+1)'], answer: 0 },
        { question: 'A binary operation on A maps A×A into', options: ['R', 'A', 'A×A', '∅'], answer: 1 },
      ],
      oneMarks: ['Define an onto function.', 'Find f∘g if f(x)=x+1 and g(x)=2x.', 'Give an example of a function that is many-one.'],
      twoMarks: ['Show that f: R → R, f(x)=3x−5, is invertible and find f⁻¹.', 'Check whether * defined by a*b = a+b+ab is commutative.'],
      fiveMarks: ['Let f: R−{3} → R−{1} be defined by f(x)=(x−2)/(x−3). Prove that f is one-one and onto, and hence find its inverse.'],
    },
    Matrices: {
      title: 'Matrices', chapterNo: 'Chapter 3',
      mcqs: [
        { question: 'The order of a matrix with 3 rows and 2 columns is', options: ['2×3', '3×2', '3×3', '2×2'], answer: 1 },
        { question: 'For a skew-symmetric matrix A, diagonal entries are', options: ['1', '−1', '0', 'arbitrary'], answer: 2 },
        { question: 'If A is 2×3 and B is 3×4, then AB is', options: ['2×4', '3×3', '4×2', 'not defined'], answer: 0 },
        { question: '(AB)ᵀ equals', options: ['AᵀBᵀ', 'BᵀAᵀ', 'AB', 'BA'], answer: 1 },
      ],
      oneMarks: ['Write a 2×2 identity matrix.', 'Find x if [x  2] = [5  2].', 'State the condition for two matrices to be equal.'],
      twoMarks: ['Express [[2,3], [−1,4]] as the sum of a symmetric and a skew-symmetric matrix.', 'If A=[[1,2],[3,4]], verify that (2A)ᵀ=2Aᵀ.'],
      fiveMarks: ['Using elementary row operations, find the inverse of A=[[1,2,3],[0,1,4],[5,6,0]]. Hence solve AX=[[3],[7],[8]].'],
    },
    'Applications of Derivatives': {
      title: 'Applications of Derivatives', chapterNo: 'Chapter 6',
      mcqs: [
        { question: 'If f′(x) > 0 on an interval, f is', options: ['decreasing', 'increasing', 'constant', 'undefined'], answer: 1 },
        { question: 'The slope of y=x² at x=2 is', options: ['2', '4', '6', '8'], answer: 1 },
        { question: 'At a local maximum, f′ changes from', options: ['− to +', '+ to −', '+ to +', '0 to +'], answer: 1 },
        { question: 'd/dx (ln x) is', options: ['x', '1/x', 'ln x', 'eˣ'], answer: 1 },
      ],
      oneMarks: ['Find the rate of change of the area of a circle with respect to its radius.', 'Find intervals where f(x)=x²−4x is increasing.', 'Write the equation of the tangent to y=x² at (1,1).'],
      twoMarks: ['Find the points on y=x³−3x where the tangent is parallel to the x-axis.', 'A spherical balloon’s radius increases at 2 cm/s. Find the rate of increase of volume when r=5 cm.'],
      fiveMarks: ['An open box with a square base must hold 32,000 cm³. Find the dimensions that minimise the amount of material used.'],
    },
  },
};

const standards = [{ value: '10', label: '10th' }, { value: '11', label: '11th' }, { value: '12', label: '12th' }];

export default function Home() {
  const [standard, setStandard] = useState('10');
  const [chapter, setChapter] = useState('Real Numbers');
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const paper = papers[standard][chapter];
  const score = useMemo(() => paper.mcqs.reduce((total, q, index) => total + (answers[index] === q.answer ? 1 : 0), 0), [answers, paper]);
  const answeredCount = Object.keys(answers).length;

  function chooseStandard(next: string) {
    setStandard(next); setChapter(Object.keys(papers[next])[0]); setAnswers({}); setSubmitted(false);
  }
  function chooseChapter(next: string) { setChapter(next); setAnswers({}); setSubmitted(false); }
  function resetPaper() { setAnswers({}); setSubmitted(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="top-rule" />
      <header className="site-header print:hidden">
        <a href="#paper" className="brand" aria-label="Ramavana Mathematical Centre home">
          <span className="brand-mark">R</span><span><strong>Ramavana</strong><small>Mathematical Centre</small></span>
        </a>
        <div className="header-actions">
          <Dialog>
            <DialogTrigger render={<button className="qr-trigger" type="button" />}>
              <QrCode aria-hidden="true" /><span>QR code</span>
            </DialogTrigger>
            <DialogContent className="qr-dialog">
              <DialogHeader>
                <span className="qr-dialog-icon"><QrCode aria-hidden="true" /></span>
                <DialogTitle>Scan to open the practice paper</DialogTitle>
                <DialogDescription>Point a phone camera at this QR code to open Ramavana Mathematical Centre.</DialogDescription>
              </DialogHeader>
              <div className="qr-image-wrap">
                <img src="/ramavana-private-qr.svg" alt="QR code for the private Ramavana Mathematical Centre website" />
              </div>
              <div className="qr-private-note"><ShieldCheck aria-hidden="true" /><span><strong>Private access stays on</strong>Only authorised viewers can open the website after scanning.</span></div>
              <p className="qr-url">ramavana-mathematical-centre.bluewhitebox.chatgpt.site</p>
              <DialogFooter>
                <a className="qr-download" href="/ramavana-private-qr.svg" download="ramavana-mathematical-centre-qr.svg"><Download aria-hidden="true" /> Download QR code</a>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <a className="map-link" href="https://www.google.com/maps/search/?api=1&query=Ramavana+Mathematical+Centre" target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /><span>Find us</span><ExternalLink aria-hidden="true" />
          </a>
        </div>
      </header>

      <section className="workspace-shell">
        <div className="intro print:hidden">
          <p className="eyebrow"><Sparkles aria-hidden="true" /> Chapter-wise exam practice</p>
          <h1>Practise like it’s<br /><em>exam day.</em></h1>
          <p className="intro-copy">Choose your standard and chapter. Tick the MCQs here, then solve the written questions in your notebook.</p>
        </div>

        <div className="paper-controls print:hidden" aria-label="Question paper controls">
          <div className="control-group"><span className="control-label">Standard</span><div className="grade-tabs" role="group" aria-label="Choose standard">
            {standards.map((item) => <button key={item.value} type="button" className={standard === item.value ? 'active' : ''} onClick={() => chooseStandard(item.value)} aria-pressed={standard === item.value}>{item.label}</button>)}
          </div></div>
          <div className="control-group chapter-control"><label className="control-label" htmlFor="chapter">Chapter</label>
            <NativeSelect className="w-full" id="chapter" value={chapter} onChange={(event) => chooseChapter(event.target.value)}>
              {Object.keys(papers[standard]).map((item) => <NativeSelectOption key={item} value={item}>{item}</NativeSelectOption>)}
            </NativeSelect>
          </div>
          <div className="paper-stat"><Clock3 aria-hidden="true" /><span><strong>45 min</strong><small>Suggested time</small></span></div>
        </div>

        <article className="exam-paper" id="paper">
          <div className="paper-accent" />
          <header className="paper-heading">
            <div className="paper-brand"><span className="paper-monogram">RMC</span><span><strong>RAMAVANA MATHEMATICAL CENTRE</strong><small>Chapter-wise Practice Series</small></span></div>
            <div className="paper-code"><span>{paper.chapterNo}</span><strong>{standard} / MATHS</strong></div>
          </header>
          <div className="paper-title"><p>MATHEMATICS • STANDARD {standard}</p><h2>{paper.title}</h2><div className="paper-meta"><span>Time: 45 minutes</span><span>Maximum marks: 16</span></div></div>
          <div className="student-row"><label>Name <input aria-label="Student name" /></label><label>Date <input aria-label="Date" type="date" /></label></div>
          <div className="instructions"><strong>Instructions</strong><p>Answer all questions. Tick one option for each MCQ. Work out Sections B–D neatly in your notebook.</p></div>

          <section className="question-section">
            <div className="section-heading"><span>Section A</span><h3>Multiple choice questions</h3><small>4 × 1 = 4</small></div>
            <p className="section-note print:hidden">Tap one answer for each question.</p>
            <div className="mcq-list">{paper.mcqs.map((question, qIndex) => (
              <fieldset key={question.question} className="mcq-card"><legend><span>{String(qIndex + 1).padStart(2, '0')}</span>{question.question}</legend>
                <div className="options-grid">{question.options.map((option, oIndex) => {
                  const isSelected = answers[qIndex] === oIndex;
                  const isCorrect = submitted && question.answer === oIndex;
                  const isWrong = submitted && isSelected && question.answer !== oIndex;
                  return <label key={option} className={`option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
                    <input type="radio" name={`question-${qIndex}`} checked={isSelected} onChange={() => { setAnswers((current) => ({ ...current, [qIndex]: oIndex })); setSubmitted(false); }} />
                    <span className="option-letter">{String.fromCharCode(65 + oIndex)}</span><span>{option}</span>{isCorrect && <Check className="result-icon" aria-label="Correct answer" />}
                  </label>;
                })}</div>
              </fieldset>
            ))}</div>
          </section>

          <WrittenSection label="Section B" title="Very short answer" marks="3 × 1 = 3" start={5} questions={paper.oneMarks} lines={2} />
          <WrittenSection label="Section C" title="Short answer" marks="2 × 2 = 4" start={8} questions={paper.twoMarks} lines={3} />
          <WrittenSection label="Section D" title="Long answer" marks="1 × 5 = 5" start={10} questions={paper.fiveMarks} lines={5} />
          <footer className="paper-footer"><span>— End of question paper —</span><strong>Do your best. Check every step.</strong></footer>
        </article>

        <div className="action-bar print:hidden">
          <div className="progress-copy"><strong>{answeredCount} of {paper.mcqs.length} MCQs answered</strong><span className="progress-track"><span style={{ width: `${(answeredCount / paper.mcqs.length) * 100}%` }} /></span></div>
          {submitted && <div className="score-pill" role="status"><Check /> Your score: <strong>{score}/{paper.mcqs.length}</strong></div>}
          <div className="actions"><Button variant="outline" size="lg" onClick={resetPaper}><RotateCcw /> Reset</Button><Button variant="outline" size="lg" onClick={() => window.print()}><Printer /> Print</Button><Button className="check-button" size="lg" onClick={() => setSubmitted(true)} disabled={answeredCount !== paper.mcqs.length}>Check answers <ArrowRight /></Button></div>
        </div>
      </section>

      <footer className="site-footer print:hidden"><p><strong>Ramavana Mathematical Centre</strong><span>Build confidence, one chapter at a time.</span></p><a href="https://www.google.com/maps/search/?api=1&query=Ramavana+Mathematical+Centre" target="_blank" rel="noreferrer"><MapPin /> Open in Google Maps</a></footer>
    </main>
  );
}

function WrittenSection({ label, title, marks, start, questions, lines }: { label: string; title: string; marks: string; start: number; questions: string[]; lines: number }) {
  return <section className="question-section written-section"><div className="section-heading"><span>{label}</span><h3>{title}</h3><small>{marks}</small></div><ol start={start}>{questions.map((question) => <li key={question}><p>{question}</p><div className="answer-lines" aria-label="Answer space">{Array.from({ length: lines }).map((_, index) => <span key={index} />)}</div></li>)}</ol></section>;
}
