const configuredSiteUrl = process.env.SITE_URL;

export const SITE_URL = (configuredSiteUrl || "https://biopancrea.com").replace(/\/+$/, "");
export const SITE_NAME = "BioPancrea";
export const SOCIAL_IMAGE_PATH = "/og.png";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
