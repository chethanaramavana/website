'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, Loader2, LogOut } from 'lucide-react';
import { paperDefinitionsById } from '@/lib/papers';

type Submission = { id: string; paper_id: keyof typeof paperDefinitionsById; student_name: string; status: 'submitted' | 'marked'; mcq_score: number; written_score: number | null; total_score: number | null; teacher_feedback: string; submitted_at: string; marked_at: string | null };
type Records = { access: string[]; submissions: Submission[] };

export default function StudentDashboard({ displayName, email }: { displayName: string; email: string }) {
  const [records, setRecords] = useState<Records | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    void fetch('/api/student/records', { cache: 'no-store' }).then(async (response) => {
      const payload = await response.json() as Records & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Account could not be loaded.');
      setRecords(payload);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : 'Account could not be loaded.'));
  }, []);

  return (
    <main className="student-account-shell">
      <header className="student-account-header">
        <a href="/"><ArrowLeft /> Chapters</a>
        <div><p>Student account</p><h1>{displayName}</h1><span>{email}</span></div>
        <a href="/signout-with-chatgpt?return_to=%2F" target="_top"><LogOut /> Sign out</a>
      </header>
      {error ? <div className="student-account-error">{error}</div> : !records ? <div className="student-account-loading"><Loader2 /> Loading your tests…</div> : (
        <>
          <section className="student-access-section">
            <div><p>Paid once, available anytime</p><h2>Your chapter access</h2></div>
            {records.access.length ? <div className="student-access-list">{records.access.map((paperId) => {
              const paper = paperDefinitionsById[paperId as keyof typeof paperDefinitionsById];
              return paper ? <article key={paperId}><CheckCircle2 /><span><strong>{paper.chapter}</strong><small>No payment needed again on this account.</small></span><a href="/">Open chapter</a></article> : null;
            })}</div> : <div className="student-account-empty"><BookOpen /><span>Your approved chapters will appear here.</span></div>}
          </section>
          <section className="student-results-section">
            <div><p>Marks and feedback</p><h2>Your submitted tests</h2></div>
            {records.submissions.length ? <div className="student-results-list">{records.submissions.map((submission) => {
              const paper = paperDefinitionsById[submission.paper_id];
              return <a key={submission.id} href={`/student/results/${submission.id}`}>
                <span className={`student-result-icon ${submission.status}`}>{submission.status === 'marked' ? <CheckCircle2 /> : <Clock3 />}</span>
                <span><strong>{paper?.chapter ?? 'Chapter test'}</strong><small>{new Date(submission.submitted_at).toLocaleString()}</small></span>
                <em>{submission.status === 'marked' ? `${submission.total_score}/40` : `MCQ ${submission.mcq_score}/16`}</em>
              </a>;
            })}</div> : <div className="student-account-empty"><Clock3 /><span>Submitted tests and marks will appear here.</span></div>}
          </section>
        </>
      )}
    </main>
  );
}
