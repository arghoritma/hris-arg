import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  out: "./services/db/migrations",
  schema: "./services/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.PG_DATABASE_URL!,
  },
  verbose: true,
});
