// ─────────────────────────────────────────────
// src/components/layout/NavBar.jsx
// ─────────────────────────────────────────────

import { useState, useEffect } from "react";
import { OWNER } from "../../data/portfolioData";
import { DownloadIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from "../icons/Icons";
import { useTheme } from "../../context/ThemeContext";

const NAV_LINKS = ["About", "Skills", "Projects", "Contact"];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;

  const navStyle = scrolled
    ? {
      backgroundColor: "color-mix(in srgb, var(--bg) 90%, transparent)",
      backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)",
    }
    : { backgroundColor: "transparent" };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={navStyle}>
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <span className="font-mono font-bold tracking-widest text-sm uppercase" style={{ color: "var(--accent)" }}>
          AP<span style={{ color: "var(--lavender)" }}>_</span>
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="font-mono tracking-wide text-sm transition-colors duration-200 hover:opacity-100"
                style={{ color: "var(--text-muted)" }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  (e.currentTarget.style.color = "var(--lavender)")
                }
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  (e.currentTarget.style.color = "var(--lavender)")
                }
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-sm transition-colors"
            style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--lavender)"; e.currentTarget.style.borderColor = "var(--border-hover)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--text-muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>

          <a
            href={OWNER.resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-sm tracking-widest transition-colors"
            style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
          >
            <DownloadIcon /> RESUME
          </a>

          <a
            href={hireMeHref}
            className="text-xs font-mono px-4 py-2 text-white rounded-sm tracking-widest transition-colors"
            style={{ backgroundColor: "var(--accent)" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
          >
            HIRE ME
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-sm"
            style={{ color: "var(--text-muted)" }}
          >
            {theme === "dark" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ color: "var(--text-muted)" }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 border-b"
          style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}
        >
          <ul className="space-y-4 mb-4 pt-2">
            {NAV_LINKS.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-sm tracking-wide block transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex gap-3">
            <a
              href={OWNER.resumeHref}
              className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-sm tracking-widest"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <DownloadIcon /> RESUME
            </a>
            <a
              href={hireMeHref}
              className="text-xs font-mono px-4 py-2 text-white rounded-sm tracking-widest"
              style={{ backgroundColor: "var(--accent)" }}
            >
              HIRE ME
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}