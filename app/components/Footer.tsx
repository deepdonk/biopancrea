import Link from "next/link";
import { BrandMark } from "./BrandMark";

const pages = [["Home", "/"], ["How It Works", "/how-it-works"], ["Meet the Team", "/team"], ["Contact", "/contact"]] as const;
const contactEmail: string | null = null;

export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-minimal">
        <Link className="brand brand-light" href="/" aria-label="BioPancrea home"><BrandMark light /><span>BioPancrea</span></Link>
        <nav aria-label="Footer navigation">
          {pages.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <div className="footer-contact">
          {contactEmail ? <a href={`mailto:${contactEmail}`}>{contactEmail}</a> : <span>Contact email pending</span>}
          <Link href="/privacy">Privacy</Link>
        </div>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} BioPancrea.</p>
      </div>
    </footer>
  );
}
