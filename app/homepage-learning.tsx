import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Tex from './notes/tex';

export function MathsBasicsFeature() {
  return (
    <section className="rmc-basics-feature" aria-labelledby="basics-title">
      <div className="rmc-basics-feature-copy">
        <p className="rmc-eyebrow">Grades 5–10 · First lesson free</p>
        <h2 id="basics-title">Maths Basics</h2>
        <h3>Strengthen the skills your child needs.</h3>
        <p>Revisit numbers, fractions, calculation and algebra before moving on to harder chapters.</p>
        <a className="rmc-button" href="/maths-basics">Explore Maths Basics<ArrowRight aria-hidden="true" /></a>
        <a className="rmc-text-link" href="/maths-basics/numbers">Try the free number lesson<ArrowUpRight aria-hidden="true" /></a>
      </div>
      <figure className="rmc-basics-visual">
        <div className="rmc-fraction-caption"><Tex>{'$\\frac{3}{4}$'}</Tex><span>Three of four equal parts.</span></div>
        <svg viewBox="0 0 440 180" role="img" aria-label="Three quarters shown as three shaded parts of a four-part bar, and at the same position on a number line from zero to one">
          <defs><pattern id="basics-dot-grid" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1" fill="#C9D2DF" /></pattern></defs>
          <rect width="440" height="180" fill="url(#basics-dot-grid)" />
          <path d="M36 42H312V94H36Z" fill="#D9A231" />
          <path d="M312 42H404V94H312Z" fill="white" />
          <g stroke="#011E47" strokeWidth="2" fill="none"><path d="M36 42H404V94H36ZM128 42V94M220 42V94M312 42V94" /><path d="M36 148H404M36 139V157M128 139V157M220 139V157M312 139V157M404 139V157" /></g>
          <path d="M36 148H312" stroke="#D9A231" strokeWidth="4" />
          <path d="M312 99V137" stroke="#011E47" strokeWidth="1.5" strokeDasharray="3 4" />
          <circle cx="312" cy="148" r="5" fill="#011E47" />
        </svg>
        <div className="rmc-number-line-labels" aria-hidden="true">{['$0$', '$\\frac{1}{4}$', '$\\frac{1}{2}$', '$\\frac{3}{4}$', '$1$'].map(label => <Tex key={label}>{label}</Tex>)}</div>
        <figcaption>The same fraction, on a bar and a number line.</figcaption>
      </figure>
    </section>
  );
}

export function ParentValueSection() {
  return (
    <section className="rmc-parent-value" aria-labelledby="parent-value-title">
      <div className="rmc-section-heading"><h2 id="parent-value-title">Study the chapter. Attempt a paper.<br />{' '}Review the marks.</h2></div>
      <div className="rmc-parent-grid">
        <article className="rmc-exam-feature">
          <div className="rmc-exam-copy">
            <p className="rmc-step">Exam practice</p>
            <h3>Exam-style papers</h3>
            <p>Give your child a chance to practise before the real test, with timed chapter papers and worked solutions.</p>
            <ul><li>Multiple-choice and written questions</li><li>Practice under timed conditions</li><li>Solutions to review after the attempt</li></ul>
            <a className="rmc-text-link" href="#syllabus">Explore chapter papers<ArrowRight aria-hidden="true" /></a>
          </div>
          <figure className="rmc-paper-preview">
            <div className="rmc-paper-sheet">
              <img src="/ramavana-paper-logo.png" width="110" height="110" alt="Ramavana Mathematical Centre" loading="lazy" />
              <div className="rmc-paper-context">CBSE · Class 10</div>
              <h4>Real Numbers</h4>
              <div className="rmc-paper-meta"><span>Paper 01</span><span>40 marks · 90 minutes</span></div>
              <p className="rmc-paper-section">Section A · Multiple choice</p>
              <p><b>2.</b> The HCF of 40, 110 and 360 is</p>
              <div className="rmc-paper-options"><span>A. 40</span><span>B. 110</span><span>C. 360</span><span>D. 10</span></div>
              <p className="rmc-paper-section">Section B · Show your working</p>
              <p><b>17.</b> Using prime factorisation, find the HCF of 378 and 504.</p>
              <div className="rmc-paper-writing" aria-hidden="true" />
            </div>
            <figcaption>Extract from our Class 10 chapter paper.</figcaption>
          </figure>
        </article>
        <div className="rmc-parent-support">
          <article className="rmc-parent-card">
            <p className="rmc-step">Before the paper</p>
            <h3>Chapter notes and<br />worked examples</h3>
            <p>Explanations to study, examples to follow and notes to revisit when a question is difficult.</p>
            <a className="rmc-text-link" href="/maths-basics/numbers">See a lesson<ArrowUpRight aria-hidden="true" /></a>
          </article>
          <article className="rmc-parent-card">
            <p className="rmc-step">After the attempt</p>
            <h3>Marks and feedback</h3>
            <p>MCQ scores are calculated automatically. Submitted written papers receive teacher marking and feedback.</p>
            <div className="rmc-feedback-sample"><span>Example of a written-paper remark</span><p><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M4 15L11 22L24 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg><em>Show the common factors before stating the HCF.</em></p></div>
          </article>
        </div>
      </div>
    </section>
  );
}
