import { motion } from "motion/react";
import { OWNER, ROLES } from "@/data/portfolioData";
import { useTypewriter } from "@/hooks/useTypewriter";
import { ArrowDownRightIcon, ArrowUpRightIcon, DownloadIcon, MapPinIcon, TerminalIcon } from "@/components/icons/Icons";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
} as const;

const word = {
  hidden: { opacity: 0, y: 46, rotateX: -82 },
  visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.72, ease: "easeOut" } },
} as const;

export default function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="top" className="relative mx-auto grid min-h-[760px] max-w-7xl items-end gap-12 px-4 pb-20 pt-36 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:pb-28 lg:pt-44" data-testid="hero-section">
      <div className="pointer-events-none absolute inset-0 -z-10 hero-grid opacity-60" aria-hidden="true" />
      <div className="absolute left-4 top-28 h-px w-20 bg-[var(--text)] sm:left-8 lg:left-12" aria-hidden="true" />

      <motion.div variants={container} initial="hidden" animate="visible" className="relative">
        <motion.p variants={reveal} className="mb-8 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]" data-testid="hero-kicker"><span className="inline-flex h-7 min-w-7 items-center justify-center bg-[var(--text)] px-1 text-[10px] text-[var(--bg)]">00</span> Portfolio.exe</motion.p>
        <motion.h1 variants={container} className="max-w-4xl [perspective:900px] font-heading text-[clamp(3.7rem,10vw,9rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.085em]" aria-label={`Hi, I'm ${OWNER.name}`} data-testid="hero-heading">
          {["Hi,", "I'm", "Adnan", "Pal"].map((item, index) => <motion.span key={item} variants={word} className={`mr-[0.16em] inline-block ${index === 3 ? "bg-[var(--text)] px-[0.08em] text-[var(--bg)]" : ""}`} data-testid={`hero-word-${index + 1}`}>{item}</motion.span>)}
        </motion.h1>
        <motion.div variants={reveal} className="mt-8 flex min-h-8 items-center gap-2" data-testid="hero-typewriter">
          <span className="font-mono text-sm uppercase tracking-[0.12em] text-[var(--text-muted)] sm:text-base">{role}</span><span className="inline-block h-5 w-0.5 animate-pulse bg-[var(--text)]" aria-hidden="true" />
        </motion.div>
        <motion.div variants={reveal} className="mt-8 max-w-2xl">
          <p className="max-w-xl text-lg leading-relaxed text-[var(--text-muted)]" data-testid="hero-description">B.Sc CS student at {OWNER.college} — building real-world full-stack apps, shipping clean UIs, and obsessing over backend architecture.</p>
          <p className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]" data-testid="hero-location"><MapPinIcon size={14} aria-hidden="true" />{OWNER.location}</p>
        </motion.div>
        <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-4" data-testid="hero-actions">
          <a href="#projects" className="inline-flex items-center gap-3 bg-[var(--text)] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-transform duration-200 hover:-translate-y-1" data-testid="hero-projects-link">View projects <ArrowDownRightIcon size={15} aria-hidden="true" /></a>
          <a href="#contact" className="inline-flex items-center gap-2 border-b border-[var(--text)] pb-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-[var(--text-muted)]" data-testid="hero-contact-link">Get in touch <ArrowUpRightIcon size={15} aria-hidden="true" /></a>
          <a href={OWNER.resumeHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)] transition-colors duration-200 hover:text-[var(--text)]" data-testid="hero-resume-link"><DownloadIcon size={14} aria-hidden="true" /> Resume</a>
        </motion.div>
      </motion.div>

      <div className="relative lg:-translate-x-[4%] lg:-translate-y-56 lg:w-[108%] xl:-translate-y-72" data-testid="hero-terminal-card">
        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.35 }} className="relative">
          <div className="absolute -right-2 -top-2 h-full w-full border border-[var(--border-soft)]" aria-hidden="true" />
          <div className="relative border border-[var(--border-strong)] bg-[var(--surface)] p-5 shadow-[8px_8px_0_var(--text)] sm:p-7 lg:p-8">
            <div className="mb-10 flex items-center justify-between border-b border-[var(--border-soft)] pb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]" data-testid="terminal-header"><span className="flex items-center gap-2"><TerminalIcon size={13} aria-hidden="true" /> ~/adnan</span><span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />online</span></div>
            <div className="space-y-5 font-mono text-xs leading-relaxed sm:text-sm" data-testid="terminal-content">
              <p><span className="mr-2 text-[var(--text-dim)]">$</span><span className="text-[var(--text-muted)]">cat</span> adnan.json</p>
              <div className="border-l-2 border-[var(--text)] pl-4 text-[var(--text-muted)]">
                <p><span className="text-[var(--text)]">name:</span> "{OWNER.name}",</p>
                <p><span className="text-[var(--text)]">college:</span> "{OWNER.college}",</p>
                <p><span className="text-[var(--text)]">batch:</span> "{OWNER.batch}",</p>
                <p><span className="text-[var(--text)]">focus:</span> [React, Node, AI/ML],</p>
                <p><span className="text-[var(--text)]">status:</span> "Open to internships"</p>
              </div>
              <p><span className="mr-2 text-[var(--text-dim)]">$</span><span className="inline-block h-4 w-2 animate-pulse bg-[var(--text)] align-middle" /></p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}