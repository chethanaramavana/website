CREATE TABLE `paper_content` (
	`paper_id` text PRIMARY KEY NOT NULL,
	`content_json` text NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
