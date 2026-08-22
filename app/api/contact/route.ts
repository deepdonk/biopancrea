const interests = new Set(["Research", "Clinical collaboration", "Strategic partnership", "Investment", "Media", "General enquiry"]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as Record<string, unknown>;
    const name = clean(body.name, 100);
    const email = clean(body.email, 180).toLowerCase();
    const organisation = clean(body.organisation, 140);
    const interest = clean(body.interest, 80);
    const message = clean(body.message, 3000);
    const consent = body.consent === "yes";

    if (!name || !emailPattern.test(email) || !interests.has(interest) || !message || !consent) {
      return Response.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const endpoint = process.env.CONTACT_WEBHOOK_URL;
    if (!endpoint) {
      return Response.json({ error: "Contact service is not configured." }, { status: 503 });
    }

    const delivery = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "contact", name, email, organisation, interest, message, consent }),
      cache: "no-store",
    });

    if (!delivery.ok) throw new Error("Contact delivery failed.");
    return Response.json({ ok: true }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to save this enquiry." }, { status: 500 });
  }
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
