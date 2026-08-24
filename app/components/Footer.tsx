import Link from "next/link";
import { BrandMark } from "./BrandMark";

const pages = [["Home", "/"], ["Mission", "/mission"], ["How It Works", "/how-it-works"], ["Meet the Team", "/team"], ["Contact", "/contact"]] as const;
const contactEmail = "d.suresh22@taylorshill.ie";
const emailHref = "mailto:d.suresh22@taylorshill.ie?subject=BioPancrea%20enquiry";

export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-minimal">
        <Link className="brand brand-light" href="/" aria-label="BioPancrea home"><BrandMark light /><span>BioPancrea</span></Link>
        <nav aria-label="Footer navigation">
          {pages.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="footer-contact">
          <a href={emailHref}>{contactEmail}</a>
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} BioPancrea.</p>
      </div>
    </footer>
  );
}
