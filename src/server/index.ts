import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { todosRouter } from "./routers/todos";
import { userRouter } from "./routers/user";
import { router } from "./trpc";

export const db = drizzle(sql);

migrate(db, { migrationsFolder: "drizzle" });

// const read = await db.select().from(users);
// const res = await db.insert(todos).values({content: "A todo", done: false}).returning();
// console.log("index.js: 15", read);

export const appRouter = router({
  users: userRouter,
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
