import type { Metadata } from 'next';
import { ArrowLeft, Download, Printer } from 'lucide-react';
import Brand from '@/app/brand';
import Tex from '@/app/notes/tex';
import worksheet from '@/lib/free-worksheets/g11-straight-lines.json';
import PrintButton from './print-button';
import './worksheet.css';

export const metadata: Metadata = {
  title: 'Free Straight Lines worksheet · Grade 11 | Ramavana',
  description: 'A free CBSE Grade 11 Straight Lines practice worksheet: 40 questions in five sections, with a key-formula table. No login, no payment.',
};

type Part = { label: string; text: string };
type Question = { n: number; text: string; options?: string[]; parts?: Part[]; orParts?: Part[] };

function Parts({ parts }: { parts: Part[] }) {
  return <ol className="ws-parts">{parts.map((p, i) => <li key={i}><span className="ws-label">({p.label})</span> <Tex>{p.text}</Tex></li>)}</ol>;
}

/** A free worksheet: anyone can open it, print it or download the PDF. It has no answer key. */
export default function StraightLinesWorksheet() {
  return <main className="ws-page">
    <nav className="ws-actions" aria-label="Worksheet actions">
      <a href="/cbse/grade-11/ch-9"><ArrowLeft aria-hidden="true" />Straight Lines chapter</a>
      <a href="/worksheets/grade11-straight-lines-worksheet.pdf" download><Download aria-hidden="true" />Download PDF</a>
      <PrintButton><Printer aria-hidden="true" />Print</PrintButton>
    </nav>
    <article className="ws-sheet">
      <header className="ws-head"><Brand /><div><strong>Straight Lines</strong><span>Grade 11 · CBSE · Free practice worksheet</span></div></header>
      <div className="ws-meta"><span>Name:</span><span>Date:</span><span>Batch:</span></div>
      <p className="ws-note">Solve every question in your notebook and show all working. Questions follow the current CBSE syllabus (2026–27). Normal form, general equation, family of lines and shifting of origin are not in the syllabus, so they are not asked here.</p>
      <h2 className="ws-section"><span>Key formulas</span></h2>
      <table className="ws-formulas"><tbody>{worksheet.formulas.map((f, i) => <tr key={i}><td><Tex>{f.idea}</Tex></td><td><Tex>{f.formula}</Tex></td></tr>)}</tbody></table>
      {worksheet.sections.map((section) => <section key={section.title}>
        <h2 className="ws-section"><span>{section.title}</span><em>{section.marks}</em></h2>
        {(section.questions as Question[]).map((q) => <div className={`ws-question${q.orParts ? ' ws-case' : ''}`} key={q.n}>
          <p><b>Q{q.n}.</b> <Tex>{q.text}</Tex></p>
          {q.options && <ol className="ws-options">{q.options.map((o, i) => <li key={i}>({'abcd'[i]}) <Tex>{o}</Tex></li>)}</ol>}
          {q.parts && <Parts parts={q.parts} />}
          {q.orParts && <><p className="ws-or">OR</p><Parts parts={q.orParts} /></>}
        </div>)}
      </section>)}
      <p className="ws-end">— End of worksheet —<br />Ramavana Mathematical Centre · ramavanamath.com</p>
    </article>
  </main>;
}
