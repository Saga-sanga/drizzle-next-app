import { publicProcedure, router } from "./trpc";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { todos, users } from "@/db/schema";
import { z } from "zod";
import { asc, eq } from "drizzle-orm";
import { userRouter } from "./routers/user";
import { todosRouter } from "./routers/todos";

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
