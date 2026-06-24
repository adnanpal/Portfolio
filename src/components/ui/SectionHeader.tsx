// src/components/ui/SectionHeader.jsx
type SectionHeaderProps = {
  index: string;
  label: string;
  title: string;
  accent: string;
};
export default function SectionHeader({ index, label, title, accent }: SectionHeaderProps) {

  return (
    <div className="mb-12">
      <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--accent)" }}>
        {index} — {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "var(--text)" }}>
        {title}{" "}
        {accent && <span style={{ color: "var(--lavender)" }}>{accent}</span>}
      </h2>
    </div>
  );
}