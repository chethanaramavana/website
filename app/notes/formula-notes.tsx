import Tex from './tex';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';
import NotesLab from './notes-lab';
import TeachingDiagram, {type TeachingDiagramSpec} from './cbse89-diagram';
import NotesPrintButton from './real-numbers/print-button';

type Worked = {question: string; use?: string[]; steps: string[]; result?: string; type?: string; diagram?: TeachingDiagramSpec};
type Lesson = {title: string; level: string; formulas: string[]; examples: Worked[]; ideas?: string[]; experiment?: {title: string; steps: string[]; result: string}; labs?: {slug: string; index: number}[]; diagram?: TeachingDiagramSpec | null};
export type FormulaNotesData = {kicker: string; title: string; back: {href: string; label: string}; grade: {href: string; label: string}; storeKey: string; subtitle?: string; links?: {href: string; label: string}[]; sheet: {title: string; items: string[]}[]; lessons: Lesson[]; school?: boolean; sources?: {href: string; label: string}[]};
const math = (f: string) => `$${f}$`;

function Example({e, label, school}: {e: Worked; label: string; school?: boolean}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · <Tex>{e.type}</Tex></>}</p>
    <div className="ir-question"><Tex>{e.question}</Tex></div>
    {e.diagram && <TeachingDiagram spec={e.diagram} />}
    {e.use && e.use.length > 0 && <div className="ir-use"><span className="ir-label">Formula used</span>{e.use.map((f, k) => <div key={k} className="ir-use-line"><Tex>{math(f)}</Tex></div>)}</div>}
    <div className="ir-solution"><span className="ir-label">Solution</span>{e.steps.map((s, k) => <div key={k} className="ir-line">{school && <strong>Step {k+1}. </strong>}<Tex>{s}</Tex></div>)}</div>
    {e.result && <div className="ir-result"><span className="ir-label">Answer</span><Tex>{e.result}</Tex></div>}
  </article>;
}

/** Shared Straight Lines layout; school chapters use age-appropriate session labels. */
export default function FormulaNotes({data}: {data: FormulaNotesData}) {
  const {lessons} = data, board = lessons.filter((l) => l.level === 'board').length;
  return <main className={`integrals-reader${data.school ? ' school-reader' : ''}`}>
    <a className="ir-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo" /><span>Ramavana<br /><small>Mathematical Center</small></span></a>
    <nav><a href={data.grade.href}>{data.grade.label}</a> / <a href={data.back.href}>{data.back.label}</a> / Notes</nav>
    <header>
      <p className="ir-kicker">{data.kicker}</p>
      <h1>{data.title}</h1>
      <p className="ir-sub">{data.subtitle ? <>{data.subtitle} · </> : null}Formula sheet and {lessons.reduce((n, l) => n + l.examples.length, 0)} solved examples.</p>
      {data.school ? <><p>Read one session at a time. Try its controls, follow each step, then cover the answer and try again. A mistake tells you which idea to revisit.</p><p className="ir-levels"><span className="ir-tag board">School exam preparation</span> {lessons.length} guided sessions · Original practice</p><NotesPrintButton /></> : <p className="ir-levels"><span className="ir-tag board">Board exam</span> Sessions 1–{board}{board < lessons.length && <> · <span className="ir-tag challenge">Challenge</span> Sessions {board + 1}–{lessons.length} (JEE)</>}</p>}
    </header>
    <section className="ir-sheet" id="formulas">
      <h2>{data.school ? 'Rules to keep beside you' : 'Formula sheet'}</h2>
      <div className="ir-sheet-grid">{data.sheet.map((g) => <div key={g.title} className="ir-sheet-card"><h3>{g.title}</h3>{g.items.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>)}</div>
    </section>
    <SessionProgress titles={lessons.map((l) => l.title)} storeKey={data.storeKey} />
    {lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{data.school ? (i===0?'Start here':'Build on it') : l.level === 'board' ? 'Board exam' : 'Challenge'}</span></div>
      <h2>{l.title}</h2>
      {l.ideas && l.ideas.length > 0 && <div className="ir-ideas"><span className="ir-label">{data.school?'Understand the idea':'Key ideas'}</span><ul>{l.ideas.map((t, k) => <li key={k}><Tex>{t}</Tex></li>)}</ul></div>}
      {!!l.formulas.length && <div className="ir-formulas"><span className="ir-label">Formulas</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>}
      {l.diagram && <TeachingDiagram spec={l.diagram} />}
      {l.labs?.map((lab) => <div className="ir-lab" key={`${lab.slug}-${lab.index}`}><span className="ir-label">Try it · simulation</span><NotesLab slug={lab.slug} index={lab.index} /></div>)}
      <div className="ir-worked">{l.examples.map((e, j) => <Example key={j} e={e} label={`EXAMPLE ${j + 1}`} school={data.school} />)}</div>
      {l.experiment && <div className="ir-exp"><span className="ir-label">Activity</span><h3><Tex>{l.experiment.title}</Tex></h3><ol>{l.experiment.steps.map((t, k) => <li key={k}><Tex>{t}</Tex></li>)}</ol><div className="ir-exp-result"><strong>What you see: </strong><Tex>{l.experiment.result}</Tex></div></div>}
      <SessionTick index={i} total={lessons.length} storeKey={data.storeKey} />
    </section>)}
    <footer><h2>Put the ideas to work</h2>{data.links ? <p className="ir-links">{data.links.map((x) => <a key={x.href} href={x.href}>{x.label}</a>)}</p> : <p><a href={data.back.href}>Practise the chapter questions →</a></p>}{data.sources && <p>Curriculum reference: {data.sources.map(s=><a key={s.href} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>)}</p>}<small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
