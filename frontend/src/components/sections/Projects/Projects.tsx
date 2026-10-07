import { PROJECTS } from "@/data/portfolioData";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="projects-section">
      <div className="flex flex-col justify-between gap-5 border-b-2 border-[var(--border-strong)] pb-2 sm:flex-row sm:items-end"><SectionHeader index="03" label="Projects" title="Things I've" accent="Built" /><p className="mb-10 max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-[var(--text-muted)]" data-testid="projects-description">Experiments, products,<br />and a lot of shipped code.</p></div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-testid="projects-grid">{PROJECTS.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
    </section>
  );
}