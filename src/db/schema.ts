import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 50 }),
  userId: integer("user_id"),
  done: boolean("done"),
});

export const todosRelations = relations(todos, ({ one }) => ({
  author: one(users, {
    fields: [todos.userId],
    references: [users.id],
  }),
}));

export const users = pgTable("users", {
  id: serial("id").primaryKey().notNull(),
  email: varchar("email", { length: 30 }),
  name: varchar("name", { length: 50 }),
  image: varchar("image", { length: 250 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  todos: many(todos),
}));

export type Todo = typeof todos.$inferSelect;
export type NewTodo = typeof todos.$inferInsert;
