import type { Metadata } from 'next';
import { ArrowLeft, Download, FileText, Printer } from 'lucide-react';
import Brand from '@/app/brand';
import Tex from '@/app/notes/tex';
import worksheet from '@/lib/free-worksheets/g11-straight-lines.json';
import key from '@/lib/free-worksheets/g11-straight-lines-solutions.json';
import PrintButton from '../print-button';
import '../worksheet.css';

export const metadata: Metadata = {
  title: 'Straight Lines worksheet solutions · Grade 11 | Ramavana',
  description: 'Step-by-step solutions to the free CBSE Grade 11 Straight Lines practice worksheet: all 30 questions.',
};

type Part = { label: string; text: string };
type Question = { n: number; text: string; options?: string[]; parts?: Part[]; orParts?: Part[] };
type Step = { steps: string[]; answer: string };
type PartSolution = Step & { label: string };
type Solution = Partial<Step> & { n: number; parts?: PartSolution[]; orParts?: PartSolution[] };

const solutions = new Map((key.solutions as Solution[]).map((s) => [s.n, s]));

function Working({ s }: { s: Step }) {
  return <>
    <ol className="sol-steps">{s.steps.map((t, i) => <li key={i}><Tex>{t}</Tex></li>)}</ol>
    <p className="sol-answer"><b>Answer:</b> <Tex>{s.answer}</Tex></p>
  </>;
}

function PartWorking({ parts, questionParts }: { parts: PartSolution[]; questionParts?: Part[] }) {
  return <>{parts.map((p, i) => <div className="sol-part" key={i}>
    <p><span className="ws-label">({p.label})</span> <Tex>{questionParts?.[i]?.text ?? ''}</Tex></p>
    <Working s={p} />
  </div>)}</>;
}

/** Step-by-step solutions for the free Straight Lines worksheet. */
export default function StraightLinesSolutions() {
  return <main className="ws-page">
    <nav className="ws-actions" aria-label="Solution actions">
      <a href="/cbse/grade-11/straight-lines-worksheet"><ArrowLeft aria-hidden="true" />Back to the worksheet</a>
      <a href="/cbse/grade-11/ch-9"><FileText aria-hidden="true" />Straight Lines chapter</a>
      <a href="/worksheets/grade11-straight-lines-solutions.pdf" download><Download aria-hidden="true" />Download PDF</a>
      <PrintButton><Printer aria-hidden="true" />Print</PrintButton>
    </nav>
    <article className="ws-sheet">
      <header className="ws-head"><Brand /><div><strong>Straight Lines — Solutions</strong><span>Grade 11 · CBSE · Free practice worksheet</span></div></header>
      <p className="ws-note">Try each question yourself first. Then compare your working with these steps.</p>
      {worksheet.sections.map((section) => <section key={section.title}>
        <h2 className="ws-section"><span>{section.title}</span><em>{section.marks}</em></h2>
        {(section.questions as Question[]).map((q) => {
          const s = solutions.get(q.n);
          return <div className={`ws-question sol-question${q.orParts ? ' ws-case' : ''}`} key={q.n}>
            <p><b>Q{q.n}.</b> <Tex>{q.text}</Tex></p>
            {q.options && <ol className="ws-options">{q.options.map((o, i) => <li key={i}>({'abcd'[i]}) <Tex>{o}</Tex></li>)}</ol>}
            {s?.steps && s.answer && <div className="sol-box"><Working s={s as Step} /></div>}
            {s?.parts && <div className="sol-box"><PartWorking parts={s.parts} questionParts={q.parts} /></div>}
            {s?.orParts && <><p className="ws-or">OR</p><div className="sol-box"><PartWorking parts={s.orParts} questionParts={q.orParts} /></div></>}
          </div>;
        })}
      </section>)}
      <p className="ws-end">— End of solutions —<br />Ramavana Mathematical Centre · ramavanamath.com</p>
    </article>
  </main>;
}
