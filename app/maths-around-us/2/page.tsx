import type { Metadata } from 'next';
import { SiteFooter } from '../../brand';
import LearningHeader from '../../learning-header';
import '../nature.css';

const title = 'The other half of a rainbow';
const description = 'A rainbow can make a full circle. A single angle explains why.';
const poster = '/maths-around-us/2-rainbow-poster.png';
const photo = 'https://science.nasa.gov/image-article/apod-2022-december-27-a-full-circle-rainbow-over-norway/';

export const metadata: Metadata = {
  title: 'No. 2 · The other half of a rainbow | Ramavana',
  description,
  alternates: { canonical: '/maths-around-us/2' },
  openGraph: {
    title,
    description,
    url: 'https://ramavanamath.com/maths-around-us/2',
    images: [{ url: poster, width: 1080, height: 1500, alt: 'A bright rainbow arch with a dashed line completing the circle' }],
  },
};

export default function RainbowStory() {
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
            <img src={poster} width="1080" height="1500" alt="A bright rainbow arch above the horizon. A dashed arc below the horizon completes the circle." />
            <figcaption><a href={poster} download>Download the picture ↓</a></figcaption>
          </figure>
          <div className="nature-intro-copy" id="symmetry-quiz">
            <h2>A circle drawn by light</h2>
            <p>Imagine the Sun behind you. The rainbow is centred on the point directly opposite the Sun.</p>
            <p>Its outer red edge sits about <strong>42°</strong> from that centre in every direction. The same angle all the way around traces a circle.</p>
            <p>From the ground, you usually see only the upper arc. From high above, sunlit droplets below you can reveal the rest.</p>
            <a className="rmc-button" href={photo}>See a full-circle rainbow over Norway ↗</a>
          </div>
        </div>
        <p><a className="nature-back" href="/maths-around-us/1">← No. 1 · The honeycomb story</a></p>
      </main>
      <SiteFooter />
    </div>
  );
}
