'use client';
import { useEffect, useState } from 'react';
import Tex from './notes/tex';
import { homepageProblem } from '@/lib/homepage-content';
type Problem = { number: number; question: string; solution: string | null };
export default function WeeklyProblemBoard({
  archive = false,
}: {
  archive?: boolean;
}) {
  const [problems, setProblems] = useState<Problem[] | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    void fetch('/api/weekly-problems', { cache: 'no-store' })
      .then(async (r) => {
        if (!r.ok) throw new Error();
        setProblems(((await r.json()) as { problems: Problem[] }).problems);
      })
      .catch(() => setFailed(true));
  }, []);
  const sample: Problem = {
    number: homepageProblem.number,
    question: homepageProblem.question,
    solution: `${homepageProblem.solution}\n\n${homepageProblem.working}`,
  };
  const list = archive
    ? (problems ?? [])
    : problems?.length
      ? problems.slice(0, 1)
      : [sample];
  return (
    <>
      {archive && (
        <>
          <h1>Earlier problems</h1>
          {failed ? (
            <p role="alert">
              The problem archive could not be loaded. Please try again later.
            </p>
          ) : problems && !problems.length ? (
            <p>
              The first published problem will appear here. The homepage
              currently shows a preview problem.
            </p>
          ) : (
            !problems && <p role="status">Loading problems…</p>
          )}
        </>
      )}
      {list.map((problem) => (
        <section
          className="rmc-weekly"
          key={problem.number}
          aria-labelledby={`weekly-title-${problem.number}`}
        >
          <div className="rmc-problem-number">No. {problem.number}</div>
          <div className="rmc-problem-content">
            <h2 id={`weekly-title-${problem.number}`}>
              {archive ? `Problem ${problem.number}` : 'This week’s problem'}
            </h2>
            <p className="rmc-problem-question">
              <Tex>{problem.question}</Tex>
            </p>
            {problem.solution ? (
              <details className="rmc-solution">
                <summary>Explore the solution →</summary>
                <div>
                  <Tex>{problem.solution}</Tex>
                </div>
              </details>
            ) : (
              <p className="rmc-preview-edition">
                The solution has not been released yet.
              </p>
            )}
            {!archive && (
              <>
                <span className="rmc-preview-edition">
                  {problems?.length
                    ? 'Ramavana Mathematical Centre'
                    : failed
                      ? 'Preview problem · Published problems are temporarily unavailable'
                      : 'Preview edition · From our problem notebook'}
                </span>
                <a className="rmc-archive-link" href="/problems">
                  Earlier problems →
                </a>
              </>
            )}
          </div>
        </section>
      ))}
    </>
  );
}
