CREATE TABLE `submission_feedback` (
	`submission_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`paper_id` text NOT NULL,
	`upload_ease` integer NOT NULL,
	`question_quality` integer NOT NULL,
	`difficulty_fit` integer NOT NULL,
	`math_clarity` integer NOT NULL,
	`notes_solutions` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`submission_id`) REFERENCES `submissions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_submission_feedback_paper_id` ON `submission_feedback` (`paper_id`);--> statement-breakpoint
ALTER TABLE `submissions` ADD `started_at_ms` integer;--> statement-breakpoint
ALTER TABLE `submissions` ADD `work_deadline_at_ms` integer;--> statement-breakpoint
ALTER TABLE `submissions` ADD `upload_deadline_at_ms` integer;--> statement-breakpoint
ALTER TABLE `submissions` ADD `submission_reason` text;--> statement-breakpoint
CREATE INDEX `idx_submissions_status_upload_deadline` ON `submissions` (`status`,`upload_deadline_at_ms`);