export async function POST(request: Request) {
  try {
    const body = await request.json() as { email?: unknown };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 180) : "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    const endpoint = process.env.NEWSLETTER_WEBHOOK_URL ?? process.env.CONTACT_WEBHOOK_URL;
    if (!endpoint) {
      return Response.json({ error: "Newsletter service is not configured." }, { status: 503 });
    }

    const delivery = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "newsletter", email }),
      cache: "no-store",
    });

    if (!delivery.ok) throw new Error("Newsletter delivery failed.");
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to save this subscription." }, { status: 500 });
  }
}
