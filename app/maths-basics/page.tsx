import LearningSteps from './learning-steps';
import { basicsCourses } from '@/lib/basics-catalog';
export const metadata = {
  title: 'Maths Step by Step | Ramavana',
  description:
    'Choose your grade and strengthen the maths foundations you need.',
};
export default function BasicsHome() {
  return (
    <>
      <header className="basics-hero">
        <div>
          <span className="basics-label">Maths Step by Step</span>
          <h1>
            Make your maths
            <br />
            basics clear.
          </h1>
          <p>Choose your grade. Learn with pictures, then try the questions.</p>
        </div>
        <LearningSteps />
      </header>
      <section>
        <h2>Choose your grade</h2>
        <div className="basics-folders">
          {basicsCourses.map((c) => (
            <a
              className="basics-folder"
              href={`/maths-basics/${c.id}`}
              key={c.id}
            >
              <svg viewBox="0 0 64 48" aria-hidden="true">
                <path
                  d="M3 10V4h23l7 8h28v32H3Z"
                  fill="#F4E0AE"
                  stroke="#011E47"
                  strokeWidth="2"
                />
                <path
                  d="M3 17h58v27H3Z"
                  fill="#fff"
                  stroke="#011E47"
                  strokeWidth="2"
                />
              </svg>
              <h3>{c.title}</h3>
              <p>{c.description}</p>
              <span>Open folder →</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
