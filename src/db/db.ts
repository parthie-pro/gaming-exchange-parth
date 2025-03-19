import { drizzle } from "drizzle-orm/postgres-js"
import { todosTable, profilesTable } from "db/schema"
import postgres from 'postgres';

const schema = {
  todos: todosTable,
  profiles: profilesTable
};

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client, { schema }) 