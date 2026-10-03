import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import { getChapterNotes } from '@/lib/chapter-notes';
import NotesPrintButton from '../real-numbers/print-button';
import NotesBranding from '../notes-branding';
import MathText from '../math-text';

export default async function ChapterNotesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const notes = getChapterNotes(slug);
  if (!notes) return <main className="notes-missing"><h1>Notes are being prepared.</h1><a href="/">Back to chapters</a></main>;
  const boardPath = (notes.board ?? 'CBSE').toLowerCase();
  const chapterPath = `/${boardPath}/grade-${notes.grade ?? 10}/ch-${notes.number}`;

  return (
    <main className="notes-shell">
      <nav className="notes-toolbar"><a href={chapterPath}><ArrowLeft /> Back to chapter</a><NotesPrintButton /></nav>
      <article className="notes-page notes-cover-page">
        <NotesBranding />
        <header className="notes-title-block"><span className="notes-book-icon"><BookOpen /></span><p>{notes.board ?? 'CBSE'} · Grade {notes.grade ?? 10} Mathematics · Chapter {notes.number}</p><h1>{notes.chapter}</h1><h2>{notes.subtitle}</h2><div className="notes-title-rule" /><p className="notes-lead">{notes.book ? `${notes.book} · ` : ''}Important ideas and methods to revise before attempting the chapter test.</p></header>
        <section className="notes-concept-grid">{notes.concepts.map((concept, index) => <div className="notes-rule-card" key={concept.title}><span>{String(index+1).padStart(2,'0')}</span><h3>{concept.title}</h3><p><MathText>{concept.text}</MathText></p></div>)}</section>
        <section className="notes-formula-list"><p>Essential formulae</p>{notes.formulas.map((formula) => <strong key={formula}><MathText formula>{formula}</MathText></strong>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Centre · 1 / 3</footer>
      </article>

      <article className="notes-page">
        <NotesBranding />
        <header className="notes-running-header"><span>{notes.chapter}</span><b>Method &amp; Worked Example</b></header>
        <section className="notes-section"><span className="notes-section-number">01</span><div><h3>Exam method</h3><ol className="notes-steps">{notes.method.map((step,index)=><li key={step}><span>{index+1}</span><MathText>{step}</MathText></li>)}</ol></div></section>
        <section className="notes-proof"><div className="notes-proof-label"><Lightbulb /> Worked example</div><h3><MathText>{notes.example.question}</MathText></h3>{notes.example.steps.map((step)=><p key={step}><MathText>{step}</MathText></p>)}<p><strong><MathText formula>{notes.example.answer}</MathText></strong></p></section>
        <section className="notes-memory-box"><h3>High-scoring habits</h3>{notes.tips.map((tip)=><p key={tip}><CheckCircle2 /> <MathText>{tip}</MathText></p>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Centre · 2 / 3</footer>
      </article>

      <article className="notes-page">
        <NotesBranding />
        <header className="notes-running-header"><span>{notes.chapter}</span><b>Practice</b></header>
        <section className="notes-practice-heading"><p>Check your understanding</p><h2>Practice before the test</h2><span>Show every important step and include units where required.</span></section>
        <section className="notes-practice-list">{notes.practice.map((item,index)=><div key={item.question}><b>{index+1}</b><p><MathText>{item.question}</MathText></p><em>{item.marks} {item.marks === 1 ? 'mark' : 'marks'}</em></div>)}</section>
        <section className="notes-answer-check"><h3>Quick answer check</h3>{notes.practice.map((item,index)=><p key={item.answer}><strong>{index+1}.</strong> <MathText formula>{item.answer}</MathText></p>)}</section>
        <footer className="notes-page-number">Ramavana Mathematical Centre · 3 / 3</footer>
      </article>
    </main>
  );
}
