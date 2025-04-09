import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.PG_DATABASE_URL!,
});

const db = drizzle(pool, { schema });

// Eksport skema
export { db, schema };
