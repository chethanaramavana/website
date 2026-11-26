'use client';
import { useEffect, useState } from 'react';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { quizPriceById } from '@/lib/free-quizzes/catalog';
type Account = {
  user_id: string;
  email: string;
  name: string;
  last_sign_in_ms: number | null;
  sign_in_count: number;
  last_seen_ms: number;
  last_page_path: string | null;
  last_page_title: string | null;
  last_page_seen_ms: number | null;
  teacher: boolean;
};
type Attempt = {
  id: string;
  paper_id: string;
  name: string;
  email: string;
  teacher: boolean;
  opened_at_ms: number;
  started_at_ms: number | null;
  last_seen_ms: number;
  submitted_at_ms: number | null;
  answered: number;
  paper: { title: string; free: boolean; total: number } | null;
};
type Data = {
  results: {
    id: string;
    title: string;
    student_name: string;
    user_email: string;
    score: number;
    total: number;
    answered: number;
    submitted_at: string;
    teacher: boolean;
  }[];
  now: number;
  accounts: Account[];
  attempts: Attempt[];
};
const date = (n: number | null) =>
  n
    ? new Date(n).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Not recorded yet';
export default function StudentActivity() {
  const [data, setData] = useState<Data | null>(null),
    [error, setError] = useState(''),
    [showTeachers, setShowTeachers] = useState(false);
  const [student, setStudent] = useState('');
  async function refresh() {
    try {
      const r = await fetch('/api/teacher/activity', { cache: 'no-store' });
      if (!r.ok) throw Error('Activity could not be loaded. Please retry.');
      setData(await r.json());
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Activity unavailable.');
    }
  }
  useEffect(() => {
    void refresh();
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void refresh();
    }, 30000);
    return () => clearInterval(timer);
  }, []);
  const accounts = (data?.accounts ?? []).filter(
      (a) => (showTeachers || !a.teacher) && (!student || a.email.toLowerCase() === student),
    ),
    attempts = (data?.attempts ?? []).filter((a) => (showTeachers || !a.teacher) && (!student || a.email.toLowerCase() === student));
  const results = (data?.results ?? []).filter((r) => (showTeachers || !r.teacher) && (!student || r.user_email.toLowerCase() === student));
  const students = Array.from(new Map([
    ...(data?.accounts ?? []).map(a => ({email:a.email,name:a.name,teacher:a.teacher})),
    ...(data?.attempts ?? []).map(a => ({email:a.email,name:a.name,teacher:a.teacher})),
    ...(data?.results ?? []).map(r => ({email:r.user_email,name:r.student_name,teacher:r.teacher})),
  ].filter(a => showTeachers || !a.teacher).map(a => [a.email.toLowerCase(),a])).entries());
  const active = (n: number) => Boolean(data && data.now - n < 120000);
  return (
    <section
      className="student-activity-panel"
      aria-labelledby="student-activity-title"
    >
      <header>
        <div>
          <h2 id="student-activity-title">Student activity</h2>
          <p>Student pages, sign-ins and test activity · Times shown in IST</p>
        </div>
        <div className="activity-header-actions">
          <a className="teacher-primary-action" href="/teacher/free-mcq">
            <span>All MCQ results</span>
            <ArrowRight />
          </a>
          <button
            className="teacher-compact-action"
            type="button"
            onClick={() => void refresh()}
          >
            <RefreshCw />
            <span>Refresh</span>
          </button>
        </div>
      </header>
      <p className="activity-explanation">
        Updates every 30 seconds · Active = page seen in the last two minutes,
        not proof of answering.
        Last viewed is the most recent visible learning page reported by that account, not a live screen view.
      </p>
      {error && <p role="alert">{error}</p>}
      <label className="activity-teacher-toggle">
        <input
          type="checkbox"
          checked={showTeachers}
          onChange={(e) => {setShowTeachers(e.target.checked);setStudent('');}}
        />{' '}
        Include teacher accounts
      </label>
      <p><label>Show student{' '}
        <select value={student} onChange={e=>setStudent(e.target.value)}>
          <option value="">All students</option>
          {students.map(([email,a])=><option key={email} value={email}>{a.name} · {a.email}</option>)}
        </select>
      </label>{student && <button type="button" onClick={()=>setStudent('')}>Show everyone</button>}</p>
      {!data && !error ? (
        <p>Loading student activity…</p>
      ) : (
        <>
          <h3>What each student last viewed</h3>
          {!accounts.length ? (
            <p>
              No student visits recorded yet. Existing signed-in students appear
              on their next page visit.
            </p>
          ) : (
            <div className="activity-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Last viewed</th>
                    <th>Latest sign-in</th>
                    <th>Sign-ins recorded</th>
                    <th>Last seen</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {accounts.map((a) => (
                    <tr key={a.user_id}>
                      <td>
                        {a.name}
                        {a.teacher ? ' (teacher)' : ''}
                        <small>{a.email}</small>
                      </td>
                      <td>
                        {a.last_page_path ? <>
                          <a href={a.last_page_path}>{a.last_page_title || a.last_page_path}</a>
                          <small>{a.last_page_path}</small>
                          <small>{date(a.last_page_seen_ms)} · {a.last_page_seen_ms && active(a.last_page_seen_ms) ? 'Viewed recently' : 'Last recorded view'}</small>
                        </> : 'No page recorded yet'}
                        {(() => {const latest=attempts.find(t=>t.email.toLowerCase()===a.email.toLowerCase());return latest ? <small>Latest recorded test: {latest.paper?.title ?? latest.paper_id} · {latest.submitted_at_ms?'Submitted':`${latest.answered} / ${latest.paper?.total ?? '—'} answered`} · {date(latest.last_seen_ms)}</small> : null;})()}
                      </td>
                      <td>{date(a.last_sign_in_ms)}</td>
                      <td>{a.sign_in_count}</td>
                      <td>{date(a.last_seen_ms)}</td>
                      <td>
                        {active(a.last_seen_ms)
                          ? 'Active recently'
                          : 'Inactive'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <h3>Submitted MCQ marks</h3>
          <p>
            Marks appear after submission. Unfinished tests show progress only.
          </p>
          {results.length ? (
            <div className="activity-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Quiz</th>
                    <th>Marks</th>
                    <th>Answered</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {results
                    .map((r) => (
                      <tr key={r.id}>
                        <td>
                          {r.student_name}
                          <small>{r.user_email}</small>
                        </td>
                        <td>{r.title}</td>
                        <td>
                          <strong>
                            {r.score} / {r.total}
                          </strong>
                        </td>
                        <td>
                          {r.answered} / {r.total}
                        </td>
                        <td>
                          <a href={`/teacher/free-mcq/${r.id}`}>
                            View answers →
                          </a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No submitted MCQ results yet.</p>
          )}
          <h3>Test activity</h3>
          {!attempts.length ? (
            <p>No test activity recorded yet.</p>
          ) : (
            <div className="activity-table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Test</th>
                    <th>Status</th>
                    <th>Progress</th>
                    <th>Started / opened</th>
                    <th>Last activity</th>
                  </tr>
                </thead>
                <tbody>
                  {attempts.map((a) => (
                    <tr key={a.id}>
                      <td>
                        {a.name}
                        {a.teacher ? ' (teacher)' : ''}
                        <small>{a.email}</small>
                      </td>
                      <td>
                        {a.paper?.title ?? `Test · ${a.paper_id}`}
                        {a.paper && <small>{a.paper.free ? 'Free test' : quizPriceById(a.paper_id) !== null ? `Listed price ₹${quizPriceById(a.paper_id)! / 100}` : 'Paid-access test'}</small>}
                      </td>
                      <td>
                        {a.submitted_at_ms
                          ? 'Submitted'
                          : active(a.last_seen_ms)
                            ? a.started_at_ms
                              ? 'Taking test · active'
                              : 'Test opened · active'
                            : a.started_at_ms
                              ? 'Inactive · unfinished'
                              : 'Opened · inactive'}
                      </td>
                      <td>
                        {a.answered} / {a.paper?.total ?? '—'} answered
                      </td>
                      <td>{date(a.started_at_ms ?? a.opened_at_ms)}</td>
                      <td>{date(a.submitted_at_ms ?? a.last_seen_ms)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="activity-footnote">
            Showing up to 100 recent accounts and 100 recent test attempts.
            The student filter applies to these recent records. Page names start appearing after the student’s next visit; older page views were not recorded.
            Participation is recorded automatically; this does not require
            teacher marking.
          </p>
        </>
      )}
    </section>
  );
}
