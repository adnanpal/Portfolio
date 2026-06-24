// src/components/sections/About.jsx
import { OWNER } from "../../data/portfolioData";
import { DownloadIcon } from "../icons/Icons";
import SectionHeader from "../ui/SectionHeader";

export default function About() {
  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;

  return (
    <section id="about" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionHeader index="01" label="About" title="Code, Design," accent="Repeat." />
          <div className="space-y-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>
            <p>
              I'm a Computer Science graduate (2023–2026) who builds things that actually ship.
              My focus is the full stack — crafting fluid React UIs, wiring up real-time backends
              with Node.js and Socket.io, and designing systems that scale.
            </p>
            <p>
              I've built projects ranging from data structure visualizers to full-stack web applications.
              My flagship project,{" "}
              <span className="font-mono" style={{ color: "var(--lavender)" }}>
                BuildNet
              </span>
              , helped me gain hands-on experience with React, TypeScript, Node.js, authentication systems,
              REST APIs, and PostgreSQL. I'm currently looking for opportunities to apply these skills in
              real-world software development.
            </p>
          </div>
          <div className="flex gap-3 mt-8">
            <a
              href={hireMeHref}
              className="flex items-center gap-2 px-5 py-2.5 text-white font-mono text-xs tracking-widest rounded-sm transition-colors"
              style={{ backgroundColor: "var(--accent)" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
            >
              HIRE ME
            </a>
            <a
              href={OWNER.resumeHref}
              className="flex items-center gap-2 px-5 py-2.5 font-mono text-xs tracking-widest rounded-sm transition-colors"
              style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <DownloadIcon /> RESUME
            </a>
          </div>
        </div>

        {/* Terminal card */}
        <div className="rounded-lg p-6 font-mono text-sm"
          style={{ backgroundColor: "var(--terminal-bg)", border: "1px solid var(--terminal-border)" }}>
          <div className="flex gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <span className="w-3 h-3 rounded-full bg-green-400/70" />
          </div>
          <p className="mb-2" style={{ color: "var(--accent)" }}>$ cat adnan.json</p>
          <div className="space-y-1" style={{ color: "var(--text-muted)" }}>
            <p><span style={{ color: "var(--lavender)" }}>name</span>: <span className="text-green-500">"{OWNER.name}"</span>,</p>
            <p><span style={{ color: "var(--lavender)" }}>college</span>: <span className="text-green-500">"{OWNER.college}"</span>,</p>
            <p><span style={{ color: "var(--lavender)" }}>batch</span>: <span className="text-green-500">"{OWNER.batch}"</span>,</p>
            <p><span style={{ color: "var(--lavender)" }}>role</span>: <span className="text-green-500">"Full-Stack Dev"</span>,</p>
            <p><span style={{ color: "var(--lavender)" }}>focus</span>: [</p>
            <p className="pl-4 text-green-500">"React", "Node.js",</p>
            <p className="pl-4 text-green-500">"Socket.io", "AI/ML"</p>
            <p>],</p>
            <p><span style={{ color: "var(--lavender)" }}>status</span>: <span className="text-yellow-500">"Open to internships"</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}