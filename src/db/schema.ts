import { InferInsertModel, InferSelectModel } from "drizzle-orm"
import {boolean, pgTable, serial, varchar} from "drizzle-orm/pg-core"

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  content: varchar("content", {length: 256}),
  done: boolean("done")
})

export type Todo = InferSelectModel<typeof todos>
export type NewTodo = InferInsertModel<typeof todos>