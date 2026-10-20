'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import Tex from './notes/tex';
import { homepageProblem } from '@/lib/homepage-content';
import { MathsBasicsFeature, ParentValueSection } from './homepage-learning';

export default function Homepage({ signedIn = false }: { signedIn?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="identity-home">
      <a className="rmc-skip" href="#main-content">Skip to content</a>
      <header className="rmc-header rmc-container">
        <a className="rmc-brand" href="/" aria-label="Ramavana Mathematical Centre home">
          <img src="/ramavana-crest-transparent.png" alt="" width="44" height="44" />
          <span><strong>Ramavana</strong><small>Mathematical Centre</small></span>
        </a>
        <button className="rmc-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="homepage-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <nav id="homepage-nav" className={`rmc-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
          <a href="#syllabus">Syllabus</a><a href="/maths-basics">Maths Basics</a><a href="/previous-papers">Past papers</a><a href="#contact">Contact</a>
          <a className="rmc-button rmc-button-outline rmc-login" href="/student">{signedIn ? 'My learning' : 'Log in'}<ArrowUpRight aria-hidden="true" /></a>
        </nav>
      </header>

      <main id="main-content" className="rmc-container">
        <section className="rmc-hero" aria-labelledby="homepage-title">
          <div className="rmc-hero-copy">
            <p className="rmc-authority">Run by professional mathematicians.</p>
            <h1 id="homepage-title">Understand the maths.<br />Prepare for the <span className="rmc-highlight">exam.</span></h1>
            <p className="rmc-intro">Chapter notes explain the concepts. Worked examples show the steps. Exam-style papers give your child a chance to practise before the real test.</p>
            <div className="rmc-actions"><a className="rmc-button" href="#syllabus">Choose your syllabus<ArrowDown aria-hidden="true" /></a><a className="rmc-text-link" href="/maths-basics/numbers">Try a free lesson<ArrowUpRight aria-hidden="true" /></a></div>
            <p className="rmc-curriculum-note">For CBSE and ICSE students.</p>
          </div>
          <figure className="rmc-hero-figure">
            <div className="rmc-art-panel"><img src="/artwork/triangular-dancers.webp" alt="Ten white geometric dancers in rows of one, two, three and four, beneath a gold sun on a navy background" width="1536" height="1024" fetchPriority="high" /></div>
            <figcaption><span><Tex>{'$1 + 2 + 3 + 4 = 10$'}</Tex></span><span>Four rows of dancers form the fourth triangular number.</span></figcaption>
          </figure>
        </section>

        <section className="rmc-weekly" aria-labelledby="weekly-title">
          <div className="rmc-problem-number" aria-label={`Problem number ${homepageProblem.number}`}>No. {homepageProblem.number}</div>
          <div className="rmc-problem-content"><h2 id="weekly-title">This week’s problem</h2><p className="rmc-problem-question"><Tex>{homepageProblem.question}</Tex></p>
            <details className="rmc-solution"><summary>Explore the solution<ArrowRight aria-hidden="true" /></summary><div><p><Tex>{homepageProblem.solution}</Tex></p><p><Tex>{homepageProblem.working}</Tex></p></div></details>
            <span className="rmc-preview-edition">Preview edition · From our problem notebook</span>
          </div>
          <svg className="rmc-problem-sketch" viewBox="0 0 100 100" aria-hidden="true"><defs><pattern id="problem-dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1" fill="#011E47" opacity=".25" /></pattern></defs><rect width="100" height="100" fill="url(#problem-dots)"/><path d="M18 78H78L48 18Z" fill="none" stroke="#011E47" strokeWidth="1.5"/><path d="M18 78H78V18H18Z" fill="none" stroke="#011E47" strokeWidth="1.5" strokeDasharray="3 4"/></svg>
        </section>

        <section id="syllabus" className="rmc-syllabus" aria-labelledby="syllabus-title">
          <div className="rmc-section-heading"><h2 id="syllabus-title">Choose your board</h2></div>
          <div id="study-library" className="rmc-board-grid">
            <a href="/cbse" className="rmc-board-card"><div className="rmc-board-copy"><span className="rmc-eyebrow">Grades 6, 10, 11 &amp; 12</span><h3>CBSE</h3><p>Chapter notes, worked examples<br />{' '}and exam-style practice papers.</p><span className="rmc-card-action">Explore CBSE<ArrowRight aria-hidden="true" /></span></div><BoardFigure kind="triangle" /></a>
            <a href="/icse" className="rmc-board-card"><div className="rmc-board-copy"><span className="rmc-eyebrow">Grade 6</span><h3>ICSE</h3><p>Chapter notes, worked examples<br />{' '}and practice papers for Class 6.</p><span className="rmc-card-action">Explore ICSE<ArrowRight aria-hidden="true" /></span></div><BoardFigure kind="fraction" /></a>
          </div>
          <p className="rmc-coming">IGCSE is on the way. CBSE and ICSE are ready to explore.</p>
        </section>

        <MathsBasicsFeature />
        <ParentValueSection />

        <section id="contact" className="rmc-contact" aria-labelledby="contact-title"><div><p className="rmc-eyebrow">Online, and here in Bengaluru</p><h2 id="contact-title">A place for questions.</h2><p>Visit us near Sobha Daffodil, Haralur,<br />HSR Layout, Bengaluru 560102.</p><a className="rmc-text-link" href="https://www.google.com/maps/search/?api=1&query=Ramavana+Mathematical+Centre+Haralur+Bengaluru" target="_blank" rel="noopener noreferrer">Find us on the map<ArrowUpRight aria-hidden="true" /></a></div><div className="rmc-contact-details"><h3>Let’s talk maths.</h3><p>For classes, learning materials or help<br />with your account, get in touch.</p><a href="tel:+919353928169">+91 93539 28169</a><a href="mailto:chethanamanasa21@gmail.com">chethanamanasa21@gmail.com</a></div></section>
      </main>
      <footer className="rmc-footer rmc-container"><div><span lang="kn">ರಾಮವನ</span><p>Mathematical Centre · Bengaluru</p></div><nav aria-label="Footer navigation"><a href="/teacher">Teacher log in</a><a href="/terms">Terms</a><a href="/privacy-policy">Privacy</a></nav><small>© 2026 Ramavana</small></footer>
    </div>
  );
}

function BoardFigure({ kind }: { kind: 'triangle' | 'fraction' }) {
  return <svg className="rmc-board-figure" viewBox="0 0 180 156" role="img" aria-label={kind === 'triangle' ? 'A right triangle with its perpendicular sides marked' : 'A circle divided into four equal parts, with one quarter shaded'}><defs><pattern id={`board-grid-${kind}`} width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1" fill="#C9D2DF" /></pattern></defs><rect width="180" height="156" fill={`url(#board-grid-${kind})`} />{kind === 'triangle' ? <g stroke="#011E47" strokeWidth="2" fill="none"><path d="M30 120V30L150 120Z" fill="#F4E0AE" fillOpacity=".55"/><path d="M30 103H47V120"/><path d="M30 120L150 120" stroke="#D9A231" strokeWidth="3"/><circle cx="30" cy="30" r="3" fill="#011E47"/><circle cx="150" cy="120" r="3" fill="#011E47"/></g> : <g stroke="#011E47" strokeWidth="2" fill="none"><path d="M90 78V24A54 54 0 0 1 144 78Z" fill="#D9A231" stroke="none"/><circle cx="90" cy="78" r="54"/><path d="M36 78H144M90 24V132"/><circle cx="90" cy="78" r="3" fill="#011E47"/></g>}</svg>;
}
