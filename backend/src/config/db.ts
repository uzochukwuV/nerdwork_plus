// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
//config();

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool);

// config({ path: ".env.local" }); // or .env.local

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
