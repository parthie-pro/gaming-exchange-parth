import { z } from 'zod';

// Define your environment schema
const envSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string(),
  IGDB_API_KEY: z.string(),
  IGDB_CLIENT_ID: z.string(),
  IGDB_CLIENT_SECRET: z.string(),
  // Add more environment variables as needed
});

// Validate the environment variables
export const env = envSchema.parse(process.env); 