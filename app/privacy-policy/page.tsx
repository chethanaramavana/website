import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ramavana Mathematical Center',
  description: 'How Ramavana Mathematical Center collects, uses and protects student and account information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="legal-page-shell">
      <header className="legal-page-header">
        <a className="legal-page-brand" href="/" aria-label="Ramavana home">
          <img src="/ramavana-mark.png" alt="" />
          <span><strong>Ramavana</strong><small>Mathematical Center</small></span>
        </a>
        <a className="legal-page-home" href="/">Return to website</a>
      </header>
      <article className="legal-page-card">
        <p className="legal-page-kicker">Privacy and data protection</p>
        <h1>Privacy Policy</h1>
        <p className="legal-page-updated">Last updated: 29 September 2026</p>
        <p className="legal-page-intro">This policy explains what information Ramavana Mathematical Center collects through ramavanamath.com, why we use it, which service providers help us operate the website, and the choices available to students and parents.</p>

        <section>
          <h2>1. Who we are</h2>
          <p>Ramavana Mathematical Center provides online mathematics notes, chapter tests, answer-sheet review and teacher feedback. Questions about this policy or personal information can be sent to <a href="mailto:chethanamanasa21@gmail.com">chethanamanasa21@gmail.com</a> or raised by telephone at <a href="tel:+919353928169">+91 93539 28169</a>.</p>
        </section>

        <section>
          <h2>2. Information we collect</h2>
          <ul>
            <li><strong>Google account information:</strong> when a visitor chooses Google Login, we receive the Google account’s verified email address and a stable account identifier. We do not request access to Gmail, Google Drive, contacts or passwords.</li>
            <li><strong>Student and learning information:</strong> the student name entered for a test, selected answers, uploaded handwritten answer sheets or PDFs, test status, marks, teacher feedback and submission dates.</li>
            <li><strong>Purchase records:</strong> the chapter purchased, amount, Razorpay order or payment reference, payment status and date. Ramavana does not receive or store card numbers, UPI PINs, banking passwords or one-time passwords.</li>
            <li><strong>Essential technical information:</strong> secure login and anti-forgery cookies, and limited hosting or security logs needed to deliver the website, diagnose failures and prevent misuse.</li>
          </ul>
        </section>

        <section>
          <h2>3. How we use information</h2>
          <p>We use this information to create and protect a student account, remember purchased chapters, deliver tests, save and assess answers, display results and feedback, verify payments, answer support requests, maintain security and comply with applicable legal obligations. We do not sell personal information or use student answers for advertising.</p>
        </section>

        <section>
          <h2>4. Service providers and sharing</h2>
          <p>Information is shared only as needed to operate the service:</p>
          <ul>
            <li><strong>Google</strong> provides account authentication under Google’s own privacy terms.</li>
            <li><strong>Razorpay</strong> processes payments and returns payment status and transaction references.</li>
            <li><strong>OpenAI Sites</strong> hosts the website, database and uploaded answer files.</li>
            <li><strong>Authorised Ramavana teachers and support personnel</strong> may view submissions and account details to mark work and provide support.</li>
          </ul>
          <p>We may also disclose information when required by law, to protect students or the service, or during a lawful organisational transfer with appropriate safeguards.</p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>The website uses essential first-party cookies to complete Google Login, keep the account signed in and protect requests against forgery. These cookies are required for account, payment and test features. We do not use advertising cookies.</p>
        </section>

        <section>
          <h2>6. Storage, security and retention</h2>
          <p>We use access controls, HTTPS, signed login sessions and restricted storage to protect information. No internet service can guarantee absolute security. Account, payment and learning records are retained for as long as they are needed to provide continuing chapter access, results and support, and for legitimate accounting, dispute-resolution, security or legal requirements. Information that is no longer required may be deleted or anonymised.</p>
        </section>

        <section>
          <h2>7. Students and parents</h2>
          <p>Students under 18 should use the service with the knowledge and supervision of a parent, guardian or school. A parent or guardian may contact us to review, correct or request deletion of a child’s information. Students below the applicable age of digital consent should not create an account or upload work without parent or guardian involvement.</p>
        </section>

        <section>
          <h2>8. Your choices and rights</h2>
          <p>You may sign out at any time and may ask us to provide, correct or delete personal information associated with your account. You may also withdraw consent where consent is the basis for processing. Some purchase or transaction records may need to be retained where law requires it. To make a request, email us from the Google address connected to the account so that we can verify ownership.</p>
        </section>

        <section>
          <h2>9. Changes to this policy</h2>
          <p>We may update this policy when the website or legal requirements change. The revised date will be displayed at the top of this page. Material changes will be communicated through the website where appropriate.</p>
        </section>

        <footer className="legal-page-footer">
          <a href="/terms">Read the Terms &amp; Conditions</a>
          <a href="mailto:chethanamanasa21@gmail.com">Contact Ramavana</a>
        </footer>
      </article>
    </main>
  );
}
