import { motion } from "motion/react";
import { CodeIcon, DatabaseIcon, ServerIcon, WrenchIcon } from "@/components/icons/Icons";
import { SKILLS } from "@/data/portfolioData";
import SectionHeader from "@/components/ui/SectionHeader";

const ICONS = { Frontend: CodeIcon, Backend: ServerIcon, Database: DatabaseIcon, Tools: WrenchIcon } as const;

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="skills-section">
      <div className="flex flex-col justify-between gap-5 border-b-2 border-[var(--border-strong)] pb-2 sm:flex-row sm:items-end"><SectionHeader index="02" label="Skills" title="Tech" accent="Stack" /><p className="mb-10 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[var(--text-muted)]" data-testid="skills-description">Tools for building useful things<br />from interface to infrastructure.</p></div>
      <div className="mt-8 grid border-l border-t border-[var(--border-strong)] sm:grid-cols-2 lg:grid-cols-4" data-testid="skills-grid">
        {Object.entries(SKILLS).map(([category, items], index) => {
          const Icon = ICONS[category as keyof typeof ICONS];
          return <motion.article key={category} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -5 }} className="border-b border-r border-[var(--border-strong)] bg-[var(--bg)] p-6 transition-colors duration-200 hover:bg-[var(--surface)] sm:p-7" data-testid={`skill-card-${category.toLowerCase()}`}>
            <div className="flex items-center justify-between"><Icon size={22} strokeWidth={1.5} aria-hidden="true" /><span className="font-mono text-[10px] text-[var(--text-dim)]">0{index + 1}</span></div>
            <h3 className="mt-12 font-heading text-2xl font-bold tracking-[-0.05em]" data-testid={`skill-title-${category.toLowerCase()}`}>{category}</h3>
            <div className="mt-5 space-y-2">{items.map((skill) => <p key={skill} className="flex items-center justify-between border-t border-[var(--border-soft)] pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--text-muted)]" data-testid={`skill-${skill.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><span>{skill}</span><span className="text-[var(--text-dim)]">↗</span></p>)}</div>
          </motion.article>;
        })}
      </div>
    </section>
  );
}