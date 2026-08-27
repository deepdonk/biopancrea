import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SitePolish } from "./components/SitePolish";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-biopancrea-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "BioPancrea | Biotechnology Startup",
  description: "BioPancrea is developing a research-stage, implantable artificial-pancreas concept combining beta-like cells, hydrogel and a vascular stent.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <SitePolish />
        <div className="page-transition">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
