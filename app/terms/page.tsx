import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Ramavana Mathematical Center',
  description: 'Terms governing use of Ramavana Mathematical Center notes, chapter tests, payments and feedback.',
};

export default function TermsPage() {
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
        <p className="legal-page-kicker">Website terms</p>
        <h1>Terms &amp; Conditions</h1>
        <p className="legal-page-updated">Last updated: 29 September 2026</p>
        <p className="legal-page-intro">These terms govern access to and use of ramavanamath.com, including chapter notes, paid tests, uploaded answers, marking and feedback. By using the website, you agree to these terms. A parent or guardian should review them for a student under 18.</p>

        <section>
          <h2>1. Educational service</h2>
          <p>Ramavana Mathematical Center provides supplementary mathematics practice. Notes, test questions, scores and feedback are learning aids; they are not official school examinations, board results, professional advice or a guarantee of any academic outcome.</p>
        </section>

        <section>
          <h2>2. Accounts and eligibility</h2>
          <p>Google Login is used to identify the account that owns chapter access and results. You must use an account you are authorised to use and keep access to it secure. Students under 18 should use the website with parent, guardian or school supervision. Users below the applicable age of digital consent require parent or guardian involvement.</p>
        </section>

        <section>
          <h2>3. Chapter access and payments</h2>
          <p>The price shown before checkout applies to the selected chapter test. Payments are processed by Razorpay. Access is granted only after payment is successfully confirmed. A purchased chapter remains associated with the Google account used at checkout, so use the same account on future visits.</p>
          <p>Do not close or repeat checkout while a completed payment is being verified. If money was debited but access did not open, use “Check a completed payment” or contact us with the Razorpay transaction reference. Any refund required by applicable law will be honoured; other refund requests are reviewed according to the circumstances and whether the digital test was accessed.</p>
        </section>

        <section>
          <h2>4. Student submissions</h2>
          <p>Students must submit only work they are authorised to share. Uploaded answers may be viewed by authorised teachers for marking and support. Do not upload unrelated personal information, another person’s work, unlawful material, malicious files or content that infringes someone else’s rights.</p>
        </section>

        <section>
          <h2>5. Acceptable use</h2>
          <p>You must not bypass payment or access controls, share paid access, automate excessive requests, interfere with the website, probe for vulnerabilities, impersonate another person, or use the service to harm others. We may limit or suspend access where reasonably necessary to protect students, users or the service.</p>
        </section>

        <section>
          <h2>6. Intellectual property</h2>
          <p>The website design, original notes, practice papers, explanations and marking material belong to Ramavana Mathematical Center or their respective rights holders. Personal educational use is permitted. Reproduction, resale, public distribution or removal of attribution is not permitted without written authorisation. Official CBSE resources linked from the website remain the property of their respective publishers.</p>
        </section>

        <section>
          <h2>7. Third-party services</h2>
          <p>Google provides authentication, Razorpay provides payment processing and OpenAI Sites provides hosting. Their services are governed by their own terms and privacy practices. Ramavana is not responsible for interruptions or decisions made solely by those providers, but we will provide reasonable support for issues affecting this website.</p>
        </section>

        <section>
          <h2>8. Availability and liability</h2>
          <p>We aim to keep the website accurate and available, but maintenance, internet failures and third-party outages may occasionally interrupt access. To the extent permitted by law, Ramavana is not liable for indirect or consequential loss arising from use of the website. Nothing in these terms excludes rights or remedies that cannot lawfully be excluded.</p>
        </section>

        <section>
          <h2>9. Changes and governing law</h2>
          <p>We may update these terms when the service changes. The revised date will appear at the top of this page. These terms are governed by the laws of India, subject to applicable consumer-protection and other mandatory laws.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>Questions about access, payments or these terms can be sent to <a href="mailto:chethanamanasa21@gmail.com">chethanamanasa21@gmail.com</a> or raised by telephone at <a href="tel:+919353928169">+91 93539 28169</a>.</p>
        </section>

        <footer className="legal-page-footer">
          <a href="/privacy-policy">Read the Privacy Policy</a>
          <a href="mailto:chethanamanasa21@gmail.com">Contact Ramavana</a>
        </footer>
      </article>
    </main>
  );
}
