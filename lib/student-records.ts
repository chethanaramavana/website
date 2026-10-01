import { getDatabase, type RequestUser } from '@/lib/server';

export type StudentSubmissionRecord = {
  id: string;
  paper_id: string;
  student_name: string;
  status: 'submitted' | 'marked';
  mcq_score: number;
  written_score: number | null;
  total_score: number | null;
  teacher_feedback: string;
  submitted_at: string;
  marked_at: string | null;
};

export type StudentPaymentRecord = {
  paper_id: string;
  student_name: string;
  transaction_id: string;
  amount_paise: number;
  created_at: string;
  reviewed_at: string | null;
  payment_source: 'razorpay' | 'manual';
};

export type StudentRecordsPayload = {
  signedIn: true;
  email: string;
  displayName: string;
  access: string[];
  payments: StudentPaymentRecord[];
  submissions: StudentSubmissionRecord[];
};

export async function getStudentRecordsForUser(user: RequestUser): Promise<StudentRecordsPayload> {
  const db = getDatabase();
  const [payments, submissions] = await Promise.all([
    db.prepare(`SELECT paper_id, student_name, transaction_id, amount_paise, created_at, reviewed_at,
      CASE WHEN substr(transaction_id, 1, 6) = 'order_' THEN 'razorpay' ELSE 'manual' END AS payment_source
      FROM payment_requests WHERE user_id = ? AND status = 'approved' ORDER BY created_at DESC`)
      .bind(user.userId).all<StudentPaymentRecord>(),
    db.prepare(`SELECT id, paper_id, student_name, status, mcq_score, written_score, total_score,
      teacher_feedback, submitted_at, marked_at FROM submissions
      WHERE (user_id = ? OR lower(user_email) = ?) AND status != 'draft' ORDER BY submitted_at DESC`)
      .bind(user.userId, user.email).all<StudentSubmissionRecord>(),
  ]);
  const latestPayments = [...new Map(payments.results.map((payment) => [payment.paper_id, payment])).values()];
  const access = new Set(latestPayments.map((row) => row.paper_id));
  for (const submission of submissions.results) access.add(submission.paper_id);
  const fallbackName = latestPayments.find((payment) => payment.student_name.trim())?.student_name.trim()
    || user.email.split('@')[0];
  return {
    signedIn: true,
    email: user.email,
    displayName: user.fullName ?? fallbackName,
    access: [...access],
    payments: latestPayments,
    submissions: submissions.results,
  };
}
