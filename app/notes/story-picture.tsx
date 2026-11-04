import type { ReactElement } from 'react';

/** Picture types for story-style study notes. Each lesson can describe one picture as data. */
export type StoryPictureSpec =
  | { kind: 'numberline'; from: number; to: number; step?: number; points?: { value: number; label?: string; gold?: boolean }[]; jumps?: { from: number; to: number; label?: string }[]; caption?: string }
  | { kind: 'placevalue'; heads: string[]; digits: string[]; gold?: number[]; caption?: string }
  | { kind: 'fraction'; rows: { parts: number; shaded: number; label?: string; gold?: boolean }[]; caption?: string }
  | { kind: 'area'; rows: number; cols: number; shadeRows: number; shadeCols: number; label?: string; caption?: string }
  | { kind: 'balance'; left: string; right: string; caption?: string }
  | { kind: 'dotplot'; values: number[]; min: number; max: number; mark?: { value: number; label: string }; caption?: string }
  | { kind: 'flow'; steps: string[]; caption?: string }
  | { kind: 'table'; rows: string[][]; head?: boolean; gold?: [number, number][]; caption?: string }
  | { kind: 'tokens'; positive: number; negative: number; caption?: string }
  | { kind: 'crossing'; labels: [string, string, string, string]; caption?: string }
  | { kind: 'transversal'; labels: string[]; caption?: string }
  | { kind: 'triangle'; vertices?: [string, string, string]; sides?: [string, string, string]; angles?: [string, string, string]; altitude?: boolean; caption?: string }
  | { kind: 'tiles'; shape: 'triangle' | 'square' | 'hexagon' | 'pentagon'; caption?: string }
  | { kind: 'tree'; root: string; children: { label: string; children?: string[] }[]; caption?: string }
  | { kind: 'sticks'; squares: number; caption?: string }
  | { kind: 'bars'; labels: string[]; values: number[]; gold?: number; caption?: string }
  | { kind: 'compare'; left: { title: string; lines: string[] }; right: { title: string; lines: string[] }; caption?: string };

const W = 640;
const arrowHead = (x: number, y: number, dir: 1 | -1, key?: string) => (
  <path key={key} d={`M${x} ${y} l${-12 * dir} -7 v14 Z`} className="visual-accent-fill" />
);

function wrap(text: string, max: number) {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max && line) { lines.push(line); line = word; } else { line = (line + ' ' + word).trim(); }
  }
  if (line) lines.push(line);
  return lines;
}

function NumberLine({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'numberline' }> }) {
  const { from, to } = spec;
  const step = spec.step ?? 1;
  const left = 50, right = W - 50, y = 190;
  const x = (v: number) => left + ((v - from) / (to - from)) * (right - left);
  const ticks: number[] = [];
  for (let v = from; v <= to + 1e-9; v += step) ticks.push(Math.round(v * 1000) / 1000);
  const showEvery = ticks.length > 14 ? Math.ceil(ticks.length / 12) : 1;
  return <>
    <path d={`M${left - 20} ${y}H${right + 20}`} className="visual-line" />
    {arrowHead(right + 26, y, 1)}{arrowHead(left - 26, y, -1)}
    {ticks.map((v, i) => <g key={v}><path d={`M${x(v)} ${y - 8}V${y + 8}`} className="visual-line" />{i % showEvery === 0 && <text x={x(v)} y={y + 32} textAnchor="middle" className="visual-small">{String(v).replace('-', '−')}</text>}</g>)}
    {(spec.jumps ?? []).map((j, i) => {
      const x1 = x(j.from), x2 = x(j.to), mid = (x1 + x2) / 2, h = 46 + (i % 2) * 34;
      return <g key={`j${i}`}>
        <path d={`M${x1} ${y - 10}Q${mid} ${y - 10 - h * 2} ${x2} ${y - 10}`} className="visual-accent" />
        {arrowHead(x2, y - 10, x2 > x1 ? 1 : -1)}
        {j.label && <text x={mid} y={y - 18 - h} textAnchor="middle" className="visual-label">{j.label}</text>}
      </g>;
    })}
    {(spec.points ?? []).map((p, i) => <g key={`p${i}`}>
      <circle cx={x(p.value)} cy={y} r="8" className={p.gold ? 'visual-dot-gold' : 'visual-dot'} />
      {p.label && <text x={x(p.value)} y={y + 58} textAnchor="middle" className="visual-label">{p.label}</text>}
    </g>)}
  </>;
}

function PlaceValue({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'placevalue' }> }) {
  const n = spec.heads.length, gap = 8, w = Math.min(110, (W - 40 - gap * (n - 1)) / n), start = (W - (w * n + gap * (n - 1))) / 2;
  return <>{spec.heads.map((h, i) => {
    const gold = spec.gold?.includes(i);
    return <g key={h + i}>
      <rect x={start + i * (w + gap)} y={70} width={w} height={150} rx="12" className={gold ? 'visual-card-gold' : 'visual-card'} />
      {wrap(h, Math.max(5, Math.floor(w / 8))).map((line, k) => <text key={k} x={start + i * (w + gap) + w / 2} y={96 + k * 16} textAnchor="middle" className="visual-small" style={n > 6 ? { fontSize: 11 } : undefined}>{line}</text>)}
      <text x={start + i * (w + gap) + w / 2} y={180} textAnchor="middle" className="visual-number">{spec.digits[i] ?? ''}</text>
    </g>;
  })}</>;
}

function Fraction({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'fraction' }> }) {
  const rows = spec.rows, h = Math.min(44, 220 / rows.length), left = 150, width = 430;
  return <>{rows.map((r, i) => {
    const y = 40 + i * (h + 14), pw = width / r.parts;
    return <g key={i}>
      {r.label && <text x={left - 14} y={y + h / 2 + 6} textAnchor="end" className="visual-label">{r.label}</text>}
      {Array.from({ length: r.parts }, (_, k) => <rect key={k} x={left + k * pw} y={y} width={pw} height={h} className={k < r.shaded ? (r.gold ? 'visual-fraction-gold' : 'visual-fraction-fill') : 'visual-fraction-empty'} />)}
    </g>;
  })}</>;
}

function Area({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'area' }> }) {
  const size = Math.min(40, 220 / Math.max(spec.rows, spec.cols)), left = (W - size * spec.cols) / 2, top = 40;
  const cells = [];
  for (let r = 0; r < spec.rows; r++) for (let c = 0; c < spec.cols; c++) {
    const both = r < spec.shadeRows && c < spec.shadeCols, one = r < spec.shadeRows || c < spec.shadeCols;
    cells.push(<rect key={`${r}-${c}`} x={left + c * size} y={top + r * size} width={size} height={size} className={both ? 'visual-fraction-gold' : one ? 'visual-fraction-fill' : 'visual-fraction-empty'} />);
  }
  return <>{cells}{spec.label && <text x={W / 2} y={top + spec.rows * size + 30} textAnchor="middle" className="visual-label">{spec.label}</text>}</>;
}

function Balance({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'balance' }> }) {
  return <>
    <path d="M320 80V250M250 250H390" className="visual-line" />
    <path d="M140 95H500" className="visual-line" /><circle cx="320" cy="90" r="9" className="visual-node" />
    <path d="M160 95L120 170H240L200 95M440 95L400 170H520L480 95" className="visual-guide" />
    <rect x="95" y="170" width="170" height="54" rx="12" className="visual-card" /><rect x="375" y="170" width="170" height="54" rx="12" className="visual-card-gold" />
    <text x="180" y="204" textAnchor="middle" className="visual-label">{spec.left}</text>
    <text x="460" y="204" textAnchor="middle" className="visual-label">{spec.right}</text>
    <text x="320" y="60" textAnchor="middle" className="visual-small">both sides weigh the same</text>
  </>;
}

function DotPlot({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'dotplot' }> }) {
  const left = 60, right = W - 60, y = 230, x = (v: number) => left + ((v - spec.min) / (spec.max - spec.min)) * (right - left);
  const counts: Record<string, number> = {};
  const dots = spec.values.map((v) => { counts[v] = (counts[v] ?? 0) + 1; return <circle key={`${v}-${counts[v]}`} cx={x(v)} cy={y - 18 - (counts[v] - 1) * 22} r="9" className="visual-dot" />; });
  const tickStep = spec.max - spec.min > 20 ? 5 : spec.max - spec.min > 12 ? 2 : 1;
  const ticks = []; for (let v = spec.min; v <= spec.max; v += tickStep) ticks.push(v);
  return <>
    <path d={`M${left - 10} ${y}H${right + 10}`} className="visual-line" />
    {ticks.map((v) => <g key={v}><path d={`M${x(v)} ${y}v8`} className="visual-line" /><text x={x(v)} y={y + 28} textAnchor="middle" className="visual-small">{v}</text></g>)}
    {dots}
    {spec.mark && <g><path d={`M${x(spec.mark.value)} ${y + 2}V40`} className="visual-symmetry-line" /><text x={x(spec.mark.value)} y={32} textAnchor="middle" className="visual-label">{spec.mark.label}</text></g>}
  </>;
}

function Flow({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'flow' }> }) {
  const n = spec.steps.length, gap = 26, w = (W - 30 - gap * (n - 1)) / n;
  return <>{spec.steps.map((s, i) => {
    const x = 15 + i * (w + gap);
    return <g key={i}>
      <rect x={x} y={80} width={w} height={130} rx="14" className={i === n - 1 ? 'visual-card-gold' : 'visual-card'} />
      <circle cx={x + 22} cy={80} r="15" className={i === n - 1 ? 'visual-node-gold' : 'visual-node'} /><text x={x + 22} y={85} textAnchor="middle" className="visual-node-text">{i + 1}</text>
      {wrap(s, Math.max(8, Math.floor(w / 8.5))).slice(0, 5).map((line, k) => <text key={k} x={x + w / 2} y={118 + k * 20} textAnchor="middle" className="visual-small">{line}</text>)}
      {i < n - 1 && <><path d={`M${x + w + 4} 145h${gap - 10}`} className="visual-arrow" />{arrowHead(x + w + gap - 2, 145, 1)}</>}
    </g>;
  })}</>;
}

function Table({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'table' }> }) {
  const rows = spec.rows.length, cols = Math.max(...spec.rows.map((r) => r.length));
  const cw = Math.min(110, (W - 60) / cols), rh = Math.min(48, 240 / rows), left = (W - cw * cols) / 2, top = (300 - rh * rows) / 2;
  return <>{spec.rows.map((row, r) => row.map((cell, c) => {
    const gold = spec.gold?.some(([gr, gc]) => gr === r && gc === c), head = spec.head && r === 0;
    return <g key={`${r}-${c}`}>
      <rect x={left + c * cw} y={top + r * rh} width={cw} height={rh} className={gold ? 'visual-card-gold' : head ? 'visual-card' : 'visual-fraction-empty'} />
      <text x={left + c * cw + cw / 2} y={top + r * rh + rh / 2 + 6} textAnchor="middle" className={head ? 'visual-small' : 'visual-label'}>{cell}</text>
    </g>;
  }))}</>;
}

function Tokens({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'tokens' }> }) {
  const pairs = Math.min(spec.positive, spec.negative), all: ('+' | '−')[] = [...Array(spec.positive).fill('+'), ...Array(spec.negative).fill('−')];
  let pi = 0, ni = 0;
  return <>{all.map((t, i) => {
    const idx = t === '+' ? pi++ : ni++, x = 70 + idx * 52, y = t === '+' ? 110 : 190, paired = idx < pairs;
    return <g key={i} opacity={paired ? 0.45 : 1}>
      <circle cx={x} cy={y} r="21" className={t === '+' ? 'visual-node' : 'visual-node-gold'} />
      <text x={x} y={y + 6} textAnchor="middle" className="visual-node-text">{t}</text>
    </g>;
  })}
  {pairs > 0 && Array.from({ length: pairs }, (_, k) => <path key={`z${k}`} d={`M${70 + k * 52} 134V166`} className="visual-symmetry-line" />)}
  <text x="70" y="60" className="visual-small">{pairs > 0 ? `each + and − pair makes 0 (${pairs} pairs)` : 'tokens'}</text></>;
}

function Crossing({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'crossing' }> }) {
  const [top, right, bottom, left] = spec.labels;
  return <>
    <path d="M150 250L490 50M150 50L490 250" className="visual-line" />
    <circle cx="320" cy="150" r="6" className="visual-dot" />
    <text x="320" y="105" textAnchor="middle" className="visual-label">{top}</text>
    <text x="395" y="156" textAnchor="middle" className="visual-label">{right}</text>
    <text x="320" y="210" textAnchor="middle" className="visual-label">{bottom}</text>
    <text x="245" y="156" textAnchor="middle" className="visual-label">{left}</text>
  </>;
}

function Transversal({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'transversal' }> }) {
  const l = spec.labels; const pos = [[-34, -12], [30, -12], [-34, 30], [30, 30]];
  // The transversal rises to the right, so the top-right and bottom-left angles at each crossing are the acute ones.
  const p1 = [380, 95], p2 = [260, 215];
  return <>
    <path d="M60 95H580M60 215H580" className="visual-line" /><path d="M200 275L440 35" className="visual-accent" />
    <text x="585" y="100" className="visual-small">l</text><text x="585" y="220" className="visual-small">m</text><text x="446" y="40" className="visual-small">t</text>
    {[p1, p2].map((p, k) => pos.map((d, i) => <text key={`${k}-${i}`} x={p[0] + d[0]} y={p[1] + d[1]} textAnchor="middle" className="visual-label">{l[k * 4 + i] ?? ''}</text>))}
  </>;
}

function Triangle({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'triangle' }> }) {
  const v = spec.vertices ?? ['A', 'B', 'C'];
  return <>
    <path d="M320 45L140 245H500Z" className="visual-shape" />
    <text x="320" y="35" textAnchor="middle" className="visual-label">{v[0]}</text><text x="122" y="262" className="visual-label">{v[1]}</text><text x="508" y="262" className="visual-label">{v[2]}</text>
    {spec.sides && <><text x="210" y="140" textAnchor="end" className="visual-label">{spec.sides[0]}</text><text x="320" y="275" textAnchor="middle" className="visual-label">{spec.sides[1]}</text><text x="430" y="140" className="visual-label">{spec.sides[2]}</text></>}
    {spec.altitude && <><path d="M320 45V245" className="visual-symmetry-line" /><path d="M320 225h20v20" className="visual-gold" /><text x="330" y="150" className="visual-small">altitude</text></>}
    {spec.angles && <><text x="320" y="92" textAnchor="middle" className="visual-small">{spec.angles[0]}</text><text x="190" y="236" className="visual-small">{spec.angles[1]}</text><text x="450" y="236" textAnchor="end" className="visual-small">{spec.angles[2]}</text></>}
  </>;
}

function Tiles({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'tiles' }> }) {
  const shapes: ReactElement[] = [];
  if (spec.shape === 'square') for (let r = 0; r < 4; r++) for (let c = 0; c < 8; c++) shapes.push(<rect key={`${r}${c}`} x={90 + c * 58} y={40 + r * 58} width="58" height="58" className={(r + c) % 2 ? 'visual-shape' : 'visual-shape-gold'} />);
  if (spec.shape === 'triangle') for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { const x = 90 + c * 50 + (r % 2) * 25, y = 40 + r * 58; shapes.push(<path key={`a${r}${c}`} d={`M${x} ${y + 58}L${x + 25} ${y}L${x + 50} ${y + 58}Z`} className="visual-shape" />); shapes.push(<path key={`b${r}${c}`} d={`M${x + 25} ${y}L${x + 75} ${y}L${x + 50} ${y + 58}Z`} className="visual-shape-gold" />); }
  if (spec.shape === 'hexagon') for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) { const s = 40, cx = 110 + c * s * 1.5, cy = 60 + r * s * Math.sqrt(3) + (c % 2) * s * Math.sqrt(3) / 2; const pts = Array.from({ length: 6 }, (_, k) => `${cx + s * Math.cos((Math.PI / 3) * k)},${cy + s * Math.sin((Math.PI / 3) * k)}`).join(' '); shapes.push(<polygon key={`h${r}${c}`} points={pts} className={(r + c) % 2 ? 'visual-shape' : 'visual-shape-gold'} />); }
  if (spec.shape === 'pentagon') { for (let c = 0; c < 3; c++) { const s = 60, cx = 170 + c * 140, cy = 150; const pts = Array.from({ length: 5 }, (_, k) => `${cx + s * Math.cos(-Math.PI / 2 + (2 * Math.PI / 5) * k)},${cy + s * Math.sin(-Math.PI / 2 + (2 * Math.PI / 5) * k)}`).join(' '); shapes.push(<polygon key={`p${c}`} points={pts} className="visual-shape" />); } shapes.push(<text key="gap" x="320" y="270" textAnchor="middle" className="visual-small">gaps appear: 108° does not fit 360° exactly</text>); }
  return <>{shapes}</>;
}

function Tree({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'tree' }> }) {
  const n = spec.children.length, gap = (W - 120) / Math.max(n, 1);
  return <>
    <circle cx="320" cy="50" r="26" className="visual-node" /><text x="320" y="56" textAnchor="middle" className="visual-node-text">{spec.root}</text>
    {spec.children.map((ch, i) => {
      const x = 60 + gap * (i + 0.5);
      return <g key={i}>
        <path d={`M320 76L${x} 124`} className="visual-line" />
        <circle cx={x} cy="148" r="24" className={ch.children ? 'visual-node' : 'visual-node-gold'} /><text x={x} y="154" textAnchor="middle" className="visual-node-text">{ch.label}</text>
        {(ch.children ?? []).map((leaf, k, arr) => { const lx = x + (k - (arr.length - 1) / 2) * 56; return <g key={k}><path d={`M${x} 172L${lx} 222`} className="visual-line" /><circle cx={lx} cy="244" r="22" className="visual-node-gold" /><text x={lx} y="250" textAnchor="middle" className="visual-node-text">{leaf}</text></g>; })}
      </g>;
    })}
  </>;
}

function Sticks({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'sticks' }> }) {
  const s = 64, left = (W - s * spec.squares) / 2, top = 90;
  const lines = [<path key="first" d={`M${left} ${top}V${top + s}`} className="visual-gold" />];
  for (let i = 0; i < spec.squares; i++) { const x = left + i * s; lines.push(<path key={i} d={`M${x} ${top}H${x + s}V${top + s}H${x}`} className="visual-accent" />); }
  return <>{lines}<text x={W / 2} y={top + s + 46} textAnchor="middle" className="visual-label">{`${spec.squares} squares: 1 + 3 × ${spec.squares} = ${1 + 3 * spec.squares} sticks`}</text></>;
}

function Bars({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'bars' }> }) {
  const max = Math.max(...spec.values), n = spec.values.length, bw = Math.min(70, (W - 140) / n - 16);
  return <>
    <path d="M80 250V40M80 250H600" className="visual-line" />
    {spec.values.map((v, i) => { const h = (v / max) * 190, x = 100 + i * (bw + 16); return <g key={i}>
      <rect x={x} y={250 - h} width={bw} height={h} rx="6" className={spec.gold === i ? 'visual-bar-gold' : 'visual-bar'} />
      <text x={x + bw / 2} y={244 - h} textAnchor="middle" className="visual-small">{v}</text>
      <text x={x + bw / 2} y={272} textAnchor="middle" className="visual-small">{spec.labels[i]}</text></g>; })}
  </>;
}

function Compare({ spec }: { spec: Extract<StoryPictureSpec, { kind: 'compare' }> }) {
  const count = Math.max(...[spec.left, spec.right].map((c) => c.lines.flatMap((l) => wrap(l, 28)).length));
  const card = (x: number, gold: boolean, c: { title: string; lines: string[] }) => <g>
    <rect x={x} y={30} width="270" height={70 + Math.min(count, 8) * 22} rx="16" className={gold ? 'visual-card-gold' : 'visual-card'} />
    <text x={x + 135} y={64} textAnchor="middle" className="visual-label">{c.title}</text>
    {c.lines.flatMap((l) => wrap(l, 28)).slice(0, 8).map((l, i) => <text key={i} x={x + 135} y={100 + i * 22} textAnchor="middle" className="visual-small">{l}</text>)}
  </g>;
  return <>{card(30, false, spec.left)}{card(340, true, spec.right)}</>;
}

export default function StoryPicture({ spec }: { spec: StoryPictureSpec }) {
  const body = (() => {
    switch (spec.kind) {
      case 'numberline': return <NumberLine spec={spec} />;
      case 'placevalue': return <PlaceValue spec={spec} />;
      case 'fraction': return <Fraction spec={spec} />;
      case 'area': return <Area spec={spec} />;
      case 'balance': return <Balance spec={spec} />;
      case 'dotplot': return <DotPlot spec={spec} />;
      case 'flow': return <Flow spec={spec} />;
      case 'table': return <Table spec={spec} />;
      case 'tokens': return <Tokens spec={spec} />;
      case 'crossing': return <Crossing spec={spec} />;
      case 'transversal': return <Transversal spec={spec} />;
      case 'triangle': return <Triangle spec={spec} />;
      case 'tiles': return <Tiles spec={spec} />;
      case 'tree': return <Tree spec={spec} />;
      case 'sticks': return <Sticks spec={spec} />;
      case 'bars': return <Bars spec={spec} />;
      case 'compare': return <Compare spec={spec} />;
    }
  })();
  // Crop each picture to the part that has content, so that no picture has a large empty band.
  const box: [number, number] = (() => {
    switch (spec.kind) {
      case 'flow': return [60, 170];
      case 'placevalue': return [55, 180];
      case 'compare': { const n = Math.min(8, Math.max(...[spec.left, spec.right].map((c) => c.lines.flatMap((l) => wrap(l, 28)).length))); return [15, 100 + n * 22]; }
      case 'numberline': return spec.jumps?.length ? [0, 300] : [140, 130];
      case 'table': { const rh = Math.min(48, 240 / spec.rows.length), h = rh * spec.rows.length; return [(300 - h) / 2 - 15, h + 30]; }
      case 'tokens': return [35, 200];
      case 'balance': return [35, 215];
      case 'sticks': return [70, 140];
      case 'area': { const size = Math.min(40, 220 / Math.max(spec.rows, spec.cols)); return [25, size * spec.rows + (spec.label ? 60 : 30)]; }
      case 'fraction': { const h = Math.min(44, 220 / spec.rows.length); return [25, spec.rows.length * (h + 14) + 20]; }
      case 'bars': return [25, 260];
      default: return [0, 300];
    }
  })();
  return (
    <figure className="story-picture">
      <svg viewBox={`0 ${box[0]} ${W} ${box[1]}`} role="img" aria-label={spec.caption ?? spec.kind}>{body}</svg>
      {spec.caption && <figcaption>{spec.caption}</figcaption>}
    </figure>
  );
}
