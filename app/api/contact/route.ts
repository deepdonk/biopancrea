import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const MAX_RATE_LIMIT_ENTRIES = 10_000;
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60_000;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_REQUEST_BYTES = 12_000;
const EMAIL_REQUEST_TIMEOUT_MS = 10_000;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimits = new Map<string, RateLimitEntry>();
let nextRateLimitCleanup = 0;

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
  const value = request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "anonymous";

  return value.slice(0, 64);
}

function isRateLimited(identifier: string) {
  const now = Date.now();

  if (now >= nextRateLimitCleanup) {
    for (const [key, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(key);
    }
    nextRateLimitCleanup = now + RATE_LIMIT_CLEANUP_INTERVAL_MS;
  }

  const current = rateLimits.get(identifier);
  if (!current || current.resetAt <= now) {
    if (rateLimits.size >= MAX_RATE_LIMIT_ENTRIES) return true;
    rateLimits.set(identifier, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

function publicError(status = 400, headers?: HeadersInit) {
  return NextResponse.json(
    { error: "Unable to send your message right now. Please try again." },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedOrigins = new Set(["https://biopancrea.com", "https://www.biopancrea.com"]);
  const configuredSiteUrl = process.env.SITE_URL;

  if (configuredSiteUrl) {
    try {
      allowedOrigins.add(new URL(configuredSiteUrl).origin);
    } catch {
      // Ignore a malformed optional URL and retain the canonical allowlist.
    }
  }

  if (process.env.NODE_ENV !== "production") {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }

  try {
    return allowedOrigins.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (!Number.isFinite(contentLength) || contentLength < 0 || contentLength > MAX_REQUEST_BYTES) {
    return publicError(413);
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) return publicError(415);
  if (!isAllowedOrigin(request)) return publicError(403);
  if (isRateLimited(requestIp(request))) {
    return publicError(429, { "Retry-After": String(Math.ceil(RATE_LIMIT_WINDOW_MS / 1000)) });
  }

  let payload: unknown;
  try {
    const rawBody = await request.arrayBuffer();
    if (rawBody.byteLength > MAX_REQUEST_BYTES) return publicError(413);
    const bodyText = new TextDecoder("utf-8", { fatal: true }).decode(rawBody);
    payload = JSON.parse(bodyText);
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
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), EMAIL_REQUEST_TIMEOUT_MS);
    const response = await globalThis.fetch("https://api.resend.com/emails", {
      method: "POST",
      signal: controller.signal,
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
    }).finally(() => clearTimeout(timeout));

    if (!response.ok) return publicError(502);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return publicError(502);
  }
}
