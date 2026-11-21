import { notFound } from 'next/navigation';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { g12PracticeChapter, g12PracticePath, g12PracticePricePaise, g12PracticeProducts } from '@/lib/g12-practice-catalog';
import { hasG12PracticeAccess } from '@/lib/g12-practice-access';
import { quizPath, quizPrice } from '@/lib/free-quizzes/catalog';
import IntegralsCheckout from '../../integrals/checkout';
import '../../integrals/integrals.css';

export const dynamic = 'force-dynamic';

function chapterNumber(param: string) { const m = /^ch-(\d+)$/.exec(param); return m ? Number(m[1]) : NaN; }

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }) {
  const c = g12PracticeChapter(chapterNumber((await params).chapter));
  return { title: c ? `${c.title}: Notes, Practice & Papers | Ramavana` : 'Practice | Ramavana', description: c ? `Free Grade 12 ${c.title} notes, 30 free MCQs, and original CBSE, JEE Main and JEE Advanced chapter papers.` : undefined };
}

export default async function G12PracticeLibrary({ params }: { params: Promise<{ chapter: string }> }) {
  const n = chapterNumber((await params).chapter);
  const c = g12PracticeChapter(n);
  if (!c) notFound();
  const path = g12PracticePath(n), products = g12PracticeProducts(n);
  const user = await getGoogleUser();
  let accessFailed = false;
  const access = new Set<string>();
  if (user) try { for (const p of products) if (await hasG12PracticeAccess(user, p.id)) access.add(p.id); } catch { accessFailed = true; }
  return <main className="integrals-library">
    <nav><a href="/">Ramavana Mathematical Center</a><span> / </span><a href="/cbse/grade-12">CBSE Grade 12</a>{user && <a className="integrals-account" href="/student">My account</a>}</nav>
    <header className="integrals-overview">
      <span className="integrals-eyebrow">CHAPTER {String(n).padStart(2, '0')} · GRADE 12</span>
      <h1>{c.title}</h1>
      <nav className="integrals-resources" aria-label={`${c.title} resources`}>
        <a className="integrals-notes-link" href={`/notes/${c.notes}`}><span><strong>Read the free chapter notes</strong><small>Formula sheet · Board and JEE sessions · Solved examples</small></span><span aria-hidden="true">→</span></a>
        <a href={quizPath(n, 12)}><span><strong>{quizPrice(n, 12) === 0 ? 'Try free MCQs' : `30 MCQ practice · ₹${quizPrice(n, 12) / 100}`}</strong><small>30 questions with solutions</small></span><span aria-hidden="true">→</span></a>
        <a href="/cbse/grade-12/board-package"><span><strong>Board Exam Package · ₹1,500</strong><small>All CBSE board papers and MCQs, 13 chapters · JEE not included</small></span><span aria-hidden="true">→</span></a>
        <a href="#paid-practice"><span><strong>Browse practice papers</strong><small>CBSE, JEE Main and Advanced</small></span><span aria-hidden="true">↓</span></a>
      </nav>
    </header>
    <section aria-labelledby="paid-practice"><h2 id="paid-practice">Choose your practice paper</h2>
      {accessFailed && <p role="alert">Your purchases could not be checked. Please refresh before paying.</p>}
      <div className="integrals-grid">{products.map(p => <article key={p.id} id={p.id}><span className="integrals-tag">{p.standard} STANDARD</span><h3>{p.title}</h3><p>{p.detail}</p><p className="integrals-price">₹{g12PracticePricePaise(p.id) / 100} <small>including solutions</small></p>
        {access.has(p.id) ? <><p className="integrals-unlocked">Available for your account</p><a className="integrals-button" href={`${path}/papers/${p.id}`}>Open online paper</a></> : accessFailed ? <p>Refresh to check access.</p> : user ? <IntegralsCheckout amount={g12PracticePricePaise(p.id)} id={p.id} title={`${c.title} · ${p.title}`} name={user.displayName} email={user.email} /> : <a className="integrals-button" href={googleSignInPath(path)}>Sign in to buy — ₹{g12PracticePricePaise(p.id) / 100}</a>}
      </article>)}</div>
    </section>
    <footer><p><a href={`/cbse/grade-12/ch-${n}`}>Open the chapter page</a> · <a href="/cbse/grade-12">All Grade 12 chapters</a></p><p><a href="/terms">Terms & conditions</a> · <a href="/privacy-policy">Privacy policy</a></p></footer>
  </main>;
}
