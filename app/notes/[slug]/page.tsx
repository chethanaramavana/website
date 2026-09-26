import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesPrintButton from '../real-numbers/print-button';

export default async function ChapterNotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;

  return (
    <main className="notes-shell">
      <nav className="notes-toolbar"><a href="/"><ArrowLeft /> Back to chapters</a><NotesPrintButton /></nav>
      <article className="notes-page notes-cover-page">
        <header className="notes-title-block"><span className="notes-book-icon"><BookOpen /></span><p>CBSE · Grade 10 Mathematics · Chapter {notes.number}</p><h1>{notes.chapter}</h1><h2>{notes.subtitle}</h2><div className="notes-title-rule" /><p className="notes-lead">Important ideas and formulae to revise before attempting the chapter test.</p></header>
        <section className="notes-concept-grid">{notes.concepts.map((concept, index) => <div className="notes-rule-card" key={concept.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{concept.title}</h3><p>{concept.text}</p></div>)}</section>
        <section className="notes-formula-list"><p>Essential formulae</p>{notes.formulas.map((formula) => <strong key={formula}>{formula}</strong>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 1 / 3</footer>
      </article>

      <article className="notes-page">
        <header className="notes-running-header"><span>{notes.chapter}</span><b>Method &amp; Worked Example</b></header>
        <section className="notes-section"><span className="notes-section-number">01</span><div><h3>Exam method</h3><ol className="notes-steps">{notes.method.map((step,index)=><li key={step}><span>{index+1}</span>{step}</li>)}</ol></div></section>
        <section className="notes-proof"><div className="notes-proof-label"><Lightbulb /> Worked example</div><h3>{notes.example.question}</h3>{notes.example.steps.map((step)=><p key={step}>{step}</p>)}<p><strong>{notes.example.answer}</strong></p></section>
        <section className="notes-memory-box"><h3>High-scoring habits</h3>{notes.tips.map((tip)=><p key={tip}><CheckCircle2 /> {tip}</p>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 2 / 3</footer>
      </article>

      <article className="notes-page">
        <header className="notes-running-header"><span>{notes.chapter}</span><b>Practice</b></header>
        <section className="notes-practice-heading"><p>Check your understanding</p><h2>Practice before the test</h2><span>Show every important step and include units where required.</span></section>
        <section className="notes-practice-list">{notes.practice.map((item,index)=><div key={item.question}><b>{index+1}</b><p>{item.question}</p><em>{item.marks} marks</em></div>)}</section>
        <section className="notes-answer-check"><h3>Quick answer check</h3>{notes.practice.map((item,index)=><p key={item.answer}><strong>{index+1}.</strong> {item.answer}</p>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Center · 3 / 3</footer>
      </article>
    </main>
  );
}
