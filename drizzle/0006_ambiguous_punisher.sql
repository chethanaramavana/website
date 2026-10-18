CREATE TABLE `basics_progress` (
	`user_id` text NOT NULL,
	`topic_slug` text NOT NULL,
	`state_json` text DEFAULT '{}' NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`completed` integer DEFAULT 0 NOT NULL,
	`score` integer,
	`updated_at_ms` integer NOT NULL,
	PRIMARY KEY(`user_id`, `topic_slug`)
);
