CREATE TABLE `student_presence` (
	`user_id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`last_sign_in_ms` integer,
	`sign_in_count` integer DEFAULT 0 NOT NULL,
	`last_seen_ms` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_student_presence_seen` ON `student_presence` (`last_seen_ms`);--> statement-breakpoint
CREATE TABLE `test_activity` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`paper_id` text NOT NULL,
	`opened_at_ms` integer NOT NULL,
	`started_at_ms` integer,
	`last_seen_ms` integer NOT NULL,
	`submitted_at_ms` integer,
	`answered` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_test_activity_seen` ON `test_activity` (`last_seen_ms`);--> statement-breakpoint
CREATE INDEX `idx_test_activity_user` ON `test_activity` (`user_id`);