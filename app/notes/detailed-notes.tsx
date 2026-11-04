import { ArrowLeft, CheckCircle2, CircleAlert, Lightbulb } from 'lucide-react';
import type { ChapterNotes } from '@/lib/chapter-notes';
import DiscoveryIcon from './discovery-icon';
import MathText from './math-text';
import NotesBranding from './notes-branding';
import NotesVisual from './notes-visual';
import NotesPrintButton from './real-numbers/print-button';

type Worked = { question: string; steps: string[]; answer: string };

function Footer({ label }: { label: string }) {
  return <footer className="notes-page-number">Ramavana Mathematical Center · {label}</footer>;
}

function RunningHeader({ notes, label }: { notes: ChapterNotes; label: string }) {
  return (
    <header className="notes-running-header">
      <span>{notes.chapter}</span>
      <b>{label}</b>
    </header>
  );
}

function WorkedExample({ example, label }: { example: Worked; label: string }) {
  return (
    <section className="study-worked-example">
      <div className="study-example-label"><Lightbulb /> {label}</div>
      <h2><MathText>{example.question}</MathText></h2>
      <ol>
        {example.steps.map((step, index) => (
          <li key={`${index}-${step}`}>
            <b>Step {index + 1}</b>
            <p><MathText>{step}</MathText></p>
          </li>
        ))}
      </ol>
      <div className="study-example-answer">
        <span>Answer</span>
        <strong><MathText formula>{example.answer}</MathText></strong>
      </div>
    </section>
  );
}

/** Full study notes for a student who missed the class: lessons, worked exam questions, mistakes and practice. */
export default function DetailedNotesDocument({ notes }: { notes: ChapterNotes }) {
  const boardPath = (notes.board ?? 'CBSE').toLowerCase();
  const chapterPath = `/${boardPath}/grade-${notes.grade ?? 10}/ch-${notes.number}`;
  const lessons = notes.lessons ?? [];
  const examples = notes.examples ?? [];
  const examplePages = Array.from({ length: Math.ceil(examples.length / 2) }, (_, page) => examples.slice(page * 2, page * 2 + 2));

  return (
    <main className="notes-shell study-notes-shell">
      <nav className="notes-toolbar">
        <a href={chapterPath}><ArrowLeft /><span>Back to chapter</span></a>
        <NotesPrintButton />
      </nav>

      <article className="notes-page study-cover-page">
        <NotesBranding />
        <header className="study-cover">
          <p>{notes.board ?? 'CBSE'} · Grade {notes.grade ?? 10} Mathematics · Chapter {notes.number}{notes.book ? ` · ${notes.book}` : ''}</p>
          <h1>{notes.chapter}</h1>
          <h2>{notes.subtitle}</h2>
        </header>
        {notes.intro && (
          <section className="study-hook">
            <DiscoveryIcon />
            <p><MathText>{notes.intro}</MathText></p>
          </section>
        )}
        <section className="study-goals" aria-labelledby={`${notes.slug}-goals`}>
          <div className="study-section-heading"><h2 id={`${notes.slug}-goals`}>In these notes</h2></div>
          <ol>
            {lessons.map((lesson, index) => (
              <li key={lesson.title}><b>{index + 1}</b><span>{lesson.title}</span></li>
            ))}
            <li><b>{lessons.length + 1}</b><span>Solved exam questions ({examples.length})</span></li>
            <li><b>{lessons.length + 2}</b><span>Common mistakes, exam checklist and practice</span></li>
          </ol>
        </section>
        <Footer label="Start here" />
      </article>

      {(notes.before?.length || notes.glossary?.length) ? (
        <article className="notes-page study-concepts-page">
          <NotesBranding />
          <RunningHeader notes={notes} label="Get ready" />
          {notes.before?.length ? (
            <section className="study-before">
              <strong>Before you start, make sure that you can:</strong>
              <ul>{notes.before.map((item) => <li key={item}><MathText>{item}</MathText></li>)}</ul>
            </section>
          ) : null}
          {notes.glossary?.length ? (
            <section className="study-concepts">
              <div className="study-section-heading compact"><h2>Words you must know</h2></div>
              <div className="study-concept-list">
                {notes.glossary.map((entry, index) => (
                  <section className="study-concept" key={entry.term}>
                    <span className="study-concept-number">{String(index + 1).padStart(2, '0')}</span>
                    <div><h3>{entry.term}</h3><p><MathText>{entry.meaning}</MathText></p></div>
                  </section>
                ))}
              </div>
            </section>
          ) : null}
          <Footer label="Words and basics" />
        </article>
      ) : null}

      {lessons.map((lesson, index) => (
        <article className="notes-page study-concepts-page" key={lesson.title}>
          <NotesBranding />
          <RunningHeader notes={notes} label={`Lesson ${index + 1} of ${lessons.length}`} />
          <section className="study-concepts">
            <div className="study-section-heading compact"><h2>{index + 1}. {lesson.title}</h2></div>
            {lesson.text.map((paragraph) => <p className="detailed-notes-paragraph" key={paragraph}><MathText>{paragraph}</MathText></p>)}
            {index === 0 && <NotesVisual notes={notes} conceptIndex={0} />}
            {lesson.points?.length ? (
              <div className="study-revision-ideas">
                <h3>Remember</h3>
                {lesson.points.map((point) => <p key={point}><CheckCircle2 /><span><MathText>{point}</MathText></span></p>)}
              </div>
            ) : null}
            {lesson.formulas?.length ? (
              <section className="study-rule-bank study-connected-rules">
                <div>{lesson.formulas.map((formula) => <p key={formula}><MathText formula>{formula}</MathText></p>)}</div>
              </section>
            ) : null}
          </section>
          {lesson.example && <WorkedExample example={lesson.example} label="Try it with me" />}
          <Footer label={lesson.title} />
        </article>
      ))}

      <article className="notes-page study-concepts-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Formula sheet" />
        <div className="study-section-heading compact"><h2>All the formulas in one place</h2></div>
        <section className="study-rule-bank study-connected-rules">
          <div>{notes.formulas.map((formula) => <p key={formula}><MathText formula>{formula}</MathText></p>)}</div>
        </section>
        <section className="study-method">
          <div className="study-section-heading compact"><h2>How to answer any question in this chapter</h2></div>
          <ol>
            {notes.method.map((step, index) => <li key={step}><b>{index + 1}</b><div><p><MathText>{step}</MathText></p></div></li>)}
          </ol>
        </section>
        <Footer label="Formula sheet" />
      </article>

      {examplePages.map((pair, page) => (
        <article className="notes-page study-method-page" key={`examples-${page}`}>
          <NotesBranding />
          <RunningHeader notes={notes} label={`Solved exam questions · ${page * 2 + 1}–${page * 2 + pair.length} of ${examples.length}`} />
          {pair.map((example, local) => (
            <WorkedExample key={example.question} example={example} label={`Solved question ${page * 2 + local + 1} · ${example.type}`} />
          ))}
          <Footer label="Solved exam questions" />
        </article>
      ))}

      <article className="notes-page study-review-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Avoid mistakes · Check before you submit" />
        {notes.mistakes?.length ? (
          <section className="study-watch-out">
            <h3>Common mistakes</h3>
            <ul>{notes.mistakes.map((item) => <li key={item}><CircleAlert className="study-warning-icon" aria-hidden="true" /><MathText>{item}</MathText></li>)}</ul>
          </section>
        ) : null}
        {notes.checklist?.length ? (
          <section className="study-revision-ideas">
            <h3>Exam checklist</h3>
            {notes.checklist.map((item) => <p key={item}><CheckCircle2 /><span><MathText>{item}</MathText></span></p>)}
          </section>
        ) : null}
        <section className="study-watch-out">
          <h3>Exam tips</h3>
          <ul>{notes.tips.map((tip) => <li key={tip}><CircleAlert className="study-warning-icon" aria-hidden="true" /><MathText>{tip}</MathText></li>)}</ul>
        </section>
        <Footer label="Mistakes and checklist" />
      </article>

      <article className="notes-page study-practice-page">
        <NotesBranding />
        <RunningHeader notes={notes} label="Try · Check · Improve" />
        <section className="study-section-heading"><h2>Your turn</h2></section>
        <section className="study-practice-list">
          {notes.practice.map((item, index) => (
            <div className="study-practice-item" key={item.question}>
              <span className="study-question-number">{index + 1}</span>
              <div className="study-question-body">
                <p><MathText>{item.question}</MathText></p>
                <small>{item.marks} {item.marks === 1 ? 'mark' : 'marks'}</small>
                <details className="study-answer">
                  <summary>Check answer</summary>
                  <div><strong><MathText formula>{item.answer}</MathText></strong></div>
                </details>
              </div>
            </div>
          ))}
        </section>
        <a className="study-test-link" href={chapterPath}>Take the chapter paper <span>→</span></a>
        <Footer label="Practice and self-check" />
      </article>
    </main>
  );
}
