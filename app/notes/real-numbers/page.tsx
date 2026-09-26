import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import NotesPrintButton from './print-button';

export const metadata = {
  title: 'Real Numbers Notes | Ramavana Mathematical Center',
  description: 'CBSE Grade 10 Real Numbers chapter notes, worked examples and practice questions.',
};

export default function RealNumbersNotesPage() {
  return (
    <main className="notes-shell">
      <nav className="notes-toolbar">
        <a href="/"><ArrowLeft /> Back to chapters</a>
        <NotesPrintButton />
      </nav>

      <article className="notes-page notes-cover-page">
        <header className="notes-title-block">
          <span className="notes-book-icon"><BookOpen /></span>
          <p>CBSE · Grade 10 Mathematics · Chapter 1</p>
          <h1>Real Numbers</h1>
          <h2>Important Results, Methods &amp; Practice</h2>
          <div className="notes-title-rule" />
          <p className="notes-lead">A complete revision guide to read before attempting the chapter test.</p>
        </header>

        <section className="notes-section">
          <span className="notes-section-number">01</span>
          <div>
            <h3>Fundamental Theorem of Arithmetic</h3>
            <p>Every composite number can be written as a product of prime numbers. Apart from the order of the factors, this prime factorisation is unique.</p>
            <div className="notes-example"><strong>Worked example</strong><p>1260 = 126 × 10 = (2 × 3² × 7) × (2 × 5)</p><b>Therefore, 1260 = 2² × 3² × 5 × 7.</b></div>
          </div>
        </section>

        <section className="notes-grid-two">
          <div className="notes-rule-card">
            <h3>HCF</h3>
            <p>Take only the common prime factors, each with its <strong>smallest power</strong>.</p>
          </div>
          <div className="notes-rule-card gold">
            <h3>LCM</h3>
            <p>Take every prime factor present, each with its <strong>greatest power</strong>.</p>
          </div>
        </section>

        <section className="notes-formula-box">
          <span>For two positive integers a and b</span>
          <strong>HCF(a, b) × LCM(a, b) = a × b</strong>
          <small>This relation is guaranteed for two positive integers.</small>
        </section>

        <section className="notes-section compact">
          <span className="notes-section-number">02</span>
          <div>
            <h3>Finding HCF and LCM by prime factorisation</h3>
            <div className="notes-worked-lines">
              <p><b>36 = 2² × 3²</b></p>
              <p><b>60 = 2² × 3 × 5</b></p>
              <p>HCF = 2² × 3 = <strong>12</strong></p>
              <p>LCM = 2² × 3² × 5 = <strong>180</strong></p>
              <p className="notes-check">Check: 12 × 180 = 36 × 60 = 2160 ✓</p>
            </div>
          </div>
        </section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 1 / 3</footer>
      </article>

      <article className="notes-page">
        <header className="notes-running-header"><span>Real Numbers</span><b>Methods &amp; Proofs</b></header>
        <section className="notes-section">
          <span className="notes-section-number">03</span>
          <div>
            <h3>Useful exponent tests</h3>
            <ul className="notes-check-list">
              <li><CheckCircle2 /><span>A number is a <strong>perfect square</strong> when every prime exponent is even.</span></li>
              <li><CheckCircle2 /><span>A number is a <strong>perfect cube</strong> when every prime exponent is divisible by 3.</span></li>
              <li><CheckCircle2 /><span>If a prime p divides n², then p also divides n.</span></li>
            </ul>
            <div className="notes-example"><strong>Worked example</strong><p>72 = 2³ × 3². To make every exponent even, multiply by 2.</p><b>72 × 2 = 144 = 12².</b></div>
          </div>
        </section>

        <section className="notes-section">
          <span className="notes-section-number">04</span>
          <div>
            <h3>How to prove that a number is irrational</h3>
            <ol className="notes-steps">
              <li><span>1</span>Assume the given number is rational.</li>
              <li><span>2</span>Rearrange the equation to isolate √2, √3 or √5.</li>
              <li><span>3</span>The other side will be rational, contradicting the known irrationality of that square root.</li>
              <li><span>4</span>State clearly that the original assumption is false and the number is irrational.</li>
            </ol>
          </div>
        </section>

        <section className="notes-proof">
          <div className="notes-proof-label"><Lightbulb /> Model proof</div>
          <h3>Prove that 5 + 2√3 is irrational.</h3>
          <p>Assume that 5 + 2√3 is rational. Let 5 + 2√3 = r, where r is rational.</p>
          <p>Then 2√3 = r − 5, so √3 = (r − 5)/2.</p>
          <p>Since r, 5 and 2 are rational, (r − 5)/2 is rational. This says that √3 is rational, which contradicts the fact that √3 is irrational.</p>
          <p><strong>Therefore, 5 + 2√3 is irrational.</strong></p>
        </section>

        <section className="notes-memory-box">
          <h3>Remember</h3>
          <p>Rational + irrational = irrational</p>
          <p>Non-zero rational × irrational = irrational</p>
          <p>The sum of two irrational numbers is <strong>not always</strong> irrational.</p>
        </section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 2 / 3</footer>
      </article>

      <article className="notes-page">
        <header className="notes-running-header"><span>Real Numbers</span><b>Practice</b></header>
        <section className="notes-practice-heading">
          <p>Check your understanding</p>
          <h2>Practice before the test</h2>
          <span>Write each answer neatly and show every prime-factorisation step.</span>
        </section>

        <section className="notes-practice-list">
          <div><b>1</b><p>Find the HCF and LCM of 96 and 404 by prime factorisation. Verify the product relation.</p><em>3 marks</em></div>
          <div><b>2</b><p>Find the smallest number by which 540 must be multiplied to make it a perfect square.</p><em>2 marks</em></div>
          <div><b>3</b><p>Show that 3√5 is irrational.</p><em>2 marks</em></div>
          <div><b>4</b><p>Prove that 7 + 4√2 is irrational.</p><em>3 marks</em></div>
          <div><b>5</b><p>Two bells ring at intervals of 18 minutes and 24 minutes. If they ring together at 9:00 a.m., when will they next ring together?</p><em>3 marks</em></div>
          <div><b>6</b><p>A school has 144 notebooks and 180 pens. It wants to make the greatest possible number of identical prize packs using all items. Find the number of packs and the contents of each pack.</p><em>4 marks</em></div>
        </section>

        <section className="notes-answer-check">
          <h3>Quick answer check</h3>
          <p><strong>1.</strong> HCF = 4, LCM = 9696</p>
          <p><strong>2.</strong> Multiply by 15</p>
          <p><strong>5.</strong> 10:12 a.m.</p>
          <p><strong>6.</strong> 36 packs; 4 notebooks and 5 pens each</p>
          <small>For Questions 3 and 4, compare your proof with the four-step proof method on page 2.</small>
        </section>

        <section className="notes-final-check">
          <h3>Before submitting any answer</h3>
          <ul><li>Show the prime factorisation.</li><li>State the rule used.</li><li>Keep fractions in lowest form.</li><li>End proofs with a clear conclusion.</li></ul>
        </section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 3 / 3</footer>
      </article>
    </main>
  );
}
