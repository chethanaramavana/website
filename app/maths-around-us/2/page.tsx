import type { Metadata } from 'next';
import { SiteFooter } from '../../brand';
import LearningHeader from '../../learning-header';
import SymmetryQuiz from './symmetry-quiz';
import '../nature.css';

const poster = '/maths-around-us/2-symmetry-poster.png';
const title = 'How many ways can you fold a square?';
const description = 'Fold a piece of paper and see what the crease tells you about symmetry.';

export const metadata: Metadata = {
  title: 'No. 2 · Paper-folding symmetry | Ramavana',
  description,
  alternates: { canonical: '/maths-around-us/2' },
  openGraph: {
    title,
    description,
    url: 'https://ramavanamath.com/maths-around-us/2',
    images: [{ url: poster, width: 1080, height: 1500, alt: 'A square of paper with a dashed crease down the middle' }],
  },
};

export default function SymmetryStory() {
  return (
    <div className="identity-learning">
      <LearningHeader />
      <main className="nature-page rmc-container">
        <a className="nature-back" href="/maths-around-us">← All picture stories</a>
        <header className="nature-opening">
          <p className="rmc-eyebrow">Maths Around Us · No. 2 · <time dateTime="2026-11-11">11 November 2026</time></p>
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="nature-intro-grid">
          <figure className="nature-poster">
            <img src={poster} width="1080" height="1500" alt="A square of paper with a dashed crease down the middle" />
            <figcaption><a href={poster} download>Download the WhatsApp poster ↓</a></figcaption>
          </figure>
          <div className="nature-intro-copy">
            <h2>Try it with paper</h2>
            <p>Take a square of paper. Fold one edge onto the opposite edge, then open it. The crease is a line of symmetry because the two halves match exactly.</p>
            <p>Try another fold. Can you make the corners match too?</p>
            <a className="rmc-button" href="#symmetry-quiz">Try the quiz ↓</a>
          </div>
        </div>
        <SymmetryQuiz />
        <a className="nature-back" href="/maths-around-us/1">← No. 1 · The honeycomb story</a>
      </main>
      <SiteFooter />
    </div>
  );
}
