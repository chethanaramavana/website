import { notFound } from 'next/navigation';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { g11PracticeChapter, g11PracticePath, g12PracticePricePaise, g11PracticeProducts } from '@/lib/g12-practice-catalog';
import { hasG12PracticeAccess } from '@/lib/g12-practice-access';
import IntegralsCheckout from '../../../grade-12/integrals/checkout';
import '../../../grade-12/integrals/integrals.css';

export const dynamic = 'force-dynamic';

function chapterNumber(param: string) { const m = /^ch-(\d+)$/.exec(param); return m ? Number(m[1]) : NaN; }

export async function generateMetadata({ params }: { params: Promise<{ chapter: string }> }) {
  const c = g11PracticeChapter(chapterNumber((await params).chapter));
  return { title: c ? `${c.title}: Notes, Practice & Papers | Ramavana` : 'Practice | Ramavana', description: c ? `Free Grade 11 ${c.title} notes and original JEE Main and JEE Advanced chapter papers.` : undefined };
}

export default async function G11PracticeLibrary({ params }: { params: Promise<{ chapter: string }> }) {
  const n = chapterNumber((await params).chapter);
  const c = g11PracticeChapter(n);
  if (!c) notFound();
  const path = g11PracticePath(n), products = g11PracticeProducts(n);
  const user = await getGoogleUser();
  let accessFailed = false;
  const access = new Set<string>();
  if (user) try { for (const p of products) if (await hasG12PracticeAccess(user, p.id)) access.add(p.id); } catch { accessFailed = true; }
  return <main className="integrals-library">
    <nav><a href="/">Ramavana Mathematical Center</a><span> / </span><a href="/cbse/grade-11">CBSE Grade 11</a>{user && <a className="integrals-account" href="/student">My account</a>}</nav>
    <header className="integrals-overview">
      <span className="integrals-eyebrow">CHAPTER {String(n).padStart(2, '0')} · GRADE 11</span>
      <h1>{c.title}</h1>
      <nav className="integrals-resources" aria-label={`${c.title} resources`}>
        <a className="integrals-notes-link" href={`/notes/${c.notes}`}><span><strong>Read the free chapter notes</strong><small>Formula sheet · Board and JEE sessions · Solved examples</small></span><span aria-hidden="true">→</span></a>
        <a href="#paid-practice"><span><strong>Browse practice papers</strong><small>JEE Main and JEE Advanced</small></span><span aria-hidden="true">↓</span></a>
      </nav>
    </header>
    <section aria-labelledby="paid-practice"><h2 id="paid-practice">Choose your practice paper</h2>
      {accessFailed && <p role="alert">Your purchases could not be checked. Please refresh before paying.</p>}
      <div className="integrals-grid">{products.map(p => <article key={p.id} id={p.id}><span className="integrals-tag">{p.standard} STANDARD</span><h3>{p.title}</h3><p>{p.detail}</p><p className="integrals-price">₹{g12PracticePricePaise(p.id) / 100} <small>including solutions</small></p>
        {access.has(p.id) ? <><p className="integrals-unlocked">Available for your account</p><a className="integrals-button" href={`${path}/papers/${p.id}`}>Open online paper</a></> : accessFailed ? <p>Refresh to check access.</p> : user ? <IntegralsCheckout amount={g12PracticePricePaise(p.id)} id={p.id} title={`${c.title} · ${p.title}`} name={user.displayName} email={user.email} /> : <a className="integrals-button" href={googleSignInPath(path)}>Sign in to buy — ₹{g12PracticePricePaise(p.id) / 100}</a>}
      </article>)}</div>
    </section>
    <footer><p><a href={`/cbse/grade-11/ch-${n}`}>Open the chapter page</a> · <a href="/cbse/grade-11">All Grade 11 chapters</a></p><p><a href="/terms">Terms & conditions</a> · <a href="/privacy-policy">Privacy policy</a></p></footer>
  </main>;
}
