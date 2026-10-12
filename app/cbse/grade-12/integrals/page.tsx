import { getGoogleUser, googleSignInPath } from '@/app/google-auth';
import { integralsPath, integralsProducts, integralsPricePaise } from '@/lib/integrals-products';
import { hasIntegralsAccess } from '@/lib/integrals-access';
import IntegralsCheckout from './checkout';
import './integrals.css';

export const metadata = { title: 'Integrals: Notes, Practice & Papers | Ramavana', description: 'Free Grade 12 indefinite and definite integrals notes, 50 solved practice questions, and original CBSE and JEE chapter papers.' };
export default async function IntegralsLibrary() {
  const user = await getGoogleUser();
  let accessFailed = false;
  const access = new Set<string>();
  if (user) try { for (const p of integralsProducts) if (await hasIntegralsAccess(user, p.id)) access.add(p.id); } catch { accessFailed = true; }
  return <main className="integrals-library">
    <a className="integrals-brand" href="/"><img src="/ramavana-mark.png" alt="Ramavana mathematical logo"/><span>Ramavana<br/><small>Mathematical Centre</small></span></a><nav><a href="/">Ramavana Mathematical Centre</a><span> / </span><a href="/cbse/grade-12">CBSE Grade 12</a>{user && <a className="integrals-account" href="/student">My account</a>}</nav>
    <header><span className="integrals-eyebrow">CHAPTER 07 · GRADE 12</span><h1>Integrals</h1><p>Build the method. Understand the reasoning. Practise with confidence.</p><p>Indefinite and definite integration, from first steps to advanced problems.</p></header>
    <section aria-labelledby="free-integrals"><h2 id="free-integrals">Learn and practise — free</h2><div className="integrals-grid">
      <article><span className="integrals-tag">FREE</span><h3>Complete chapter notes</h3><p>22 clear lessons, 46 worked examples and interactive diagrams. From antiderivatives to reflection, Riemann sums, integral equations and parameter methods.</p><a className="integrals-button" href="/notes/g12-integrals">Read chapter notes</a></article>
      <article><span className="integrals-tag">FREE</span><h3>50-question MCQ practice</h3><p>Answer 50 MCQs online. Submit to get your score immediately, then see the correct answers and step-by-step solutions.</p><a className="integrals-button" href="/cbse/grade-12/ch-7/free-mcq">Start free MCQ practice</a></article>
    </div></section>
    <section aria-labelledby="paid-integrals"><h2 id="paid-integrals">Choose your practice paper</h2><p>20-mark MCQ test: ₹20. CBSE and JEE papers: ₹30 each. Answer online and reveal the complete worked solutions and marking scheme after submission. Objective questions are scored automatically; written CBSE answers use self-review. These paper attempts are not sent to your teacher.</p><p>The CBSE chapter papers follow our 40-mark, 24-question format with Sections A–E and 90 minutes. JEE Main and JEE Advanced papers retain their own marking patterns. These are original chapter practice tests.</p>
      {accessFailed && <p role="alert">Your purchases could not be checked. Please refresh before paying.</p>}
      <div className="integrals-grid">{integralsProducts.map(p => <article key={p.id} id={p.id}><span className="integrals-tag">{p.standard} STANDARD</span><h3>{p.title}</h3><p>{p.detail}</p><p className="integrals-price">₹{integralsPricePaise(p.id)/100} <small>including solutions</small></p>
        {access.has(p.id) ? <><p className="integrals-unlocked">{user ? 'Available for your account' : ''}</p><a className="integrals-button" href={`${integralsPath}/papers/${p.id}`}>Open online paper</a></> : accessFailed ? <p>Refresh to check access.</p> : user ? <IntegralsCheckout amount={integralsPricePaise(p.id)} id={p.id} title={p.title} name={user.displayName} email={user.email}/> : <a className="integrals-button" href={googleSignInPath(integralsPath)}>Sign in to buy — ₹{integralsPricePaise(p.id)/100}</a>}
      </article>)}</div>
    </section>
    <footer><p><a href="/cbse/grade-12/ch-7">Open the existing online Integrals test</a> · <a href="/cbse/grade-12">All Grade 12 chapters</a></p><p><a href="/terms">Terms & conditions</a> · <a href="/privacy-policy">Privacy policy</a></p></footer>
  </main>;
}
