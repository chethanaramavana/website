'use client';
import {useState, type ReactNode} from 'react';

/* Grade 8 Number Play simulations: parity, signs, remainders, divisibility tests, missing digits, digital roots and reversal. */
const ink = '#011e47', red = '#c2432b', blue = '#1f6fae', sky = '#8fd0f7', orange = '#ffc46b', green = '#2b8a45', coral = '#ff9b85';
function Box({title, children}: {title: string; children: ReactNode}) { return <section className="explore-box" aria-label={title}><h3>{title}</h3>{children}</section>; }
function Slide({label, value, min, max, step = 1, onChange, show}: {label: string; value: number; min: number; max: number; step?: number; onChange: (n: number) => void; show?: string}) { return <label className="explore-slider">{label}: <strong>{show ?? value}</strong><input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>; }
function Pick({labels, value, onChange}: {labels: string[]; value: number; onChange: (n: number) => void}) { return <div className="explore-buttons">{labels.map((l, i) => <button type="button" key={l} aria-pressed={value === i} onClick={() => onChange(i)}>{l}</button>)}</div>; }
function Say({children}: {children: ReactNode}) { return <div className="explore-why" aria-live="polite">{children}</div>; }
const digitsOf = (s: string) => s.replace(/\D/g, '').replace(/^0+(?=\d)/, '');
const sumDigits = (s: string) => [...s].reduce((a, d) => a + Number(d), 0);

/** Odd and even numbers as pairs of dots. */
export function ParityDots() {
  const [a, setA] = useState(7), [b, setB] = useState(5), n = a + b, D = 22;
  const dot = (k: number, x0: number, fill: string, lone: boolean) => <circle key={x0 + '-' + k} cx={x0 + Math.floor(k / 2) * D} cy={70 + (k % 2) * D} r="8" fill={lone ? coral : fill} stroke={ink} strokeWidth="1" />;
  return <Box title="Pair up the dots">
    <Slide label="First number" value={a} min={1} max={12} onChange={setA} />
    <Slide label="Second number" value={b} min={1} max={12} onChange={setB} />
    <svg className="explore-canvas" viewBox="0 0 600 170" role="img" aria-label={`${a} plus ${b} as pairs of dots`}>
      {Array.from({length: a}, (_, k) => dot(k, 20, sky, a % 2 === 1 && k === a - 1))}
      <text x={20 + Math.ceil(a / 2) * D + 6} y="88" fontSize="22" fill={ink}>+</text>
      {Array.from({length: b}, (_, k) => dot(k, 45 + Math.ceil(a / 2) * D, orange, b % 2 === 1 && k === b - 1))}
      <text x="20" y="140" fontSize="16" fill={ink}>{a} is {a % 2 ? 'odd' : 'even'}, {b} is {b % 2 ? 'odd' : 'even'}: the sum {n} is {n % 2 ? 'odd' : 'even'}.</text>
    </svg>
    <Say><p>A red dot has no partner. {a % 2 && b % 2 ? 'Two odd numbers: the two red dots pair up with each other, so the sum is even.' : a % 2 || b % 2 ? 'One red dot is left over, so the sum is odd.' : 'No red dots: every dot has a partner, so the sum is even.'}</p></Say>
  </Box>;
}

/** Put + or − between four consecutive numbers: a tree of all 8 choices, with the chosen path lit up. */
export function PlusMinus() {
  const [n, setN] = useState(5), [s, setS] = useState([1, 1, 1]);
  const nums = [n, n + 1, n + 2, n + 3], val = nums.slice(1).reduce((acc, x, i) => acc + (s[i] ? x : -x), nums[0]);
  const all = nums.reduce((a, b) => a + b, 0);
  const xs = [34, 124, 214, 304], top = 26, gap = 44;
  const combos = [0, 1, 2, 3, 4, 5, 6, 7].map((k) => [k >> 2 & 1, k >> 1 & 1, k & 1].map((b) => 1 - b));
  const leafY = (k: number) => top + k * gap;
  const yOf = (level: number, prefix: number[]) => { const ks = combos.map((c, k) => [c, k] as const).filter(([c]) => prefix.every((p, i) => c[i] === p)).map(([, k]) => leafY(k)); return ks.reduce((a, b) => a + b, 0) / ks.length; };
  const onPath = (prefix: number[]) => prefix.every((p, i) => s[i] === p);
  const edges: ReactNode[] = [], nodes: ReactNode[] = [];
  const prefixes = (level: number): number[][] => level === 0 ? [[]] : prefixes(level - 1).flatMap((p) => [[...p, 1], [...p, 0]]);
  for (let level = 0; level < 3; level++) for (const p of prefixes(level)) for (const sg of [1, 0]) {
    const q = [...p, sg], lit = onPath(q), y0 = yOf(level, p), y1 = yOf(level + 1, q);
    edges.push(<g key={q.join('')}><path d={`M${xs[level] + 8} ${y0}L${xs[level + 1] - 8} ${y1}`} stroke={lit ? (sg ? green : red) : '#cbd5e1'} strokeWidth={lit ? 4 : 2} />
      <circle cx={xs[level + 1]} cy={y1} r="4" fill={lit ? ink : '#cbd5e1'} /><text x={(xs[level] + xs[level + 1]) / 2} y={(y0 + y1) / 2 + (sg ? -8 : 18)} textAnchor="middle" fontSize="14" fontWeight={lit ? 800 : 400} fill={lit ? (sg ? green : red) : '#94a3b8'}>{sg ? '+' : '−'}{nums[level + 1]}</text></g>);
  }
  combos.forEach((c, k) => { const v = c.reduce((acc, b, i) => acc + (b ? nums[i + 1] : -nums[i + 1]), nums[0]), lit = onPath(c);
    nodes.push(<text key={'l' + k} x={xs[3] + 14} y={leafY(k) + 5} fontSize="14" fontWeight={lit ? 800 : 400} fill={lit ? ink : '#64748b'}>{nums[0]} {c.map((b, i) => `${b ? '+' : '−'} ${nums[i + 1]}`).join(' ')} = {String(v).replace('-', '−')}</text>); });
  return <Box title="Plus or minus? Explore the tree">
    <Slide label="First number" value={n} min={1} max={40} onChange={setN} />
    <div className="explore-buttons">{[0, 1, 2].map((i) => <button key={i} type="button" aria-pressed={!!s[i]} onClick={() => setS(s.map((x, j) => j === i ? 1 - x : x))}>Gap {i + 1}: {s[i] ? '+' : '−'}</button>)}</div>
    <svg className="explore-canvas" viewBox={`0 0 600 ${top + 8 * gap}`} role="img" aria-label="Tree of all eight sign choices">
      {edges}<circle cx={xs[0]} cy={yOf(0, [])} r="7" fill={ink} /><text x={xs[0] - 12} y={yOf(0, []) + 5} textAnchor="end" fontSize="16" fontWeight="800" fill={ink}>{nums[0]}</text>{nodes}
    </svg>
    <p style={{fontSize: '1.3rem', fontWeight: 800, textAlign: 'center', margin: '6px 0'}}>{nums[0]} {s[0] ? '+' : '−'} {nums[1]} {s[1] ? '+' : '−'} {nums[2]} {s[2] ? '+' : '−'} {nums[3]} = <span style={{color: green}}>{String(val).replace('-', '−')}</span> (even)</p>
    <Say>
      <p>Click the gap buttons: the coloured path in the tree shows your choice. All 8 answers at the right are even.</p>
      <p><strong>Why?</strong> With all + signs: {nums.join(' + ')} = {all}, which is even. {s.some((x) => !x) ? `You changed ${nums.slice(1).filter((_, i) => !s[i]).map((x) => '+' + x + ' to −' + x).join(' and ')}. Each change takes the number away twice, so the answer goes down by ${nums.slice(1).filter((_, i) => !s[i]).map((x) => '2 × ' + x).join(' + ')} = ${all - val}, an even number: ${all} − ${all - val} = ${String(val).replace('-', '−')}.` : 'Now change a sign and see how much the answer goes down.'}</p>
      <p>An even number minus an even number is even. So every answer is even.</p>
    </Say>
  </Box>;
}

/** Dots in rows of m: quotient and remainder. */
export function Remainders() {
  const [N, setN] = useState(23), [m, setM] = useState(5), q = Math.floor(N / m), r = N % m, S = 22;
  return <Box title="Groups and remainders">
    <Slide label="Number of dots" value={N} min={1} max={60} onChange={setN} />
    <Slide label="Group size (divisor)" value={m} min={2} max={9} onChange={setM} />
    <svg className="explore-canvas" viewBox={`0 0 600 ${Math.max(140, 40 + Math.ceil(N / m) * S)}`} role="img" aria-label={`${N} dots in rows of ${m}`}>
      {Array.from({length: N}, (_, k) => { const row = Math.floor(k / m), col = k % m, left = k >= q * m; return <circle key={k} cx={40 + col * S} cy={25 + row * S} r="8" fill={left ? coral : sky} stroke={ink} strokeWidth="1" />; })}
      <text x="300" y="50" fontSize="22" fontWeight="700" fill={ink}>{N} = {m} × {q} + {r}</text>
      <text x="300" y="80" fontSize="16" fill={ink}>{q} full rows, {r} left over</text>
      <text x="300" y="106" fontSize="16" fill={ink}>So {N} has the form {m}k + {r}</text>
    </svg>
    <Say><p>The red dots are the remainder. It is always less than the group size {m}.{r === 0 ? ` Remainder 0: ${N} is a multiple of ${m}.` : ''}</p></Say>
  </Box>;
}

function tests(s: string) {
  const n = BigInt(s || '0'), last = (k: number) => Number(s.slice(-k) || '0'), ds = sumDigits(s);
  const rev = [...s].reverse(), odd = rev.filter((_, i) => i % 2 === 0).reduce((a, d) => a + Number(d), 0), even = rev.filter((_, i) => i % 2 === 1).reduce((a, d) => a + Number(d), 0);
  const ok = (d: number) => n % BigInt(d) === BigInt(0);
  return [
    {d: 2, why: `last digit ${s.slice(-1)} is ${last(1) % 2 ? 'odd' : 'even'}`, ok: ok(2)},
    {d: 3, why: `digit sum ${ds}${ds % 3 ? ' is not' : ' is'} a multiple of 3`, ok: ok(3)},
    {d: 4, why: `last two digits ${s.slice(-2)}${last(2) % 4 ? ' are not' : ' are'} a multiple of 4`, ok: ok(4)},
    {d: 5, why: `last digit is ${s.slice(-1)}`, ok: ok(5)},
    {d: 6, why: 'divisible by both 2 and 3?', ok: ok(6)},
    {d: 8, why: `last three digits ${s.slice(-3)}${last(3) % 8 ? ' are not' : ' are'} a multiple of 8`, ok: ok(8)},
    {d: 9, why: `digit sum ${ds}${ds % 9 ? ' is not' : ' is'} a multiple of 9`, ok: ok(9)},
    {d: 10, why: `last digit is ${s.slice(-1)}`, ok: ok(10)},
    {d: 11, why: `(odd places) − (even places) = ${odd} − ${even} = ${odd - even}`, ok: ok(11)},
  ];
}
/** Type a number: every divisibility test with its reason. */
export function DivisibilityTester() {
  const [raw, setRaw] = useState('7344'); const s = digitsOf(raw).slice(0, 15) || '0';
  return <Box title="Divisibility tester">
    <label className="explore-slider">Type a number: <input type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} style={{fontSize: '1.2rem', padding: '6px 10px', border: '2px solid #011e47', borderRadius: 8}} /></label>
    <table style={{width: '100%', borderCollapse: 'collapse', marginTop: 8}}><tbody>{tests(s).map((t) => <tr key={t.d} style={{borderBottom: '1px solid #dbe3ee'}}>
      <td style={{padding: '6px 8px', fontWeight: 700}}>÷ {t.d}</td><td style={{padding: '6px 8px'}}>{t.why}</td><td style={{padding: '6px 8px', fontWeight: 800, color: t.ok ? green : red}}>{t.ok ? 'Yes' : 'No'}</td></tr>)}</tbody></table>
    <Say><p>Each test looks only at a small part of the number: the last digits, the digit sum or the alternating sum. Try 7344, 627121 and 98765.</p></Say>
  </Box>;
}

const TEMPLATES = [{t: '6?45', d: 9}, {t: '7?2', d: 3}, {t: '5?37', d: 11}, {t: '523?', d: 8}, {t: '35?4', d: 18}, {t: '4?56', d: 44}];
/** Choose the missing digit and watch the test. */
export function MissingDigit() {
  const [k, setK] = useState(0), [x, setX] = useState(0); const T = TEMPLATES[k], s = T.t.replace('?', String(x)), n = Number(s), ok = n % T.d === 0;
  const all = Array.from({length: 10}, (_, d) => d).filter((d) => Number(T.t.replace('?', String(d))) % T.d === 0);
  return <Box title="Find the missing digit">
    <Pick labels={TEMPLATES.map((t) => `${t.t} ÷ ${t.d}`)} value={k} onChange={(n) => { setK(n); setX(0); }} />
    <Slide label="Digit in the box" value={x} min={0} max={9} onChange={setX} />
    <svg className="explore-canvas" viewBox="0 0 600 120" role="img" aria-label={`${s} divided by ${T.d}`}>
      {[...T.t].map((ch, i) => <g key={i}><rect x={300 - T.t.length * 30 + i * 60} y="20" width="54" height="64" rx="8" fill={ch === '?' ? (ok ? '#8fdc9a' : orange) : '#fff'} stroke={ink} strokeWidth="2" /><text x={327 - T.t.length * 30 + i * 60} y="66" textAnchor="middle" fontSize="34" fontWeight="700" fill={ink}>{ch === '?' ? x : ch}</text></g>)}
      <text x="300" y="110" textAnchor="middle" fontSize="16" fill={ok ? green : red}>{s} ÷ {T.d} {ok ? `= ${n / T.d} exactly` : `leaves remainder ${n % T.d}`}</text>
    </svg>
    <Say><p>{T.d === 9 || T.d === 3 ? `Digit sum = ${sumDigits(s)}.` : T.d === 11 ? 'Use (odd places) − (even places).' : T.d === 8 ? `Last three digits: ${s.slice(-3)}.` : T.d === 18 ? `18 = 2 × 9: even, and digit sum ${sumDigits(s)}.` : `44 = 4 × 11: last two digits ${s.slice(-2)}, and the test for 11.`} {ok ? 'This digit works.' : 'Try another digit.'}</p><p>Digits that work: {all.length ? all.join(', ') : 'none'}.</p></Say>
  </Box>;
}

/** Repeated digit sums. */
export function DigitalRoot() {
  const [raw, setRaw] = useState('98765'); let s = digitsOf(raw).slice(0, 18) || '0'; const chain = [s];
  while (s.length > 1) { s = String(sumDigits(s)); chain.push(s); }
  const r = Number(chain[0].length > 15 ? 0 : BigInt(chain[0]) % BigInt(9));
  return <Box title="Digital root">
    <label className="explore-slider">Type a number: <input type="text" inputMode="numeric" value={raw} onChange={(e) => setRaw(e.target.value)} style={{fontSize: '1.2rem', padding: '6px 10px', border: '2px solid #011e47', borderRadius: 8}} /></label>
    <svg className="explore-canvas" viewBox="0 0 600 110" role="img" aria-label="Chain of digit sums">
      <text x="300" y="62" textAnchor="middle" fontSize="26" fontWeight="700" fill={ink}>{chain.map((c, i) => (i ? ' → ' : '') + c).join('')}</text>
    </svg>
    <Say><p>Digital root: <strong>{chain[chain.length - 1]}</strong>. Remainder on division by 9: {r}.{r === 0 ? ' A multiple of 9 has digital root 9.' : ' The digital root and the remainder are the same.'}</p></Say>
  </Box>;
}

/** A number and its reversal. */
export function Reversal() {
  const [three, setThree] = useState(0), [a, setA] = useState(8), [b, setB] = useState(3), [c, setC] = useState(1);
  const N = three ? 100 * a + 10 * b + c : 10 * a + b, R = three ? 100 * c + 10 * b + a : 10 * b + a, diff = N - R, sum = N + R;
  return <Box title="A number and its reversal">
    <Pick labels={['Two digits', 'Three digits']} value={three} onChange={setThree} />
    <Slide label="First digit a" value={a} min={1} max={9} onChange={setA} />
    <Slide label={three ? 'Middle digit b' : 'Second digit b'} value={b} min={0} max={9} onChange={setB} />
    {!!three && <Slide label="Last digit c" value={c} min={1} max={9} onChange={setC} />}
    <svg className="explore-canvas" viewBox="0 0 600 130" role="img" aria-label="Number, reversal, sum and difference">
      <text x="300" y="45" textAnchor="middle" fontSize="22" fontWeight="700" fill={blue}>{N} − {R} = {String(diff).replace('-', '−')} = {three ? `99 × (${a} − ${c})` : `9 × (${a} − ${b})`}</text>
      <text x="300" y="95" textAnchor="middle" fontSize="22" fontWeight="700" fill={green}>{N} + {R} = {sum}{three ? '' : ` = 11 × (${a} + ${b})`}</text>
    </svg>
    <Say><p>{three ? '(100a + 10b + c) − (100c + 10b + a) = 99(a − c): the middle digit cancels.' : '(10a + b) − (10b + a) = 9(a − b), and (10a + b) + (10b + a) = 11(a + b).'}</p></Say>
  </Box>;
}
