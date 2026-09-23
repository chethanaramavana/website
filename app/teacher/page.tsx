'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, CheckCircle2, CreditCard, FileText, Loader2, RefreshCw, Save, ShieldCheck, X } from 'lucide-react';

const paperReviews = {
  'real-numbers-01': {
    title: 'Real Numbers · Paper 01',
    writtenQuestions: [
      { number: 17, marks: 2, text: 'HCF of 378 and 504 using prime factorisation' },
      { number: 18, marks: 2, text: 'Show that 7√5 is irrational' },
      { number: 19, marks: 2, text: 'Least number divisible by 45, 60 and 75' },
      { number: 20, marks: 3, text: 'Find the other integer using HCF and LCM' },
      { number: 21, marks: 3, text: 'Prove that 3 + 2√5 is irrational' },
      { number: 22, marks: 3, text: 'Arrange boys and girls in equal rows' },
      { number: 23, marks: 5, text: 'Irrationality proof for √3 and 5 + 2√3' },
      { number: 24, marks: 4, text: 'Mathematics Day token case study' },
    ],
  },
  'applications-trigonometry-01': {
    title: 'Some Applications of Trigonometry · Paper 01',
    writtenQuestions: [
      { number: 17, marks: 2, text: 'Height of a tree from its shadow' },
      { number: 18, marks: 2, text: 'Ground distance of a ladder from a wall' },
      { number: 19, marks: 2, text: 'Height of a kite using its string' },
      { number: 20, marks: 3, text: 'Height of a tower from one observation' },
      { number: 21, marks: 3, text: 'Tower viewed from the top of a building' },
      { number: 22, marks: 3, text: 'Tower viewed from two points' },
      { number: 23, marks: 5, text: 'Lighthouse and two boats' },
      { number: 24, marks: 4, text: 'Surveyor and tower case study' },
    ],
  },
} as const;

type Summary = {
  id: string;
  paper_id: keyof typeof paperReviews;
  student_name: string;
  user_email: string;
  status: 'submitted' | 'marked';
  mcq_score: number;
  written_score: number | null;
  total_score: number | null;
  submitted_at: string;
  marked_at: string | null;
};

type Upload = { id: string; question_number: number; file_name: string; content_type: string; size_bytes: number };
type Mark = { question_number: number; marks_awarded: number; feedback: string };
type Detail = {
  submission: Summary & { teacher_feedback: string };
  uploads: Upload[];
  marks: Mark[];
};

type PaymentRequest = {
  id: string;
  student_name: string;
  paper_id: keyof typeof paperReviews;
  transaction_id: string;
  amount_paise: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  reviewed_at: string | null;
};

async function readJson(response: Response) {
  const payload = await response.json() as Record<string, unknown>;
  if (!response.ok) throw new Error(typeof payload.error === 'string' ? payload.error : 'Something went wrong.');
  return payload;
}

export default function TeacherReviewPage() {
  const [submissions, setSubmissions] = useState<Summary[]>([]);
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [marks, setMarks] = useState<Record<string, number>>({});
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [paymentAction, setPaymentAction] = useState('');
  const [message, setMessage] = useState('');

  async function loadList() {
    setLoading(true);
    setMessage('');
    try {
      const [submissionPayload, paymentPayload] = await Promise.all([
        readJson(await fetch('/api/teacher/submissions', { cache: 'no-store' })),
        readJson(await fetch('/api/teacher/payments', { cache: 'no-store' })),
      ]);
      setSubmissions(submissionPayload.submissions as Summary[]);
      setPayments(paymentPayload.payments as PaymentRequest[]);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Submissions could not be loaded.');
    } finally {
      setLoading(false);
    }
  }

  async function openSubmission(id: string) {
    setSelectedId(id);
    setDetail(null);
    setMessage('');
    try {
      const payload = await readJson(await fetch(`/api/teacher/submissions/${id}`, { cache: 'no-store' })) as unknown as Detail;
      setDetail(payload);
      const paper = paperReviews[payload.submission.paper_id] ?? paperReviews['real-numbers-01'];
      const savedMarks = Object.fromEntries(payload.marks.map((mark) => [String(mark.question_number), mark.marks_awarded]));
      setMarks(Object.fromEntries(paper.writtenQuestions.map((question) => [String(question.number), savedMarks[String(question.number)] ?? 0])));
      setFeedback(payload.submission.teacher_feedback ?? '');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'This submission could not be loaded.');
    }
  }

  useEffect(() => { void loadList(); }, []);

  const writtenTotal = useMemo(() => Object.values(marks).reduce((sum, mark) => sum + (Number(mark) || 0), 0), [marks]);
  const selectedPaper = detail ? (paperReviews[detail.submission.paper_id] ?? paperReviews['real-numbers-01']) : paperReviews['real-numbers-01'];

  async function saveMarks() {
    if (!selectedId) return;
    setSaving(true);
    setMessage('');
    try {
      const payload = await readJson(await fetch(`/api/teacher/submissions/${selectedId}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ marks, feedback }),
      }));
      setMessage(`Marks saved. Total: ${Number(payload.totalScore ?? 0)}/40.`);
      await loadList();
      await openSubmission(selectedId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Marks could not be saved.');
    } finally {
      setSaving(false);
    }
  }

  async function reviewPayment(id: string, status: 'approved' | 'rejected') {
    setPaymentAction(id);
    setMessage('');
    try {
      await readJson(await fetch('/api/teacher/payments', {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id, status }),
      }));
      await loadList();
      setMessage(status === 'approved' ? 'Payment approved. The student’s question paper will now open.' : 'Payment request rejected.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'The payment decision could not be saved.');
    } finally {
      setPaymentAction('');
    }
  }

  return (
    <main className="teacher-shell">
      <header className="teacher-header">
        <a href="/"><ArrowLeft /> Student website</a>
        <div><p>Ramavana Mathematical Center</p><h1>Teacher review</h1></div>
        <button type="button" onClick={() => void loadList()} aria-label="Refresh submissions"><RefreshCw /></button>
      </header>

      {message && <div className="teacher-message" aria-live="polite">{message}</div>}

      <section className="payment-review-section" aria-labelledby="payment-review-title">
        <header>
          <div><p>Test access</p><h2 id="payment-review-title">Payment requests</h2></div>
          <span>{payments.filter((payment) => payment.status === 'pending').length} waiting</span>
        </header>
        <div className="payment-review-warning"><ShieldCheck /><span><strong>Check PhonePe before approving.</strong> Match the ₹30 credit and transaction ID with your PhonePe history. Approval immediately unlocks that paper.</span></div>
        {loading ? <div className="teacher-loading"><Loader2 /> Loading payment requests…</div> : payments.length === 0 ? (
          <div className="payment-review-empty"><CreditCard /><span>No payment requests yet.</span></div>
        ) : (
          <div className="payment-request-list">
            {payments.map((payment) => (
              <article key={payment.id} className={`payment-request-card ${payment.status}`}>
                <div className="payment-request-copy">
                  <span className="payment-request-status">{payment.status}</span>
                  <strong>{payment.student_name}</strong>
                  <small>{paperReviews[payment.paper_id]?.title ?? 'Chapter test'} · {new Date(payment.created_at).toLocaleString()}</small>
                </div>
                <div className="payment-transaction"><span>Transaction ID</span><strong>{payment.transaction_id}</strong><small>₹{(payment.amount_paise / 100).toFixed(0)}</small></div>
                {payment.status === 'pending' ? (
                  <div className="payment-review-actions">
                    <button type="button" className="reject" onClick={() => void reviewPayment(payment.id, 'rejected')} disabled={paymentAction === payment.id}><X /> Reject</button>
                    <button type="button" className="approve" onClick={() => void reviewPayment(payment.id, 'approved')} disabled={paymentAction === payment.id}>{paymentAction === payment.id ? <Loader2 /> : <Check />} Approve</button>
                  </div>
                ) : <span className={`payment-reviewed ${payment.status}`}>{payment.status === 'approved' ? <Check /> : <X />}{payment.status}</span>}
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="teacher-workspace">
        <aside className="submission-list" aria-label="Student submissions">
          <div className="submission-list-heading"><strong>Submitted tests</strong><span>{submissions.length}</span></div>
          {loading ? <div className="teacher-loading"><Loader2 /> Loading submissions…</div> : submissions.length === 0 ? (
            <div className="teacher-empty"><FileText /><strong>No tests submitted yet</strong><span>Completed student papers will appear here.</span></div>
          ) : submissions.map((submission) => (
            <button key={submission.id} type="button" className={selectedId === submission.id ? 'active' : ''} onClick={() => void openSubmission(submission.id)}>
              <span><strong>{submission.student_name}</strong><small>{paperReviews[submission.paper_id]?.title ?? 'Chapter test'}</small></span>
              <em className={submission.status}>{submission.status === 'marked' ? 'Marked' : 'Review'}</em>
              <small>{new Date(submission.submitted_at).toLocaleString()}</small>
              <b>{submission.status === 'marked' ? `${submission.total_score}/40` : `MCQ ${submission.mcq_score}/16`}</b>
            </button>
          ))}
        </aside>

        <section className="review-panel">
          {!selectedId ? (
            <div className="review-placeholder"><FileText /><h2>Select a submission</h2><p>Open a student paper to view uploaded answers and enter marks.</p></div>
          ) : !detail ? (
            <div className="teacher-loading"><Loader2 /> Opening the paper…</div>
          ) : (
            <>
              <header className="review-heading">
                <div><p>{selectedPaper.title}</p><h2>{detail.submission.student_name}</h2><span>{detail.submission.user_email}</span></div>
                <div className="mcq-score"><span>MCQ score</span><strong>{detail.submission.mcq_score}/16</strong></div>
              </header>

              <div className="written-review-list">
                {selectedPaper.writtenQuestions.map((question) => {
                  const questionUploads = detail.uploads.filter((upload) => upload.question_number === question.number);
                  return (
                    <article className="written-review" key={question.number}>
                      <div className="written-review-copy"><strong>Question {question.number}</strong><p>{question.text}</p></div>
                      <div className="answer-files">
                        {questionUploads.map((upload, index) => (
                          <a key={upload.id} href={`/api/teacher/submissions/${detail.submission.id}/files/${upload.id}`} target="_blank" rel="noreferrer">
                            <FileText /> Answer {index + 1}<small>{upload.file_name}</small>
                          </a>
                        ))}
                      </div>
                      <label className="mark-field"><span>Marks</span><input type="number" min="0" max={question.marks} value={marks[String(question.number)] ?? 0} onChange={(event) => setMarks((current) => ({ ...current, [String(question.number)]: Number(event.target.value) }))} /><em>/ {question.marks}</em></label>
                    </article>
                  );
                })}
              </div>

              <div className="teacher-feedback">
                <label htmlFor="teacher-feedback">Overall feedback</label>
                <textarea id="teacher-feedback" value={feedback} onChange={(event) => setFeedback(event.target.value)} maxLength={2000} placeholder="Write a short comment for the student…" />
              </div>
              <footer className="review-actions">
                <span>MCQ {detail.submission.mcq_score}/16 + Written {writtenTotal}/24</span>
                <strong>Total {detail.submission.mcq_score + writtenTotal}/40</strong>
                <button type="button" onClick={() => void saveMarks()} disabled={saving}>{saving ? <Loader2 /> : detail.submission.status === 'marked' ? <CheckCircle2 /> : <Save />}{saving ? 'Saving…' : 'Save marks'}</button>
              </footer>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
