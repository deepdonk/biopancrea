/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation is required for reliable routing on the public Sites host. */

import { BrandMark, BrandWordmark } from "./BrandMark";

const navItems = [
  ["Home", "/"],
  ["Mission", "/mission"],
  ["How It Works", "/how-it-works"],
  ["Meet the Team", "/meet-the-team"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  return (
    <header className="global-header">
      <a className="brand" href="/" aria-label="BioPancrea">
        <BrandMark />
        <BrandWordmark />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-connect" href="/contact#book-a-meeting">Book a meeting <span aria-hidden="true">↗</span></a>
      <details className="mobile-navigation">
        <summary className="menu-toggle" aria-label="Open or close navigation menu">
          <i /><i />
        </summary>
        <div className="mobile-menu" id="mobile-menu">
          <div className="mobile-menu-inner">
            <p className="micro-label">Navigate</p>
            <nav aria-label="Mobile navigation">
              {navItems.map(([label, href], index) => (
                <a key={href} href={href}><span>0{index + 1}</span>{label}</a>
              ))}
            </nav>
            <a className="mobile-booking-link" href="/contact#book-a-meeting">Book a meeting <span aria-hidden="true">→</span></a>
            <p className="mobile-disclaimer">General corporate and educational information only. Not medical advice.</p>
          </div>
        </div>
      </details>
    </header>
  );
}
