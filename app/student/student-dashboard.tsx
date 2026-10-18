'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle2, Clock3, Loader2, LogOut } from 'lucide-react';
import { getIntegralsProduct, integralsPath } from '@/lib/integrals-products';
import { paperDefinitionsById } from '@/lib/papers';
import type { StudentRecordsPayload } from '@/lib/student-records';

type Submission = { id: string; paper_id: keyof typeof paperDefinitionsById; student_name: string; status: 'submitted' | 'marked'; mcq_score: number; written_score: number | null; total_score: number | null; teacher_feedback: string; submitted_at: string; marked_at: string | null };
type Payment = { paper_id: string; student_name: string; transaction_id: string; amount_paise: number; created_at: string; reviewed_at: string | null; payment_source: 'razorpay' | 'manual' };
type Records = Pick<StudentRecordsPayload, 'displayName' | 'access' | 'payments' | 'submissions'>;

export default function StudentDashboard({ displayName, email, initialRecords }: { displayName: string; email: string; initialRecords: StudentRecordsPayload | null }) {
  const [records, setRecords] = useState<Records | null>(initialRecords);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialRecords) return;
    void fetch('/api/student/records', { cache: 'no-store' }).then(async (response) => {
      const payload = await response.json() as Records & { error?: string };
      if (!response.ok) throw new Error(payload.error ?? 'Account could not be loaded.');
      setRecords(payload);
    }).catch((reason) => setError(reason instanceof Error ? reason.message : 'Account could not be loaded.'));
  }, [initialRecords]);

  return (
    <main className="student-account-shell">
      <header className="student-account-header">
        <a href="/"><ArrowLeft /> Chapters</a>
        <div><p>Student account</p><h1>{records?.displayName || displayName}</h1><span>{email}</span></div>
        <a href="/api/auth/signout?return_to=%2F"><LogOut /> Sign out</a>
      </header>
      {error ? <div className="student-account-error">{error}</div> : !records ? <div className="student-account-loading"><Loader2 /> Loading your tests…</div> : (
        <>
          <section className="student-access-section">
            <div><p>Paid once, available anytime</p><h2>Your chapter access</h2></div>
            {records.access.length ? <div className="student-access-list">{records.access.map((paperId) => {
              if(paperId.startsWith('maths-basics-'))return <a className="student-access-card" key={paperId} href="/maths-basics"><strong>Maths Step by Step</strong><span>Your maths folders · Continue learning →</span></a>;
              const pdf = getIntegralsProduct(paperId);
              if (pdf) return <article key={paperId}><CheckCircle2/><span><strong>Integrals · {pdf.title}</strong><small>Grade 12 · Online paper and worked solutions</small></span><a href={`${integralsPath}/papers/${pdf.id}`}>Open paper</a></article>;
              const paper = paperDefinitionsById[paperId as keyof typeof paperDefinitionsById];
              const payment = records.payments.find((item) => item.paper_id === paperId);
              const board = paper?.board ?? 'CBSE';
              return paper ? <article key={paperId}><CheckCircle2 /><span><strong>{paper.chapter}</strong><small>{board} · Grade {paper.grade ?? 10} · {payment ? <><b>₹{(payment.amount_paise / 100).toFixed(0)} paid</b> via {payment.payment_source === 'razorpay' ? 'Razorpay' : 'manual payment'} on {new Date(`${payment.created_at}Z`).toLocaleDateString()}</> : 'No payment needed again.'}</small></span><a href={`/${board.toLowerCase()}/grade-${paper.grade ?? 10}/ch-${paper.chapterNumber}`}>Open chapter</a></article> : null;
            })}</div> : <div className="student-account-empty"><BookOpen /><span>Your approved chapters will appear here.</span></div>}
          </section>
          <section className="student-results-section">
            <div><p>Marks and feedback</p><h2>Your submitted tests</h2></div>
            {records.submissions.length ? <div className="student-results-list">{records.submissions.map((submission) => {
              const paper = paperDefinitionsById[submission.paper_id];
              return <a key={submission.id} href={`/student/results/${submission.id}`}>
                <span className={`student-result-icon ${submission.status}`}>{submission.status === 'marked' ? <CheckCircle2 /> : <Clock3 />}</span>
                <span><strong>{paper?.chapter ?? 'Chapter test'}</strong><small>{paper?.board ?? 'CBSE'} · Grade {paper?.grade ?? 10} · {new Date(submission.submitted_at).toLocaleString()}</small></span>
                <em>{submission.status === 'marked' ? `${submission.total_score}/40` : `MCQ ${submission.mcq_score}/16`}</em>
              </a>;
            })}</div> : <div className="student-account-empty"><Clock3 /><span>Submitted tests and marks will appear here.</span></div>}
          </section>
        </>
      )}
    </main>
  );
}
