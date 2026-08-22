import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about", destination: "/team", permanent: true },
      { source: "/focus", destination: "/science", permanent: true },
      { source: "/approach", destination: "/how-it-works", permanent: true },
      { source: "/insights", destination: "/science", permanent: true },
    ];
  },
};

export default nextConfig;
