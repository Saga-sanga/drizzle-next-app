import { publicProcedure, router } from "./trpc";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { todos } from "@/db/schema";
import { z } from "zod";
import { seed } from "@/db/seed";
import { asc, eq } from "drizzle-orm";

export const db = drizzle(sql);

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    let res;
    try {
      res = await db.select().from(todos).orderBy(asc(todos.id));
    } catch (e: any) {
      if (e.message === `relation "todos" does not exist`) {
        console.log(
          "Table does not exist, creating and seeding it with dummy data now..."
        );
        // Table is not created yet
        await seed();
      }
    }
    return res;
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.insert(todos).values({ content: input, done: false });
    return true;
  }),
  setDone: publicProcedure
    .input(
      z.object({
        id: z.number(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      await db
        .update(todos)
        .set({ done: input.done })
        .where(eq(todos.id, input.id));
      return true;
    }),
  removeTodo: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await db.delete(todos).where(eq(todos.id, input.id)).returning();
    }),
});

export type AppRouter = typeof appRouter;
