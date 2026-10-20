'use client';

import { Check, CreditCard, Loader2, ShieldCheck, X } from 'lucide-react';
import { getBasicsProduct } from '@/lib/basics-catalog';
import { paperDefinitionsById } from '@/lib/papers';
import { teacherDate } from './teacher-date';

type Payment = {
  id: string;
  student_name: string;
  paper_id: string;
  transaction_id: string;
  amount_paise: number;
  status: 'pending' | 'approved' | 'rejected';
  payment_source: 'manual' | 'razorpay';
  created_at: string;
};

export default function PaymentRequests({
  payments,
  loading,
  paymentAction,
  onReview,
}: {
  payments: Payment[];
  loading: boolean;
  paymentAction: string;
  onReview: (id: string, status: 'approved' | 'rejected') => Promise<void>;
}) {
  const pending = payments.filter(
    (p) => p.status === 'pending' && p.payment_source === 'manual',
  );
  const history = payments.filter((p) => p.status !== 'pending');
  const online = payments.filter(
    (p) => p.status === 'pending' && p.payment_source === 'razorpay',
  );
  function card(payment: Payment) {
    const paper = paperDefinitionsById[payment.paper_id];
    const title =
      getBasicsProduct(payment.paper_id)?.title ??
      (paper
        ? `${paper.board ?? 'CBSE'} · Grade ${paper.grade ?? 10} · ${paper.chapter} · Paper ${paper.paperNumber}`
        : 'Chapter test');
    return (
      <article
        key={payment.id}
        className={`payment-request-card ${payment.status} ${payment.payment_source}`}
      >
        <div className="payment-request-copy">
          <strong>{payment.student_name}</strong>
          <small>{title}</small>
          <time>{teacherDate(payment.created_at)} · IST</time>
        </div>
        <div className="payment-transaction">
          <span>
            {payment.payment_source === 'razorpay'
              ? 'Razorpay order'
              : 'Transaction ID'}
          </span>
          <strong>{payment.transaction_id}</strong>
        </div>
        <strong className="payment-amount">
          ₹{(payment.amount_paise / 100).toFixed(0)}
        </strong>
        {payment.status === 'pending' && payment.payment_source === 'manual' ? (
          <div className="payment-review-actions">
            <button
              type="button"
              className="reject"
              onClick={() => void onReview(payment.id, 'rejected')}
              disabled={paymentAction === payment.id}
            >
              <X />
              <span>Reject</span>
            </button>
            <button
              type="button"
              className="approve"
              onClick={() => void onReview(payment.id, 'approved')}
              disabled={paymentAction === payment.id}
            >
              {paymentAction === payment.id ? <Loader2 /> : <Check />}
              <span>Approve</span>
            </button>
          </div>
        ) : (
          <span className={`payment-reviewed ${payment.status}`}>
            {payment.status === 'pending' ? (
              <Loader2 />
            ) : payment.status === 'approved' ? (
              <Check />
            ) : (
              <X />
            )}
            {payment.status === 'pending' ? 'Verifying' : payment.status}
          </span>
        )}
      </article>
    );
  }
  return (
    <section
      className="payment-review-section"
      aria-labelledby="payment-review-title"
    >
      <header>
        <div>
          <h2 id="payment-review-title">Payment requests</h2>
          <p>Manual payments awaiting your review</p>
        </div>
        <span>{pending.length} to review</span>
      </header>
      <div className="payment-review-warning">
        <ShieldCheck />
        <p>
          <strong>Match manual payments with PhonePe before approving.</strong>{' '}
          Razorpay payments are verified automatically.
        </p>
      </div>
      {loading ? (
        <div className="teacher-loading">
          <Loader2 /> Loading payment requests…
        </div>
      ) : (
        <>
          {pending.length ? (
            <div className="payment-request-list">{pending.map(card)}</div>
          ) : (
            <div className="payment-review-empty">
              <CreditCard />
              <div>
                <strong>No payments waiting</strong>
                <p>You're up to date.</p>
              </div>
            </div>
          )}
          <details className="payment-history">
            <summary>
              Payment history <span>{history.length}</span>
            </summary>
            <div className="payment-request-list">
              {history.length ? (
                history.map(card)
              ) : (
                <p>No reviewed payments yet.</p>
              )}
            </div>
          </details>
          {online.length > 0 && (
            <details className="payment-history">
              <summary>
                Online verification <span>{online.length}</span>
              </summary>
              <p>Checked automatically. No teacher action needed.</p>
              <div className="payment-request-list">{online.map(card)}</div>
            </details>
          )}
        </>
      )}
    </section>
  );
}
