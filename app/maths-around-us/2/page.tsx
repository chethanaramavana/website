import type { Metadata } from 'next';
import { SiteFooter } from '../../brand';
import LearningHeader from '../../learning-header';
import { natureStories } from '@/lib/nature-stories';
import '../nature.css';

const story = natureStories[1];
const pictureAlt = 'Seven lines join four dots. Three lines touch each bank, five touch the island, and three touch the land to the east.';

export const metadata: Metadata = {
  title: 'No. 2 · The walk nobody could finish | Ramavana',
  description: story.description,
  alternates: { canonical: story.href },
  openGraph: {
    title: story.title,
    description: story.description,
    url: 'https://ramavanamath.com/maths-around-us/2',
    images: [{ url: story.poster, width: 1080, height: 1500, alt: pictureAlt }],
  },
};

export default function BridgesStory() {
  return (
    <div className="identity-learning">
      <LearningHeader />
      <main className="nature-page rmc-container">
        <a className="nature-back" href="/maths-around-us">← All picture stories</a>
        <header className="nature-opening">
          <p className="rmc-eyebrow">Maths Around Us · No. 2 · <time dateTime={story.date}>12 November 2026</time></p>
          <h1>{story.title}</h1>
          <p>{story.description}</p>
        </header>
        <div className="nature-intro-grid">
          <figure className="nature-poster">
            <img src={story.poster} width="1080" height="1500" alt={pictureAlt} />
            <figcaption><a href={story.poster} download>Download the picture ↓</a></figcaption>
          </figure>
          <div className="nature-intro-copy">
            <h2>Try it with your finger</h2>
            <p>Long ago, a city called Königsberg had seven bridges. In this picture, the dots show places you can stand. The lines show bridges you can cross.</p>
            <p>Put your finger on any dot. Follow a bridge to the next dot. Can you cross all seven bridges without crossing any bridge twice?</p>
            <details className="nature-sources">
              <summary>Why can’t you finish the walk?</summary>
              <p>Imagine walking onto the island. You use one bridge to get there and one to leave. That uses two bridges. If you come back later, you need two more.</p>
              <p>Look at a dot marked 3. Two bridges make a pair, and one is left over. You can use that extra bridge to start your walk or to finish it.</p>
              <p>The four dots have 3, 3, 3 and 5 bridges. Each has one bridge left over when you make pairs. So all four places need to be a start or a finish. But your walk has only one start and one finish!</p>
            </details>
            <p>We turned a city map into dots and lines. Mathematicians use pictures like this to study how things connect. They call it <strong>graph theory</strong>.</p>
            <a href="https://old.maa.org/press/periodicals/convergence/leonard-eulers-solution-to-the-konigsberg-bridge-problem">See Euler’s original bridge sketch ↗</a>
          </div>
        </div>
        <p><a className="nature-back" href="/maths-around-us/1">← No. 1 · The honeycomb story</a></p>
      </main>
      <SiteFooter />
    </div>
  );
}
