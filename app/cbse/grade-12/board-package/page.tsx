import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, ListChecks, ArrowRight, Upload, ClipboardCheck, LockOpen, Sparkles, CalendarDays, Target } from 'lucide-react';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
import Checkout from '@/app/cbse/grade-12/integrals/checkout';
import { GRADE12_PACKAGE as pack, grade12PackageOnSale } from '@/lib/grade12-package';
import { hasGrade12Package, isGrade12Paper, isGrade12BoardProduct } from '@/lib/grade12-package-access';
import { paperDefinitionsById } from '@/lib/papers';
import { quizPrice, quizPath, quizCount } from '@/lib/free-quizzes/catalog';
import { g12PracticeChapters, g12PracticeProducts, g12PracticePath, g12PracticePricePaise } from '@/lib/g12-practice-catalog';
import { integralsProducts, integralsPricePaise, integralsPath } from '@/lib/integrals-products';
import '@/app/cbse/grade-10/complete-package/package.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'CBSE Grade 12 Board Exam Package | Ramavana', description: 'Six full 80-mark sample papers and every CBSE Grade 12 board practice paper, 20-mark MCQ test and chapter MCQ quiz in one ₹1,500 package. JEE papers are not included. Access through 31 May 2027.' };

const rupees = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN')}`;
/** NCERT Grade 12 chapters (7 = Integrals). */
const chapters = [...g12PracticeChapters.map((c) => ({ number: c.number as number, title: c.title as string, path: g12PracticePath(c.number) })), { number: 7, title: 'Integrals', path: integralsPath }].sort((a, b) => a.number - b.number);

export default async function Grade12BoardPackage() {
  const user = await getGoogleUser();
  let owned = false, failed = false;
  if (user) try { owned = await hasGrade12Package(user); } catch { failed = true; }
  const onSale = grade12PackageOnSale();
  const written = Object.values(paperDefinitionsById).filter((p) => isGrade12Paper(p.id));
  const samplePapers = written.filter((p) => p.chapter === 'Sample Papers').sort((a, b) => a.paperNumber.localeCompare(b.paperNumber));
  const chapterWritten = written.filter((p) => p.chapter !== 'Sample Papers');
  const chapterOf = (title: string) => chapters.find((c) => c.title === title)?.number ?? 0;
  const practice = [...chapters.flatMap((c) => g12PracticeProducts(c.number)), ...integralsProducts].filter((p) => isGrade12BoardProduct(p.id));
  const boardPapers = practice.filter((p) => p.standard === 'CBSE');
  const mcqTests = practice.filter((p) => p.standard === 'CBSE MCQ');
  const priceOf = (id: string) => integralsProducts.some((p) => p.id === id) ? integralsPricePaise(id) : g12PracticePricePaise(id);
  // What the same access costs when each item is bought on its own today.
  const separate = written.length * 3000 + practice.reduce((s, p) => s + priceOf(p.id), 0) + chapters.reduce((s, c) => s + quizPrice(c.number, 12), 0);
  const saving = separate - pack.amount;
  const papersTotal = written.length + boardPapers.length;
  const buy = failed ? <p role="alert" className="package-alert">We couldn’t check your access. Please refresh before paying.</p>
    : owned ? <><p className="package-active"><CheckCircle2 aria-hidden="true"/> Your package is active</p><a className="rmc-button package-cta" href="#included">Open your learning materials <ArrowRight/></a></>
    : !onSale ? <p className="package-alert">This package has ended and is no longer on sale.</p>
    : user ? <Checkout id={pack.id} title={pack.title} amount={pack.amount} name={user.displayName} email={user.email} packagePurchase/>
    : <a className="rmc-button package-cta" href={googleSignInPath(pack.path)}>Sign in to buy — {rupees(pack.amount)} <ArrowRight/></a>;

  return <div className="identity-learning"><LearningHeader signedIn={!!user}/>
    <main className="grade10-package">
      <div className="rmc-container"><a className="package-back" href="/cbse/grade-12">← CBSE Grade 12</a></div>
      <section className="package-hero"><div className="rmc-container package-hero-grid">
        <div className="package-hero-copy">
          <p className="package-chip">CBSE · Grade 12 · Board exam 2027</p>
          <h1>Your Grade 12 board exam practice.<br/><span>One complete package.</span></h1>
          <p className="package-lead">Full 80-mark sample papers, every CBSE board-style chapter paper, 20-mark MCQ test and chapter MCQ quiz for all 13 chapters, with teacher marking and worked solutions. Built for the board exam only: JEE papers are not included.</p>
          <ul className="package-stats" aria-label="Package at a glance">
            <li><strong>{papersTotal}</strong><span>written board papers</span></li>
            <li><strong>{mcqTests.length}</strong><span>20-mark MCQ tests</span></li>
            <li><strong>{chapters.length * quizCount()}</strong><span>chapter MCQs</span></li>
            <li><strong>31 Mar</strong><span>2027 access</span></li>
          </ul>
        </div>
        <aside className="package-purchase" aria-label="Buy the package">
          <p className="package-badge"><Sparkles aria-hidden="true"/> Best value for board exams</p>
          <h2>Board Exam Package</h2>
          <p className="package-price">{rupees(pack.amount)} <small>one payment · no automatic renewal</small></p>
          {saving > 0 && <p className="package-compare">Bought separately today: <s>{rupees(separate)}</s> <b>You save {rupees(saving)}</b></p>}
          <ul className="package-ticks">
            <li><CheckCircle2 aria-hidden="true"/>All {chapterWritten.length} chapter papers and {samplePapers.length} sample papers (80 marks, 3 hours)</li>
            <li><CheckCircle2 aria-hidden="true"/>{boardPapers.length} CBSE 40-mark practice papers</li>
            <li><CheckCircle2 aria-hidden="true"/>{mcqTests.length} twenty-mark MCQ tests, one for each chapter</li>
            <li><CheckCircle2 aria-hidden="true"/>All {chapters.length} chapter MCQ quizzes, {quizCount()} questions each</li>
            <li><CheckCircle2 aria-hidden="true"/>New board papers and exam tips added until 31 May 2027</li>
          </ul>
          {buy}
          <p className="package-small">Access through <strong>31 May 2027</strong> (IST), on the student’s signed-in account. JEE Main and JEE Advanced papers are sold separately.</p>
        </aside>
      </div></section>

      <div className="rmc-container">
        <section className="package-steps" aria-label="How it works">
          <h2>How it works</h2>
          <ol>
            <li><LockOpen aria-hidden="true"/><b>Unlock once</b><span>Pay {rupees(pack.amount)} with your signed-in account.</span></li>
            <li><ListChecks aria-hidden="true"/><b>Practise</b><span>Take the MCQ tests and write each board paper on paper.</span></li>
            <li><Upload aria-hidden="true"/><b>Upload</b><span>Scan your written answers and upload them.</span></li>
            <li><ClipboardCheck aria-hidden="true"/><b>Get marked</b><span>See marks, worked solutions and teacher feedback.</span></li>
          </ol>
        </section>

        <section className="package-benefits" aria-label="What is included">
          <article><span className="package-icon"><BookOpen aria-hidden="true"/></span><h2>Write board papers</h2><p>{papersTotal} written papers in the CBSE board format: {samplePapers.length} full 80-mark sample papers, plus one chapter paper and three 40-mark papers for every chapter. Submit your working for teacher marking.</p></article>
          <article><span className="package-icon"><ListChecks aria-hidden="true"/></span><h2>Test with MCQs</h2><p>A 20-mark MCQ test and a {quizCount()}-question MCQ quiz for every chapter, including assertion–reason questions, with marks and worked solutions.</p></article>
          <article><span className="package-icon"><Target aria-hidden="true"/></span><h2>Focus on the board exam</h2><p>Only CBSE board-pattern material. No JEE questions, so every minute of practice goes into the board exam.</p></article>
        </section>

        <section className="package-growth"><span className="package-icon"><CalendarDays aria-hidden="true"/></span><div><h2>A collection that grows until your exam</h2><p>During the package period we will add more board-pattern papers and last-minute exam preparation tips for CBSE Grade 12. Additions published by 31 May 2027 are included at no extra charge. Their number and release dates are not fixed.</p><p>Free notes and free quizzes remain free. Individual purchases remain available if you only need a few chapters. This package covers CBSE Grade 12 board practice only; JEE papers, other grades and live tuition are not included.</p></div></section>

        <section id="included" className="package-included"><h2>{owned ? 'Your package materials' : 'Included now'}</h2>{!owned && <p>Choose a chapter. Paid activities require an active package or their individual access.</p>}
          <h3>Chapter papers</h3>
          <div className="package-links">{chapterWritten.map((p) => { const n = chapterOf(p.chapter); return <a key={p.id} href={`/cbse/grade-12/ch-${n}?paper=${p.paperNumber}`}><span className="package-num">{n}</span><span>{p.chapter}<small>Paper {p.paperNumber}</small></span><ArrowRight aria-hidden="true"/></a>; })}</div>
          <h3>Sample papers (80 marks, 3 hours)</h3>
          <div className="package-links package-links-small">{samplePapers.map((p) => <a key={p.id} href={`/cbse/grade-12/ch-14?paper=${p.paperNumber}`}><span className="package-num">SP</span><span>Paper {p.paperNumber}<small>{p.focus.startsWith('Challenge') ? 'Challenge' : 'Board level'}</small></span><ArrowRight aria-hidden="true"/></a>)}</div>
          <h3>Chapter practice: CBSE 40-mark papers and 20-mark MCQ test</h3>
          <div className="package-links">{chapters.map((c) => <a key={c.number} href={c.path}><span className="package-num">{c.number}</span><span>{c.title}<small>3 board papers · 1 MCQ test</small></span><ArrowRight aria-hidden="true"/></a>)}</div>
          <h3>Chapter MCQ quizzes</h3>
          <div className="package-links">{chapters.map((c) => <a key={c.number} href={quizPath(c.number, 12)}><span className="package-num">{c.number}</span><span>{c.title}<small>{quizCount()} MCQs{quizPrice(c.number, 12) === 0 ? ' · free for everyone' : ''}</small></span><ArrowRight aria-hidden="true"/></a>)}</div>
        </section>

        <section className="package-faq"><h2>Questions</h2>
          <details><summary>Are JEE papers included?</summary><p>No. This package covers CBSE board-pattern practice only. JEE Main and JEE Advanced papers stay available as individual purchases on each chapter page.</p></details>
          <details><summary>How long can I use the package?</summary><p>Until 11:59 pm IST on 31 May 2027. There is no automatic renewal. Your submitted reports remain in your student account after that date.</p></details>
          <details><summary>Do I get the papers and tips added later?</summary><p>Yes. Grade 12 board papers and exam tips published by 31 May 2027 open automatically in your package.</p></details>
          <details><summary>I already bought some chapters. What happens to them?</summary><p>Separately purchased access keeps its existing terms. The package adds everything else.</p></details>
          <details><summary>I paid but the page does not show my package.</summary><p>Use “Check completed payment” in the box above before you pay again. It confirms an earlier payment on your account.</p></details>
        </section>
      </div>
    </main><SiteFooter/></div>;
}
