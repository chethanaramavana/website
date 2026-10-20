CREATE TABLE `weekly_problems` (
	`number` integer PRIMARY KEY NOT NULL,
	`question` text NOT NULL,
	`solution` text NOT NULL,
	`published` integer DEFAULT 0 NOT NULL,
	`solution_visible` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
