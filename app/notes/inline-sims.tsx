'use client';
import type { ReactNode } from 'react';
import { RotateSim } from './explore-sims';
import { FoldQuad, Diagonals, TurnQuad, MirrorGrid, FoldFigure, SpinMirror, InkBlot, Pinwheel } from './symmetry-sims';
import { ParityDots, PlusMinus, Remainders, DivisibilityTester, MissingDigit, DigitalRoot, Reversal } from './numberplay-sims';
import './explore-sims.css';

/** Simulations that sit inside a notes session, next to the idea they teach. A lesson names one or more of these keys in its "sims" field. */
const INLINE: Record<string, () => ReactNode> = {
  'fold-figure': () => <FoldFigure />, 'spin-mirror': () => <SpinMirror />, 'fold-quad': () => <FoldQuad />, 'diagonals': () => <Diagonals />,
  'mirror-grid': () => <MirrorGrid />, 'ink-blot': () => <InkBlot />, 'pinwheel': () => <Pinwheel />, 'turn-shape': () => <RotateSim />, 'turn-quad': () => <TurnQuad />,
  'parity-dots': () => <ParityDots />, 'plus-minus': () => <PlusMinus />, 'remainders': () => <Remainders />, 'divisibility': () => <DivisibilityTester />,
  'missing-digit': () => <MissingDigit />, 'digital-root': () => <DigitalRoot />, 'reversal': () => <Reversal />,
};
export default function InlineSims({ ids }: { ids: string[] }) {
  const list = ids.filter((id) => INLINE[id]);
  if (!list.length) return null;
  return <div className="notes-explore ir-inline-sim"><p className="ir-inline-sim-label">Try it yourself</p>{list.map((id) => <div key={id}>{INLINE[id]()}</div>)}</div>;
}
