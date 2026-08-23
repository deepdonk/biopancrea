import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: { default: "BioPancrea — Artificial pancreas startup", template: "%s — BioPancrea" },
  description: "BioPancrea is an early-stage biotechnology startup developing an implantable artificial-pancreas concept using patient-derived beta-like cells, a supportive hydrogel, and a vascular stent.",
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
  openGraph: {
    title: "BioPancrea — Artificial pancreas startup",
    description: "An early-stage biotechnology startup developing an implantable artificial-pancreas concept.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "BioPancrea — Rethinking pancreatic health." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioPancrea — Artificial pancreas startup",
    description: "An early-stage biotechnology startup developing an implantable artificial-pancreas concept.",
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
        <CursorAura />
      </body>
    </html>
  );
}
