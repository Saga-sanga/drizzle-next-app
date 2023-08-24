import { db } from "@/server";
import { sql } from "@vercel/postgres";
import { todos, NewTodo, Todo } from "./schema";

const newTodos: NewTodo[] = [
  {
    content: "Demo Task",
    done: false,
  }
];

export async function seed() {
  // Create table with raw SQL
  const createTable = await sql.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id SERIAL PRIMARY KEY,
        content VARCHAR(256) NOT NULL,
        done BOOLEAN DEFAULT false
      );
  `);
  console.log(`Created "todos" table`);

  const insertedTodos: Todo[] = await db
    .insert(todos)
    .values(newTodos)
    .returning();
  console.log(`Seeded ${insertedTodos.length} todos`);

  return {
    createTable,
    insertedTodos,
  };
}
