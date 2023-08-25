import type { Config } from "drizzle-kit";
require("dotenv").config();

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEXT_PUBLIC_POSTGRES_URL!,
  },
} satisfies Config;
