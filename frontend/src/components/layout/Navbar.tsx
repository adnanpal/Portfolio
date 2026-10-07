import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import { OWNER } from "@/data/portfolioData";
import { ArrowUpRightIcon, CloseIcon, DownloadIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/icons/Icons";
import { useTheme } from "@/context/ThemeContext";

const NAV_LINKS = ["About", "Skills", "Deployments", "Projects", "LeetCode", "Contact"] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, section: string) => {
    event.preventDefault();
    const target = document.getElementById(section);
    if (!target) return;
    setMenuOpen(false);
    window.history.pushState(null, "", `#${section}`);
    window.scrollTo({ top: Math.max(0, target.getBoundingClientRect().top + window.scrollY - 84), behavior: "smooth" });
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${scrolled || menuOpen ? "border-[var(--border-soft)] bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] backdrop-blur-xl" : "border-transparent bg-transparent"}`} data-testid="site-header">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <a href="#top" onClick={(event) => navigateTo(event, "top")} className="group flex items-center gap-3" data-testid="nav-logo-link">
          <span className="flex h-9 w-9 items-center justify-center bg-[var(--text)] font-mono text-xs font-bold text-[var(--bg)] transition-transform duration-200 group-hover:rotate-6">AP</span>
          <span className="font-heading text-sm font-bold tracking-[-0.04em]" data-testid="nav-logo-text">ADNAN.PAL</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation" data-testid="desktop-navigation">
          {NAV_LINKS.map((label, index) => {
            const slug = label.toLowerCase();
            return <a key={label} href={`#${slug}`} onClick={(event) => navigateTo(event, slug)} className="group flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]" data-testid={`nav-${slug}-link`}><span className="text-[9px] text-[var(--text-dim)]">0{index + 1}</span>{label}</a>;
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" onClick={toggleTheme} className="flex h-9 w-9 items-center justify-center border border-[var(--border-soft)] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--surface)]" aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-testid="theme-toggle-button">
            {theme === "light" ? <MoonIcon size={16} aria-hidden="true" /> : <SunIcon size={16} aria-hidden="true" />}
          </button>
          <a href={OWNER.resumeHref} target="_blank" rel="noreferrer" className="flex h-9 items-center gap-2 border border-[var(--border-soft)] px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[var(--border-strong)]" data-testid="nav-resume-link"><DownloadIcon size={13} aria-hidden="true" /> Resume</a>
          <a href={hireMeHref} className="flex h-9 items-center gap-2 bg-[var(--text)] px-4 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5" data-testid="nav-hire-me-link">Hire me <ArrowUpRightIcon size={13} aria-hidden="true" /></a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={toggleTheme} className="flex h-10 w-10 items-center justify-center border border-[var(--border-soft)]" aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"} data-testid="mobile-theme-toggle-button">{theme === "light" ? <MoonIcon size={17} aria-hidden="true" /> : <SunIcon size={17} aria-hidden="true" />}</button>
          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="flex h-10 w-10 items-center justify-center border border-[var(--border-soft)]" aria-label={menuOpen ? "Close navigation" : "Open navigation"} data-testid="mobile-navigation-toggle">{menuOpen ? <CloseIcon size={20} aria-hidden="true" /> : <MenuIcon size={20} aria-hidden="true" />}</button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28 }} className="overflow-hidden border-t border-[var(--border-soft)] bg-[var(--bg)] lg:hidden" aria-label="Mobile navigation" data-testid="mobile-navigation">
            <div className="px-4 pb-5 sm:px-8">
              {NAV_LINKS.map((label, index) => {
                const slug = label.toLowerCase();
                return <a key={label} href={`#${slug}`} onClick={(event) => navigateTo(event, slug)} className="flex items-center justify-between border-b border-[var(--border-soft)] py-4 font-mono text-xs uppercase tracking-[0.16em]" data-testid={`mobile-nav-${slug}-link`}><span><span className="mr-4 text-[var(--text-dim)]">0{index + 1}</span>{label}</span><ArrowUpRightIcon size={15} aria-hidden="true" /></a>;
              })}
              <div className="mt-5 flex gap-3">
                <a href={OWNER.resumeHref} target="_blank" rel="noreferrer" className="flex flex-1 items-center justify-center gap-2 border border-[var(--border-strong)] py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em]" data-testid="mobile-resume-link"><DownloadIcon size={14} aria-hidden="true" /> Resume</a>
                <a href={hireMeHref} className="flex flex-1 items-center justify-center gap-2 bg-[var(--text)] py-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--bg)]" data-testid="mobile-hire-me-link">Hire me <ArrowUpRightIcon size={14} aria-hidden="true" /></a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}