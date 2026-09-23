"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandWordmark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { site } from "@/lib/site";
export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const closeMenu = () => setOpen(false);
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="EdisonChai 首页">
        <BrandWordmark className="brand-wordmark" />
      </Link>
      <div className="header-actions">
        <nav id="site-navigation" className={`nav ${open ? "open" : ""}`} aria-label="主导航">
          <Link onClick={closeMenu} href="/blog">
            Blog
          </Link>
          <Link onClick={closeMenu} href="/projects">
            Work
          </Link>
          <Link onClick={closeMenu} href="/about">
            About
          </Link>
          <Link onClick={closeMenu} href="/rss.xml">
            RSS
          </Link>
        </nav>
        <ThemeToggle />
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          <span className={`menu-glyph ${open ? "is-open" : ""}`} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong className="wordmark">
          <BrandWordmark className="brand-wordmark" />
        </strong>
        <br />
        {site.description}
      </div>
      <div>
        <div className="footer-links">
          <Link href="/about">关于我</Link>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href="/rss.xml">RSS</a>
        </div>
        © {new Date().getFullYear()} EdisonChai. All rights reserved.
      </div>
    </footer>
  );
}
