import Tex from './tex';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';

type Worked = {question: string; use?: string[]; steps: string[]; result?: string; type?: string};
type Lesson = {title: string; level: string; formulas: string[]; examples: Worked[]};
export type FormulaNotesData = {kicker: string; title: string; back: {href: string; label: string}; grade: {href: string; label: string}; storeKey: string; sheet: {title: string; items: string[]}[]; lessons: Lesson[]};
const math = (f: string) => `$${f}$`;

function Example({e, label}: {e: Worked; label: string}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · <Tex>{e.type}</Tex></>}</p>
    <div className="ir-question"><Tex>{e.question}</Tex></div>
    {e.use && e.use.length > 0 && <div className="ir-use"><span className="ir-label">Formula used</span>{e.use.map((f, k) => <div key={k} className="ir-use-line"><Tex>{math(f)}</Tex></div>)}</div>}
    <div className="ir-solution"><span className="ir-label">Solution</span>{e.steps.map((s, k) => <div key={k} className="ir-line"><Tex>{s}</Tex></div>)}</div>
    {e.result && <div className="ir-result"><span className="ir-label">Answer</span><Tex>{e.result}</Tex></div>}
  </article>;
}

/** Formula-first chapter notes: a formula sheet, then sessions of solved examples with tick boxes. */
export default function FormulaNotes({data}: {data: FormulaNotesData}) {
  const {lessons} = data, board = lessons.filter((l) => l.level === 'board').length;
  return <main className="integrals-reader">
    <a className="ir-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo" /><span>Ramavana<br /><small>Mathematical Center</small></span></a>
    <nav><a href={data.grade.href}>{data.grade.label}</a> / <a href={data.back.href}>{data.back.label}</a> / Notes</nav>
    <header>
      <p className="ir-kicker">{data.kicker}</p>
      <h1>{data.title}</h1>
      <p className="ir-sub">Formula sheet and {lessons.reduce((n, l) => n + l.examples.length, 0)} solved examples.</p>
      <p className="ir-levels"><span className="ir-tag board">Board exam</span> Sessions 1–{board}{board < lessons.length && <> · <span className="ir-tag challenge">Challenge</span> Sessions {board + 1}–{lessons.length} (JEE)</>}</p>
    </header>
    <section className="ir-sheet" id="formulas">
      <h2>Formula sheet</h2>
      <div className="ir-sheet-grid">{data.sheet.map((g) => <div key={g.title} className="ir-sheet-card"><h3>{g.title}</h3>{g.items.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>)}</div>
    </section>
    <SessionProgress titles={lessons.map((l) => l.title)} storeKey={data.storeKey} />
    {lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{l.level === 'board' ? 'Board exam' : 'Challenge'}</span></div>
      <h2>{l.title}</h2>
      <div className="ir-formulas"><span className="ir-label">Formulas</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>
      <div className="ir-worked">{l.examples.map((e, j) => <Example key={j} e={e} label={`EXAMPLE ${j + 1}`} />)}</div>
      <SessionTick index={i} total={lessons.length} storeKey={data.storeKey} />
    </section>)}
    <footer><h2>Put the ideas to work</h2><p><a href={data.back.href}>Practise the chapter questions →</a></p><small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
