import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_REQUEST_BYTES = 12_000;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();

function plainText(value: string) {
  return value
    .normalize("NFKC")
    .replace(/\r\n?/g, "\n")
    .split("")
    .filter((character) => {
      const codePoint = character.charCodeAt(0);
      return character === "\n" || character === "\t" || (codePoint >= 32 && codePoint !== 127 && (codePoint < 128 || codePoint > 159));
    })
    .join("")
    .trim();
}

function isValidEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requestIp(request: NextRequest) {
  return request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "anonymous";
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  for (const [key, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(key);
  }

  const current = rateLimits.get(identifier);
  if (!current || current.resetAt <= now) {
    rateLimits.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function publicError(status = 400) {
  return NextResponse.json(
    { error: "Unable to send your message right now. Please try again." },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_BYTES || isRateLimited(requestIp(request))) {
    return publicError(contentLength > MAX_REQUEST_BYTES ? 413 : 429);
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) return publicError(403);
    } catch {
      return publicError(403);
    }
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return publicError();
  }

  if (!payload || typeof payload !== "object") return publicError();
  const body = payload as Record<string, unknown>;
  if (typeof body.website !== "string" || body.website.trim() !== "") return publicError();
  if (typeof body.name !== "string" || typeof body.email !== "string" || typeof body.message !== "string") return publicError();

  const name = plainText(body.name);
  const email = plainText(body.email).toLowerCase();
  const message = plainText(body.message);

  if (name.length < 2 || name.length > 100 || !isValidEmail(email) || message.length < 10 || message.length > MAX_MESSAGE_LENGTH) {
    return publicError();
  }

  const recipient = process.env.CONTACT_RECIPIENT;
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.CONTACT_FROM_EMAIL;
  if (!recipient || !apiKey || !fromAddress) return publicError(503);

  const submissionTime = new Date().toISOString();
  const emailText = [
    "New BioPancrea contact message",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Submission time: ${submissionTime}`,
    "",
    "Message:",
    message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: email,
        subject: "New BioPancrea contact message",
        text: emailText,
      }),
    });

    if (!response.ok) return publicError(502);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return publicError(502);
  }
}
