import { motion } from "motion/react";
import { ArrowUpRightIcon, DownloadIcon, GithubIcon, LinkedInIcon, MailIcon } from "@/components/icons/Icons";
import { OWNER } from "@/data/portfolioData";

const SOCIAL_LINKS = [
  { label: "Email", value: OWNER.email, href: `mailto:${OWNER.email}`, icon: MailIcon },
  { label: "LinkedIn", value: OWNER.linkedin, href: OWNER.linkedinHref, icon: LinkedInIcon },
  { label: "GitHub", value: OWNER.github, href: OWNER.githubHref, icon: GithubIcon },
] as const;

export default function ContactLinks() {
  const hireMeHref = `mailto:${OWNER.email}?subject=Hiring%20Inquiry&body=Hi%20Adnan%2C%20I%20came%20across%20your%20portfolio%20and%20would%20love%20to%20discuss%20an%20opportunity.`;
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }} data-testid="contact-links">
      <div className="border-t-2 border-[var(--border-strong)]">
        {SOCIAL_LINKS.map((link) => { const Icon = link.icon; return <a key={link.label} href={link.href} target={link.label === "Email" ? undefined : "_blank"} rel="noreferrer" className="group flex items-center justify-between border-b border-[var(--border-soft)] py-5 transition-[padding,color] duration-200 hover:pl-2 hover:text-[var(--text-muted)]" data-testid={`contact-${link.label.toLowerCase()}-link`}><span className="flex min-w-0 items-center gap-4"><Icon size={20} strokeWidth={1.5} className="shrink-0" aria-hidden="true" /><span className="min-w-0"><span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]">{link.label}</span><span className="mt-1 block truncate text-base sm:text-lg">{link.value}</span></span></span><ArrowUpRightIcon size={18} className="shrink-0" aria-hidden="true" /></a>; })}
      </div>
      <div className="mt-8 flex flex-wrap gap-3"><a href={hireMeHref} className="inline-flex items-center gap-3 bg-[var(--text)] px-5 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--bg)] transition-transform duration-200 hover:-translate-y-1" data-testid="contact-hire-me-link">Hire me <ArrowUpRightIcon size={15} /></a><a href={OWNER.resumeHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--border-strong)] px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em]" data-testid="contact-resume-link"><DownloadIcon size={14} /> Download resume</a></div>
      <p className="mt-8 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em]" data-testid="contact-availability"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Available for internships & freelance work</p>
    </motion.div>
  );
}