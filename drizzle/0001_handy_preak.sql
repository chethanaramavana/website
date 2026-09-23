CREATE TABLE `payment_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`student_name` text NOT NULL,
	`paper_id` text NOT NULL,
	`transaction_id` text NOT NULL,
	`amount_paise` integer DEFAULT 3000 NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`reviewed_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_payment_requests_transaction_id` ON `payment_requests` (`transaction_id`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_status_created` ON `payment_requests` (`status`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_payment_requests_user_id` ON `payment_requests` (`user_id`);--> statement-breakpoint
PRAGMA optimize;
