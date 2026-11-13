import Tex from './tex';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';

type Worked = {question: string; use?: string[]; steps: string[]; result?: string; type?: string};
export type ReaderLesson = {title: string; level: 'board' | 'challenge' | string; formulas: string[]; examples: Worked[]};
export type ReaderChapter = {slug: string; number: number; title: string; subtitle: string; sheet: {title: string; items: string[]}[]; lessons: ReaderLesson[]};


function Example({e, label}: {e: Worked; label: string}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · {e.type}</>}</p>
    <div className="ir-question"><Tex>{e.question}</Tex></div>
    {e.use && e.use.length > 0 && <div className="ir-use"><span className="ir-label">Formula used</span>{e.use.map((f, k) => <div key={k} className="ir-use-line"><Tex>{f}</Tex></div>)}</div>}
    <div className="ir-solution"><span className="ir-label">Solution</span>
      {e.steps.map((s, k) => <div key={k} className="ir-line"><Tex>{s}</Tex></div>)}
    </div>
    {e.result && <div className="ir-result"><span className="ir-label">Answer</span><Tex>{e.result}</Tex></div>}
  </article>;
}

/** Grade 12 chapter notes in the Integrals format: formula sheet first, then sessions of line-by-line solved examples. */
export default function ChapterReader({data}: {data: ReaderChapter}) {
  const board = data.lessons.filter((l) => l.level === 'board').length;
  const total = data.lessons.reduce((n, l) => n + l.examples.length, 0);
  const storeKey = `ramavana-${data.slug}-ticks`;
  return <main className="integrals-reader">
    <a className="ir-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana Mathematical Center logo" /><span>Ramavana<br /><small>Mathematical Center</small></span></a>
    <nav><a href="/cbse/grade-12">Grade 12</a> / <a href={`/cbse/grade-12/ch-${data.number}`}>{data.title}</a> / Notes</nav>
    <header>
      <p className="ir-kicker">GRADE 12 · CHAPTER {data.number}</p>
      <h1>{data.title}</h1>
      <p className="ir-sub">{data.subtitle}. Formula sheet and {total} solved examples.</p>
      <p className="ir-levels"><span className="ir-tag board">Board exam</span> Sessions 1–{board}{board < data.lessons.length && <> · <span className="ir-tag challenge">Challenge</span> Sessions {board + 1}–{data.lessons.length} (JEE)</>}</p>
    </header>
    <section className="ir-sheet" id="formulas">
      <h2>Formula sheet</h2>
      <div className="ir-sheet-grid">{data.sheet.map((g) => <div key={g.title} className="ir-sheet-card"><h3>{g.title}</h3>{g.items.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</div>)}</div>
    </section>
    <SessionProgress titles={data.lessons.map((l) => l.title)} storeKey={storeKey} />
    {data.lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{l.level === 'board' ? 'Board exam' : 'Challenge'}</span></div>
      <h2>{l.title}</h2>
      <div className="ir-formulas"><span className="ir-label">Formulas</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</div>
      <div className="ir-worked">{l.examples.map((e, j) => <Example key={j} e={e} label={`EXAMPLE ${j + 1}`} />)}</div>
      <SessionTick index={i} total={data.lessons.length} storeKey={storeKey} />
    </section>)}
    <footer><h2>Put the ideas to work</h2><p><a href={`/cbse/grade-12/ch-${data.number}`}>Practise with the {data.title} question papers →</a></p><small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
