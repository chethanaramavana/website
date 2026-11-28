CREATE TABLE `analytics_events` (
	`id` text PRIMARY KEY NOT NULL,
	`day` text NOT NULL,
	`created_at_ms` integer NOT NULL,
	`path` text NOT NULL,
	`visitor` text NOT NULL,
	`source` text NOT NULL,
	`device` text NOT NULL,
	`preview` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_analytics_preview_day` ON `analytics_events` (`preview`,`day`);--> statement-breakpoint
CREATE INDEX `idx_analytics_visitor_time` ON `analytics_events` (`preview`,`visitor`,`created_at_ms`);--> statement-breakpoint
CREATE INDEX `idx_analytics_day` ON `analytics_events` (`day`);