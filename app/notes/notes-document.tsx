import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import type { ChapterNotes } from '@/lib/chapter-notes';
import NotesPrintButton from './real-numbers/print-button';
import NotesBranding from './notes-branding';
import MathText from './math-text';
import NotesVisual, { getNotesVisualMeta, getNotesVisualKind } from './notes-visual';
import { foundationExamples, shortcuts } from './teaching-support';
import CircleTeaching, { CircleRules, CircleWorkedMethod } from './circle-teaching';
import TrigExplanation from './trig-explanation';

const reflectionPrompts = [
  'Can you explain this idea in your own words without using the formula?',
  'Which part of the diagram or example makes this rule believable?',
  'What information must you identify before applying this idea?',
  'How could you check that an answer using this idea is sensible?',
];

function Footer({ label }: { label: string }) {
  return <footer className="notes-page-number">Ramavana Mathematical Centre · {label}</footer>;
}

function RunningHeader({ notes, label }: { notes: ChapterNotes; label: string }) {
  return <header className="notes-running-header"><span>{notes.chapter}</span><b>{label}</b></header>;
}

export default function NotesDocument({ notes }: { notes: ChapterNotes }) {
  const boardPath = (notes.board ?? 'CBSE').toLowerCase();
  const chapterPath = `/${boardPath}/grade-${notes.grade ?? 10}/ch-${notes.number}`;
  const visualMeta = getNotesVisualMeta(notes);
  const kind = getNotesVisualKind(notes);
  const shortcut = shortcuts[kind];
  const extraExamples = (notes.grade ?? 10) <= 6 ? foundationExamples[kind] ?? [] : [];
  const goals = notes.concepts.slice(0, 4).map((concept) => `${concept.title}: explain the idea and recognise when it is useful.`);

  return (
    <main className="notes-shell study-notes-shell">
      <nav className="notes-toolbar"><a href={chapterPath}><ArrowLeft /> Back to chapter</a><NotesPrintButton /></nav>

      <article className="notes-page study-cover-page">
        <NotesBranding />
        <header className="study-cover">
          <span className="study-cover-icon"><BookOpen /></span>
          <p>{notes.board ?? 'CBSE'} · Grade {notes.grade ?? 10} Mathematics · Chapter {notes.number}</p>
          <h1>{notes.chapter}</h1>
          <h2>{notes.subtitle}</h2>
          <div className="study-cover-rule" />
          <p className="study-cover-lead">A student-friendly learning guide with clear ideas, a visual model, worked reasoning and practice you can check yourself.</p>
        </header>

        <section className="study-hook">
          <span>Why this chapter matters</span>
          <p>{visualMeta.connection}</p>
        </section>

        <section className="study-goals" aria-labelledby={`${notes.slug}-goals`}>
          <div className="study-section-heading">
            <p>Learning roadmap</p>
            <h2 id={`${notes.slug}-goals`}>By the end, you should be able to…</h2>
          </div>
          <ol>{goals.map((goal, index) => <li key={goal}><b>{index + 1}</b><span>{goal}</span></li>)}</ol>
        </section>

        <aside className="study-before"><strong>Before you begin</strong><p>{visualMeta.before}</p></aside>
        <Footer label="Start here" />
      </article>

      <article className="notes-page study-concepts-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Connect · See · Understand" />
        <section className="study-connection">
          <span>Real-life connection</span>
          <p>{visualMeta.connection}</p>
        </section>

        <NotesVisual notes={notes} />
        <aside className="study-before"><strong>How to read this picture</strong><p>{visualMeta.caption}</p><p>Trace the labelled parts with your finger. Match them to the idea below before substituting numbers into a rule. Pictures illustrate relationships; use the given measurements rather than measuring the drawing.</p></aside>
        {kind === 'circle' && <CircleTeaching />}
        <Footer label="Picture and meaning" />
      </article>

      {Array.from({ length: Math.ceil(notes.concepts.length / 2) }, (_, page) => <article className="notes-page study-concepts-page" key={`concepts-${page}`}>
        <NotesBranding /><RunningHeader notes={notes} label="Ideas · Rules" />
        <section className="study-concepts" aria-labelledby={`${notes.slug}-ideas-${page}`}>
          <div className="study-section-heading compact">
            <p>Core ideas</p>
            <h2 id={`${notes.slug}-ideas-${page}`}>Build the meaning before using a rule</h2>
          </div>
          <div className="study-concept-list">
            {notes.concepts.slice(page * 2, page * 2 + 2).map((concept, localIndex) => {
              const index = page * 2 + localIndex;
              return (
              <section className="study-concept" key={concept.title}>
                <span className="study-concept-number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{concept.title}</h3>
                  <p><MathText>{concept.text}</MathText></p>
                  <NotesVisual notes={notes} conceptIndex={index} />
                  <p className="study-think"><Lightbulb /> <strong>Think:</strong> {reflectionPrompts[index % reflectionPrompts.length]}</p>
                </div>
              </section>
            ); })}
          </div>
        </section>
        <Footer label={`Visual concepts ${page * 2 + 1}–${Math.min(page * 2 + 2, notes.concepts.length)}`} />
      </article>)}

      <article className="notes-page study-concepts-page">
        <NotesBranding /><RunningHeader notes={notes} label="Picture · Explanation · Calculation" />
        {kind === 'heights' || kind === 'trigonometry' ? <TrigExplanation /> : kind === 'circle' ? <CircleRules /> : <section className="study-rule-bank study-connected-rules">
          <NotesVisual notes={notes} />
          <div>{notes.formulas.map((formula) => <p key={formula}><MathText formula>{formula}</MathText></p>)}</div>
        </section>}
        <Footer label="Learn the ideas" />
      </article>

      <article className="notes-page study-method-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Method · Worked Reasoning" />
        <section className="study-method-intro">
          <p>Use this method as a guide, not as a sentence to memorise. Ask yourself why each step is needed.</p>
        </section>

        {kind === 'circle' ? <CircleWorkedMethod /> : <><section className="study-method" aria-labelledby={`${notes.slug}-method`}>
          <NotesVisual notes={notes} />
          <div className="study-section-heading compact"><p>A dependable route</p><h2 id={`${notes.slug}-method`}>How to approach the question</h2></div>
          <ol>
            {notes.method.map((step, index) => (
              <li key={step}>
                <b>{index + 1}</b>
                <div><p><MathText>{step}</MathText></p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className="study-worked-example">
          <div className="study-example-label"><Lightbulb /> Worked example</div>
          <h2><MathText>{notes.example.question}</MathText></h2>
          <ol>{notes.example.steps.map((step, index) => <li key={step}><b>Step {index + 1}</b><p><MathText>{step}</MathText></p></li>)}</ol>
          <div className="study-example-answer"><span>Answer</span><strong><MathText formula>{notes.example.answer}</MathText></strong></div>
        </section></>}

        <aside className="study-why-box">
          <strong>Shortcut: {shortcut[0]}</strong>
          <p><MathText>{shortcut[1]}</MathText></p>
        </aside>
        <Footer label="Worked reasoning" />
      </article>

      {extraExamples.map((example, index) => <article className="notes-page study-method-page" key={example.question}>
        <NotesBranding /><RunningHeader notes={notes} label={`Build confidence · Example ${index + 2}`} />
        <NotesVisual notes={notes} />
        <section className="study-worked-example">
          <div className="study-example-label"><Lightbulb /> Another way to practise the idea</div>
          <h2><MathText>{example.question}</MathText></h2>
          <ol>{example.steps.map((step, i) => <li key={step}><b>Step {i + 1}</b><p><MathText>{step}</MathText></p></li>)}</ol>
          <div className="study-example-answer"><span>Answer</span><strong><MathText formula>{example.answer}</MathText></strong></div>
        </section>
        <aside className="study-before"><strong>Now explain it yourself</strong><p>Cover the working, solve the question again, and explain why each operation is needed. Use the chapter picture as a model, not as a drawing to scale.</p></aside>
        <Footer label={`Extra worked example ${index + 2}`} />
      </article>)}

      <article className="notes-page study-practice-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Try · Check · Improve" />
        <section className="study-section-heading">
          <p>Check your understanding</p>
          <h2>Try first. Open the answer only after you have shown your steps.</h2>
        </section>

        <section className="study-practice-list">
          {notes.practice.map((item, index) => (
            <div className="study-practice-item" key={item.question}>
              <span className="study-question-number">{index + 1}</span>
              <div className="study-question-body">
                <p><MathText>{item.question}</MathText></p>
                <small>{index < 3 ? 'Warm-up' : index < 5 ? 'Apply the idea' : 'Challenge'} · {item.marks} {item.marks === 1 ? 'mark' : 'marks'}</small>
                <details className="study-answer">
                  <summary>Check answer</summary>
                  <div><strong><MathText formula>{item.answer}</MathText></strong><p>Compare the method and notation as well as the final value. If yours differs, return to the first step where the two solutions separate.</p></div>
                </details>
              </div>
            </div>
          ))}
        </section>
        <Footer label="Practice and self-check" />
      </article>

      <article className="notes-page study-review-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Remember · Review · Continue" />
        <section className="study-section-heading">
          <p>Rapid revision</p>
          <h2>Keep the important ideas together</h2>
        </section>

        <section className="study-revision-grid">
          <div className="study-revision-ideas">
            <h3>Ideas to say aloud</h3>
            {notes.concepts.map((concept) => <p key={concept.title}><CheckCircle2 /><span><strong>{concept.title}:</strong> <MathText>{concept.text}</MathText></span></p>)}
          </div>
          <div className="study-formula-bank">
            <h3>Formula and fact bank</h3>
            {kind === 'circle' ? <><p>O = centre; T = contact; P = outside point; OT = radius; OP = centre-to-P distance; PT = tangent.</p><div><MathText formula>OT ⊥ PT</MathText></div><div><MathText formula>PT = √(OP² − OT²)</MathText></div><p>A and B are two contacts from the same point P.</p><div><MathText formula>PA = PB</MathText></div></> : kind === 'heights' || kind === 'trigonometry' ? <><p>h = opposite; d = adjacent; l = hypotenuse, measured from the chosen angle θ.</p><div><MathText formula>tan θ = h/d</MathText></div><div><MathText formula>sin θ = h/l</MathText></div><div><MathText formula>cos θ = d/l</MathText></div></> : notes.formulas.map((formula) => <div key={formula}><MathText formula>{formula}</MathText></div>)}
          </div>
        </section>

        <section className="study-watch-out">
          <h3>Watch out for these common slips</h3>
          <ul>{notes.tips.map((tip) => <li key={tip}><span>!</span><MathText>{tip}</MathText></li>)}</ul>
        </section>

        <section className="study-ready-check">
          <h3>Ready check</h3>
          <ul>
            <li>I can explain the main ideas without copying the formula.</li>
            <li>I can use the visual model to justify at least one rule.</li>
            <li>I can solve the worked example again with the page covered.</li>
            <li>I can correct a mistake after comparing my working with an answer.</li>
          </ul>
        </section>

        <a className="study-test-link" href={chapterPath}>Return to the chapter and take the test <span>→</span></a>
        <Footer label="Chapter review" />
      </article>
    </main>
  );
}
