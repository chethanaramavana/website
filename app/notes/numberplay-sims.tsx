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

/** Put + or − between four consecutive numbers: the answer is always even. */
export function PlusMinus() {
  const [n, setN] = useState(5), [s, setS] = useState([1, 1, 1]);
  const nums = [n, n + 1, n + 2, n + 3], val = nums.slice(1).reduce((acc, x, i) => acc + (s[i] ? x : -x), nums[0]);
  return <Box title="Plus or minus? The answer is always even">
    <Slide label="First number" value={n} min={1} max={40} onChange={setN} />
    <div className="explore-buttons">{[0, 1, 2].map((i) => <button key={i} type="button" aria-pressed={!!s[i]} onClick={() => setS(s.map((x, j) => j === i ? 1 - x : x))}>Gap {i + 1}: {s[i] ? '+' : '−'}</button>)}</div>
    <svg className="explore-canvas" viewBox="0 0 600 110" role="img" aria-label="Expression with four consecutive numbers">
      <text x="300" y="60" textAnchor="middle" fontSize="30" fontWeight="700" fill={ink}>{nums[0]} {s[0] ? '+' : '−'} {nums[1]} {s[1] ? '+' : '−'} {nums[2]} {s[2] ? '+' : '−'} {nums[3]} = <tspan fill={green}>{String(val).replace('-', '−')}</tspan></text>
      <text x="300" y="95" textAnchor="middle" fontSize="16" fill={ink}>{val % 2 === 0 ? 'even' : 'odd'}</text>
    </svg>
    <Say><p>Four consecutive numbers have two odd and two even numbers. With all + signs the sum is even. Changing +x to −x changes the answer by 2x, which is even. So the answer is always even.</p></Say>
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
