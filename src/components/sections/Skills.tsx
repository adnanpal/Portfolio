// src/components/sections/Skills.jsx
import { SKILLS } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader index="02" label="Skills" title="Tech" accent="Stack" />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(SKILLS).map(([category, items]) => (
          <div
            key={category}
            className="rounded-lg p-5 transition-colors group"
            style={{ border: "1px solid var(--border)" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hover)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <h3 className="font-mono text-xs tracking-widest uppercase mb-4 transition-colors"
              style={{ color: "var(--accent)" }}>
              {category}
            </h3>
            <ul className="space-y-2">
              {items.map((skill) => (
                <li key={skill} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}