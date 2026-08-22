import { ensureDatabase, getDb } from "../../../db";
import { newsletterSubscribers } from "../../../db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 180) : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    await ensureDatabase();
    await getDb().insert(newsletterSubscribers).values({ email }).onConflictDoNothing();
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to save this subscription." }, { status: 500 });
  }
}
