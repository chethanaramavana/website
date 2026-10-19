CREATE TABLE `mcq_drafts` (
	`user_id` text NOT NULL,
	`quiz_id` text NOT NULL,
	`state_json` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at_ms` integer NOT NULL,
	PRIMARY KEY(`user_id`, `quiz_id`)
);
