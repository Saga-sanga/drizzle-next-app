CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" varchar(50),
	"user_id" integer,
	"done" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(30),
	"name" varchar(50)
);
