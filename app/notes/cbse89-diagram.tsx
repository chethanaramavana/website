import type { ReactNode } from 'react';
import MathText from './math-text';

export type TeachingDiagramSpec = {
  kind: 'square-area' | 'square-grid' | 'power-tree' | 'place-value' | 'quadrilateral' | 'factor-array' | 'algebra-tiles' | 'ratio' | 'fraction-strip' | 'right-triangle' | 'similar-triangles' | 'angle-pair' | 'network' | 'balance' | 'area' | 'number-line' | 'linear-graph' | 'sequence' | 'coordinate' | 'euclid' | 'triangle-congruence' | 'parallelogram' | 'circle-chord' | 'heron' | 'solids' | 'bar-chart' | 'probability' | 'cuboid-net' | 'line-chart' | 'coin-tree' | 'fractal' | 'isosceles-median' | 'midpoint-triangle' | 'cyclic-quad' | 'right-triangle-unknown';
  caption: string;
  values?: number[];
  labels?: string[];
};

const ink = '#011E47', gold = '#D9A231', red = '#B0300E', pale = '#F4E0AE', grid = '#C9D2DF';
const clean = (n: number) => Number.isFinite(n) ? Number(n.toFixed(2)).toString().replace('-', '−') : '';
const positive = (v: number | undefined, fallback: number, min = 0.1, max = 1000) => Number.isFinite(v) ? Math.min(max, Math.max(min, v!)) : fallback;
const label = (x: number, y: number, value: ReactNode, anchor: 'start' | 'middle' | 'end' = 'middle', colour = ink) => <text x={x} y={y} textAnchor={anchor} fill={colour} fontSize="16" stroke="none">{value}</text>;
const line = (x1: number, y1: number, x2: number, y2: number, colour = ink, dashed = false) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth="2.3" strokeDasharray={dashed ? '6 5' : undefined} />;
const dot = (x: number, y: number, name?: string) => <g><circle cx={x} cy={y} r="4.5" fill={ink} />{name && label(x, y - 12, name)}</g>;
const equalTicks = (x1: number, y1: number, x2: number, y2: number, count = 1) => {
  const length = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / length, uy = (y2 - y1) / length;
  return <g>{Array.from({ length: count }, (_, i) => { const shift = (i - (count - 1) / 2) * 7, cx = (x1 + x2) / 2 + shift * ux, cy = (y1 + y2) / 2 + shift * uy; return <line key={i} x1={cx - 6 * uy} y1={cy + 6 * ux} x2={cx + 6 * uy} y2={cy - 6 * ux} stroke={ink} strokeWidth="2" />; })}</g>;
};
const right = (x: number, y: number, size = 14) => <path d={`M${x} ${y - size}h${size}v${size}`} fill="none" stroke={ink} strokeWidth="1.5" />;

/** Exact, print-friendly instructional illustrations shared by notes and case-study papers. */
export default function TeachingDiagram({ spec }: { spec: TeachingDiagramSpec }) {
  const v = spec.values ?? [], names = spec.labels ?? [];
  let picture: ReactNode;
  switch (spec.kind) {
    case 'square-area': {
      const area = positive(v[0],144);
      picture = <g><rect x="190" y="40" width="220" height="220" fill={pale} stroke={ink} strokeWidth="2.5" />{label(300,155,`Area = ${clean(area)} m²`)}{label(300,290,'Side = ? metres')}</g>;
      break;
    }
    case 'square-grid':
    case 'factor-array': {
      const columns = Math.round(positive(v[0], spec.kind === 'square-grid' ? 5 : 6, 1, 12));
      const rows = spec.kind === 'square-grid' ? columns : Math.round(positive(v[1], 4, 1, 12));
      const unit = Math.min(32, 210 / rows, 420 / columns), left = (600 - columns * unit) / 2, top = (280 - rows * unit) / 2;
      picture = <g>{Array.from({ length: rows }, (_, r) => Array.from({ length: columns }, (_, c) => <rect key={`${r}-${c}`} x={left + c * unit} y={top + r * unit} width={unit} height={unit} fill={(r + c) % 2 ? pale : 'white'} stroke={ink} strokeWidth="1" />))}{label(300, top + rows * unit + 27, `${columns} × ${rows} = ${columns * rows} unit squares`)}{label(300, top - 12, spec.kind === 'square-grid' ? `${columns} rows of ${columns}` : 'Equal rows and equal columns')}</g>;
      break;
    }
    case 'power-tree': {
      const depth = Math.round(positive(v[0], 3, 1, 4));
      picture = <g>{Array.from({ length: depth + 1 }, (_, level) => {
        const count = 2 ** level;
        return <g key={level}>{Array.from({ length: count }, (_, i) => { const x = 50 + (i + 0.5) * 500 / count, y = 42 + level * 52; return <g key={i}>{level > 0 && line(50 + (Math.floor(i / 2) + 0.5) * 500 / (count / 2), y - 52, x, y, grid)}<circle cx={x} cy={y} r="7" fill={level === depth ? gold : ink} /></g>; })}{label(580, 47 + level * 52, count, 'end')}</g>;
      })}{label(300, 283, `Double at each step: 2${'⁰¹²³⁴'[depth]} = ${2 ** depth}`)}</g>;
      break;
    }
    case 'place-value': {
      const binary = names[0] === 'binary';
      const raw = Math.round(positive(v[0], binary ? 1011 : 2048, 0, 9999)).toString().padStart(4, '0');
      const digits = binary && /[^01]/.test(raw) ? '1011' : raw;
      const places = binary ? [8, 4, 2, 1] : [1000, 100, 10, 1];
      const words = binary ? ['Eights', 'Fours', 'Twos', 'Ones'] : ['Thousands', 'Hundreds', 'Tens', 'Ones'];
      picture = <g>{words.map((name, i) => <g key={name}><rect x={55 + i * 125} y="70" width="115" height="125" rx="4" fill={i % 2 ? pale : 'white'} stroke={ink} />{label(112 + i * 125, 98, name)}<text x={112 + i * 125} y="151" textAnchor="middle" fontSize="35" fill={ink}>{digits[i]}</text>{label(112 + i * 125, 180, `× ${places[i]}`)}</g>)}{label(300, 240, `${digits.split('').map((d, i) => Number(d) * places[i]).join(' + ')} = ${digits.split('').reduce((n, d, i) => n + Number(d) * places[i], 0)}`)}</g>;
      break;
    }
    case 'quadrilateral':
    case 'parallelogram': {
      const angle = positive(v[0], 70, 40, 140), rad = angle * Math.PI / 180, len = 180, dx = len * Math.cos(rad), dy = len * Math.sin(rad), left = 210 - dx / 2, bottom = 230, width = 220;
      picture = <g><polygon points={`${left},${bottom} ${left + width},${bottom} ${left + width + dx},${bottom - dy} ${left + dx},${bottom - dy}`} fill={pale} stroke={ink} strokeWidth="2.5" />{line(left, bottom, left + width + dx, bottom - dy, grid, true)}{line(left + width, bottom, left + dx, bottom - dy, grid, true)}{label(left - 15, bottom + 22, names[0] ?? 'A')}{label(left + width + 12, bottom + 22, names[1] ?? 'B')}{label(left + width + dx + 15, bottom - dy - 8, names[2] ?? 'C')}{label(left + dx - 15, bottom - dy - 8, names[3] ?? 'D')}{label(left + 45, bottom - 15, `${clean(angle)}°`)}{label(left + width - 40, bottom - 15, '?')}{label(300, 282, 'Opposite sides parallel · Adjacent angles total 180°')}</g>;
      break;
    }
    case 'algebra-tiles': {
      const x = 200, y = 45, side = 120, two = 60, three = 90;
      picture = <g><rect x={x} y={y} width={side} height={side} fill={pale} stroke={ink} /><rect x={x + side} y={y} width={two} height={side} fill="#e5ebf4" stroke={ink} /><rect x={x} y={y + side} width={side} height={three} fill="#e5ebf4" stroke={ink} /><rect x={x + side} y={y + side} width={two} height={three} fill="white" stroke={ink} />{label(x + side / 2, y + side / 2 + 5, 'x²')}{label(x + side + two / 2, y + side / 2 + 5, '2x')}{label(x + side / 2, y + side + three / 2 + 5, '3x')}{label(x + side + two / 2, y + side + three / 2 + 5, '6')}{label(x + side / 2, y - 12, 'x')}{label(x + side + two / 2, y - 12, '2')}{label(x - 20, y + side / 2, 'x')}{label(x - 20, y + side + three / 2, '3')}{label(300, 287, 'A rectangle with side lengths x + 2 and x + 3')}</g>;
      break;
    }
    case 'ratio': {
      const a = Math.round(positive(v[0], 3, 1, 12)), b = Math.round(positive(v[1], 5, 1, 12)), unit = 370 / Math.max(a, b);
      picture = <g>{[a, b].map((n, r) => <g key={r}>{label(115, 105 + r * 85, names[r] ?? (r === 0 ? 'First' : 'Second'), 'end')}{Array.from({ length: n }, (_, c) => <rect key={c} x={135 + c * unit} y={75 + r * 85} width={unit} height="48" fill={r ? pale : '#e5ebf4'} stroke={ink} />)}{label(150 + n * unit, 105 + r * 85, n, 'start')}</g>)}{label(300, 270, `Equal-size parts: ${a} : ${b}`)}</g>;
      break;
    }
    case 'fraction-strip': {
      const den = Math.round(positive(v[1], 4, 1, 16)), num = Math.round(positive(v[0], 3, 0, den));
      picture = <g>{Array.from({ length: den }, (_, i) => <g key={i}><rect x={65 + i * 470 / den} y="90" width={470 / den} height="70" fill={i < num ? gold : 'white'} stroke={ink} /></g>)}{line(65, 205, 535, 205)}{Array.from({ length: den + 1 }, (_, i) => <g key={i}>{line(65 + i * 470 / den, 199, 65 + i * 470 / den, 211)}{(den <= 8 || i === 0 || i === num || i === den) && label(65 + i * 470 / den, 233, i === 0 ? '0' : i === den ? '1' : `${i}/${den}`)}</g>)}<circle cx={65 + num * 470 / den} cy="205" r="6" fill={red} />{label(300, 52, `${num} of ${den} equal parts are shaded`)}</g>;
      break;
    }
    case 'isosceles-median': {
      const A = [300, 45], B = [150, 240], C = [450, 240], D = [300, 240];
      picture = <g><polygon points={`${A} ${B} ${C}`} fill={pale} stroke={ink} strokeWidth="2.5" />{line(A[0], A[1], D[0], D[1], ink, true)}{equalTicks(...A as [number, number], ...B as [number, number])}{equalTicks(...A as [number, number], ...C as [number, number])}{equalTicks(...B as [number, number], ...D as [number, number], 2)}{equalTicks(...D as [number, number], ...C as [number, number], 2)}{label(A[0], A[1] - 12, 'A')}{label(B[0] - 16, B[1] + 20, 'B')}{label(C[0] + 16, C[1] + 20, 'C')}{label(D[0], D[1] + 24, 'D')}{label(300, 293, 'AB = AC and BD = DC are given.')}</g>;
      break;
    }
    case 'midpoint-triangle': {
      const A = [270, 45], B = [100, 245], C = [500, 245], D = [185, 145], E = [385, 145];
      picture = <g><polygon points={`${A} ${B} ${C}`} fill={pale} stroke={ink} strokeWidth="2.5" />{line(D[0], D[1], E[0], E[1], ink, true)}{equalTicks(...A as [number, number], ...D as [number, number])}{equalTicks(...D as [number, number], ...B as [number, number])}{equalTicks(...A as [number, number], ...E as [number, number], 2)}{equalTicks(...E as [number, number], ...C as [number, number], 2)}{label(A[0], A[1] - 12, 'A')}{label(B[0] - 12, B[1] + 20, 'B')}{label(C[0] + 12, C[1] + 20, 'C')}{label(D[0] - 20, D[1], 'D')}{label(E[0] + 20, E[1], 'E')}{label((D[0] + E[0]) / 2, D[1] - 12, 'DE = ?')}{label(300, 274, 'BC = 18 units')}{label(300, 305, 'D and E are midpoints; use the given equal lengths.')}</g>;
      break;
    }
    case 'cyclic-quad': {
      const cx = 300, cy = 150, radius = 105, angles = [300, 70, 140, 214], vertices = angles.map(theta => [cx + radius * Math.cos(theta * Math.PI / 180), cy - radius * Math.sin(theta * Math.PI / 180)]);
      picture = <g><circle cx={cx} cy={cy} r={radius} fill="white" stroke={ink} strokeWidth="2" /><polygon points={vertices.map(p => p.join(',')).join(' ')} fill={pale} stroke={ink} strokeWidth="2.5" />{vertices.map(([x, y], i) => { const ux = (x - cx) / radius, uy = (y - cy) / radius; return <g key={i}><circle cx={x} cy={y} r="3.5" fill={ink} />{label(x + ux * 19, y + uy * 19 + 5, 'ABCD'[i])}</g>; })}{label(vertices[0][0] - 28, vertices[0][1] - 31, '72°')}{label(vertices[2][0] + 26, vertices[2][1] + 28, '?')}{label(300, 297, 'A, B, C and D lie on the same circle.')}</g>;
      break;
    }
    case 'right-triangle-unknown': {
      const a = positive(v[0], 9), b = positive(v[1], 12), scale = Math.min(185 / a, 300 / b), x = 150, y = 240;
      picture = <g><polygon points={`${x},${y} ${x + b * scale},${y} ${x},${y - a * scale}`} fill={pale} stroke={ink} strokeWidth="2.5" />{right(x, y)}{label(x - 25, y - a * scale / 2, clean(a))}{label(x + b * scale / 2, y + 27, clean(b))}{label(x + b * scale / 2 + 20, y - a * scale / 2 - 12, '?')}{label(x - 16, y + 22, names[0] ?? 'A')}{label(x + b * scale + 14, y + 20, names[1] ?? 'B')}{label(x - 14, y - a * scale - 10, names[2] ?? 'C')}{label(300, 292, 'Find the unlabelled hypotenuse.')}</g>;
      break;
    }
    case 'right-triangle': {
      const a = positive(v[0], 6), b = positive(v[1], 8), c = Math.hypot(a, b), scale = Math.min(185 / a, 300 / b), x = 150, y = 240;
      picture = <g><polygon points={`${x},${y} ${x + b * scale},${y} ${x},${y - a * scale}`} fill={pale} stroke={ink} strokeWidth="2.5" />{right(x, y)}{label(x - 25, y - a * scale / 2, clean(a))}{label(x + b * scale / 2, y + 27, clean(b))}{label(x + b * scale / 2 + 20, y - a * scale / 2 - 12, clean(c))}{label(x - 16, y + 22, names[0] ?? 'A')}{label(x + b * scale + 14, y + 20, names[1] ?? 'B')}{label(x - 14, y - a * scale - 10, names[2] ?? 'C')}{label(300, 285, `${clean(a)}² + ${clean(b)}² = ${clean(c * c)}`)}</g>;
      break;
    }
    case 'similar-triangles':
    case 'triangle-congruence': {
      const congruent = spec.kind === 'triangle-congruence', s = congruent ? 1 : 1.5;
      picture = <g><polygon points="65,235 185,235 65,145" fill={pale} stroke={ink} strokeWidth="2.5" /><polygon points={`330,235 ${330 + 120 * s},235 330,${235 - 90 * s}`} fill={pale} stroke={ink} strokeWidth="2.5" />{right(65, 235)}{right(330, 235)}{label(120, 260, '4')}{label(45, 192, '3')}{label(139, 180, '5')}{label(330 + 60 * s, 260, clean(4 * s))}{label(310, 235 - 45 * s, clean(3 * s))}{label(344 + 60 * s, 225 - 45 * s, clean(5 * s))}{label(300, 40, congruent ? 'Compare the labelled triangles.' : 'Compare corresponding sides.')}{label(300, 290, congruent ? 'Give a reason for your conclusion.' : 'What do you notice about the shapes?')}</g>;
      break;
    }
    case 'angle-pair': {
      const angle = positive(v[0], 65, 15, 165), r = angle * Math.PI / 180, cx = 300, cy = 150, arm = 123;
      picture = <g>{line(65, cy, 535, cy)}{line(cx - arm * Math.cos(r), cy + arm * Math.sin(r), cx + arm * Math.cos(r), cy - arm * Math.sin(r))}<path d={`M${cx + 40} ${cy}A40 40 0 0 0 ${cx + 40 * Math.cos(r)} ${cy - 40 * Math.sin(r)}`} fill="none" stroke={gold} strokeWidth="3" />{label(cx + 72 * Math.cos(r / 2), cy - 72 * Math.sin(r / 2), `${clean(angle)}°`)}{label(cx - 82, cy - 22, '?')}{label(cx - 72 * Math.cos(r / 2), cy + 72 * Math.sin(r / 2), '?')}{dot(cx, cy, 'O')}{label(300, 292, 'Two straight lines intersect at O.')}</g>;
      break;
    }
    case 'network': {
      const nodes = [[300, 45], [470, 140], [410, 250], [190, 250], [130, 140]], edges = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [0, 3]];
      picture = <g>{edges.map(([a, b], i) => <g key={i}>{line(nodes[a][0], nodes[a][1], nodes[b][0], nodes[b][1])}</g>)}{nodes.map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="17" fill={pale} stroke={ink} />{label(x, y + 6, names[i] ?? 'ABCDE'[i])}</g>)}{label(300, 293, '5 vertices · 7 edges · Sum of degrees = 14')}</g>;
      break;
    }
    case 'balance': {
      picture = <g>{line(80, 90, 520, 90)}<polygon points="300,90 245,230 355,230" fill={pale} stroke={ink} /><path d="M140 90v80m-80 0h160M480 90v80m-55 0h110" stroke={ink} strokeWidth="2" />{[75, 120].map(x => <g key={x}><rect x={x} y="122" width="38" height="42" fill={gold} stroke={ink} />{label(x + 19, 150, 'n')}</g>)}<rect x="167" y="140" width="32" height="24" fill="white" stroke={ink} />{label(183, 158, '5')}{label(480, 155, '19')}{label(300, 272, '2n + 5 = 19 · Keep both sides balanced.')}</g>;
      break;
    }
    case 'area': {
      const w = positive(v[0], 12), h = positive(v[1], 8), s = Math.min(360 / w, 175 / h), x = (600 - w * s) / 2, y = 55;
      picture = <g><rect x={x} y={y} width={w * s} height={h * s} fill={pale} stroke={ink} strokeWidth="2.5" />{label(300, y + h * s + 30, `${clean(w)} units`)}{label(x - 35, y + h * s / 2 + 5, clean(h))}{label(300, y + h * s / 2 + 6, 'Rectangular region')}{label(300, 290, 'Use the labelled dimensions.')}</g>;
      break;
    }
    case 'number-line': {
      const point = Math.min(5, Math.max(-5, Number.isFinite(v[0]) ? v[0] : Math.SQRT2));
      picture = <g>{line(55, 150, 545, 150)}{Array.from({ length: 11 }, (_, i) => <g key={i}>{line(65 + i * 47, 143, 65 + i * 47, 157)}{label(65 + i * 47, 182, i - 5)}</g>)}<circle cx={300 + point * 47} cy="150" r="7" fill={red} />{label(300 + point * 47, 115, names[0] ?? (v[0] === undefined ? '√2 ≈ 1.414' : clean(point)))}{label(300, 250, 'Numbers increase to the right; each interval has equal length.')}</g>;
      break;
    }
    case 'linear-graph':
    case 'coordinate': {
      const coordinates = spec.kind === 'coordinate';
      const vals = coordinates ? [v[0] ?? 1, v[1] ?? 2, v[2] ?? 7, v[3] ?? 10].map(n => Number.isFinite(n) ? Math.min(20, Math.max(-20, n)) : 0) : [0, 0, 0, 0];
      const extent = coordinates ? Math.max(5, ...vals.map(Math.abs)) + 1 : 6, scale = Math.min(220 / extent, 110 / extent), X = (x: number) => 300 + x * scale, Y = (y: number) => 150 - y * scale;
      const m = Number.isFinite(v[0]) ? Math.min(5, Math.max(-5, v[0])) : 2, b = Number.isFinite(v[1]) ? Math.min(4, Math.max(-4, v[1])) : 1;
      const tick = extent > 10 ? 5 : extent > 6 ? 2 : 1;
      picture = <g>{Array.from({ length: Math.floor(extent / tick) * 2 + 1 }, (_, i) => (i - Math.floor(extent / tick)) * tick).map(t => <g key={t}>{line(X(t), 35, X(t), 265, grid)}{line(70, Y(t), 530, Y(t), grid)}{t !== 0 && label(X(t), 170, t)}{t !== 0 && label(285, Y(t) + 5, t, 'end')}</g>)}{line(65, 150, 540, 150)}{line(300, 30, 300, 270)}{label(551, 155, 'x')}{label(303, 25, 'y')}{coordinates ? <g>{line(X(vals[0]), Y(vals[1]), X(vals[2]), Y(vals[3]), gold)}{dot(X(vals[0]), Y(vals[1]), `A(${vals[0]}, ${vals[1]})`)}{dot(X(vals[2]), Y(vals[3]), `B(${vals[2]}, ${vals[3]})`)}{label(300, 293, `Horizontal change ${clean(vals[2] - vals[0])}; vertical change ${clean(vals[3] - vals[1])}`)}</g> : <g><path d={Array.from({ length: 121 }, (_, i) => { const x = -6 + i / 10, y = m * x + b; return Math.abs(y) <= 5.5 ? `${i && Math.abs(m * (x - .1) + b) <= 5.5 ? 'L' : 'M'}${X(x)} ${Y(y)}` : ''; }).join(' ')} fill="none" stroke={gold} strokeWidth="3" />{dot(X(0), Y(b))}{label(455, 35, `y = ${clean(m)}x ${b < 0 ? '−' : '+'} ${clean(Math.abs(b))}`)}{label(300, 293, 'Read the graph using equal axis intervals.')}</g>}</g>;
      break;
    }
    case 'sequence': {
      const terms = (v.length ? v : [3, 5, 7, 9]).slice(0, 8).map(n => Number.isFinite(n) ? n : 0), low = Math.min(0, ...terms), high = Math.max(0, ...terms), span = high - low || 1, w = 440 / terms.length, Y = (n: number) => 240 - (n - low) / span * 180, baseline = Y(0);
      picture = <g>{line(65, baseline, 535, baseline)}{terms.map((t, i) => <g key={i}><rect x={85 + i * w} y={Math.min(baseline, Y(t))} width={Math.max(10, w - 20)} height={Math.abs(Y(t) - baseline)} fill={pale} stroke={ink} />{label(85 + i * w + (w - 20) / 2, t >= 0 ? Y(t) - 12 : Y(t) + 18, clean(t))}{label(85 + i * w + (w - 20) / 2, 270, `n=${i + 1}`)}</g>)}</g>;
      break;
    }
    case 'euclid': {
      picture = <g>{line(70, 148, 530, 148)}{dot(160, 148, names[0] ?? 'A')}{dot(290, 148, names[2] ?? 'C')}{dot(420, 148, names[1] ?? 'B')}{label(300, 75, 'Through two distinct points passes one straight line.')}{label(300, 225, 'A line extends beyond A and B in both directions.')}{label(300, 270, 'A segment has two end points; a line does not.')}</g>;
      break;
    }
    case 'circle-chord': {
      const r = positive(v[0], 5), d = positive(v[1], 3, 0, r * .95), half = Math.sqrt(r * r - d * d), s = 105 / r, cx = 300, cy = 145, y = cy + d * s;
      picture = <g><circle cx={cx} cy={cy} r={105} fill="white" stroke={ink} strokeWidth="2.5" />{line(cx - half * s, y, cx + half * s, y, gold)}{line(cx, cy, cx, y, ink, true)}{line(cx, cy, cx + half * s, y)}{dot(cx, cy, 'O')}{dot(cx - half * s, y, 'A')}{dot(cx + half * s, y, 'B')}{label(cx - 18, (cy + y) / 2, clean(d))}{label(cx + half * s / 2 + 18, (cy + y) / 2 - 12, `r=${clean(r)}`)}<path d={`M${cx} ${y - 10}h10v10`} fill="none" stroke={ink} />{label(300, 290, 'Find the length of chord AB using the labelled distances.')}</g>;
      break;
    }
    case 'heron': {
      let a = positive(v[0], 13), b = positive(v[1], 14), c = positive(v[2], 15);
      if (a + b <= c || a + c <= b || b + c <= a) { a = 13; b = 14; c = 15; }
      const foot = (a * a + b * b - c * c) / (2 * b), h = Math.sqrt(Math.max(0, a * a - foot * foot)), low = Math.min(0, foot), high = Math.max(b, foot), s = Math.min(350 / (high - low), 190 / h), x = 120 - low * s, y = 235;
      picture = <g><polygon points={`${x},${y} ${x + b * s},${y} ${x + foot * s},${y - h * s}`} fill={pale} stroke={ink} strokeWidth="2.5" />{line(x + foot * s, y - h * s, x + foot * s, y, red, true)}{right(x + foot * s, y, 10)}{label(x + foot * s / 2 - 15, y - h * s / 2, clean(a))}{label(x + (b + foot) * s / 2 + 15, y - h * s / 2, clean(c))}{label(x + b * s / 2, y + 24, clean(b))}{v[3] !== undefined && Math.abs(v[3] - h) < .01 && label(x + foot * s + 18, y - h * s / 2, `h=${clean(h)}`, 'start')}{label(300, 290, 'Triangle side lengths are labelled; find its area.')}</g>;
      break;
    }
    case 'solids': {
      const r = positive(v[0], 7), h = positive(v[1], 10);
      picture = <g><rect x="180" y="65" width="240" height="160" fill={pale} /><ellipse cx="300" cy="225" rx="120" ry="30" fill={pale} stroke={ink} strokeWidth="2" />{line(180, 65, 180, 225)}{line(420, 65, 420, 225)}<ellipse cx="300" cy="65" rx="120" ry="30" fill="white" stroke={ink} strokeWidth="2" />{line(300, 65, 420, 65, red)}{label(360, 52, `r=${clean(r)}`)}{label(458, 150, `h=${clean(h)}`)}{label(300, 286, 'Cylinder: volume = πr²h; curved surface area = 2πrh')}</g>;
      break;
    }
    case 'bar-chart': {
      const bars = (v.length ? v : [2, 4, 3, 5]).slice(0, 8).map(n => positive(n, 0, 0, 100)), max = Math.max(1, ...bars), w = 420 / bars.length;
      picture = <g>{line(85, 45, 85, 240)}{line(85, 240, 535, 240)}{Array.from({ length: 5 }, (_, i) => <g key={i}>{line(80, 240 - i * 45, 535, 240 - i * 45, grid)}{label(70, 245 - i * 45, clean(max * i / 4), 'end')}</g>)}{bars.map((n, i) => <g key={i}><rect x={100 + i * w} y={240 - n / max * 180} width={w - 20} height={n / max * 180} fill={i % 2 ? pale : gold} stroke={ink} />{label(100 + i * w + (w - 20) / 2, 228 - n / max * 180, clean(n))}{label(100 + i * w + (w - 20) / 2, 268, names[i] ?? 'ABCDEFGH'[i])}</g>)}</g>;
      break;
    }
    case 'probability': {
      const favourable = Math.round(positive(v[0], 3, 0, 12)), other = Math.round(positive(v[1], 2, 0, 12)), total = favourable + other || 1;
      picture = <g><path d="M150 60h300l-25 170H175Z" fill="white" stroke={ink} strokeWidth="2.5" />{Array.from({ length: favourable + other }, (_, i) => <circle key={i} cx={195 + (i % 7) * 34} cy={95 + Math.floor(i / 7) * 34} r="12" fill={i < favourable ? gold : 'white'} stroke={ink} strokeWidth="2" />)}{label(300, 265, `${favourable} gold + ${other} white = ${favourable + other} counters`)}{label(300, 291, `If each counter is equally likely: P(gold) = ${favourable}/${total}`)}</g>;
      break;
    }
    case 'cuboid-net': {
      // Exact six-face net for a 3 × 4 × 12 cuboid. The four side faces form a strip.
      const unit = 13, left = 209, top = 72, lengths = [3, 4, 3, 4], heights = 12;
      let offset = 0;
      picture = <g>{lengths.map((width, i) => { const x = left + offset * unit; offset += width; return <g key={i}><rect x={x} y={top} width={width * unit} height={heights * unit} fill={i % 2 ? pale : 'white'} stroke={ink} />{label(x + width * unit / 2, top + heights * unit / 2 + 5, `${width}×12`)}</g>; })}<rect x={left + 3 * unit} y={top - 3 * unit} width={4 * unit} height={3 * unit} fill={pale} stroke={ink} /><rect x={left + 3 * unit} y={top + heights * unit} width={4 * unit} height={3 * unit} fill={pale} stroke={ink} />{label(left + 5 * unit, top - 12, '4×3')}{label(left + 5 * unit, top + heights * unit + 25, '4×3')}{label(300, 298, 'Six-face net of a 3 × 4 × 12 cuboid')}</g>;
      break;
    }
    case 'line-chart': {
      const points = (v.length ? v : [2, 4, 3, 5]).slice(0, 8).map(n => positive(n, 0, 0, 100)), max = Math.max(1, ...points), cap = Math.ceil(max / 4) * 4, X = (i: number) => 110 + i * 390 / Math.max(1, points.length - 1), Y = (n: number) => 240 - n / cap * 185;
      picture = <g>{line(85, 40, 85, 240)}{line(85, 240, 535, 240)}{Array.from({ length: 5 }, (_, i) => <g key={i}>{line(85, Y(i * cap / 4), 535, Y(i * cap / 4), grid)}{label(70, Y(i * cap / 4) + 5, clean(i * cap / 4), 'end')}</g>)}{points.slice(1).map((n, i) => <g key={i}>{line(X(i), Y(points[i]), X(i + 1), Y(n), gold)}</g>)}{points.map((n, i) => <g key={i}>{dot(X(i), Y(n))}{label(X(i), Y(n) - 12, clean(n))}{label(X(i), 270, names[i] ?? `Day ${i + 1}`)}</g>)}</g>;
      break;
    }
    case 'coin-tree': {
      picture = <g>{line(70, 150, 265, 82)}{line(70, 150, 265, 220)}{label(160, 95, 'H: 1/2')}{label(160, 220, 'T: 1/2')}{dot(70, 150)}{dot(265, 82, 'H')}{dot(265, 220, 'T')}{[[82, 45, 'HH', 'H'], [82, 115, 'HT', 'T'], [220, 185, 'TH', 'H'], [220, 255, 'TT', 'T']].map(([from, to, outcome, toss]) => <g key={outcome}>{line(265, Number(from), 485, Number(to))}{label(375, (Number(from) + Number(to)) / 2 - 9, `${toss}: 1/2`)}{label(515, Number(to) + 5, outcome)}</g>)}{label(300, 300, 'Two independent fair coin tosses; H = heads, T = tails.')}</g>;
      break;
    }
    case 'fractal': {
      const triangle = (x: number, y: number, side: number, depth: number, key: string): ReactNode => {
        const h = side * Math.sqrt(3) / 2;
        if (!depth) return <polygon key={key} points={`${x},${y} ${x + side},${y} ${x + side / 2},${y - h}`} fill={pale} stroke={ink} strokeWidth="1.3" />;
        return <g key={key}>{triangle(x, y, side / 2, depth - 1, key + 'l')}{triangle(x + side / 2, y, side / 2, depth - 1, key + 'r')}{triangle(x + side / 4, y - h / 2, side / 2, depth - 1, key + 't')}</g>;
      };
      picture = <g>{[0, 1, 2].map((stage) => <g key={stage}>{triangle(25 + stage * 195, 220, 160, stage, `s${stage}`)}{label(105 + stage * 195, 260, `Step ${stage}`)}</g>)}{label(300, 300, 'At each step remove the middle triangle from every remaining triangle.')}</g>;
      break;
    }
    default: picture = null;
  }
  return <figure className="cbse89-diagram" style={{ margin: '22px 0', breakInside: 'avoid', color: ink }}>
    <svg viewBox="0 0 600 315" role="img" aria-label={spec.caption} style={{ display: 'block', width: '100%', maxWidth: 720, height: 'auto', margin: '0 auto', background: 'white', border: `1px solid ${grid}`, borderRadius: 8, fontFamily: 'Source Serif 4, Georgia, serif' }}>
      <title>{spec.caption}</title>{picture}
    </svg>
    <figcaption style={{ marginTop: 8, fontSize: '.95rem', lineHeight: 1.55 }}><MathText>{spec.caption}</MathText></figcaption>
  </figure>;
}
