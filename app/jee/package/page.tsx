import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, ListChecks, ArrowRight, LockOpen, Sparkles, Target, Trophy, FileText } from 'lucide-react';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
import Checkout from '@/app/cbse/grade-12/integrals/checkout';
import { isAdmin } from '@/lib/server';
import { JEE_PACKAGE as pack, jeePackageOnSale } from '@/lib/jee-package';
import { hasJeePackage, isJeeChapterProduct } from '@/lib/jee-package-access';
import { jeeEntranceProducts, jeeEntrancePath } from '@/lib/jee-entrance';
import { g11PracticeChapters, g11PracticePath, g11PracticeProducts, g12PracticeChapters, g12PracticePath, g12PracticeProducts, g12PracticePricePaise } from '@/lib/g12-practice-catalog';
import { integralsProducts, integralsPricePaise, integralsPath } from '@/lib/integrals-products';
import '@/app/cbse/grade-10/complete-package/package.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'JEE Main and Advanced Mathematics Package | Ramavana', description: 'Three JEE Main and three JEE Advanced papers for every Grade 11 and Grade 12 mathematics chapter, six JEE Main and six JEE Advanced full-syllabus entrance papers, and free chapter notes, in one ₹2,500 package.' };

const rupees = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN')}`;
type Chapter = { key: string; grade: 11 | 12; number: number; title: string; path: string; notes: string };
const g11: Chapter[] = g11PracticeChapters.map((c) => ({ key: `g11-${c.number}`, grade: 11, number: c.number, title: c.title, path: g11PracticePath(c.number), notes: c.notes }));
const g12: Chapter[] = [...g12PracticeChapters.map((c) => ({ key: `g12-${c.number}`, grade: 12 as const, number: c.number as number, title: c.title as string, path: g12PracticePath(c.number), notes: c.notes as string })), { key: 'g12-7', grade: 12 as const, number: 7, title: 'Integrals', path: integralsPath, notes: 'g12-integrals' }].sort((a, b) => a.number - b.number);

export default async function JeePackage() {
  const user = await getGoogleUser();
  let owned = false, failed = false;
  if (user) try { owned = isAdmin(user) || await hasJeePackage(user); } catch { failed = true; }
  const onSale = jeePackageOnSale();
  const chapterPapers = [...g11.flatMap((c) => g11PracticeProducts(c.number)), ...g12.filter((c) => c.number !== 7).flatMap((c) => g12PracticeProducts(c.number)), ...integralsProducts].filter((p) => isJeeChapterProduct(p.id));
  const mainCount = chapterPapers.filter((p) => p.standard === 'JEE Main').length, advCount = chapterPapers.length - mainCount;
  const priceOf = (id: string) => integralsProducts.some((p) => p.id === id) ? integralsPricePaise(id) : g12PracticePricePaise(id);
  // What the chapter papers cost when each is bought on its own today. The entrance papers are sold only in this package.
  const separate = chapterPapers.reduce((s, p) => s + priceOf(p.id), 0);
  const saving = separate - pack.amount;
  const mains = jeeEntranceProducts.filter((p) => p.standard === 'JEE Main'), advs = jeeEntranceProducts.filter((p) => p.standard === 'JEE Advanced');
  const buy = failed ? <p role="alert" className="package-alert">We could not check your access. Please refresh before you pay.</p>
    : owned ? <><p className="package-active"><CheckCircle2 aria-hidden="true"/> Your package is active</p><a className="rmc-button package-cta" href="#included">Open your papers <ArrowRight/></a></>
    : !onSale ? <p className="package-alert">This package ended and is no longer on sale.</p>
    : user ? <Checkout id={pack.id} title={pack.title} amount={pack.amount} name={user.displayName} email={user.email} packagePurchase/>
    : <a className="rmc-button package-cta" href={googleSignInPath(pack.path)}>Sign in to buy — {rupees(pack.amount)} <ArrowRight/></a>;
  const chapterLinks = (list: Chapter[]) => <div className="package-links">{list.map((c) => <a key={c.key} href={c.path}><span className="package-num">{c.number}</span><span>{c.title}<small>3 JEE Main · 3 JEE Advanced papers</small></span><ArrowRight aria-hidden="true"/></a>)}</div>;
  const noteLinks = (list: Chapter[]) => <div className="package-links package-links-small">{list.map((c) => <a key={c.key} href={`/notes/${c.notes}`}><span className="package-num">{c.number}</span><span>{c.title}<small>Free notes</small></span><ArrowRight aria-hidden="true"/></a>)}</div>;
  const entranceLinks = (list: typeof jeeEntranceProducts) => <div className="package-links package-links-small">{list.map((p, k) => owned
    ? <a key={p.id} href={jeeEntrancePath(p.id)}><span className="package-num">{k + 1}</span><span>{p.title}<small>{p.detail}</small></span><ArrowRight aria-hidden="true"/></a>
    : <a key={p.id} href="#buy" aria-disabled="true"><span className="package-num">{k + 1}</span><span>{p.title}<small>Opens with the package</small></span><LockOpen aria-hidden="true"/></a>)}</div>;

  return <div className="identity-learning"><LearningHeader signedIn={!!user}/>
    <main className="grade10-package">
      <div className="rmc-container"><a className="package-back" href="/cbse/grade-12">← CBSE Grade 12</a></div>
      <section className="package-hero"><div className="rmc-container package-hero-grid">
        <div className="package-hero-copy">
          <p className="package-chip">JEE Main · JEE Advanced · Mathematics</p>
          <h1>All your JEE mathematics practice.<br/><span>One package.</span></h1>
          <p className="package-lead">Three JEE Main and three JEE Advanced papers for every Grade 11 and Grade 12 chapter, then six JEE Main and six JEE Advanced full-syllabus entrance papers. Every paper is online, marked at once, and comes with worked solutions. The chapter notes are free.</p>
          <ul className="package-stats" aria-label="Package at a glance">
            <li><strong>{chapterPapers.length}</strong><span>chapter papers</span></li>
            <li><strong>{jeeEntranceProducts.length}</strong><span>entrance papers</span></li>
            <li><strong>{g11.length + g12.length}</strong><span>chapters with notes</span></li>
            <li><strong>31 May</strong><span>2027 access</span></li>
          </ul>
        </div>
        <aside id="buy" className="package-purchase" aria-label="Buy the package">
          <p className="package-badge"><Sparkles aria-hidden="true"/> Best value for JEE</p>
          <h2>JEE Package</h2>
          <p className="package-price">{rupees(pack.amount)} <small>one payment · no automatic renewal</small></p>
          {saving > 0 && <p className="package-compare">Chapter papers bought separately today: <s>{rupees(separate)}</s> <b>You save {rupees(saving)}</b></p>}
          <ul className="package-ticks">
            <li><CheckCircle2 aria-hidden="true"/>{mainCount} JEE Main chapter papers (25 questions, 100 marks)</li>
            <li><CheckCircle2 aria-hidden="true"/>{advCount} JEE Advanced chapter papers (16 questions, 60 marks)</li>
            <li><CheckCircle2 aria-hidden="true"/>{mains.length} JEE Main and {advs.length} JEE Advanced full-syllabus entrance papers, only in this package</li>
            <li><CheckCircle2 aria-hidden="true"/>Free notes for all {g11.length + g12.length} chapters of Grade 11 and Grade 12</li>
          </ul>
          {buy}
          <p className="package-small">Access through <strong>{pack.expiryLabel}</strong> (IST), on the student’s signed-in account. CBSE board papers are in the separate Board Exam Package.</p>
        </aside>
      </div></section>

      <div className="rmc-container">
        <section className="package-steps" aria-label="How it works">
          <h2>How it works</h2>
          <ol>
            <li><LockOpen aria-hidden="true"/><b>Unlock once</b><span>Pay {rupees(pack.amount)} with your signed-in account.</span></li>
            <li><BookOpen aria-hidden="true"/><b>Read the notes</b><span>Revise the chapter from the free notes.</span></li>
            <li><ListChecks aria-hidden="true"/><b>Practise by chapter</b><span>Take Papers 1, 2 and 3 at JEE Main and JEE Advanced level.</span></li>
            <li><Trophy aria-hidden="true"/><b>Take entrance papers</b><span>Test the full syllabus and read the worked solutions.</span></li>
          </ol>
        </section>

        <section className="package-benefits" aria-label="What is included">
          <article><span className="package-icon"><FileText aria-hidden="true"/></span><h2>Chapter by chapter</h2><p>Every chapter has three JEE Main papers and three JEE Advanced papers. The questions are different in each paper.</p></article>
          <article><span className="package-icon"><Target aria-hidden="true"/></span><h2>Real exam pattern</h2><p>JEE Main papers have 20 single-correct and 5 numerical questions with negative marking. JEE Advanced papers have single-correct, multiple-correct, numerical and matching questions.</p></article>
          <article><span className="package-icon"><Trophy aria-hidden="true"/></span><h2>Full-syllabus papers</h2><p>Twelve entrance papers mix Grade 11 and Grade 12 topics, as in the real examination.</p></article>
        </section>

        <section id="included" className="package-included"><h2>{owned ? 'Your package materials' : 'Included now'}</h2>{!owned && <p>Choose a chapter. Paid papers need an active package or their individual access.</p>}
          <h3>Grade 11 chapters: JEE Main and JEE Advanced papers</h3>
          {chapterLinks(g11)}
          <h3>Grade 12 chapters: JEE Main and JEE Advanced papers</h3>
          {chapterLinks(g12)}
          <h3 id="entrance">JEE Main entrance papers (full syllabus)</h3>
          {entranceLinks(mains)}
          <h3>JEE Advanced entrance papers (full syllabus)</h3>
          {entranceLinks(advs)}
          <h3>Free notes: Grade 11</h3>
          {noteLinks(g11)}
          <h3>Free notes: Grade 12</h3>
          {noteLinks(g12)}
        </section>

        <section className="package-faq"><h2>Questions</h2>
          <details><summary>Are CBSE board papers included?</summary><p>No. This package covers JEE Main and JEE Advanced mathematics. The CBSE board papers and MCQ tests are in the Grade 12 Board Exam Package.</p></details>
          <details><summary>How long can I use the package?</summary><p>Until 11:59 pm IST on {pack.expiryLabel}. There is no automatic renewal.</p></details>
          <details><summary>Can I buy the entrance papers alone?</summary><p>No. The twelve full-syllabus entrance papers open only with this package. Chapter papers stay available one by one on each chapter page.</p></details>
          <details><summary>I already bought some chapter papers. What happens to them?</summary><p>Your earlier purchases keep their terms. The package opens everything else.</p></details>
          <details><summary>I paid but the page does not show my package.</summary><p>Use “Check completed payment” in the box above before you pay again. It finds an earlier payment on your account.</p></details>
        </section>
      </div>
    </main><SiteFooter/></div>;
}
