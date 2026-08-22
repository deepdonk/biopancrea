import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { CookieNotice } from "./components/CookieNotice";
import { CursorAura } from "./components/CursorAura";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://biopancrea.knmmkk.chatgpt.site"),
  title: { default: "BioPancrea — Research-stage cell-therapy platform", template: "%s — BioPancrea" },
  description: "BioPancrea is developing a research-stage concept connecting patient-derived beta-like cells, hydrogel support, and a stent-based vascular platform.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "BioPancrea — Research-stage cell-therapy platform",
    description: "Patient-derived beta-like cells, hydrogel support, and a stent-based vascular platform concept.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "BioPancrea — Rethinking pancreatic health." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioPancrea — Research-stage cell-therapy platform",
    description: "Patient-derived beta-like cells, hydrogel support, and a stent-based vascular platform concept.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
