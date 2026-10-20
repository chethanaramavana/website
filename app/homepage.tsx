'use client';

import { useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import WeeklyProblemBoard from './weekly-problem';
import { MathsBasicsFeature, ParentValueSection } from './homepage-learning';
import HomepageConcepts from './homepage-concepts';
import Brand, { SiteFooter } from './brand';

export default function Homepage({ signedIn = false }: { signedIn?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="identity-home">
      <a className="rmc-skip" href="#main-content">Skip to content</a>
      <header className="rmc-header rmc-container">
        <Brand />
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
          <HomepageConcepts />
        </section>

        <WeeklyProblemBoard />

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
      <SiteFooter />
    </div>
  );
}

function BoardFigure({ kind }: { kind: 'triangle' | 'fraction' }) {
  return <svg className="rmc-board-figure" viewBox="0 0 180 156" role="img" aria-label={kind === 'triangle' ? 'A right triangle with its perpendicular sides marked' : 'A circle divided into four equal parts, with one quarter shaded'}><defs><pattern id={`board-grid-${kind}`} width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r="1" fill="#C9D2DF" /></pattern></defs><rect width="180" height="156" fill={`url(#board-grid-${kind})`} />{kind === 'triangle' ? <g stroke="#011E47" strokeWidth="2" fill="none"><path d="M30 120V30L150 120Z" fill="#F4E0AE" fillOpacity=".55"/><path d="M30 103H47V120"/><path d="M30 120L150 120" stroke="#D9A231" strokeWidth="3"/><circle cx="30" cy="30" r="3" fill="#011E47"/><circle cx="150" cy="120" r="3" fill="#011E47"/></g> : <g stroke="#011E47" strokeWidth="2" fill="none"><path d="M90 78V24A54 54 0 0 1 144 78Z" fill="#D9A231" stroke="none"/><circle cx="90" cy="78" r="54"/><path d="M36 78H144M90 24V132"/><circle cx="90" cy="78" r="3" fill="#011E47"/></g>}</svg>;
}
