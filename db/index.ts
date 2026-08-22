import { env } from "cloudflare:workers";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb() {
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB` or let your control plane inject the real binding values before using the database."
    );
  }

  return drizzle(env.DB, { schema });
}

let schemaReady: Promise<void> | null = null;

export function ensureDatabase() {
  if (!env.DB) throw new Error("Cloudflare D1 binding `DB` is unavailable.");
  schemaReady ??= env.DB.batch([
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      organisation TEXT NOT NULL DEFAULT '',
      interest TEXT NOT NULL,
      message TEXT NOT NULL,
      consent INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at)"),
    env.DB.prepare(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    env.DB.prepare("CREATE UNIQUE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email)"),
    env.DB.prepare("PRAGMA optimize"),
  ]).then(() => undefined).catch((error) => {
    schemaReady = null;
    throw error;
  });
  return schemaReady;
}
