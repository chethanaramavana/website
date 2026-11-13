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
    <nav><a href="/">Ramavana Mathematical Center</a><span> / </span><a href="/cbse/grade-12">CBSE Grade 12</a>{user && <a className="integrals-account" href="/student">My account</a>}</nav>
    <header className="integrals-overview">
      <span className="integrals-eyebrow">CHAPTER 07 · GRADE 12</span>
      <h1>Integrals</h1>
      <nav className="integrals-resources" aria-label="Integrals resources">
        <a className="integrals-notes-link" href="/notes/g12-integrals">
          <span><strong>Read the free chapter notes</strong><small>22 lessons · 46 worked examples · Interactive diagrams</small></span>
          <span aria-hidden="true">→</span>
        </a>
        <a href="/cbse/grade-12/ch-7/free-mcq">
          <span><strong>Try free MCQs</strong><small>50 questions with solutions</small></span>
          <span aria-hidden="true">→</span>
        </a>
        <a href="#paid-integrals">
          <span><strong>Browse practice papers</strong><small>CBSE, JEE Main and Advanced</small></span>
          <span aria-hidden="true">↓</span>
        </a>
      </nav>
    </header>
    <section aria-labelledby="paid-integrals"><h2 id="paid-integrals">Choose your practice paper</h2>
      {accessFailed && <p role="alert">Your purchases could not be checked. Please refresh before paying.</p>}
      <div className="integrals-grid">{integralsProducts.map(p => <article key={p.id} id={p.id}><span className="integrals-tag">{p.standard} STANDARD</span><h3>{p.title}</h3><p>{p.detail}</p><p className="integrals-price">₹{integralsPricePaise(p.id)/100} <small>including solutions</small></p>
        {access.has(p.id) ? <><p className="integrals-unlocked">{user ? 'Available for your account' : ''}</p><a className="integrals-button" href={`${integralsPath}/papers/${p.id}`}>Open online paper</a></> : accessFailed ? <p>Refresh to check access.</p> : user ? <IntegralsCheckout amount={integralsPricePaise(p.id)} id={p.id} title={p.title} name={user.displayName} email={user.email}/> : <a className="integrals-button" href={googleSignInPath(integralsPath)}>Sign in to buy — ₹{integralsPricePaise(p.id)/100}</a>}
      </article>)}</div>
    </section>
    <footer><p><a href="/cbse/grade-12/ch-7">Open the existing online Integrals test</a> · <a href="/cbse/grade-12">All Grade 12 chapters</a></p><p><a href="/terms">Terms & conditions</a> · <a href="/privacy-policy">Privacy policy</a></p></footer>
  </main>;
}
