import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.biopancrea.com" }],
        destination: "https://biopancrea.com/:path*",
        permanent: true,
      },
      { source: "/home", destination: "/", permanent: true },
      { source: "/team", destination: "/meet-the-team", permanent: true },
      { source: "/about", destination: "/meet-the-team", permanent: true },
      { source: "/focus", destination: "/mission", permanent: true },
      { source: "/approach", destination: "/how-it-works", permanent: true },
      { source: "/insights", destination: "/mission", permanent: true },
    ];
  },
};

export default nextConfig;
