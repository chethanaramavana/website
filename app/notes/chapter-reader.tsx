import Tex from './tex';
import StoryPicture, {type StoryPictureSpec} from './story-picture';
import {SessionProgress, SessionTick} from './integrals-ticks';
import './integrals-online.css';
import { g12PracticeReady, g12PracticePath, g11PracticeReady, g11PracticePath } from '@/lib/g12-practice-catalog';
import { quizPath, quizPrice } from '@/lib/free-quizzes/catalog';

type Worked = {question: string; use?: string[]; steps: string[]; reasoning?: string[]; result?: string; type?: string; picture?: StoryPictureSpec};
export type ReaderLesson = {title: string; level: 'board' | 'challenge' | string; introduction?: string; formulas: string[]; examples: Worked[]; picture?: StoryPictureSpec};
export type ReaderChapter = {slug: string; number: number; grade?: number; board?: string; title: string; subtitle: string; sheet: {title: string; items: string[]}[]; lessons: ReaderLesson[]};


function Example({e, label}: {e: Worked; label: string}) {
  return <article className="ir-example">
    <p className="ir-kicker">{label}{e.type && <> · {e.type}</>}</p>
    <div className="ir-question"><Tex>{e.question}</Tex></div>
    {e.picture && <StoryPicture spec={e.picture} />}
    {!e.reasoning && e.use && e.use.length > 0 && <div className="ir-use"><span className="ir-label">Formula used</span>{e.use.map((f, k) => <div key={k} className="ir-use-line"><Tex>{f}</Tex></div>)}</div>}
    <div className="ir-solution"><span className="ir-label">Solution</span>
      {e.steps.map((s, k) => <div key={k} className="ir-line">
        {e.reasoning?.[k] && <p className="ir-reasoning"><Tex>{e.reasoning[k]}</Tex></p>}
        <Tex>{s}</Tex>
      </div>)}
    </div>
    {e.result && <div className="ir-result"><span className="ir-label">Answer</span><Tex>{e.result}</Tex></div>}
  </article>;
}

export default function ChapterReader({data}: {data: ReaderChapter}) {
  const grade = data.grade ?? 12;
  const home = `/${(data.board ?? 'CBSE').toLowerCase()}/grade-${grade}`;
  const board = data.lessons.filter((l) => l.level === 'board').length;
  const total = data.lessons.reduce((n, l) => n + l.examples.length, 0);
  const storeKey = `ramavana-${data.slug}-ticks`;
  // Grades 6 to 8: key facts first, a picture for every session, and Core / Challenge labels instead of Board exam / JEE.
  const young = grade <= 8;
  const storyFirst = !young && data.lessons.every((lesson) => lesson.introduction);
  const levelName = (level: string) => level === 'board' ? (young ? 'Core' : 'Board exam') : 'Challenge';
  const reference = <div className="ir-sheet-grid">{data.sheet.map((g) => <div key={g.title} className="ir-sheet-card"><h3>{g.title}</h3>{g.items.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</div>)}</div>;
  return <main className="integrals-reader">
    <a className="ir-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana Mathematical Center logo" /><span>Ramavana<br /><small>Mathematical Center</small></span></a>
    <nav><a href={home}>Grade {grade}</a> / <a href={`${home}/ch-${data.number}`}>{data.title}</a> / Notes</nav>
    <header>
      <p className="ir-kicker">{data.board === 'ICSE' ? 'ICSE · ' : ''}GRADE {grade} · CHAPTER {data.number}</p>
      <h1>{data.title}</h1>
      <p className="ir-sub">{data.subtitle}. {total} worked examples.</p>
      <p className="ir-levels"><span className="ir-tag board">{levelName('board')}</span> Sessions 1–{board}{board < data.lessons.length && <> · <span className="ir-tag challenge">Challenge</span> Session{board + 1 < data.lessons.length ? 's' : ''} {board + 1}{board + 1 < data.lessons.length ? `–${data.lessons.length}` : ''}{young ? ' (puzzles and olympiad-style problems)' : grade === 10 ? ' (higher-order problems)' : ' (JEE)'}</>}</p>
    </header>
    {!storyFirst && <section className="ir-sheet" id="formulas"><h2>{young ? 'Key facts' : 'Formula sheet'}</h2>{reference}</section>}
    <SessionProgress titles={data.lessons.map((l) => l.title)} storeKey={storeKey} />
    {data.lessons.map((l, i) => <section className="ir-lesson" id={`session-${i + 1}`} key={l.title}>
      <div className="ir-number">SESSION {String(i + 1).padStart(2, '0')} <span className={`ir-tag ${l.level}`}>{levelName(l.level)}</span></div>
      <h2>{l.title}</h2>
      {young ? <>
        {l.introduction && <p className="ir-reasoning"><Tex>{l.introduction}</Tex></p>}
        {l.picture && <StoryPicture spec={l.picture} />}
        <div className="ir-formulas"><span className="ir-label">Key facts</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</div>
      </> : l.introduction ? <p className="ir-reasoning"><Tex>{l.introduction}</Tex></p> :
        <div className="ir-formulas"><span className="ir-label">Formulas</span>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</div>}
      {!young && l.picture && <StoryPicture spec={l.picture} />}
      <div className="ir-worked">{l.examples.map((e, j) => <Example key={j} e={e} label={`EXAMPLE ${j + 1}`} />)}</div>
      {!young && l.introduction && <details className="ir-formulas"><summary>Session formula reference</summary>{l.formulas.map((f, k) => <div key={k} className="ir-sheet-line"><Tex>{f}</Tex></div>)}</details>}
      <SessionTick index={i} total={data.lessons.length} storeKey={storeKey} />
    </section>)}
    {storyFirst && <details className="ir-formulas" id="formulas"><summary>Chapter formula reference</summary>{reference}</details>}
    <footer><h2>Put the ideas to work</h2>{grade === 11 && g11PracticeReady.has(data.number) && <p><a href={g11PracticePath(data.number)}>Choose a JEE Main or JEE Advanced practice paper →</a></p>}{grade === 10 && <p><a href={`/notes/${data.slug}/story`}>Read the story notes with pictures →</a></p>}{grade === 12 && g12PracticeReady.has(data.number) && <><p><a href={quizPath(data.number, 12)}>{quizPrice(data.number, 12) === 0 ? 'Take the free 30-question MCQ practice →' : `Take the 30-question MCQ practice (₹${quizPrice(data.number, 12) / 100}) →`}</a></p><p><a href={g12PracticePath(data.number)}>Choose a CBSE or JEE practice paper →</a></p></>}{(grade === 6 || grade === 7) && <p><a href={quizPath(data.number, grade, data.board === 'ICSE' ? 'ICSE' : 'CBSE')}>Take the 30-question MCQ practice (₹30) →</a></p>}<p><a href={`${home}/ch-${data.number}`}>Practise with the {data.title} question papers →</a></p><small>Original explanations and examples · Ramavana Mathematical Center</small></footer>
  </main>;
}
