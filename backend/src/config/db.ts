// import { drizzle } from "drizzle-orm/neon-http";
// import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
<<<<<<< HEAD
import * as schema from "../model/schema";
=======
<<<<<<< HEAD
import * as schema from '../model/schema';
>>>>>>> main
// config();
=======
//config();
>>>>>>> main

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

config({ path: ".env.local" });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

<<<<<<< HEAD
config({ path: ".env.local" });
=======
export const db = drizzle(pool);
>>>>>>> main

<<<<<<< HEAD
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });
=======
// config({ path: ".env.local" }); // or .env.local

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql });
>>>>>>> main
