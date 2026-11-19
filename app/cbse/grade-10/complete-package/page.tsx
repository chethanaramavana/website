import type { Metadata } from 'next';
import { BookOpen, CheckCircle2, FlaskConical, ArrowRight } from 'lucide-react';
import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import LearningHeader from '@/app/learning-header';
import { SiteFooter } from '@/app/brand';
import Checkout from '@/app/cbse/grade-12/integrals/checkout';
import { GRADE10_PACKAGE as pack, grade10PackageOnSale } from '@/lib/grade10-package';
import { hasGrade10Package, isGrade10Paper } from '@/lib/grade10-package-access';
import { paperDefinitionsById } from '@/lib/papers';
import { freeQuizChapters } from '@/lib/free-quizzes/catalog';
import { getBasicsCourse, basicsLevelPath } from '@/lib/basics-catalog';
import outline from '@/lib/math-basics-outline.json';
import './package.css';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'CBSE Grade 10 Complete Practice Package | Ramavana', description: 'Written papers, chapter MCQs and interactive maths experiments in one ₹1,000 package. Access through 31 March 2027, including new Grade 10 additions during the access period.' };
export default async function CompletePackage() {
  const user = await getGoogleUser();
  let owned = false, failed = false;
  if (user) try { owned = await hasGrade10Package(user); } catch { failed = true; }
  const onSale = grade10PackageOnSale();
  const papers = Object.values(paperDefinitionsById).filter(p=>isGrade10Paper(p.id));
  const course = getBasicsCourse('grade-10')!;
  return <div className="identity-learning"><LearningHeader signedIn={!!user}/>
    <main className="rmc-container grade10-package">
      <a href="/cbse/grade-10">← CBSE Grade 10</a>
      <header className="package-hero">
        <div><p className="rmc-eyebrow">CBSE · Grade 10 · 2026–27</p><h1>More ways to practise.<br/>One complete package.</h1><p className="package-lead">Bring your exam practice and concept learning together: written papers, chapter MCQs and interactive experiments in one place.</p><p>Keep practising as the collection grows. Coming during the package period: many more sample papers, new experiments and last-minute exam preparation tips for CBSE Grade 10. Additions published by 31 March 2027 are included at no extra charge.</p></div>
        <aside className="package-purchase"><h2>Complete Practice Package</h2><p className="package-price">₹1,000 <small>one payment</small></p><p>Access through <strong>31 March 2027</strong> (IST), on the student’s signed-in account. No automatic renewal.</p>
          {failed ? <p role="alert">We couldn’t check your access. Please refresh before paying.</p> : owned ? <><p><CheckCircle2 aria-hidden="true"/> Your package is active</p><a className="rmc-button" href="#included">Open your learning materials <ArrowRight/></a></> : !onSale ? <p>This package has ended and is no longer on sale.</p> : user ? <Checkout id={pack.id} title={pack.title} amount={pack.amount} name={user.displayName} email={user.email} packagePurchase/> : <a className="rmc-button" href={googleSignInPath(pack.path)}>Sign in to buy — ₹1,000 <ArrowRight/></a>}
        </aside>
      </header>
      <section className="package-benefits" aria-label="What is included">
        <article><BookOpen/><h2>Prepare with papers</h2><p>{papers.length} written chapter and sample papers currently available, with repeat attempts during your access period. Submit your working for the existing teacher-marking workflow.</p></article>
        <article><CheckCircle2/><h2>Check your understanding</h2><p>All 14 chapter MCQ quizzes: 50 questions each, including assertion–reason questions. See your marks and worked solutions after submission.</p></article>
        <article><FlaskConical/><h2>Explore the ideas</h2><p>The Grade 10 Maths Step by Step folder, including revision lessons and interactive experiments. Open any included level and save your progress.</p></article>
      </section>
      <section className="package-growth"><h2>A collection that grows with your preparation</h2><p>Practise a chapter, explore the idea with an experiment, then return to a paper. Your package covers the materials listed below, plus many more sample papers, experiments and last-minute exam preparation tips as they are added during its validity. Upcoming tips will help students plan revision, manage exam time and avoid common mistakes. These additions will appear here when published; their number and release dates are not fixed.</p><p>Existing free quizzes and notes remain free. Individual purchases remain available if you only need a few chapters. This package covers CBSE Grade 10; other grades, boards and live tuition are not included.</p></section>
      <section id="included"><h2>{owned?'Your package materials':'Included now'}</h2>{!owned&&<p>Browse the collection below. Paid activities require an active package or their individual access.</p>}
        <h3>Written chapter and sample papers</h3><div className="package-links">{papers.map(p=>{const chapter=p.chapterNumber ?? freeQuizChapters.indexOf(p.chapter)+1;return <a key={p.id} href={`/cbse/grade-10/ch-${chapter}?paper=${p.paperNumber}`}>{p.chapter} · Paper {p.paperNumber}<ArrowRight/></a>;})}</div>
        <h3>Chapter MCQ quizzes</h3><a className="rmc-button rmc-button-outline" href="/cbse/grade-10/free-mcq">Open all 14 chapter quizzes <ArrowRight/></a>
        <h3>Interactive lessons and experiments</h3><div className="package-links">{course.topics.map(slug=><a key={slug} href={basicsLevelPath('grade-10',slug)}>{outline.find(t=>t.slug===slug)?.title ?? slug}<ArrowRight/></a>)}</div>
        <p>Access ends at 11:59 pm IST on 31 March 2027. Your submitted reports remain in your student account. Separately purchased access keeps its existing terms.</p>
      </section>
    </main><SiteFooter/></div>;
}
