import Link from "next/link";
import { BrandMark } from "./BrandMark";

const pages = [["About", "/about"], ["Our Focus", "/focus"], ["Approach", "/approach"], ["Insights", "/insights"], ["Contact", "/contact"]] as const;
const legal = [["Privacy", "/privacy"], ["Cookies", "/cookies"], ["Terms", "/terms"], ["Disclaimer", "/disclaimer"]] as const;

export function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-lead">
        <div>
          <Link className="brand brand-light" href="/" aria-label="BioPancrea home"><BrandMark light /><span>BioPancrea</span></Link>
          <h2>Advancing<br />pancreatic health.</h2>
        </div>
        <Link className="circle-link" href="/contact" aria-label="Connect with BioPancrea"><span>Connect</span><i aria-hidden="true">↗</i></Link>
      </div>
      <div className="footer-grid">
        <div className="footer-statement"><p>Focused thinking for a complex biological frontier.</p><span>BioPancrea / 2026</span></div>
        <div><p className="footer-label">Explore</p>{pages.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</div>
        <div><p className="footer-label">Legal</p>{legal.map(([label,href]) => <Link key={href} href={href}>{label}</Link>)}</div>
      </div>
      <div className="footer-legal">
        <p>© {new Date().getFullYear()} BioPancrea. All rights reserved.</p>
        <p>This website provides general corporate and educational information only and does not provide medical advice.</p>
      </div>
    </footer>
  );
}
