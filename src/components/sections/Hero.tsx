// src/components/sections/Hero.jsx
import { ROLES, OWNER } from "../../data/portfolioData";
import { useTypewriter } from "../../hooks/useTypewriter";
import { DownloadIcon } from "../icons/Icons";

export default function Hero() {
  const role = useTypewriter(ROLES);
  

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-5xl mx-auto relative">
      <div className="mb-4">
        <span className="font-mono text-sm tracking-[0.3em] uppercase" style={{ color: "var(--accent)" }}>
          &gt; init portfolio.exe
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-4" style={{ color: "var(--text)" }}>
        Hi, I'm{" "}
        <span style={{
          backgroundImage: "linear-gradient(90deg, var(--accent), var(--lavender))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {OWNER.name}
        </span>
      </h1>

      <div className="flex items-center gap-2 mb-8 h-10">
        <span className="text-xl md:text-2xl font-mono" style={{ color: "var(--lavender)" }}>{role}</span>
        <span className="w-0.5 h-7 inline-block animate-pulse" style={{ backgroundColor: "var(--accent)" }} />
      </div>

      <p className="text-base md:text-lg max-w-xl leading-relaxed mb-10 font-light" style={{ color: "var(--text-muted)" }}>
        B.Sc CS student at {OWNER.college} — building real-world full-stack apps,
        shipping clean UIs, and obsessing over backend architecture.
      </p>

      <div className="flex flex-wrap gap-4">
        <a
          href="#projects"
          className="px-6 py-3 text-white font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ backgroundColor: "var(--accent)" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
        >
          VIEW PROJECTS
        </a>
        <a
          href="#contact"
          className="px-6 py-3 font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          GET IN TOUCH
        </a>
        <a
          href={OWNER.resumeHref}
          className="flex items-center gap-2 px-6 py-3 font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <DownloadIcon /> RESUME
        </a>
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "var(--accent-soft)" }} />
    </section>
  );
}