import type { Metadata } from 'next';
import { SiteFooter } from '../../brand';
import LearningHeader from '../../learning-header';
import PizzaQuiz from './pizza-quiz';
import '../nature.css';
import './pizza.css';

const title = 'One big pizza or two small ones?';
const description = 'If the pizzas are equally thick, which order gives you more?';
const poster = '/maths-around-us/2-pizza-poster.png';

export const metadata: Metadata = {
  title: 'No. 2 · The pizza puzzle | Ramavana',
  description,
  alternates: { canonical: '/maths-around-us/2' },
  openGraph: {
    title,
    description,
    url: 'https://ramavanamath.com/maths-around-us/2',
    images: [{ url: poster, width: 1080, height: 1500, alt: 'One 12-inch pizza beside two 8-inch pizzas' }],
  },
};

export default function PizzaStory() {
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
        <PizzaQuiz />
        <p><a href={poster} download>Download the WhatsApp poster ↓</a></p>
        <a className="nature-back" href="/maths-around-us/1">← No. 1 · The honeycomb story</a>
      </main>
      <SiteFooter />
    </div>
  );
}
