// ─────────────────────────────────────────────
// src/components/sections/Projects/Projects.jsx
// Grid of ProjectCard components.
// ─────────────────────────────────────────────

import { PROJECTS } from "../../../data/portfolioData";
import SectionHeader from "../../ui/SectionHeader";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader index="03" label="Projects" title="Things I've" accent="Built" />

      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}