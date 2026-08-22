import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { CookieNotice } from "./components/CookieNotice";
import { CursorAura } from "./components/CursorAura";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const metadataOrigin = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
  ?? "https://biopancrea.knmmkk.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(metadataOrigin),
  title: { default: "BioPancrea — An investigational cell-delivery platform", template: "%s — BioPancrea" },
  description: "BioPancrea is developing a research-stage concept combining patient-derived beta-like cells, hydrogel support, and a stent-based delivery platform.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "BioPancrea — An investigational cell-delivery platform",
    description: "Patient-derived beta-like cells, hydrogel support, and a stent-based delivery concept.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "BioPancrea — An investigational cell-delivery platform." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioPancrea — An investigational cell-delivery platform",
    description: "Patient-derived beta-like cells, hydrogel support, and a stent-based delivery concept.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} ${ibmPlexMono.variable}`}
      >
        <Header />
        <div className="page-transition">{children}</div>
        <Footer />
        <CookieNotice />
        <CursorAura />
      </body>
    </html>
  );
}
