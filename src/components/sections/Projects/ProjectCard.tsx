// src/components/sections/Projects/ProjectCard.jsx
import { GithubIcon, ExternalIcon } from "../../icons/Icons";

export default function ProjectCard({ project }) {
  const { name, desc, tags, status, github, demo } = project;
  const isInProgress = status === "In Progress";

  return (
    <div
      className="rounded-lg p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col"
      style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-card)" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hover)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg transition-colors" style={{ color: "var(--text)" }}>
          {name}
        </h3>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          isInProgress
            ? "border-yellow-500/40 text-yellow-500"
            : "border-green-500/40 text-green-500"
        }`}>
          {status}
        </span>
      </div>

      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--text-muted)" }}>{desc}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-1 rounded-sm"
            style={{
              backgroundColor: "var(--accent-soft)",
              color: "var(--lavender)",
              border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)"
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
        {github && (
          <a href={github} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono transition-colors"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--lavender)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
          >
            <GithubIcon /> Code
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono transition-colors"
            style={{ color: "var(--text-dim)" }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--lavender)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--text-dim)"}
          >
            <ExternalIcon /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
}