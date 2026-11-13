import type { Metadata } from 'next';
import { SiteFooter } from '../../brand';
import LearningHeader from '../../learning-header';
import { natureStories } from '@/lib/nature-stories';
import '../nature.css';

const story = natureStories[2];
const pictureAlt = 'A red-eyed cicada on tree bark, with the first four multiples of 13 and 17 shown below.';

export const metadata: Metadata = {
  title: 'Did You Know? No. 3 · Cicadas and Prime Numbers | Ramavana',
  description: story.description,
  alternates: { canonical: story.href },
  openGraph: {
    title: story.title,
    description: story.description,
    url: `https://ramavanamath.com${story.href}`,
    images: [{ url: story.poster, width: 1064, height: 1478, alt: pictureAlt }],
  },
};

export default function CicadaStory() {
  return (
    <div className="identity-learning">
      <LearningHeader />
      <main className="nature-page rmc-container">
        <a className="nature-back" href="/maths-around-us">← All picture stories</a>
        <header className="nature-opening">
          <p className="rmc-eyebrow">Did You Know? · No. 3 · <time dateTime={story.date}>13 November 2026</time></p>
          <h1>{story.title}</h1>
          <p>{story.description}</p>
        </header>
        <div className="nature-intro-grid">
          <figure className="nature-poster">
            <img src={story.poster} width="1064" height="1478" alt={pictureAlt} />
            <figcaption><a href={story.poster} download>Download the WhatsApp poster ↓</a></figcaption>
          </figure>
          <div className="nature-intro-copy">
            <h2>Under the trees, a long wait</h2>
            <p>Imagine walking through a quiet woodland. Beneath your feet, young cicadas are feeding on tree roots. Years pass. Then one spring, thousands climb out together and the woods buzz with their calls.</p>
            <p>Some periodical cicadas in eastern North America emerge every <strong>13 years</strong>. Others emerge every <strong>17 years</strong>. Both are prime numbers. A prime is a whole number greater than 1 whose only positive factors are 1 and itself.</p>
            <p>Imagine both groups come out this year. When will their calendars line up again?</p>
            <details className="nature-sources">
              <summary>See the answer</summary>
              <p><strong>221 years later.</strong> The first group's next appearances fall at multiples of 13, and the second group's at multiples of 17. Since 13 and 17 are different primes, a year that is a multiple of both must contain both factors. The first is 13 × 17 = 221.</p>
            </details>
            <p><a href="https://www.britannica.com/video/did-you-know-17-year-cicada/-254395">Watch the video about 17-year cicadas on Encyclopaedia Britannica ↗</a></p>
          </div>
        </div>
        <section className="nature-investigation" aria-labelledby="cycle-heading">
          <h2 id="cycle-heading">Why shared factors matter</h2>
          <p>Imagine a predator whose numbers peak every 4 years, starting in the year the cicadas emerge. On a 12-year schedule, every cicada emergence lines up with a peak because 12 is a multiple of 4.</p>
          <p>Try 13 years instead. The cicadas emerge in years 13, 26, 39 and 52. The first of those years that is also a multiple of 4 is <strong>52</strong>. The two schedules share no factor greater than 1, so the first overlap is 13 × 4.</p>
          <p>Researchers have used models like this to explore whether rarer overlaps could have helped shape cicada cycles. Predator timing is one hypothesis. <a href="https://www.aimsciences.org/article/doi/10.3934/dcdsb.2001.1.387">Read the mathematical research ↗</a></p>
          <p><a href="https://naturalhistory.si.edu/education/teaching-resources/life-science/periodical-cicadas">Explore periodical cicadas at the Smithsonian ↗</a></p>
        </section>
        <a className="nature-back" href="/maths-around-us/2">← No. 2 · The seven bridges</a>
      </main>
      <SiteFooter />
    </div>
  );
}
