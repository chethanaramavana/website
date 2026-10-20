import { getDatabase, type RequestUser } from '@/lib/server';
import {freeQuizzes} from '@/lib/free-quizzes';
import { finalizeExpiredSubmissions } from '@/lib/submission-lifecycle';

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

export type StudentMcqDraft={quizId:string;title:string;path:string;answered:number;total:number;updated:number};
export type StudentMcqResult={id:string;quizId?:string;title:string;score:number;total:number;submitted:string};
export type StudentRecordsPayload = {
  mcqDrafts:StudentMcqDraft[];
  mcqResults:StudentMcqResult[];
  signedIn: true;
  email: string;
  displayName: string;
  access: string[];
  payments: StudentPaymentRecord[];
  submissions: StudentSubmissionRecord[];
};

export async function getStudentRecordsForUser(user: RequestUser): Promise<StudentRecordsPayload> {
  const db = getDatabase();
  await finalizeExpiredSubmissions(db, user.userId);
  const [payments, submissions,drafts,quizResults] = await Promise.all([
    db.prepare(`SELECT paper_id, student_name, transaction_id, amount_paise, created_at, reviewed_at,
      CASE WHEN substr(transaction_id, 1, 6) = 'order_' THEN 'razorpay' ELSE 'manual' END AS payment_source
      FROM payment_requests WHERE user_id = ? AND status = 'approved' ORDER BY created_at DESC`)
      .bind(user.userId).all<StudentPaymentRecord>(),
    db.prepare(`SELECT id, paper_id, student_name, status, mcq_score, written_score, total_score,
      teacher_feedback, submitted_at, marked_at FROM submissions
      WHERE (user_id = ? OR lower(user_email) = ?) AND status != 'draft' ORDER BY submitted_at DESC`)
      .bind(user.userId, user.email).all<StudentSubmissionRecord>(),
    db.prepare('SELECT quiz_id,state_json,updated_at_ms FROM mcq_drafts WHERE user_id=? ORDER BY updated_at_ms DESC').bind(user.userId).all<{quiz_id:string;state_json:string;updated_at_ms:number}>(),
    db.prepare('SELECT id,quiz_id,score,total,submitted_at FROM free_quiz_attempts WHERE user_id=? ORDER BY submitted_at DESC LIMIT 100').bind(user.userId).all<{id:string;quiz_id:string;score:number;total:number;submitted_at:string}>(),
  ]);
  const mcqDrafts=drafts.results.flatMap(row=>{const q=freeQuizzes.find(q=>q.id===row.quiz_id);const state=JSON.parse(row.state_json);if(!q||state.submitted||!Object.keys(state.answers||{}).length||quizResults.results.some(r=>r.id===state.attemptId))return [];return [{quizId:q.id,title:`Grade ${q.grade} · ${q.title}`,path:q.path,answered:Object.keys(state.answers).length,total:q.questions.length,updated:row.updated_at_ms}];});
  const mcqResults=quizResults.results.map(row=>({id:row.id,quizId:row.quiz_id,title:freeQuizzes.find(q=>q.id===row.quiz_id)?.title||'Chapter MCQ',score:row.score,total:row.total,submitted:row.submitted_at}));
  const latestPayments = [...new Map(payments.results.map((payment) => [payment.paper_id, payment])).values()];
  const access = new Set(latestPayments.map((row) => row.paper_id));
  for (const submission of submissions.results) access.add(submission.paper_id);
  const fallbackName = latestPayments.find((payment) => payment.student_name.trim())?.student_name.trim()
    || user.email.split('@')[0];
  return {
    mcqDrafts,mcqResults,
    signedIn: true,
    email: user.email,
    displayName: user.fullName ?? fallbackName,
    access: [...access],
    payments: latestPayments,
    submissions: submissions.results,
  };
}
