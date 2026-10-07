import { motion } from "motion/react";
import { useState, type ChangeEvent, type FocusEvent } from "react";
import { SendIcon } from "@/components/icons/Icons";
import { OWNER } from "@/data/portfolioData";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState<"sent" | "error" | null>(null);
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleFocus = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { event.currentTarget.style.borderColor = "var(--border-strong)"; };
  const handleBlur = (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => { event.currentTarget.style.borderColor = "var(--border-soft)"; };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${OWNER.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    setForm(INITIAL_FORM);
  };

  const fieldClass = "w-full border border-[var(--border-soft)] bg-[var(--surface)] px-4 py-3 font-mono text-sm text-[var(--text)] outline-none transition-colors duration-200 placeholder:text-[var(--text-dim)]";
  const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--text-dim)]";

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }} className="border border-[var(--border-strong)] p-5 sm:p-6" data-testid="contact-form">
      <div className="mb-6 flex items-center justify-between border-b border-[var(--border-soft)] pb-4"><h3 className="font-heading text-xl font-bold tracking-[-0.04em]" data-testid="contact-form-heading">Send a message</h3><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-dim)]">Direct email</span></div>
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="contact-name" className={labelClass}>Name *</label><input id="contact-name" name="name" value={form.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Your name" className={fieldClass} data-testid="contact-name-input" /></div><div><label htmlFor="contact-email" className={labelClass}>Email *</label><input id="contact-email" type="email" name="email" value={form.email} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="you@example.com" className={fieldClass} data-testid="contact-email-input" /></div></div>
        <div><label htmlFor="contact-subject" className={labelClass}>Subject</label><input id="contact-subject" name="subject" value={form.subject} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} placeholder="Internship / Project idea / etc." className={fieldClass} data-testid="contact-subject-input" /></div>
        <div><label htmlFor="contact-message" className={labelClass}>Message *</label><textarea id="contact-message" name="message" value={form.message} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} rows={5} placeholder="Tell me about the opportunity or project..." className={`${fieldClass} resize-none`} data-testid="contact-message-input" /></div>
        {status === "error" && <p className="font-mono text-xs text-red-500" data-testid="contact-form-error">Please fill in Name, Email, and Message.</p>}
        {status === "sent" && <p className="font-mono text-xs text-emerald-500" data-testid="contact-form-success">✓ Opening your email client...</p>}
        <button type="button" onClick={handleSubmit} className="flex w-full items-center justify-center gap-2 bg-[var(--text)] py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--bg)] transition-transform duration-200 hover:-translate-y-0.5" data-testid="contact-submit-button"><SendIcon size={15} aria-hidden="true" /> Send message</button>
      </div>
    </motion.div>
  );
}