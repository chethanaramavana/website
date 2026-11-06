import type { Metadata } from 'next';
import { getGoogleUser } from '../google-auth';
import LearningHeader from '../learning-header';
import { SiteFooter } from '../brand';
import './careers.css';

export const metadata: Metadata = {
  title: 'Careers: Teach with us | Ramavana Mathematical Center',
  description: 'Maths tutors in Bengaluru: join the Ramavana tutor network for offline home tuition requests from parents, Grades 5 to 12.',
  alternates: { canonical: '/careers' },
};

const phone = '919353928169';
const email = 'chethanamanasa21@gmail.com';
const details = [
  'Name:',
  'Phone number:',
  'Area in Bengaluru:',
  'Qualification:',
  'Grades I can teach (5 to 12):',
  'Boards (CBSE / ICSE / State):',
  'Teaching experience:',
  'Days and times I am free:',
  'Offline only, or offline and online:',
];
const whatsAppHref = `https://wa.me/${phone}?text=${encodeURIComponent(`Hello Ramavana Mathematical Center, I would like to join your tutor network.\n\n${details.join('\n')}`)}`;
const mailHref = `mailto:${email}?subject=${encodeURIComponent('Tutor application – Ramavana Mathematical Center')}&body=${encodeURIComponent(`Hello,\n\nI would like to join the Ramavana tutor network.\n\n${details.join('\n')}\n\nThank you.`)}`;

export default async function CareersPage() {
  const user = await getGoogleUser();
  return (
    <div className="identity-learning">
      <LearningHeader signedIn={!!user} />
      <main className="careers rmc-container">
        <section className="careers-hero" aria-labelledby="careers-title">
          <p className="rmc-eyebrow">Careers</p>
          <h1 id="careers-title">Teach maths with Ramavana</h1>
          <p className="careers-lead">Parents in Bengaluru often ask us for an offline maths tutor at home. When we cannot take a request ourselves, we pass it to a tutor in our network. If you teach maths well, we would like to hear from you.</p>
          <div className="careers-actions">
            <a className="rmc-button" href={whatsAppHref} target="_blank" rel="noopener noreferrer">Apply on WhatsApp</a>
            <a className="rmc-button rmc-button-outline" href={mailHref}>Apply by email</a>
          </div>
        </section>

        <section className="careers-grid" aria-label="About the role">
          <article className="careers-card">
            <h2>Who we are looking for</h2>
            <ul>
              <li>Maths tutors for Grades 5 to 12: CBSE, ICSE or State board</li>
              <li>A strong maths background, for example a degree in mathematics, science or engineering</li>
              <li>Clear explanations, patience and good time-keeping</li>
              <li>Able to teach at the student’s home in Bengaluru, mainly in and near HSR Layout</li>
            </ul>
          </article>
          <article className="careers-card">
            <h2>How it works</h2>
            <ol>
              <li><strong>Send your details</strong> on WhatsApp or by email.</li>
              <li><strong>We keep your profile</strong> and match it with requests for your grades, board and area.</li>
              <li><strong>We call you first</strong> to talk about the request.</li>
              <li><strong>We introduce you</strong> to the parent only after you agree.</li>
            </ol>
          </article>
          <article className="careers-card careers-card-wide">
            <h2>What to send us</h2>
            <p>The WhatsApp and email buttons fill in this list for you. Complete each line and send it.</p>
            <ul className="careers-checklist">
              {details.map((d) => <li key={d}>{d.replace(/:$/, '')}</li>)}
            </ul>
          </article>
        </section>

        <section className="careers-contact" aria-labelledby="careers-contact-title">
          <h2 id="careers-contact-title">Questions before you apply?</h2>
          <p>Call or message us on <a href="tel:+919353928169">+91 93539 28169</a>, or write to <a href={`mailto:${email}`}>{email}</a>.</p>
          <p className="careers-privacy">We use your details only to match you with tutoring requests. We share your contact with a parent only after you agree.</p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
