'use client';
import { useState } from 'react';

type Mirror = 'v' | 'h' | 'd' | 'vh';
/** A complete-the-figure puzzle: some squares are given; the student colours their mirror images and checks the answer. */
export default function MirrorPuzzle({ n, mirror, given }: { n: number; mirror: Mirror; given: number[][] }) {
  const key = (r: number, c: number) => r * n + c;
  const images = (r: number, c: number): [number, number][] => mirror === 'v' ? [[r, n - 1 - c]] : mirror === 'h' ? [[n - 1 - r, c]] : mirror === 'd' ? [[c, r]] : [[r, n - 1 - c], [n - 1 - r, c], [n - 1 - r, n - 1 - c]];
  const givenSet = new Set(given.map(([r, c]) => key(r, c)));
  const target = new Set(given.flatMap(([r, c]) => images(r, c).map(([a, b]) => key(a, b))).filter((k) => !givenSet.has(k)));
  const editable = (r: number, c: number) => !givenSet.has(key(r, c)) && (mirror === 'v' ? c >= n / 2 : mirror === 'h' ? r >= n / 2 : mirror === 'd' ? r > c : r >= n / 2 || c >= n / 2);
  const [on, setOn] = useState<Set<number>>(new Set()), [result, setResult] = useState(''), [shown, setShown] = useState(false);
  const toggle = (r: number, c: number) => { if (!editable(r, c) || shown) return; const k = key(r, c), s = new Set(on); if (s.has(k)) s.delete(k); else s.add(k); setOn(s); setResult(''); };
  const check = () => {
    const missing = [...target].filter((k) => !on.has(k)).length, extra = [...on].filter((k) => !target.has(k)).length;
    setResult(missing === 0 && extra === 0 ? 'Correct! The red line is now a line of symmetry.' : `Not yet: ${missing} square${missing === 1 ? '' : 's'} missing and ${extra} extra square${extra === 1 ? '' : 's'}. A square and its image must be the same distance from the mirror.`);
  };
  const S = 34, x0 = 300 - (n * S) / 2, y0 = 12, end = y0 + n * S;
  const mirrorPaths = mirror === 'v' ? [`M300 ${y0 - 8}V${end + 8}`] : mirror === 'h' ? [`M${x0 - 8} ${y0 + (n * S) / 2}H${x0 + n * S + 8}`] : mirror === 'd' ? [`M${x0 - 8} ${y0 - 8}L${x0 + n * S + 8} ${end + 8}`] : [`M300 ${y0 - 8}V${end + 8}`, `M${x0 - 8} ${y0 + (n * S) / 2}H${x0 + n * S + 8}`];
  return <div className="ws-puzzle">
    <svg viewBox={`0 0 600 ${n * S + 24}`} role="img" aria-label="Complete the figure">
      {Array.from({ length: n * n }, (_, k) => { const r = Math.floor(k / n), c = k % n, g = givenSet.has(k), mine = on.has(k) || (shown && target.has(k));
        return <rect key={k} x={x0 + c * S} y={y0 + r * S} width={S} height={S} fill={g ? '#8fd0f7' : mine ? '#ffc46b' : editable(r, c) ? '#fff' : '#f1f4f8'} stroke="#c9d3df" onClick={() => toggle(r, c)} style={{ cursor: editable(r, c) ? 'pointer' : 'default' }} />; })}
      {mirrorPaths.map((d) => <path key={d} d={d} stroke="#c2432b" strokeWidth="4" strokeDasharray="10 6" pointerEvents="none" />)}
    </svg>
    <div className="ws-puzzle-actions">
      <button type="button" onClick={check} disabled={shown}>Check</button>
      <button type="button" onClick={() => { setOn(new Set()); setResult(''); setShown(false); }}>Clear</button>
      <button type="button" onClick={() => { setShown(true); setResult('The orange squares show the answer.'); }}>Show the answer</button>
    </div>
    {result && <p role="status" className="ws-puzzle-result">{result}</p>}
  </div>;
}
