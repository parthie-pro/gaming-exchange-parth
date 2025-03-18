/*
<ai_context>
Configures Drizzle for the app.
</ai_context>
*/

import { config } from "dotenv"

config({ path: ".env.local" })

export default {
  schema: './src/db/schema',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
};
