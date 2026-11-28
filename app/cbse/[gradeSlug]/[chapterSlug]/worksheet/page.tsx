import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
import GoogleSignIn from '@/app/google-sign-in';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import Tex from '@/app/notes/tex';
import StoryPicture, { type StoryPictureSpec } from '@/app/notes/story-picture';
import MirrorPuzzle from '@/app/worksheet/mirror-puzzle';
import WorksheetCheckout from '@/app/worksheet/worksheet-checkout';
import { worksheetByChapterPath, worksheetPath, type WorksheetQuestion } from '@/lib/worksheets/catalog';
import { hasWorksheetAccess } from '@/lib/worksheets/access';
import '@/app/worksheet/worksheet.css';

export const dynamic = 'force-dynamic';
type Props = { params: Promise<{ gradeSlug: string; chapterSlug: string }> };
async function find({ params }: Props) { const p = await params; const w = worksheetByChapterPath(`/cbse/${p.gradeSlug}/${p.chapterSlug}`); if (!w) notFound(); return w; }

export async function generateMetadata(props: Props): Promise<Metadata> {
  const w = await find(props);
  return { title: `${w.title} Worksheet — Grade ${w.grade} ${w.board} | Ramavana Mathematical Center`, description: `${w.board} Grade ${w.grade} ${w.title} worksheet: textbook-style questions, complete-the-figure questions, higher-order questions and case studies, with answers. ₹${w.amount / 100}.`, alternates: { canonical: worksheetPath(w) } };
}

function Question({ q }: { q: WorksheetQuestion }) {
  return <div className="wsp-q" id={`q${q.n}`}>
    <p><strong>{q.n}.</strong> <Tex>{q.text}</Tex></p>
    {q.parts && <ol>{q.parts.map((p) => <li key={p}><Tex>{p}</Tex></li>)}</ol>}
    {!!q.picture && <StoryPicture spec={q.picture as StoryPictureSpec} />}
    {q.puzzle && <MirrorPuzzle n={q.puzzle.n} mirror={q.puzzle.mirror} given={q.puzzle.given} />}
    <details><summary>Answer</summary><p><Tex>{q.answer}</Tex></p>{!!q.answerPicture && <StoryPicture spec={q.answerPicture as StoryPictureSpec} />}</details>
  </div>;
}

/** A ₹15 chapter worksheet. The first questions are free. The rest are sent to the browser only after payment. */
export default async function WorksheetPage(props: Props) {
  const w = await find(props), user = await getGoogleUser();
  let allowed = false, failed = false;
  if (user) { try { allowed = await hasWorksheetAccess(user, w.id); } catch { failed = true; } }
  const total = w.sections.reduce((n, s) => n + s.questions.length, 0);
  const visible = w.sections.map((s) => ({ ...s, questions: allowed ? s.questions : s.questions.filter((q) => q.n <= w.freeCount) })).filter((s) => s.questions.length);
  return <div className="free-quiz"><LearningHeader signedIn={!!user} />
    <main className="wsp">
      <nav className="wsp-nav"><a href={w.chapterPath}>← {w.title} chapter</a><a href={w.notesPath}>Chapter notes</a></nav>
      <article className="wsp-sheet">
        <header className="wsp-head"><h1>{w.title} · Worksheet</h1><p>{w.board} Grade {w.grade} · {total} questions with answers · textbook-style, complete-the-figure, higher-order, case-study and assertion–reason questions</p></header>
        <p className="wsp-note">Try each question in your notebook first. Then open "Answer" to check. Use squared paper for the complete-the-figure questions.</p>
        {visible.map((s) => <section key={s.title}><h2 className="wsp-section">{s.title}</h2><p className="wsp-section-note">{s.note}</p>{s.questions.map((q) => <Question key={q.n} q={q} />)}</section>)}
        {!allowed && <div className="wsp-lock">
          <h2>Unlock the full worksheet for ₹{w.amount / 100}</h2>
          <p>You have seen {w.freeCount} free questions. The full worksheet has {total} questions with answers:</p>
          <ul>{w.sections.map((s) => <li key={s.title}>{s.title.replace(/^Section [A-Z] · /, '')}: {s.questions.length} questions</li>)}</ul>
          {!user ? <><p>Sign in with Google to buy or open the worksheet.</p><GoogleSignIn href={googleSignInPath(worksheetPath(w))} /></>
            : failed ? <p role="alert">Your access could not be checked. Please refresh and try again.</p>
            : <WorksheetCheckout id={w.id} amount={w.amount} title={`Grade ${w.grade} ${w.title}`} name={user.displayName} email={user.email} />}
        </div>}
      </article>
    </main><SiteFooter /></div>;
}
