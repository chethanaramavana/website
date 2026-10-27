import type { Metadata } from 'next';
import Tex from '@/app/notes/tex';
import { relationsPracticePaper } from '@/lib/relations-practice-paper';
import PrintActions from './print-actions';
import './paper.css';

export const metadata: Metadata = {
  title: 'Free 30-mark Relations and Functions paper | Class 11 | Ramavana',
  description: 'A free CBSE Class 11 chapter practice paper with 14 questions, worked solutions and a stepwise marking scheme. Print or save as PDF.',
};
const sections = [
  ['A', 'Objective questions', '6 × 1 = 6 marks'],
  ['B', 'Short answers', '3 × 2 = 6 marks'],
  ['C', 'Reasoning and graphs', '3 × 3 = 9 marks'],
  ['D', 'Extended response', '1 × 5 = 5 marks'],
  ['E', 'Case study', '1 × 4 = 4 marks'],
];

export default function RelationsPaper() {
  return <main className="relations-paper">
    <nav className="relations-paper-nav" aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/cbse/grade-11/ch-2">Class 11 · Relations and Functions</a> / Free paper</nav>
    <header><img src="/ramavana-paper-logo.png" alt="Ramavana Mathematical Centre" width="170" /><p>CBSE CLASS XI · MATHEMATICS · 2026–27</p><h1>Relations and Functions</h1><p>Chapter practice paper · Free · 30 marks · Suggested time: 60 minutes</p></header>
    <div className="relations-paper-intro"><p>Original, medium-to-challenging practice for Class 11 school examinations. This is a chapter test, not an official CBSE paper or a prediction of examination questions.</p><p>Write your answers on paper, then use the worked marking scheme to check them. This self-practice paper does not submit answers or save a score to your report.</p></div>
    <PrintActions />
    <article className="relations-question-sheet">
      <p className="relations-candidate">Name: ______________________________ Date: ______________</p>
      <h2>Instructions</h2><ol><li>All 14 questions are compulsory. For Questions 9 and 12, attempt only one of the two alternatives.</li><li>Show working for Sections B–E. Marks are shown beside each question. There is no negative marking.</li><li>Use labelled axes for graphs and show open or closed endpoints where needed. Calculators are not required.</li><li><Tex>{String.raw`$\lfloor x\rfloor$ denotes the greatest integer less than or equal to $x$. $\mathbb R$ and $\mathbb Z$ denote the real numbers and integers.`}</Tex></li></ol>
      {sections.map(([id, title, marks]) => <section key={id}><h2>Section {id} · {title} <small>{marks}</small></h2>{id === 'A' && <aside>For Questions 5 and 6, choose:<br />A. Both assertion and reason are true, and the reason correctly explains the assertion.<br />B. Both are true, but the reason does not correctly explain the assertion.<br />C. Assertion is true, reason is false.<br />D. Assertion is false, reason is true.</aside>}{relationsPracticePaper.filter(q => q.section === id).map(q => <div className="relations-question" key={q.number}><div className="relations-question-heading"><strong>Question {q.number}</strong><span>[{q.marks} {q.marks === 1 ? 'mark' : 'marks'}]</span></div><p><Tex>{q.question}</Tex></p>{q.options && <ol className="relations-options" type="A">{q.options.map(option => <li key={option}><Tex>{option}</Tex></li>)}</ol>}</div>)}</section>)}
      <p className="relations-end">End of question paper · Total: 30 marks</p>
    </article>
    <details className="relations-solutions" id="marking-scheme"><summary>Worked solutions and marking scheme · Open after attempting the paper</summary><h2>Worked marking scheme · 30 marks</h2><p>Award the indicated marks for correct reasoning. Accept equivalent valid methods. For internal choices, mark only the attempted alternative, up to the question’s maximum.</p>{relationsPracticePaper.map(q => <section className="relations-question" key={q.number}><h3>Question {q.number} · {q.marks} {q.marks === 1 ? 'mark' : 'marks'}</h3><p><Tex>{q.solution}</Tex></p></section>)}</details>
    <footer><p>Prepared by Ramavana Mathematical Centre · Run by professional mathematicians</p><p className="relations-paper-nav">Scope checked against the <a href="https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/Maths_SecP2_2026-27.pdf">CBSE Mathematics syllabus 2026–27</a>. Composition of functions is excluded from this summative practice paper.</p><a className="relations-paper-nav" href="/cbse/grade-11/ch-2/free-mcq">Practise the free 50-question MCQ quiz →</a></footer>
  </main>;
}
