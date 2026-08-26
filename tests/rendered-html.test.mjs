import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";

const siteUrl = "https://biopancrea.com";
const pages = {
  "/": {
    title: "BioPancrea | Artificial Pancreas Startup",
    description: "BioPancrea is developing a research-stage, implantable artificial-pancreas concept combining beta-like cells, hydrogel and a vascular stent.",
    h1: "An artificial pancreas built around living cells.",
  },
  "/mission": {
    title: "Our Mission | BioPancrea",
    description: "Learn why BioPancrea is exploring a cell-based artificial pancreas combining cell biology, biomaterials and vascular-device design.",
    h1: "Our mission",
  },
  "/how-it-works": {
    title: "How BioPancrea Works | Cell-Based Artificial Pancreas",
    description: "Explore the BioPancrea concept, from patient-derived cells and iPSCs to beta-like cells, hydrogel integration and a stent-based vascular platform.",
    h1: "How BioPancrea works",
  },
  "/meet-the-team": {
    title: "Meet the BioPancrea Founders",
    description: "Meet BioPancrea founders Deepta Suresh and Janefrances Muoneke.",
    h1: "Meet the team",
  },
  "/contact": {
    title: "Book a Meeting or Contact BioPancrea",
    description: "Book a meeting with the BioPancrea team or send a message about its investigational artificial-pancreas concept.",
    h1: "Let’s talk.",
  },
};

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function request(worker, path) {
  return worker.fetch(
    new Request(`${siteUrl}${path}`, { headers: { accept: "text/html" } }),
    {
      SITE_URL: siteUrl,
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function textContent(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

test("server-renders all canonical public pages with complete SEO metadata", async () => {
  const worker = await loadWorker();

  for (const [path, expected] of Object.entries(pages)) {
    const response = await request(worker, path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get("x-robots-tag"), null, path);

    const html = await response.text();
    const h1s = [...html.matchAll(/<h1(?:\s[^>]*)?>(.*?)<\/h1>/gs)].map((match) => textContent(match[1]));
    const canonical = path === "/" ? siteUrl : `${siteUrl}${path}`;

    assert.ok(html.includes(`<title>${expected.title}</title>`), path);
    assert.ok(html.includes(`<meta name="description" content="${expected.description}"`), path);
    assert.ok(html.includes(`<link rel="canonical" href="${canonical}"`), path);
    assert.deepEqual(h1s, [expected.h1], path);
    assert.match(html, /<meta name="robots" content="index, follow"/i, path);
    assert.match(html, /<meta name="googlebot" content="index, follow"/i, path);
    assert.match(html, /property="og:image"/i, path);
    assert.match(html, /name="twitter:card"/i, path);
  }
});

test("publishes permissive robots and a canonical five-page sitemap", async () => {
  const worker = await loadWorker();
  const robots = await request(worker, "/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(robots.headers.get("content-type") ?? "", /^text\/plain/i);
  assert.equal(await robots.text(), `User-Agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);

  const sitemap = await request(worker, "/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls, Object.keys(pages).map((path) => path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`));
});

test("returns real redirects, 404s, valid homepage JSON-LD, and crawlable navigation", async () => {
  const worker = await loadWorker();
  const missing = await request(worker, "/definitely-missing");
  assert.equal(missing.status, 404);

  for (const [from, to] of [["/home", "/"], ["/team", "/meet-the-team"], ["/Mission", "/mission"]]) {
    const response = await request(worker, from);
    assert.equal(response.status, 308, from);
    assert.equal(new URL(response.headers.get("location"), siteUrl).pathname, to, from);
  }

  const home = await (await request(worker, "/")).text();
  for (const href of ["/", "/mission", "/how-it-works", "/meet-the-team", "/contact"]) {
    assert.ok(home.includes(`href="${href}"`), href);
  }
  const scripts = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map((match) => JSON.parse(match[1]));
  assert.deepEqual(scripts[0]["@graph"].map((entry) => entry["@type"]), ["Organization", "WebSite"]);
});

test("does not ship the private recipient in browser JavaScript", async () => {
  const privateAddress = ["d.suresh22", "taylorshill.ie"].join("@");
  const clientRoot = new URL("../dist/client/", import.meta.url);
  const entries = await readdir(clientRoot, { recursive: true, withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isFile() || !/\.(?:js|html|json|map)$/i.test(entry.name)) continue;
    const path = `${entry.parentPath}/${entry.name}`;
    assert.ok(!(await readFile(path, "utf8")).includes(privateAddress), path);
  }
});

test("publishes clear concept, booking, and contact destinations", async () => {
  const worker = await loadWorker();
  const home = await (await request(worker, "/")).text();
  const howItWorks = await (await request(worker, "/how-it-works")).text();
  const contact = await (await request(worker, "/contact")).text();

  assert.match(home, /What BioPancrea is building/);
  assert.match(home, /vascular implant that combines insulin-producing beta-like cells/);
  assert.match(home, /A research-stage vascular implant\./);
  const hero = home.match(/<section class="landing-hero">([\s\S]*?)<\/section>/)?.[1] ?? "";
  assert.doesNotMatch(hero, /combines insulin-producing beta-like cells/);
  assert.doesNotMatch(howItWorks, /Concept illustration · Not to scale/);
  assert.match(home, /href="\/contact#book-a-meeting"/);
  assert.match(howItWorks, /href="\/contact#book-a-meeting"/);
  assert.match(contact, /id="book-a-meeting"/);
  assert.match(contact, /Send a message/);
  assert.doesNotMatch(contact, /Open booking calendar/);
  assert.doesNotMatch(contact, /NEXT_PUBLIC_BOOKING_URL/);
  assert.doesNotMatch(contact, /mailto:/i);
});

test("adds browser security headers to every response", async () => {
  const worker = await loadWorker();
  const response = await request(worker, "/");

  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.equal(response.headers.get("permissions-policy"), "camera=(), microphone=(), geolocation=(), payment=()");
  assert.equal(response.headers.get("cross-origin-opener-policy"), "same-origin");
});

test("uses the BioPancrea font system without Arial fallbacks", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(css, /Arial/i);
  assert.doesNotMatch(layout, /Arial/i);
  assert.match(layout, /Manrope/);
});
