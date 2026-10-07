import { motion } from "motion/react";
import { OWNER } from "@/data/portfolioData";
import { BriefcaseIcon, DownloadIcon, GraduationIcon } from "@/components/icons/Icons";
import SectionHeader from "@/components/ui/SectionHeader";

export default function About() {
  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;

  return (
    <section id="about" className="editorial-inverse scroll-mt-20 border-y border-[var(--section-border)] py-20 sm:py-28" data-testid="about-section">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7 }} className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div><SectionHeader index="01" label="About" title="Code, Design," accent="Repeat." /></div>
        <div className="max-w-2xl lg:pt-10">
          <p className="text-2xl leading-tight tracking-[-0.03em] text-[var(--section-text)] sm:text-3xl" data-testid="about-lead">I build things that actually ship — from fluid React interfaces to real-time backends and systems that scale.</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-[var(--section-muted)]" data-testid="about-copy">
            <p>I'm a Computer Science graduate (2023–2026) who builds things that actually ship. My focus is the full stack — crafting fluid React UIs, wiring up real-time backends with Node.js and Socket.io, and designing systems that scale.</p>
            <p>I've built projects ranging from data structure visualizers to full-stack web applications. My flagship project, <strong className="font-medium text-[var(--section-text)]">BuildNet</strong>, helped me gain hands-on experience with React, TypeScript, Node.js, authentication systems, REST APIs, and PostgreSQL.</p>
          </div>
          <div className="mt-10 grid gap-5 border-t border-[var(--section-border)] pt-6 sm:grid-cols-2" data-testid="about-facts">
            <div className="flex items-start gap-3"><GraduationIcon size={18} className="mt-0.5" aria-hidden="true" /><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--section-dim)]">Education</p><p className="mt-1 text-sm">B.Sc Computer Science · {OWNER.batch}</p></div></div>
            <div className="flex items-start gap-3"><BriefcaseIcon size={18} className="mt-0.5" aria-hidden="true" /><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--section-dim)]">Availability</p><p className="mt-1 text-sm">Open to internships & freelance</p></div></div>
          </div>
          <div className="mt-10 flex flex-wrap gap-6">
            <a href={hireMeHref} className="border-b border-[var(--section-text)] pb-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em]" data-testid="about-hire-me-link">Hire me ↗</a>
            <a href={OWNER.resumeHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--section-muted)] transition-colors duration-200 hover:text-[var(--section-text)]" data-testid="about-resume-link">Resume <DownloadIcon size={14} aria-hidden="true" /></a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}