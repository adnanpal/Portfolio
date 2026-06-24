// src/components/ui/SectionHeader.jsx
export default function SectionHeader({ index, label, title, accent }) {
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