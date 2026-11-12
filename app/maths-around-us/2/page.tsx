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
            <p>This was a real puzzle in a city called Königsberg. In the picture, each dot is a piece of land. Each line is a bridge.</p>
            <p>Start on any dot. Can you follow all seven lines without using a line twice?</p>
            <details className="nature-sources">
              <summary>Why can’t you finish the walk?</summary>
              <p>Every time you stop somewhere in the middle of the walk, you use one bridge to get in and one to get out. That makes a pair.</p>
              <p>A place with an odd number of bridges has a bridge left over after you make pairs. Your walk has to start or finish there.</p>
              <p>All four places have odd numbers of bridges. A walk has only one start and one finish, so there’s no way to cross all seven just once.</p>
            </details>
            <p>Using dots and lines to study connections is called <strong>graph theory</strong>.</p>
            <a href="https://old.maa.org/press/periodicals/convergence/leonard-eulers-solution-to-the-konigsberg-bridge-problem">See Euler’s original bridge sketch ↗</a>
          </div>
        </div>
        <p><a className="nature-back" href="/maths-around-us/1">← No. 1 · The honeycomb story</a></p>
      </main>
      <SiteFooter />
    </div>
  );
}
