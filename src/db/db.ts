import { drizzle } from "drizzle-orm/postgres-js"
import { todosTable } from "../../db/schema/todos-schema"
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL!);

export const db = drizzle(client) 