import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
