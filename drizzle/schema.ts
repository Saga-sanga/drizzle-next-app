import { pgTable, serial, varchar, integer, boolean } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const users = pgTable("users", {
	id: serial("id").primaryKey().notNull(),
	email: varchar("email", { length: 30 }),
	name: varchar("name", { length: 50 }),
});

export const todos = pgTable("todos", {
	id: serial("id").primaryKey().notNull(),
	content: varchar("content", { length: 50 }),
	userId: integer("user_id"),
	done: boolean("done"),
});