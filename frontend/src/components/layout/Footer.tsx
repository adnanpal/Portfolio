import { OWNER } from "@/data/portfolioData";
import { ArrowUpRightIcon } from "@/components/icons/Icons";

export default function Footer() {
  return (
    <footer className="mt-20 flex flex-col gap-5 border-t border-[var(--border-soft)] py-7 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)] sm:flex-row sm:items-center sm:justify-between" data-testid="site-footer">
      <p data-testid="footer-copyright">© {new Date().getFullYear()} {OWNER.name} — Built with React & Tailwind</p>
      <p data-testid="footer-location">{OWNER.location}</p>
      <a href="#top" className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-[var(--text)]" data-testid="footer-back-to-top-link">Back to top <ArrowUpRightIcon size={13} aria-hidden="true" /></a>
    </footer>
  );
}