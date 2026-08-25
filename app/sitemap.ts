import type { MetadataRoute } from "next";
import { absoluteUrl } from "./lib/site";

const publicRoutes = ["/", "/mission", "/how-it-works", "/meet-the-team", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((path) => ({ url: absoluteUrl(path) }));
}
