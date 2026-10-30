import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import NotesBranding from './notes-branding';
import NotesPrintButton from './real-numbers/print-button';
import MathText from './math-text';

function Page({ title, children }: { title: string; children: ReactNode }) {
  return <article className="notes-page simple-notes-page"><NotesBranding /><header className="notes-running-header"><span>ICSE · Grade 6 · Whole Numbers</span></header><h2>{title}</h2>{children}<footer className="notes-page-number">Ramavana Mathematical Center · {title}</footer></article>;
}

function NumberLine({ subtract = false }: { subtract?: boolean }) {
  const jumps = subtract ? [[6,5],[5,4]] : [[2,3],[3,4],[4,5]];
  return <figure className="simple-maths-picture"><svg viewBox="0 0 640 180" role="img" aria-label={subtract ? 'Start at 6 and jump left twice to reach 4' : 'Start at 2 and jump right three times to reach 5'}>
    <path d="M50 110H598l-10-6m10 6-10 6" fill="none" stroke="#214e65" strokeWidth="3" />
    {Array.from({length:9}, (_,i) => <g key={i}><path d={`M${60+i*65} 103v14`} stroke="#214e65" strokeWidth="2"/><text x={60+i*65} y="142" textAnchor="middle" fontSize="18" fill="#214e65">{i}</text></g>)}
    {jumps.map(([a,b]) => <g key={a}><path d={`M${60+a*65} 97Q${60+(a+b)*32.5} 35 ${60+b*65} 97`} fill="none" stroke={subtract ? '#c44d37' : '#11818a'} strokeWidth="3"/><path d={`M${60+b*65} 97l${subtract ? 1 : -10} -9  ${subtract ? 8 : 3} 0Z`} fill={subtract ? '#c44d37' : '#11818a'}/></g>)}
  </svg><figcaption>{subtract ? '6 − 2 = 4: start at 6 and make two jumps left.' : '2 + 3 = 5: start at 2 and make three jumps right.'}</figcaption></figure>;
}

function Counters() {
  return <figure className="simple-maths-picture"><svg viewBox="0 0 640 170" role="img" aria-label="Three groups containing zero, one and three counters">
    {[0,1,3].map((count,i)=><g key={count}><rect x={25+i*205} y="15" width="180" height="85" rx="12" fill="#eaf7f6" stroke="#b8d9da"/>{Array.from({length:count},(_,j)=><circle key={j} cx={65+i*205+j*45} cy="57" r="13" fill="#11818a"/>)}<text x={115+i*205} y="131" textAnchor="middle" fill="#214e65" fontSize="18">{count} counters</text></g>)}
  </svg><figcaption>Zero means none. It is still a whole number.</figcaption></figure>;
}

function ArrayPicture() {
  return <figure className="simple-maths-picture"><svg viewBox="0 0 640 220" role="img" aria-label="A dot array has three rows of four dots, or four columns of three dots: both contain twelve dots">
    {Array.from({length:3},(_,r)=>Array.from({length:4},(_,c)=><circle key={`${r}-${c}`} cx={190+c*65} cy={45+r*55} r="13" fill="#11818a"/>))}
    <text x="100" y="105" textAnchor="middle" fontSize="18" fill="#214e65">3 rows</text><text x="286" y="208" textAnchor="middle" fontSize="18" fill="#214e65">4 columns</text>
  </svg><figcaption>Count by rows: 3 × 4 = 12. Count by columns: 4 × 3 = 12.</figcaption></figure>;
}

const checks = [
  ['What are the first six whole numbers?', '0, 1, 2, 3, 4, 5. We start at zero.'],
  ['What comes just before 70 and just after 70?', 'Before: 69. After: 71. Subtract one or add one.'],
  ['What is 8 + 0? What is 8 × 0?', '8 + 0 = 8, but 8 × 0 = 0. Adding no counters keeps the group; zero groups contain no counters.'],
  ['Can we change 9 − 4 into 4 − 9 and get the same answer?', 'No. 9 − 4 = 5. 4 − 9 is not a whole number. Subtraction does not allow swapping.'],
  ['Find 6 × 19 using a shortcut.', '6 × 19 = 6 × (20 − 1) = 120 − 6 = 114.'],
  ['Why can we not divide 12 by zero?', 'Division would ask how many zero-sized groups make 12. No number of such groups can make 12, because every number multiplied by 0 gives 0.'],
];

export default function WholeNumbersDocument() {
  return <main className="notes-shell study-notes-shell"><nav className="notes-toolbar"><a href="/icse/grade-6/ch-2"><ArrowLeft /><span>Back to chapter</span></a><NotesPrintButton /></nav>
    <Page title="What are whole numbers?">
      <p>We count with 1, 2, 3, 4, … . These are called <strong>natural numbers</strong> in this course.</p>
      <p>Add zero to this list and we get <strong>whole numbers</strong>:</p><p className="simple-equation"><MathText formula>0, 1, 2, 3, 4, 5, …</MathText></p>
      <Counters />
      <p>There is a smallest whole number: <strong>0</strong>. There is no largest whole number—add 1 and you always get a bigger one.</p>
      <section><h3>One before and one after</h3><p>The <strong>successor</strong> is the next number: add 1. The <strong>predecessor</strong> is the previous number: subtract 1.</p><div className="simple-number-neighbours"><span><b>48</b>predecessor</span><span><b>49</b>our number</span><span><b>50</b>successor</span></div><p>Zero has no predecessor among whole numbers. Negative numbers and fractions are not whole numbers.</p></section>
      <details className="study-answer"><summary>Predict: is 0 a natural number or a whole number here?</summary><div>It is a whole number. Our natural-number list starts at 1.</div></details>
    </Page>
    <Page title="Add and subtract on a number line">
      <p>Whole numbers sit at equal distances on a number line starting at 0. Numbers get larger as we move right.</p>
      <h3>Add: move right</h3><p>For 2 + 3, start at 2 and move three spaces right. Count the spaces, not the starting mark.</p><NumberLine />
      <h3>Subtract: move left</h3><p>For 6 − 2, start at 6 and move two spaces left.</p><NumberLine subtract />
      <aside className="study-before"><strong>Will the answer still be a whole number?</strong><p>Adding whole numbers always gives a whole number. Subtraction does not always do so: 3 − 5 goes past zero, so its answer is not a whole number.</p></aside>
      <details className="study-answer"><summary>Predict: where will 4 + 3 land?</summary><div>Start at 4. Three jumps right reach 5, 6, then 7. So 4 + 3 = 7.</div></details>
    </Page>
    <Page title="Simple rules that make calculating easier">
      <h3>Swap the order for addition and multiplication</h3><p><MathText>3 + 4 = 4 + 3 = 7. This is the commutative property: swapping the order does not change the answer.</MathText></p><ArrayPicture />
      <p><strong>Do not swap subtraction or division.</strong> <MathText>8 − 3 = 5, but 3 − 8 is not 5. Also 8 ÷ 2 = 4, but 2 ÷ 8 is not 4.</MathText></p>
      <h3>Change the grouping for addition and multiplication</h3><p><MathText>(2 + 3) + 4 = 2 + (3 + 4) = 9.</MathText> This is the associative property. Brackets tell us which calculation to do first.</p><p><MathText>(2 × 3) × 4 = 2 × (3 × 4) = 24.</MathText> This regrouping rule does not work for subtraction or division.</p>
      <h3>Use zero and one correctly</h3><table className="simple-rule-table"><thead><tr><th>Operation</th><th>Example</th><th>What happens?</th></tr></thead><tbody><tr><td>Add 0</td><td>7 + 0 = 7</td><td>No change</td></tr><tr><td>Multiply by 1</td><td>7 × 1 = 7</td><td>No change</td></tr><tr><td>Multiply by 0</td><td>7 × 0 = 0</td><td>Answer is 0</td></tr></tbody></table>
      <p>“No change” is why 0 is called the <strong>additive identity</strong> and 1 the <strong>multiplicative identity</strong>.</p>
    </Page>
    <Page title="Split a calculation into easy parts">
      <p>The <strong>distributive property</strong> means multiplying each part and then adding the answers.</p>
      <figure className="simple-maths-picture"><svg viewBox="0 0 640 180" role="img" aria-label="Three rows of seven dots split into three rows of five and three rows of two">
        {Array.from({length:3},(_,r)=>Array.from({length:7},(_,c)=><circle key={`${r}-${c}`} cx={110+c*65} cy={35+r*45} r="12" fill={c<5 ? '#11818a' : '#c99029'}/>))}
        <path d="M402 15V142" stroke="#214e65" strokeDasharray="5 4"/><g fontSize="18" fill="#214e65" textAnchor="middle"><text x="240" y="171">3 × 5 = 15</text><text x="467" y="171">3 × 2 = 6</text></g>
      </svg><figcaption>All 21 dots: 3 × 7 = (3 × 5) + (3 × 2) = 15 + 6.</figcaption></figure>
      <section className="study-worked-example"><h3>Shortcut: multiply by a nearby easy number</h3><p>Find 24 × 99. Since 99 = 100 − 1, multiply by 100 and remove one group of 24.</p><p className="simple-equation"><MathText formula>24 × 99 = 24 × (100 − 1)</MathText></p><p className="simple-equation"><MathText formula>= 2400 − 24 = 2376</MathText></p><p>This shortcut works because the 24 multiplies both parts inside the brackets.</p></section>
      <h3>Whole-number answers</h3><p>Multiplication, like addition, always gives another whole number. This is called <strong>closure</strong>. Division does not always give a whole number: 7 ÷ 2 is not a whole number.</p>
      <h3>Never divide by zero</h3><p><MathText>0 ÷ 5 = 0</MathText> is allowed. But division by zero, including 0 ÷ 0, is undefined—it has no single valid answer.</p>
    </Page>
    <Page title="Check your understanding">
      <p>Try each question on paper before opening its answer.</p>
      {checks.map(([question,answer],i)=><section className="simple-check" key={question}><h3>{i+1}. {question}</h3><details className="study-answer"><summary>Check answer</summary><div><MathText>{answer}</MathText></div></details></section>)}
      <aside className="study-before"><strong>Remember</strong><p>Whole numbers start at 0. Addition and multiplication allow swapping and regrouping. Subtraction and division do not. A shortcut must keep the value unchanged.</p></aside>
      <a href="/icse/grade-6/ch-2">Back to the chapter test</a>
    </Page>
  </main>;
}
