import { sql } from 'drizzle-orm';
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const submissions = sqliteTable('submissions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  userEmail: text('user_email').notNull(),
  studentName: text('student_name').notNull(),
  paperId: text('paper_id').notNull().default('real-numbers-01'),
  status: text('status').notNull().default('draft'),
  mcqAnswers: text('mcq_answers').notNull().default('{}'),
  mcqScore: integer('mcq_score').notNull().default(0),
  writtenScore: integer('written_score'),
  totalScore: integer('total_score'),
  teacherFeedback: text('teacher_feedback').notNull().default(''),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  submittedAt: text('submitted_at'),
  markedAt: text('marked_at'),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index('idx_submissions_user_id').on(table.userId),
  index('idx_submissions_submitted_at').on(table.submittedAt),
]);

export const answerUploads = sqliteTable('answer_uploads', {
  id: text('id').primaryKey(),
  submissionId: text('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  questionNumber: integer('question_number').notNull(),
  objectKey: text('object_key').notNull(),
  fileName: text('file_name').notNull(),
  contentType: text('content_type').notNull(),
  sizeBytes: integer('size_bytes').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index('idx_answer_uploads_submission').on(table.submissionId),
  uniqueIndex('idx_answer_uploads_object_key').on(table.objectKey),
]);

export const questionMarks = sqliteTable('question_marks', {
  submissionId: text('submission_id').notNull().references(() => submissions.id, { onDelete: 'cascade' }),
  questionNumber: integer('question_number').notNull(),
  marksAwarded: integer('marks_awarded').notNull(),
  feedback: text('feedback').notNull().default(''),
}, (table) => [
  primaryKey({ columns: [table.submissionId, table.questionNumber] }),
]);

export const paymentRequests = sqliteTable('payment_requests', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  studentName: text('student_name').notNull(),
  paperId: text('paper_id').notNull(),
  transactionId: text('transaction_id').notNull(),
  amountPaise: integer('amount_paise').notNull().default(3000),
  status: text('status').notNull().default('pending'),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  reviewedAt: text('reviewed_at'),
}, (table) => [
  uniqueIndex('idx_payment_requests_transaction_id').on(table.transactionId),
  index('idx_payment_requests_status_created').on(table.status, table.createdAt),
  index('idx_payment_requests_user_id').on(table.userId),
]);
