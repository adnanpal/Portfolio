import { motion } from "motion/react";

type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  accent: string;
};

const heading = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
} as const;

const line = {
  hidden: { opacity: 0, y: "105%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.72, ease: "easeOut" } },
} as const;

export default function SectionHeader({ index, label, title, accent }: SectionHeaderProps) {
  const slug = label.toLowerCase();
  return (
    <div className="mb-10" data-testid={`${slug}-section-header`}>
      <div className="flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--section-muted,var(--text-muted))]" data-testid={`${slug}-section-label`}>
        <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden bg-[var(--section-text,var(--text))] font-mono text-[10px] leading-none text-[var(--section-bg,var(--bg))]" data-testid={`${slug}-section-number`}>{index}</span>
        <span>{label}</span>
      </div>
      <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.65 }} variants={heading} className="mt-6 font-heading text-4xl font-bold uppercase leading-[0.9] tracking-[-0.065em] text-[var(--section-text,var(--text))] sm:text-6xl lg:text-7xl" data-testid={`${slug}-heading`}>
        <span className="inline-block overflow-hidden align-bottom"><motion.span className="inline-block" variants={line}>{title}</motion.span></span>{" "}
        {accent && <span className="inline-block overflow-hidden align-bottom"><motion.span className="inline-block text-[var(--section-dim,var(--text-dim))]" variants={line}>{accent}</motion.span></span>}
      </motion.h2>
    </div>
  );
}