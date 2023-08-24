import { publicProcedure, router } from "./trpc";
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle(sql);

export const appRouter = router({
  getTodos: publicProcedure.query(() => [0, 1, 2, 3]),
});

export type AppRouter = typeof appRouter;
