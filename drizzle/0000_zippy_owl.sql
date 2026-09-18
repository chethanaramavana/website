CREATE TABLE `answer_uploads` (
	`id` text PRIMARY KEY NOT NULL,
	`submission_id` text NOT NULL,
	`user_id` text NOT NULL,
	`question_number` integer NOT NULL,
	`object_key` text NOT NULL,
	`file_name` text NOT NULL,
	`content_type` text NOT NULL,
	`size_bytes` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_answer_uploads_submission` ON `answer_uploads` (`submission_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_answer_uploads_object_key` ON `answer_uploads` (`object_key`);--> statement-breakpoint
CREATE TABLE `question_marks` (
	`submission_id` text NOT NULL,
	`question_number` integer NOT NULL,
	`marks_awarded` integer NOT NULL,
	`feedback` text DEFAULT '' NOT NULL,
	PRIMARY KEY(`submission_id`, `question_number`),
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `submissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_email` text NOT NULL,
	`student_name` text NOT NULL,
	`paper_id` text DEFAULT 'real-numbers-01' NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`mcq_answers` text DEFAULT '{}' NOT NULL,
	`mcq_score` integer DEFAULT 0 NOT NULL,
	`written_score` integer,
	`total_score` integer,
	`teacher_feedback` text DEFAULT '' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`submitted_at` text,
	`marked_at` text,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_submissions_user_id` ON `submissions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_submissions_submitted_at` ON `submissions` (`submitted_at`);