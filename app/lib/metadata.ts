import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME, SOCIAL_IMAGE_PATH } from "./site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: PageMetadata): Metadata {
  const canonical = absoluteUrl(path);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      images: [
        {
          url: SOCIAL_IMAGE_PATH,
          width: 1200,
          height: 627,
          alt: "BioPancrea, artificial pancreas startup",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE_PATH],
    },
  };
}
