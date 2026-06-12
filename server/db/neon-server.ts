import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

export function createNeonServerClient() {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  return neon(databaseUrl);
}