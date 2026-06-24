// src/components/layout/Footer.jsx
import { OWNER } from "../../data/portfolioData";

export default function Footer() {
  return (
    <div className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
      style={{ borderTop: "1px solid var(--border)" }}>
      <p className="font-mono text-xs" style={{ color: "var(--text-dim)" }}>
        © {new Date().getFullYear()} {OWNER.name} — Built with React & Tailwind
      </p>
      <p className="font-mono text-xs" style={{ color: "var(--accent)" }}>{OWNER.location}</p>
    </div>
  );
}