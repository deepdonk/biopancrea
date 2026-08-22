import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "BioPancrea — Rethinking pancreatic health",
  description: "BioPancrea is exploring new possibilities at the intersection of biology, technology, and human health.",
  openGraph: {
    title: "BioPancrea — Rethinking pancreatic health",
    description: "Exploring new possibilities at the intersection of biology, technology, and human health.",
    type: "website",
    images: [{ url: "/og.png", width: 1672, height: 941, alt: "BioPancrea — Rethinking pancreatic health." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BioPancrea — Rethinking pancreatic health",
    description: "Exploring new possibilities at the intersection of biology, technology, and human health.",
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
        {children}
      </body>
    </html>
  );
}
