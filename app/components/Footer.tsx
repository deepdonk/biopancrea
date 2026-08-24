/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation is required for reliable routing on the public Sites host. */

import { BrandMark, BrandWordmark } from "./BrandMark";

const pages = [["Home", "/"], ["Mission", "/mission"], ["How It Works", "/how-it-works"], ["Meet the Team", "/team"], ["Contact", "/contact"]] as const;

export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-minimal">
        <a className="brand brand-light" href="/" aria-label="BioPancrea"><BrandMark light /><BrandWordmark /></a>
        <nav aria-label="Footer navigation">
          {pages.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="footer-contact">
          <a href="/privacy">Privacy</a>
        </div>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} BioPancrea.</p>
      </div>
    </footer>
  );
}
