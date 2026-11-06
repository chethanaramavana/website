import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getGoogleUser, googleSignInPath } from '../google-auth';
import { safeReturnTo } from '@/lib/google-auth';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import GoogleSignIn from '../google-sign-in';
import './login.css';

export const metadata: Metadata = {
  title: 'Sign in | Ramavana Mathematical Center',
  description: 'Sign in with Google to open Ramavana notes, worksheets and practice papers.',
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ return_to?: string }> }) {
  const returnTo = safeReturnTo((await searchParams).return_to);
  if (await getGoogleUser()) redirect(returnTo);
  return (
    <div className="identity-learning">
      <LearningHeader />
      <main className="rmc-login-page rmc-container">
        <section className="rmc-login-card" aria-labelledby="login-title">
          <img src="/ramavana-crest-transparent.png" width="72" height="72" alt="" />
          <h1 id="login-title">Sign in to continue</h1>
          <p>Notes, worksheets and practice papers open after a quick Google sign-in. Signing in is free. It saves your answers, marks and progress.</p>
          <GoogleSignIn href={googleSignInPath(returnTo)} />
          <p className="rmc-login-small">New here? The same button creates your account.</p>
          <p className="rmc-login-small"><a href="/">Back to the home page</a> · <a href="/privacy-policy">Privacy</a></p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
