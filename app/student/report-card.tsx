import { reportRows } from '@/lib/report-card';
import type { StudentRecordsPayload } from '@/lib/student-records';
import { WellDoneStamp } from '../teacher-mark';

export default function ReportCard({
  records,
  name,
  preview = false,
}: {
  records: StudentRecordsPayload;
  name: string;
  preview?: boolean;
}) {
  const rows = reportRows(records);
  const grades = [
    ...new Set(rows.flatMap((row) => (row.grade ? [row.grade] : []))),
  ].sort((a, b) => a - b);
  const books = [
    ...new Set(rows.flatMap((row) => (row.book ? [row.book] : []))),
  ];
  const date = new Date();
  const year =
    date.getMonth() >= 3 ? date.getFullYear() : date.getFullYear() - 1;
  return (
    <article className="report-card">
      <header className="report-heading">
        <img
          src="/ramavana-paper-logo.png"
          width="170"
          height="170"
          alt="Ramavana Mathematical Centre"
        />
        <h1>
          Progress report · {year}–{String(year + 1).slice(-2)}
        </h1>
      </header>
      <dl className="report-identification">
        <div>
          <dt>Student</dt>
          <dd>{records.displayName || name}</dd>
        </div>
        <div>
          <dt>Class</dt>
          <dd>{grades.length ? grades.join(', ') : 'Not recorded'}</dd>
        </div>
        <div>
          <dt>Book</dt>
          <dd>{books.length ? books.join(' · ') : 'Chapter materials'}</dd>
        </div>
      </dl>
      <div
        className="report-table-scroll"
        tabIndex={0}
        role="region"
        aria-label="Progress report table"
      >
        <table className="report-table">
          <thead>
            <tr>
              <th scope="col">Chapter</th>
              <th scope="col">Paper</th>
              <th scope="col">Marks</th>
              <th scope="col">Remark</th>
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.pending ? 'report-pending' : ''}
                >
                  <th scope="row">
                    {row.chapter}
                    <small>{row.context}</small>
                  </th>
                  <td>
                    {row.paper}
                    {preview ? (
                      <small>{row.action} · example</small>
                    ) : (
                      <a href={row.href}>{row.action} →</a>
                    )}
                  </td>
                  <td>
                    <span className="report-mark">
                      {row.score !== undefined
                        ? `${row.score}/${row.maximum}`
                        : '—'}
                    </span>
                    {row.pending && row.score !== undefined && (
                      <small>MCQ only</small>
                    )}
                    {!row.pending &&
                      row.score !== undefined &&
                      row.maximum !== undefined &&
                      row.maximum > 0 &&
                      row.score / row.maximum >= 0.8 && <WellDoneStamp />}
                  </td>
                  <td>
                    <p
                      className={
                        row.pending ? 'report-status' : 'report-remark'
                      }
                    >
                      {row.remark}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="report-empty">
                  Your papers, marks and saved tests will appear here.
                  <br />
                  <a href="/#syllabus">Choose a chapter to begin →</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="report-issued">
        <p>
          Issued{' '}
          {date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata',
          })}
        </p>
        <div>
          <span>Ramavana Mathematical Centre</span>
          <small>Run by professional mathematicians</small>
        </div>
      </footer>
    </article>
  );
}
