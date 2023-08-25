import { pgTable, serial, varchar, boolean } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const todos = pgTable("todos", {
	id: serial("id").primaryKey().notNull(),
	content: varchar("content", { length: 255 }).notNull(),
	done: boolean("done").default(false),
});