import lessons from '@/lib/integrals-lessons.json';
import sheet from '@/lib/integrals-formulas.json';
import Tex from './tex';
import IntegralsVisual from './integrals-visuals';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';

type Worked = {title: string; question: string; use?: string[]; steps: string[]; result?: string; type?: string};
const math = (f: string) => `$${f}$`;

function Example({e, label}: {e: Worked; label: string}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · <Tex>{e.type}</Tex></>}</p>
    <div className="ir-question"><Tex>{e.question}</Tex></div>
    {e.use && e.use.length > 0 && <div className="ir-use"><span className="ir-label">Formula used</span>{e.use.map((f, k) => <div key={k} className="ir-use-line"><Tex>{math(f)}</Tex></div>)}</div>}
    <div className="ir-solution"><span className="ir-label">Solution</span>
      {e.steps.map((s, k) => <div key={k} className="ir-line"><Tex>{s}</Tex></div>)}
    </div>
    {e.result && <div className="ir-result"><span className="ir-label">Answer</span><Tex>{e.result}</Tex></div>}
  </article>;
}

export default function IntegralsOnline() {
  const board = lessons.filter((l) => l.level === 'board').length;
  return <main className="integrals-reader">
    <a className="ir-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo" /><span>Ramavana<br /><small>Mathematical Center</small></span></a>
    <nav><a href="/cbse/grade-12">Grade 12</a> / <a href="/cbse/grade-12/integrals">Integrals</a> / Notes</nav>
    <header>
      <p className="ir-kicker">THE INTEGRALS CHAPTER</p>
      <h1>Learn the formulas.<br /><em>Solve every type.</em></h1>
      <p className="ir-levels"><span className="ir-tag board">Board exam</span> Sessions 1–{board} · <span className="ir-tag challenge">Challenge</span> Sessions {board + 1}–{lessons.length} (JEE)</p>
    </header>
    <section className="ir-sheet" id="formulas">
      <h2>Formula sheet</h2>
      <div className="ir-sheet-grid">{sheet.map((g) => <div key={g.title} className="ir-sheet-card"><h3>{g.title}</h3>{g.items.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>)}</div>
    </section>
    <SessionProgress titles={lessons.map((l) => l.title)} />
    {lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{l.level === 'board' ? 'Board exam' : 'Challenge'}</span></div>
      <h2>{l.title}</h2>
      <div className="ir-formulas"><span className="ir-label">Formulas</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{math(f)}</Tex></div>)}</div>
      <details className="ir-theory"><summary>Read the theory</summary>{l.ideas.map((p, j) => <p key={j}><Tex>{p}</Tex></p>)}</details>
      {l.visual && <IntegralsVisual kind={l.visual} />}
      <div className="ir-worked">{(l.examples as Worked[]).map((e, j) => <Example key={j} e={e} label={`EXAMPLE ${j + 1}`} />)}
        {(l.types as Worked[]).map((e, j) => <Example key={`t${j}`} e={e} label={`EXAMPLE ${l.examples.length + j + 1}`} />)}</div>
      <aside className="ir-watch"><strong>Common mistake</strong><p><Tex>{l.trap}</Tex></p></aside>
      <div className="ir-check"><strong>Your turn</strong><p><Tex>{l.check}</Tex></p><details><summary>Show the solution</summary><p><Tex>{l.answer}</Tex></p></details></div>
      <SessionTick index={i} total={lessons.length} />
    </section>)}
    <footer><h2>Put the ideas to work</h2><p><a href="/cbse/grade-12/ch-7/free-mcq">Take the free 50-question MCQ practice →</a></p><p><a href="/cbse/grade-12/integrals">Choose a CBSE or JEE practice paper →</a></p><small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
