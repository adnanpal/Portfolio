import { motion } from "motion/react";
import { ArrowUpRightIcon, ExternalIcon, GithubIcon } from "@/components/icons/Icons";
import type { Project } from "@/data/portfolioData";

type ProjectCardProps = { project: Project; index: number };

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const isInProgress = project.status === "In Progress";

  return (
    <motion.article initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.55, delay: (index % 3) * 0.07 }} whileHover={{ y: -8 }} className="group overflow-hidden border border-[var(--border-strong)] bg-[var(--bg)] transition-shadow duration-300 hover:shadow-[7px_7px_0_var(--text)]" data-testid={`project-card-${slug}`}>
      <div className="relative h-44 overflow-hidden bg-[var(--surface)] p-5 transition-transform duration-500 group-hover:scale-[1.02]">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(135deg,transparent 45%,var(--text-dim) 46%,transparent 47%),linear-gradient(45deg,transparent 45%,var(--text-dim) 46%,transparent 47%)", backgroundSize: "28px 28px" }} aria-hidden="true" />
        <div className="relative flex items-start justify-between"><span className="font-mono text-[11px] font-bold">/0{index + 1}</span><span className="flex items-center gap-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em]"><span className={`h-1.5 w-1.5 rounded-full ${isInProgress ? "animate-pulse bg-amber-500" : "bg-emerald-600"}`} />{project.status}</span></div>
        <p className="absolute bottom-4 left-5 max-w-[88%] font-heading text-4xl font-extrabold uppercase leading-[0.85] tracking-[-0.085em] text-[var(--text)] sm:text-5xl" data-testid={`project-visual-title-${slug}`}>{project.name.split(" ")[0]}</p>
      </div>
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4"><h3 className="font-heading text-2xl font-bold tracking-[-0.06em]" data-testid={`project-title-${slug}`}>{project.name}</h3><ArrowUpRightIcon size={18} className="shrink-0 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" /></div>
        <p className="mt-4 min-h-[72px] text-sm leading-relaxed text-[var(--text-muted)]" data-testid={`project-description-${slug}`}>{project.desc}</p>
        <div className="mt-5 flex flex-wrap gap-1.5" data-testid={`project-tags-${slug}`}>{project.tags.map((tag) => <span key={tag} className="border border-[var(--border-soft)] px-2 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--text-muted)]">{tag}</span>)}</div>
        <div className="mt-6 flex min-h-8 items-center gap-5 border-t border-[var(--border-soft)] pt-4">
          {project.github && <a href={project.github} target={project.github === "#" ? undefined : "_blank"} rel="noreferrer" className="inline-flex items-center gap-2 border-b border-[var(--text)] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-[var(--text-muted)]" data-testid={`project-code-${slug}`}><GithubIcon size={13} aria-hidden="true" /> Code</a>}
          {project.demo && <a href={project.demo} target={project.demo === "#" ? undefined : "_blank"} rel="noreferrer" className="inline-flex items-center gap-2 border-b border-[var(--text)] pb-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition-[gap,color] duration-200 hover:gap-3 hover:text-[var(--text-muted)]" data-testid={`project-demo-${slug}`}><ExternalIcon size={13} aria-hidden="true" /> Live demo</a>}
        </div>
      </div>
    </motion.article>
  );
}