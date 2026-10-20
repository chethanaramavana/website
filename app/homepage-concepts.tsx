'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';
import Tex from './notes/tex';

const concepts = [
  {
    topic: 'Number patterns',
    formula: '$1 + 2 + 3 + 4 = 10$',
    explanation: 'Count each row. Ten dancers form the fourth triangular number.',
    label: 'Counting a triangular number',
  },
  {
    topic: 'Geometry',
    formula: '$3^2 + 4^2 = 5^2$',
    explanation: 'The two smaller squares have the same total area as the largest. That is Pythagoras’ theorem.',
    label: 'Seeing Pythagoras’ theorem',
  },
  {
    topic: 'Calculus',
    formula: '$\\int_0^1 x^2\\,dx = \\frac{1}{3}$',
    explanation: 'An integral measures the area under a curve. Add thinner strips to get closer to the shaded area.',
    label: 'Picturing an integral',
  },
] as const;

export default function HomepageConcepts() {
  const [index, setIndex] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [announcement, setAnnouncement] = useState('');
  const region = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Choose once after hydration: no server/client mismatch or fixed first slide.
    setIndex(crypto.getRandomValues(new Uint32Array(1))[0] % concepts.length);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPlaying(!motion.matches);
    const onMotion = () => { if (motion.matches) setPlaying(false); };
    const onVisibility = () => setVisible(!document.hidden);
    onVisibility();
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.15 });
    if (region.current) observer.observe(region.current);
    return () => {
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (index === null || !playing || hovered || !visible || !inView) return;
    const timer = window.setInterval(() => setIndex(current => ((current ?? 0) + 1) % concepts.length), 9000);
    return () => window.clearInterval(timer);
  }, [index, playing, hovered, visible, inView]);

  function choose(next: number) {
    const wrapped = (next + concepts.length) % concepts.length;
    setIndex(wrapped);
    setPlaying(false);
    setAnnouncement(`${concepts[wrapped].topic}. ${wrapped + 1} of ${concepts.length}.`);
  }

  const concept = concepts[index ?? 0];
  return (
    <div ref={region} className="rmc-concept-carousel" role="region" aria-roledescription="carousel" aria-label="Mathematics made visible: patterns, geometry and calculus"
      data-rotation-state={index === null ? 'loading' : !playing ? 'paused' : hovered ? 'hover' : !visible ? 'hidden' : !inView ? 'offscreen' : 'playing'}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      onFocusCapture={event => { if (!(event.target as HTMLElement).closest('[data-carousel-toggle]')) setPlaying(false); }}>
      <figure className="rmc-hero-figure" aria-live="off">
        <div className="rmc-art-panel rmc-concept-panel" aria-busy={index === null}>
          {index === null ? <div className="rmc-concept-loading">Three ways to see the maths.</div> :
            <div key={index} className="rmc-concept-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${concepts.length}: ${concept.label}`}>
              {index === 0 ? <img src="/artwork/triangular-dancers.webp" alt="Ten white geometric dancers in rows of one, two, three and four" width="1536" height="1024" fetchPriority="high" /> : index === 1 ? <PythagorasPicture /> : <IntegralPicture />}
            </div>}
        </div>
        <figcaption className="rmc-concept-caption">
          <p className="rmc-concept-topic">{index === null ? 'Mathematics, pictured' : concept.topic}</p>
          <p className="rmc-concept-formula">{index === null ? '\u00a0' : <Tex>{concept.formula}</Tex>}</p>
          <p className="rmc-concept-explanation">{index === null ? 'From a pattern you can count to an area you can measure.' : concept.explanation}</p>
        </figcaption>
      </figure>
      <div className="rmc-concept-controls" aria-label="Choose a mathematical concept">
        <button type="button" onClick={() => choose((index ?? 0) - 1)} aria-label="Previous concept"><ArrowLeft aria-hidden="true" /></button>
        <div className="rmc-concept-dots">{concepts.map((item, i) => <button key={item.topic} type="button" aria-label={`Show ${item.topic.toLowerCase()}`} aria-pressed={index === i} onClick={() => choose(i)}><span /></button>)}</div>
        <button type="button" className="rmc-concept-play" data-carousel-toggle onClick={() => setPlaying(current => !current)} aria-label={playing ? 'Pause concept rotation' : 'Play concept rotation'}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}</button>
        <button type="button" onClick={() => choose((index ?? 0) + 1)} aria-label="Next concept"><ArrowRight aria-hidden="true" /></button>
      </div>
      <span className="rmc-visually-hidden" role="status">{announcement}</span>
    </div>
  );
}

function PythagorasPicture() {
  return <svg viewBox="0 0 480 320" role="img" aria-label="A right triangle with sides three, four and five. The squares on its sides have areas nine, sixteen and twenty-five; nine plus sixteen equals twenty-five.">
    <defs><pattern id="pythagoras-grid" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r=".8" fill="#C9D2DF" opacity=".2" /></pattern></defs>
    <rect width="480" height="320" fill="#011E47" /><rect x="44" y="10" width="352" height="300" fill="url(#pythagoras-grid)" />
    <path d="M80 118H152V190H80Z" fill="#B0300E" stroke="white" strokeWidth="1.5" />
    <path d="M152 190H248V286H152Z" fill="#D9A231" stroke="white" strokeWidth="1.5" />
    <path d="M152 118L248 190L320 94L224 22Z" fill="#F4E0AE" fillOpacity=".16" stroke="white" strokeWidth="1.5" />
    <path d="M152 118L248 190H152ZM152 178H164V190" fill="none" stroke="white" strokeWidth="1.5" />
    <g fill="white" fontFamily="'Source Serif 4', Georgia, serif" fontSize="24" textAnchor="middle"><text x="116" y="162">9</text><text x="236" y="114">25</text></g>
    <text x="200" y="247" fill="#011E47" fontFamily="'Source Serif 4', Georgia, serif" fontSize="24" textAnchor="middle">16</text>
  </svg>;
}

function IntegralPicture() {
  return <svg viewBox="0 0 480 320" role="img" aria-label="The curve y equals x squared between zero and one. Its shaded area is one third. Eight rectangles approximate the area from below.">
    <defs><pattern id="integral-grid" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="6" cy="6" r=".8" fill="#C9D2DF" opacity=".2" /></pattern></defs>
    <rect width="480" height="320" fill="#011E47" /><rect x="52" y="32" width="380" height="250" fill="url(#integral-grid)" />
    <path d="M64 270Q240 270 416 70V270Z" fill="#F4E0AE" fillOpacity=".25" />
    {Array.from({ length: 8 }, (_, i) => { const height = 200 * (i / 8) ** 2; return <rect key={i} x={64 + 44 * i} y={270 - height} width="44" height={height} fill="white" fillOpacity=".08" stroke="white" strokeOpacity=".6" strokeWidth="1" />; })}
    <path d="M46 270H438M64 290V40" fill="none" stroke="white" strokeWidth="1.5" />
    <path d="M64 270Q240 270 416 70" fill="none" stroke="#D9A231" strokeWidth="3" />
    <path d="M64 70H416V270" fill="none" stroke="white" strokeOpacity=".35" strokeDasharray="4 5" />
    <g fill="white" fontFamily="'Source Serif 4', Georgia, serif" fontSize="17"><text x="47" y="291">0</text><text x="411" y="293">1</text><text x="45" y="76">1</text><text x="325" y="52">y = x²</text><text x="318" y="231">Area</text></g>
  </svg>;
}
