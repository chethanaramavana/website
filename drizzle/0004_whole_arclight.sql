CREATE TABLE `free_quiz_attempts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`user_email` text NOT NULL,
	`student_name` text NOT NULL,
	`quiz_id` text NOT NULL,
	`answers_json` text NOT NULL,
	`questions_json` text NOT NULL,
	`score` integer NOT NULL,
	`total` integer NOT NULL,
	`answered` integer NOT NULL,
	`submitted_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_free_quiz_attempts_submitted` ON `free_quiz_attempts` (`submitted_at`);