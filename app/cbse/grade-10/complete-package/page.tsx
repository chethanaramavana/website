import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, FlaskConical, ArrowRight, Upload, ClipboardCheck, LockOpen, Sparkles, CalendarDays, ListChecks } from 'lucide-react';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
import Checkout from '@/app/cbse/grade-12/integrals/checkout';
import { GRADE10_PACKAGE as pack, grade10PackageOnSale } from '@/lib/grade10-package';
import { hasGrade10Package, isGrade10Paper } from '@/lib/grade10-package-access';
import { paperDefinitionsById } from '@/lib/papers';
import { freeQuizChapters, quizPrice, quizCount } from '@/lib/free-quizzes/catalog';
import { getBasicsCourse, getBasicsProduct, basicsLevelPath } from '@/lib/basics-catalog';
import outline from '@/lib/math-basics-outline.json';
import './package.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'CBSE Grade 10 Complete Practice Package | Ramavana', description: 'Written papers, chapter MCQs and interactive maths experiments in one ₹1,000 package. Access through 31 March 2027, including new Grade 10 additions during the access period.' };

const rupees = (paise: number) => `₹${(paise / 100).toLocaleString('en-IN')}`;

export default async function CompletePackage() {
  const user = await getGoogleUser();
  let owned = false, failed = false;
  if (user) try { owned = await hasGrade10Package(user); } catch { failed = true; }
  const onSale = grade10PackageOnSale();
  const papers = Object.values(paperDefinitionsById).filter(p => isGrade10Paper(p.id));
  const chapterOf = (p: (typeof papers)[number]) => p.chapterNumber ?? freeQuizChapters.indexOf(p.chapter) + 1;
  const chapterPapers = papers.filter(p => p.chapter !== 'Sample Papers').sort((a, b) => chapterOf(a) - chapterOf(b));
  const samplePapers = papers.filter(p => p.chapter === 'Sample Papers').sort((a, b) => a.paperNumber.localeCompare(b.paperNumber));
  const course = getBasicsCourse('grade-10')!;
  const mcqQuestions = freeQuizChapters.length * quizCount();
  // What the same access costs when each item is bought on its own today.
  const separate = papers.length * 3000 + freeQuizChapters.reduce((s, _, i) => s + quizPrice(i + 1, 10), 0) + (getBasicsProduct('maths-basics-all')?.amount ?? 0);
  const saving = separate - pack.amount;
  const buy = failed ? <p role="alert" className="package-alert">We couldn’t check your access. Please refresh before paying.</p>
    : owned ? <><p className="package-active"><CheckCircle2 aria-hidden="true"/> Your package is active</p><a className="rmc-button package-cta" href="#included">Open your learning materials <ArrowRight/></a></>
    : !onSale ? <p className="package-alert">This package has ended and is no longer on sale.</p>
    : user ? <Checkout id={pack.id} title={pack.title} amount={pack.amount} name={user.displayName} email={user.email} packagePurchase/>
    : <a className="rmc-button package-cta" href={googleSignInPath(pack.path)}>Sign in to buy — ₹1,000 <ArrowRight/></a>;

  return <div className="identity-learning"><LearningHeader signedIn={!!user}/>
    <main className="grade10-package">
      <div className="rmc-container"><a className="package-back" href="/cbse/grade-10">← CBSE Grade 10</a></div>
      <section className="package-hero"><div className="rmc-container package-hero-grid">
        <div className="package-hero-copy">
          <p className="package-chip">CBSE · Grade 10 · 2026–27</p>
          <h1>All your Grade 10 maths practice.<br/><span>One complete package.</span></h1>
          <p className="package-lead">Written papers with teacher marking, chapter MCQs with worked solutions, and interactive experiments, together in one place until the board exam.</p>
          <ul className="package-stats" aria-label="Package at a glance">
            <li><strong>{papers.length}</strong><span>written papers</span></li>
            <li><strong>{mcqQuestions}</strong><span>chapter MCQs</span></li>
            <li><strong>{course.topics.length}</strong><span>experiment levels</span></li>
            <li><strong>31 Mar</strong><span>2027 access</span></li>
          </ul>
        </div>
        <aside className="package-purchase" aria-label="Buy the package">
          <p className="package-badge"><Sparkles aria-hidden="true"/> Best value for Grade 10</p>
          <h2>Complete Practice Package</h2>
          <p className="package-price">₹1,000 <small>one payment · no automatic renewal</small></p>
          {saving > 0 && <p className="package-compare">Bought separately today: <s>{rupees(separate)}</s> <b>You save {rupees(saving)}</b></p>}
          <ul className="package-ticks">
            <li><CheckCircle2 aria-hidden="true"/>All {chapterPapers.length} chapter papers and {samplePapers.length} sample papers</li>
            <li><CheckCircle2 aria-hidden="true"/>All {freeQuizChapters.length} chapter MCQ quizzes, {quizCount()} questions each</li>
            <li><CheckCircle2 aria-hidden="true"/>Grade 10 Maths Step by Step experiments</li>
            <li><CheckCircle2 aria-hidden="true"/>New papers, experiments and exam tips added until 31 March 2027</li>
          </ul>
          {buy}
          <p className="package-small">Access through <strong>31 March 2027</strong> (IST), on the student’s signed-in account.</p>
        </aside>
      </div></section>

      <div className="rmc-container">
        <section className="package-steps" aria-label="How it works">
          <h2>How it works</h2>
          <ol>
            <li><LockOpen aria-hidden="true"/><b>Unlock once</b><span>Pay ₹1,000 with your signed-in account.</span></li>
            <li><ListChecks aria-hidden="true"/><b>Practise</b><span>Answer MCQs and write each paper on paper.</span></li>
            <li><Upload aria-hidden="true"/><b>Upload</b><span>Scan your written answers and upload them.</span></li>
            <li><ClipboardCheck aria-hidden="true"/><b>Get marked</b><span>See marks, worked solutions and teacher feedback.</span></li>
          </ol>
        </section>

        <section className="package-benefits" aria-label="What is included">
          <article><span className="package-icon"><BookOpen aria-hidden="true"/></span><h2>Prepare with papers</h2><p>{papers.length} written chapter and sample papers, with repeat attempts during your access period. Submit your working for teacher marking.</p></article>
          <article><span className="package-icon"><CheckCircle2 aria-hidden="true"/></span><h2>Check your understanding</h2><p>All {freeQuizChapters.length} chapter MCQ quizzes: {quizCount()} questions each, including assertion–reason questions. See your marks and worked solutions after submission.</p></article>
          <article><span className="package-icon"><FlaskConical aria-hidden="true"/></span><h2>Explore the ideas</h2><p>The Grade 10 Maths Step by Step folder, with revision lessons and interactive experiments. Open any level and save your progress.</p></article>
        </section>

        <section className="package-growth"><span className="package-icon"><CalendarDays aria-hidden="true"/></span><div><h2>A collection that grows with your preparation</h2><p>During the package period we will add many more sample papers, new experiments and last-minute exam preparation tips for CBSE Grade 10. Additions published by 31 March 2027 are included at no extra charge. Their number and release dates are not fixed.</p><p>Existing free quizzes and notes remain free. Individual purchases remain available if you only need a few chapters. This package covers CBSE Grade 10 only; other grades, boards and live tuition are not included.</p></div></section>

        <section id="included" className="package-included"><h2>{owned ? 'Your package materials' : 'Included now'}</h2>{!owned && <p>Browse the collection below. Paid activities require an active package or their individual access.</p>}
          <h3>Chapter papers</h3>
          <div className="package-links">{chapterPapers.map(p => { const ch = chapterOf(p); return <a key={p.id} href={`/cbse/grade-10/ch-${ch}?paper=${p.paperNumber}`}><span className="package-num">{ch}</span><span>{p.chapter}<small>Paper {p.paperNumber}</small></span><ArrowRight aria-hidden="true"/></a>; })}</div>
          <h3>Sample papers</h3>
          <div className="package-links package-links-small">{samplePapers.map(p => <a key={p.id} href={`/cbse/grade-10/ch-${chapterOf(p)}?paper=${p.paperNumber}`}><span className="package-num">SP</span><span>Paper {p.paperNumber}</span><ArrowRight aria-hidden="true"/></a>)}</div>
          <h3>Chapter MCQ quizzes</h3>
          <a className="rmc-button rmc-button-outline" href="/cbse/grade-10/free-mcq">Open all {freeQuizChapters.length} chapter quizzes <ArrowRight/></a>
          <h3>Interactive lessons and experiments</h3>
          <div className="package-links">{course.topics.map((slug, i) => <a key={slug} href={basicsLevelPath('grade-10', slug)}><span className="package-num">{i + 1}</span><span>{outline.find(t => t.slug === slug)?.title ?? slug}</span><ArrowRight aria-hidden="true"/></a>)}</div>
        </section>

        <section className="package-faq"><h2>Questions</h2>
          <details><summary>How long can I use the package?</summary><p>Until 11:59 pm IST on 31 March 2027. There is no automatic renewal. Your submitted reports remain in your student account after that date.</p></details>
          <details><summary>Do I get the papers and tips added later?</summary><p>Yes. Grade 10 papers, experiments and exam tips published by 31 March 2027 open automatically in your package.</p></details>
          <details><summary>I already bought some chapters. What happens to them?</summary><p>Separately purchased access keeps its existing terms. The package adds everything else.</p></details>
          <details><summary>I paid but the page does not show my package.</summary><p>Use “Check completed payment” in the box above before you pay again. It confirms an earlier payment on your account.</p></details>
        </section>
      </div>
    </main><SiteFooter/></div>;
}
