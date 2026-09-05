// src/components/sections/Contact/ContactLinks.jsx
import { OWNER } from "../../../data/portfolioData";
import { MailIcon, LinkedInIcon, GithubIcon, DownloadIcon } from "../../icons/Icons";

const SOCIAL_LINKS = [
  { label: "Email",    value: OWNER.email,    href: `mailto:${OWNER.email}`,  icon: <MailIcon /> },
  { label: "LinkedIn", value: OWNER.linkedin, href: OWNER.linkedinHref,        icon: <LinkedInIcon /> },
  { label: "GitHub",   value: OWNER.github,   href: OWNER.githubHref,          icon: <GithubIcon /> },
];

export default function ContactLinks() {
  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
          Get In Touch
        </h3>
        <div className="space-y-3">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg transition-colors group"
              style={{ border: "1px solid var(--border)" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hover)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <span style={{ color: "var(--accent)" }}>{link.icon}</span>
              <div>
                <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "var(--accent)" }}>{link.label}</p>
                <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>{link.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-3 pt-2">
        <a href={hireMeHref}
          className="flex items-center justify-center gap-2 w-full py-3 text-white font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ backgroundColor: "var(--accent)" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
        >
          HIRE ME
        </a>
        <a href={OWNER.resumeHref}
          className="flex items-center justify-center gap-2 w-full py-3 font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.color = "var(--lavender)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-muted)"; }}
        >
          <DownloadIcon /> DOWNLOAD RESUME
        </a>
      </div>

      <div className="flex items-center gap-3 p-4 rounded-lg"
        style={{ border: "1px solid rgba(34,197,94,0.2)", backgroundColor: "rgba(34,197,94,0.05)" }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <p className="text-sm font-mono text-green-500">
          Available for internships &amp; freelance work
        </p>
      </div>
    </div>
  );
}