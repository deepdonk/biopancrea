"use client";

/* eslint-disable @next/next/no-html-link-for-pages -- Native navigation is required for reliable routing on the public Sites host. */

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark, BrandWordmark } from "./BrandMark";

const navItems = [
  ["Home", "/"],
  ["Mission", "/mission"],
  ["How It Works", "/how-it-works"],
  ["Meet the Team", "/team"],
  ["Contact", "/contact"],
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className={`global-header${scrolled ? " is-scrolled" : ""}`}>
      <a className="brand" href="/" aria-label="BioPancrea">
        <BrandMark />
        <BrandWordmark />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, href]) => (
          <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</a>
        ))}
      </nav>
      <a className="header-connect" href="/how-it-works">How it works <span aria-hidden="true">↗</span></a>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen((value) => !value)}>
        <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
        <i /><i />
      </button>
      <div className={`mobile-menu${open ? " is-open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <p className="micro-label">Navigate</p>
          <nav aria-label="Mobile navigation">
            {navItems.map(([label, href], index) => (
              <a key={href} href={href} aria-current={pathname === href ? "page" : undefined} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}><span>0{index + 1}</span>{label}</a>
            ))}
          </nav>
          <p className="mobile-disclaimer">General corporate and educational information only. Not medical advice.</p>
        </div>
      </div>
    </header>
  );
}
