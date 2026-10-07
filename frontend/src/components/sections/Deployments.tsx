import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ActivityIcon, CheckIcon, CloudIcon, GlobeIcon, TerminalIcon } from "@/components/icons/Icons";

const PLATFORMS = [
  {
    key: "aws",
    name: "AWS",
    eyebrow: "01 / CLOUD INFRASTRUCTURE",
    description: "Composable infrastructure for apps that need room to grow.",
    services: ["S3 + CloudFront", "EC2 compute", "IAM permissions"],
    log: ["s3://portfolio-assets synced", "cloudfront distribution ready", "iam policy checked"],
    icon: CloudIcon,
  },
  {
    key: "vercel",
    name: "Vercel",
    eyebrow: "02 / EDGE DELIVERY",
    description: "Fast, frictionless shipping from a clean Git workflow.",
    services: ["Edge network", "Git deployments", "Serverless functions"],
    log: ["production branch detected", "preview deployment created", "edge cache warmed"],
    icon: GlobeIcon,
  },
  {
    key: "render",
    name: "Render",
    eyebrow: "03 / SERVICE HOSTING",
    description: "Straightforward hosting for APIs, workers, and data services.",
    services: ["Node.js services", "PostgreSQL hosting", "Background workers"],
    log: ["build command completed", "service health check passed", "worker listening on :8000"],
    icon: ActivityIcon,
  },
] as const;

const title = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
} as const;

const titleLine = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.78, ease: "easeOut" } },
} as const;

export default function Deployments() {
  const [activeKey, setActiveKey] = useState("aws");
  const active = PLATFORMS.find((platform) => platform.key === activeKey) ?? PLATFORMS[0];
  const ActiveIcon = active.icon;

  return (
    <section id="deployments" className="scroll-mt-20 border-y border-[var(--border-strong)] bg-[var(--surface)] py-20 sm:py-28" data-testid="deployments-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--text-muted)]" data-testid="deployments-section-label"><span className="inline-flex h-7 min-w-7 items-center justify-center bg-[var(--text)] px-1 text-[10px] text-[var(--bg)]">03</span><span>Deployments</span></div>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} variants={title} className="mt-8 max-w-md font-heading text-5xl font-bold uppercase leading-[0.88] tracking-[-0.07em] sm:text-7xl" data-testid="deployments-heading">
              <span className="block overflow-hidden"><motion.span className="block" variants={titleLine} data-testid="deployments-heading-ship">Ship it.</motion.span></span>
              <span className="block overflow-hidden"><motion.span className="block text-[var(--text-dim)]" variants={titleLine} data-testid="deployments-heading-scale">Scale it.</motion.span></span>
            </motion.h2>
            <p className="mt-7 max-w-sm text-base leading-relaxed text-[var(--text-muted)]" data-testid="deployments-description">A focused toolkit for moving projects from a local machine to a dependable public URL.</p>
            <p className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-muted)]" data-testid="deployments-status"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Systems operational</p>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 border-b border-[var(--border-soft)] pb-5" role="tablist" aria-label="Deployment platforms" data-testid="deployment-tabs">
              {PLATFORMS.map((platform) => <button type="button" key={platform.key} onClick={() => setActiveKey(platform.key)} className={`border px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-[background-color,color,border-color] duration-200 ${activeKey === platform.key ? "border-[var(--border-strong)] bg-[var(--text)] text-[var(--bg)]" : "border-[var(--border-soft)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--text)]"}`} role="tab" aria-selected={activeKey === platform.key} data-testid={`deployment-tab-${platform.key}`}>{platform.name}</button>)}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={active.key} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.3 }} className="mt-7 border border-[var(--border-strong)] bg-[var(--bg)] p-6 sm:p-8" role="tabpanel" data-testid={`deployment-panel-${active.key}`}>
                <div className="flex items-start justify-between gap-5"><div><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]" data-testid="deployment-eyebrow">{active.eyebrow}</p><h3 className="mt-3 font-heading text-4xl font-bold tracking-[-0.06em]" data-testid="deployment-name">{active.name}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--text-muted)]" data-testid="deployment-panel-description">{active.description}</p></div><ActiveIcon size={34} strokeWidth={1.3} aria-hidden="true" /></div>
                <div className="mt-9 grid gap-3 sm:grid-cols-3" data-testid="deployment-services">{active.services.map((service) => <div key={service} className="border-t-2 border-[var(--border-strong)] pt-3" data-testid={`deployment-service-${service.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}><p className="font-mono text-[10px] font-semibold uppercase leading-relaxed tracking-[0.1em]">{service}</p></div>)}</div>
                <div className="mt-9 border-t border-[var(--border-soft)] pt-5" data-testid="deployment-log"><div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-muted)]"><TerminalIcon size={13} aria-hidden="true" /> deployment.log</div><div className="space-y-2 font-mono text-[11px] text-[var(--text-muted)]">{active.log.map((entry, index) => <p key={entry} data-testid={`deployment-log-entry-${index + 1}`}><span className="mr-3 text-emerald-600">0{index + 1}</span>{entry}<CheckIcon size={12} className="ml-2 inline text-emerald-600" aria-hidden="true" /></p>)}</div></div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}