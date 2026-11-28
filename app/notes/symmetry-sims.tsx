'use client';
import {useState, type ReactNode} from 'react';

/* Grade 6 Symmetry simulations: folding quadrilaterals, their diagonals,
   turning quadrilaterals and drawing with a mirror on a grid. */
type P = [number, number];
const ink = '#011e47', red = '#c2432b', fillA = '#8fd0f7', edgeA = '#1f6fae', fillB = '#ffc46b', edgeB = '#b86e00', good = '#2b8a45';

function Box({title, children}: {title: string; children: ReactNode}) { return <section className="explore-box" aria-label={title}><h3>{title}</h3>{children}</section>; }
function Pick({labels, value, onChange}: {labels: string[]; value: number; onChange: (n: number) => void}) { return <div className="explore-buttons">{labels.map((l, i) => <button type="button" key={l} aria-pressed={value === i} onClick={() => onChange(i)}>{l}</button>)}</div>; }
function Slide({label, value, min, max, step = 1, onChange, show}: {label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void; show: string}) { return <label className="explore-slider">{label}: <strong>{show}</strong><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Say({children}: {children: ReactNode}) { return <div className="explore-why" aria-live="polite">{children}</div>; }

/** Vertices go round the shape in order: A, B, C, D. The centre of each shape is (0, 0) except where noted. */
const QUADS: {name: string; pts: P[]}[] = [
  {name: 'Square', pts: [[-95, -95], [95, -95], [95, 95], [-95, 95]]},
  {name: 'Rectangle', pts: [[-140, -75], [140, -75], [140, 75], [-140, 75]]},
  {name: 'Rhombus', pts: [[0, -115], [75, 0], [0, 115], [-75, 0]]},
  {name: 'Parallelogram', pts: [[-75, -75], [135, -75], [75, 75], [-135, 75]]},
  {name: 'Isosceles trapezium', pts: [[-70, -75], [70, -75], [140, 75], [-140, 75]]},
  {name: 'Trapezium', pts: [[-40, -75], [95, -75], [140, 75], [-140, 75]]},
  {name: 'Kite', pts: [[0, -115], [75, -45], [0, 115], [-75, -45]]},
];
const LETTERS = ['A', 'B', 'C', 'D'];
const near = (a: P, b: P) => Math.hypot(a[0] - b[0], a[1] - b[1]) < 0.5;
const sameSet = (a: P[], b: P[]) => a.every((p) => b.some((q) => near(p, q)));
const centre = (pts: P[]): P => [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length];
const str = (pts: P[]) => pts.map((p) => p.join(',')).join(' ');
/** Reflect X in the line through O with direction d. */
function mirror(X: P, O: P, d: P): P { const n = Math.hypot(d[0], d[1]), u: P = [d[0] / n, d[1] / n], v: P = [X[0] - O[0], X[1] - O[1]], k = v[0] * u[0] + v[1] * u[1]; return [O[0] + 2 * k * u[0] - v[0], O[1] + 2 * k * u[1] - v[1]]; }
/** Partway through the fold: the distance from the line shrinks, passes zero and comes out on the other side. */
function fold(X: P, O: P, d: P, t: number): P { const M = mirror(X, O, d), F: P = [(X[0] + M[0]) / 2, (X[1] + M[1]) / 2], c = Math.cos(Math.PI * t); return [F[0] + (X[0] - F[0]) * c, F[1] + (X[1] - F[1]) * c]; }
function lines(pts: P[]) {
  const C = centre(pts), [A, B, Cc, D] = pts;
  return [
    {name: 'Standing line', O: C, d: [0, 1] as P},
    {name: 'Sleeping line', O: C, d: [1, 0] as P},
    {name: 'Diagonal AC', O: A, d: [Cc[0] - A[0], Cc[1] - A[1]] as P},
    {name: 'Diagonal BD', O: B, d: [D[0] - B[0], D[1] - B[1]] as P},
  ];
}
function clipLine(O: P, d: P): [P, P] { const n = Math.hypot(d[0], d[1]), u: P = [d[0] / n, d[1] / n]; return [[O[0] - u[0] * 400, O[1] - u[1] * 400], [O[0] + u[0] * 400, O[1] + u[1] * 400]]; }
function Labels({pts, color = ink}: {pts: P[]; color?: string}) { const C = centre(pts); return <>{pts.map((p, i) => { const dx = p[0] - C[0], dy = p[1] - C[1], n = Math.hypot(dx, dy) || 1; return <text key={i} x={p[0] + (dx / n) * 20} y={p[1] + (dy / n) * 20 + 5} textAnchor="middle" fontSize="16" fontWeight="700" fill={color}>{LETTERS[i]}</text>; })}</>; }

/** 1. Fold a quadrilateral along a chosen line and see whether the two halves match. */
export function FoldQuad() {
  const [q, setQ] = useState(0), [li, setLi] = useState(0), [t, setT] = useState(0);
  const low = (x: string) => x.charAt(0).toLowerCase() + x.slice(1);
  const sh = QUADS[q], L = lines(sh.pts)[li], img = sh.pts.map((p) => mirror(p, L.O, L.d)), ok = sameSet(img, sh.pts);
  const moving = sh.pts.map((p) => fold(p, L.O, L.d, t / 100)), [e1, e2] = clipLine(L.O, L.d);
  const symLines = lines(sh.pts).filter((l) => sameSet(sh.pts.map((p) => mirror(p, l.O, l.d)), sh.pts));
  /* Two buttons can name the same line (for example, the standing line of a kite is also diagonal AC). Count each line once. */
  const sameLine = (a: {O: P; d: P}, b: {O: P; d: P}) => Math.abs(a.d[0] * b.d[1] - a.d[1] * b.d[0]) < 1e-6 && Math.abs((b.O[0] - a.O[0]) * a.d[1] - (b.O[1] - a.O[1]) * a.d[0]) < 1e-3;
  const count = symLines.filter((l, i) => symLines.findIndex((k) => sameLine(k, l)) === i).length;
  return <Box title="Fold a quadrilateral: is it a line of symmetry?">
    <Pick labels={QUADS.map((s) => s.name)} value={q} onChange={(n) => { setQ(n); setT(0); }} />
    <Pick labels={lines(sh.pts).map((l) => l.name)} value={li} onChange={(n) => { setLi(n); setT(0); }} />
    <Slide label="Fold the paper" value={t} min={0} max={100} step={5} onChange={setT} show={t === 0 ? 'not folded' : t === 100 ? 'folded over' : `${t}%`} />
    <svg className="explore-canvas" viewBox="-300 -160 600 320" role="img" aria-label={`${sh.name} folded along ${L.name}`}>
      <g>
        <polygon points={str(sh.pts)} fill={fillA} stroke={edgeA} strokeWidth="3" />
        <polygon points={str(moving)} fill={t === 100 ? (ok ? '#8fdc9a' : fillB) : fillB} fillOpacity={0.55} stroke={t === 100 && ok ? good : edgeB} strokeWidth="3" strokeDasharray="7 5" />
        <path d={`M${e1[0]} ${e1[1]}L${e2[0]} ${e2[1]}`} stroke={red} strokeWidth="3" strokeDasharray="10 6" />
        <Labels pts={sh.pts} />
      </g>
    </svg>
    <Say>
      <p>Blue: the shape. Orange dashed: the paper as you fold it over the red line.</p>
      {t < 100 ? <p>Move the slider to the end to finish the fold.</p> : ok
        ? <p><strong>The halves match.</strong> The {low(L.name)} is a line of symmetry of the {sh.name.toLowerCase()}.</p>
        : <p><strong>The halves do not match.</strong> The orange part sticks out. The {low(L.name)} is not a line of symmetry of the {sh.name.toLowerCase()}.</p>}
      {t === 100 && <p>Of these four lines, the {sh.name.toLowerCase()} has {count === 0 ? 'no line' : count === 1 ? 'one line' : `${count} lines`} of symmetry.</p>}
    </Say>
  </Box>;
}

/** 2. Look at the two diagonals: their lengths, where they meet and the angle between them. */
export function Diagonals() {
  const [q, setQ] = useState(0); const sh = QUADS[q], [A, B, C, D] = sh.pts;
  const len = (p: P, r: P) => Math.hypot(p[0] - r[0], p[1] - r[1]);
  const d1: P = [C[0] - A[0], C[1] - A[1]], d2: P = [D[0] - B[0], D[1] - B[1]], den = d1[0] * d2[1] - d1[1] * d2[0];
  const s = ((B[0] - A[0]) * d2[1] - (B[1] - A[1]) * d2[0]) / den, u = ((B[0] - A[0]) * d1[1] - (B[1] - A[1]) * d1[0]) / den;
  const O: P = [A[0] + s * d1[0], A[1] + s * d1[1]];
  const ang = Math.round(Math.acos(Math.abs(d1[0] * d2[0] + d1[1] * d2[1]) / (len(A, C) * len(B, D))) * 180 / Math.PI);
  const cm = (x: number) => (Math.round(x / 4) / 10).toFixed(1);
  const equal = Math.abs(len(A, C) - len(B, D)) < 0.5, bisect = Math.abs(s - 0.5) < 0.005 && Math.abs(u - 0.5) < 0.005, perp = ang === 90;
  const symAC = sameSet(sh.pts.map((p) => mirror(p, A, d1)), sh.pts), symBD = sameSet(sh.pts.map((p) => mirror(p, B, d2)), sh.pts);
  const yes = (b: boolean) => <strong style={{color: b ? good : red}}>{b ? 'Yes' : 'No'}</strong>;
  return <Box title="The diagonals of a quadrilateral">
    <Pick labels={QUADS.map((x) => x.name)} value={q} onChange={setQ} />
    <svg className="explore-canvas" viewBox="-300 -160 600 320" role="img" aria-label={`${sh.name} with its diagonals`}>
      <polygon points={str(sh.pts)} fill={fillA} fillOpacity={0.45} stroke={edgeA} strokeWidth="3" />
      <path d={`M${A[0]} ${A[1]}L${C[0]} ${C[1]}`} stroke={red} strokeWidth="3" />
      <path d={`M${B[0]} ${B[1]}L${D[0]} ${D[1]}`} stroke={edgeB} strokeWidth="3" />
      <circle cx={O[0]} cy={O[1]} r="6" fill={ink} /><text x={O[0] + 12} y={O[1] - 10} fontSize="15" fontWeight="700" fill={ink}>O</text>
      <Labels pts={sh.pts} />
    </svg>
    <div className="explore-grid">
      <p>AC = <strong>{cm(len(A, C))} cm</strong>, BD = <strong>{cm(len(B, D))} cm</strong></p>
      <p>Angle between AC and BD: <strong>{ang}°</strong></p>
      <p>AO = {cm(len(A, O))}, OC = {cm(len(O, C))}</p>
      <p>BO = {cm(len(B, O))}, OD = {cm(len(O, D))}</p>
    </div>
    <Say>
      <p>Are the diagonals equal? {yes(equal)} · Do they cut each other into halves? {yes(bisect)} · Do they meet at 90°? {yes(perp)}</p>
      <p>Is diagonal AC a line of symmetry? {yes(symAC)} · Is diagonal BD a line of symmetry? {yes(symBD)}</p>
      <p>{symAC && symBD ? 'Both diagonals are lines of symmetry.' : symAC || symBD ? 'Only one diagonal is a line of symmetry.' : 'A diagonal cuts the shape into two equal-looking pieces, but folding along it does not make them match. So no diagonal is a line of symmetry.'}</p>
    </Say>
  </Box>;
}

/** 3. Turn a quadrilateral about its centre and find the angle and order of rotational symmetry. */
export function TurnQuad() {
  const [q, setQ] = useState(0), [t, setT] = useState(0); const sh = QUADS[q], C = centre(sh.pts);
  const rot = (p: P, a: number): P => { const r = a * Math.PI / 180, x = p[0] - C[0], y = p[1] - C[1]; return [C[0] + x * Math.cos(r) - y * Math.sin(r), C[1] + x * Math.sin(r) + y * Math.cos(r)]; };
  const matches = (a: number) => sameSet(sh.pts.map((p) => rot(p, a)), sh.pts);
  const angles = [90, 180, 270].filter(matches), order = angles.length + 1, same = t > 0 && t < 360 && matches(t);
  return <Box title="Turn a quadrilateral about its centre">
    <Pick labels={QUADS.map((x) => x.name)} value={q} onChange={(n) => { setQ(n); setT(0); }} />
    <Slide label="Turn" value={t} min={0} max={360} step={15} onChange={setT} show={`${t}°`} />
    <svg className="explore-canvas" viewBox="-300 -160 600 320" role="img" aria-label={`${sh.name} turned ${t} degrees`}>
      <polygon points={str(sh.pts)} fill="none" stroke="#9aa6b5" strokeWidth="2" strokeDasharray="6 5" />
      <g transform={`rotate(${t} ${C[0]} ${C[1]})`}>
        <polygon points={str(sh.pts)} fill={same ? '#8fdc9a' : fillA} stroke={same ? good : edgeA} strokeWidth="3" />
      </g>
      <circle cx={rot(sh.pts[0], t)[0]} cy={rot(sh.pts[0], t)[1]} r="10" fill={red} />
      <text x={rot(sh.pts[0], t)[0]} y={rot(sh.pts[0], t)[1] + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">A</text>
      <circle cx={C[0]} cy={C[1]} r="5" fill={ink} />
    </svg>
    <Say>
      <p>{same ? `It fits on its outline after ${t}°!` : t === 0 || t === 360 ? 'The shape is in its starting position.' : 'It does not fit on the dashed outline yet. Keep turning.'} The red dot A shows how far the shape has turned.</p>
      <p>{order > 1 ? `${sh.name}: it fits after ${angles.join('°, ')}° and 360°. Angle of symmetry ${angles[0]}°, order ${order}.` : `${sh.name}: it fits only after a full turn of 360°. It has no rotational symmetry.`}</p>
    </Say>
  </Box>;
}

/** 4. Colour squares on one side of a mirror line; the mirror image appears on the other side. */
export function MirrorGrid() {
  const N = 8, S = 34, [m, setM] = useState(0), [on, setOn] = useState<Set<number>>(() => new Set([9, 10, 17, 26, 27]));
  const img = (r: number, c: number): [number, number] => m === 0 ? [r, N - 1 - c] : m === 1 ? [N - 1 - r, c] : [c, r];
  const mine = (r: number, c: number) => m === 0 ? c < N / 2 : m === 1 ? r < N / 2 : c > r;
  const toggle = (r: number, c: number) => { if (!mine(r, c)) return; const k = r * N + c, n = new Set(on); if (n.has(k)) n.delete(k); else n.add(k); setOn(n); };
  const images = new Set([...on].map((k) => { const [r, c] = img(Math.floor(k / N), k % N); return r * N + c; }));
  const x0 = 300 - (N * S) / 2, y0 = 14;
  const lineEnds = m === 0 ? [300, y0 - 8, 300, y0 + N * S + 8] : m === 1 ? [x0 - 8, y0 + (N * S) / 2, x0 + N * S + 8, y0 + (N * S) / 2] : [x0 - 8, y0 - 8, x0 + N * S + 8, y0 + N * S + 8];
  return <Box title="Draw with a mirror">
    <Pick labels={['Standing mirror', 'Sleeping mirror', 'Slanting mirror']} value={m} onChange={(n) => { setM(n); setOn(new Set()); }} />
    <svg className="explore-canvas" viewBox={`0 0 600 ${N * S + 28}`} role="img" aria-label="Grid with a mirror line">
      {Array.from({length: N * N}, (_, k) => { const r = Math.floor(k / N), c = k % N, a = on.has(k), b = images.has(k);
        return <rect key={k} x={x0 + c * S} y={y0 + r * S} width={S} height={S} fill={a ? fillB : b ? fillA : mine(r, c) ? '#fff' : '#f1f4f8'} stroke="#c9d3df" onClick={() => toggle(r, c)} style={{cursor: mine(r, c) ? 'pointer' : 'default'}} />; })}
      <path d={`M${lineEnds[0]} ${lineEnds[1]}L${lineEnds[2]} ${lineEnds[3]}`} stroke={red} strokeWidth="4" strokeDasharray="10 6" pointerEvents="none" />
    </svg>
    <Say>
      <p>Click the white squares to colour them orange. The blue squares are their mirror images on the other side of the red line.</p>
      <p>Each blue square is as far from the mirror as its orange square, and the line that joins them meets the mirror at 90°. The whole picture has the red line as a line of symmetry.</p>
    </Say>
  </Box>;
}
