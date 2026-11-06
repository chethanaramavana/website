import lessons from '@/lib/integrals-lessons.json';
import Tex from './tex';
import IntegralsVisual from './integrals-visuals';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';

type Step = {do: string; why?: string};
type Worked = {title: string; question: string; plan?: string; steps: Step[]; result?: string; type?: string};

function Example({e, label}: {e: Worked; label: string}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · <Tex>{e.type}</Tex></>}</p>
    <h3><Tex>{e.title}</Tex></h3>
    <div className="ir-question"><span className="ir-label">Question</span><Tex>{e.question}</Tex></div>
    {e.plan && <div className="ir-plan"><span className="ir-label">Spot the idea</span><p><Tex>{e.plan}</Tex></p></div>}
    <ol className="ir-steps">{e.steps.map((s, k) => <li key={k}>
      <span className="ir-step-no">Step {k + 1}</span>
      <div className="ir-do"><Tex>{s.do}</Tex></div>
      {s.why && <p className="ir-why"><b>Why?</b> <Tex>{s.why}</Tex></p>}
    </li>)}</ol>
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
      <h1>Understand the method.<br /><em>See why it works.</em></h1>
      <p>Indefinite and definite integrals, from your first antiderivative to challenging problems with symmetry, limits and parameters. Every example is solved step by step, and every step says why.</p>
      <div className="ir-howto">
        <div><b>1</b><span>Read the idea and the formulas.</span></div>
        <div><b>2</b><span>Read “Spot the idea”, then try the question yourself.</span></div>
        <div><b>3</b><span>Check each step and its “Why?”.</span></div>
        <div><b>4</b><span>Tick the session when you can solve it alone.</span></div>
      </div>
      <p className="ir-levels"><span className="ir-tag board">Board exam</span> Sessions 1–{board} cover every type of the CBSE textbook chapter. <span className="ir-tag challenge">Challenge</span> Sessions {board + 1}–{lessons.length} are for JEE and olympiad practice.</p>
    </header>
    <SessionProgress titles={lessons.map((l) => l.title)} />
    {lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{l.level === 'board' ? 'Board exam' : 'Challenge'}</span></div>
      <h2>{l.title}</h2>
      <p className="ir-lead"><Tex>{l.lead}</Tex></p>
      {l.ideas.map((p, j) => <p key={j}><Tex>{p}</Tex></p>)}
      {l.visual && <IntegralsVisual kind={l.visual} />}
      <div className="ir-worked">{(l.examples as Worked[]).map((e, j) => <Example key={j} e={e} label={`WORKED EXAMPLE ${j + 1}`} />)}</div>
      {l.types.length > 0 && <div className="ir-types">
        <h3 className="ir-types-head">More problem types in this session</h3>
        <p className="ir-types-note">Each card shows one type of question from the textbook exercises, with new numbers.</p>
        {(l.types as Worked[]).map((e, j) => <Example key={j} e={e} label={`TYPE ${j + 1}`} />)}
      </div>}
      <aside className="ir-watch"><strong>Watch this step</strong><p><Tex>{l.trap}</Tex></p></aside>
      <div className="ir-check"><strong>Your turn</strong><p><Tex>{l.check}</Tex></p><details><summary>Show the reasoning</summary><p><Tex>{l.answer}</Tex></p></details></div>
      <SessionTick index={i} total={lessons.length} />
    </section>)}
    <footer><h2>Put the ideas to work</h2><p><a href="/cbse/grade-12/ch-7/free-mcq">Take the free 50-question MCQ practice →</a></p><p><a href="/cbse/grade-12/integrals">Choose a CBSE or JEE practice paper →</a></p><small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
