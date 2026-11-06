'use client';
import {useEffect, useState} from 'react';

const DEFAULT_KEY = 'ramavana-integrals-ticks';
function read(KEY: string): number[] { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v.filter((n) => Number.isInteger(n)) : []; } catch { return []; } }
function write(KEY: string, v: number[]) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage blocked: the tick lasts for this visit only */ } window.dispatchEvent(new CustomEvent(KEY, {detail: v})); }
function useTicks(KEY: string) {
  const [ticks, setTicks] = useState<number[]>([]);
  useEffect(() => {
    const load = (e?: Event) => setTicks(e instanceof CustomEvent && Array.isArray(e.detail) ? e.detail : read(KEY));
    load();
    window.addEventListener(KEY, load); window.addEventListener('storage', load);
    return () => { window.removeEventListener(KEY, load); window.removeEventListener('storage', load); };
  }, [KEY]);
  return ticks;
}

/** A large tick box at the end of each session. The student ticks it after understanding the session. */
export function SessionTick({index, total, storeKey = DEFAULT_KEY}: {index: number; total: number; storeKey?: string}) {
  const ticks = useTicks(storeKey), done = ticks.includes(index);
  const toggle = () => write(storeKey, done ? ticks.filter((t) => t !== index) : [...ticks, index].sort((a, b) => a - b));
  const left = total - ticks.filter((t) => t < total).length - (done ? 0 : 1);
  return <div className={`ir-tick${done ? ' is-done' : ''}`}>
    <button type="button" aria-pressed={done} onClick={toggle}>
      <span className="ir-box" aria-hidden="true">{done ? '✓' : ''}</span>
      <span><strong>{done ? `Session ${index + 1} complete!` : `I understand session ${index + 1}`}</strong>
        <small>{done ? (left <= 0 ? 'You have completed every session. Brilliant work!' : `Great work. ${left} session${left === 1 ? '' : 's'} to go.`) : 'Tick this box when you can solve the examples without looking.'}</small></span>
    </button>
  </div>;
}

/** A sticky progress bar with one chip for each session. */
export function SessionProgress({titles, storeKey = DEFAULT_KEY}: {titles: string[]; storeKey?: string}) {
  const ticks = useTicks(storeKey), done = ticks.filter((t) => t < titles.length).length, pct = Math.round(done / titles.length * 100);
  return <div className="ir-progress" aria-label="Your progress">
    <div className="ir-progress-top"><strong>Your progress</strong><span>{done} of {titles.length} sessions ticked · {pct}%</span></div>
    <div className="ir-bar" role="progressbar" aria-valuemin={0} aria-valuemax={titles.length} aria-valuenow={done}><span style={{width: `${pct}%`}} /></div>
    <ol className="ir-chips">{titles.map((t, i) => <li key={t}><a href={`#session-${i + 1}`} title={t} className={ticks.includes(i) ? 'is-done' : ''}>{ticks.includes(i) ? '✓' : i + 1}</a></li>)}</ol>
  </div>;
}
