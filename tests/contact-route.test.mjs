import assert from "node:assert/strict";
import test from "node:test";

import { POST } from "../app/api/contact/route.ts";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
  CONTACT_RECIPIENT: process.env.CONTACT_RECIPIENT,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_FROM_EMAIL: process.env.CONTACT_FROM_EMAIL,
};
let requestCounter = 0;

const baseEnvironment = {
  SITE_URL: "https://biopancrea.com",
  CONTACT_RECIPIENT: "private-recipient@example.test",
  RESEND_API_KEY: "test-key-not-a-secret",
  CONTACT_FROM_EMAIL: "BioPancrea <contact@biopancrea.com>",
  ASSETS: { fetch: originalFetch },
};

function contactRequest(body, headers = {}) {
  requestCounter += 1;
  return new Request("https://biopancrea.com/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://biopancrea.com",
      "cf-connecting-ip": `192.0.2.${requestCounter}`,
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const validBody = {
  name: "Security Test",
  email: "visitor@example.com",
  message: "This is a valid contact form test message.",
  website: "",
};

test.before(() => {
  process.env.CONTACT_RECIPIENT = baseEnvironment.CONTACT_RECIPIENT;
  process.env.RESEND_API_KEY = baseEnvironment.RESEND_API_KEY;
  process.env.CONTACT_FROM_EMAIL = baseEnvironment.CONTACT_FROM_EMAIL;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  for (const [key, value] of Object.entries(originalEnvironment)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

test("contact endpoint sends validated fields through Resend", async () => {
  let outbound;
  globalThis.fetch = async (input, init) => {
    assert.equal(String(input), "https://api.resend.com/emails");
    outbound = JSON.parse(init.body);
    return new Response(JSON.stringify({ id: "test-message" }), { status: 200 });
  };

  const response = await POST(contactRequest(validBody));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.deepEqual(outbound.to, [baseEnvironment.CONTACT_RECIPIENT]);
  assert.equal(outbound.reply_to, validBody.email);
  assert.match(outbound.text, /Submission time:/);
  assert.match(outbound.text, /This is a valid contact form test message\./);
});

test("contact endpoint rejects unsupported content types", async () => {
  globalThis.fetch = async () => assert.fail("email provider must not be called");
  const response = await POST(contactRequest(validBody, { "content-type": "text/plain" }));
  assert.equal(response.status, 415);
});

test("contact endpoint rejects cross-site submissions", async () => {
  globalThis.fetch = async () => assert.fail("email provider must not be called");
  const response = await POST(contactRequest(validBody, { origin: "https://attacker.example" }));
  assert.equal(response.status, 403);
});

test("contact endpoint enforces the actual body size", async () => {
  globalThis.fetch = async () => assert.fail("email provider must not be called");
  const response = await POST(
    contactRequest(JSON.stringify({ ...validBody, padding: "x".repeat(12_500) })),
  );
  assert.equal(response.status, 413);
});

test("contact endpoint rejects honeypot submissions", async () => {
  globalThis.fetch = async () => assert.fail("email provider must not be called");
  const response = await POST(contactRequest({ ...validBody, website: "spam.example" }));
  assert.equal(response.status, 400);
});

test("contact endpoint returns a generic retryable error when the provider fails", async () => {
  globalThis.fetch = async () => new Response("provider detail", { status: 500 });
  const response = await POST(contactRequest(validBody));
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), {
    error: "Unable to send your message right now. Please try again.",
  });
});
