// src/components/sections/Contact/ContactForm.jsx
import { useState } from "react";
import { OWNER } from "../../../data/portfolioData";
import { SendIcon } from "../../icons/Icons";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) { setStatus("error"); return; }
    const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`;
    window.location.href = `mailto:${OWNER.email}?subject=${encodeURIComponent(form.subject || "Portfolio Contact")}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
    setForm(INITIAL_FORM);
  };

  const inputStyle = {
    width: "100%",
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--input-border)",
    borderRadius: "2px",
    padding: "12px 16px",
    color: "var(--text)",
    fontSize: "14px",
    fontFamily: "'DM Mono', monospace",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontFamily: "'DM Mono', monospace",
    color: "var(--text-dim)",
    fontSize: "11px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    marginBottom: "8px",
  };

  const handleFocus = (e) => e.target.style.borderColor = "var(--border-hover)";
  const handleBlur  = (e) => e.target.style.borderColor = "var(--input-border)";

  return (
    <div className="rounded-lg p-6" style={{ border: "1px solid var(--border)" }}>
      <h3 className="font-mono text-xs tracking-widest uppercase mb-6" style={{ color: "var(--accent)" }}>
        Send a Message
      </h3>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange}
              placeholder="Your name" style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur} />
          </div>
          <div>
            <label style={labelStyle}>Email *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" style={inputStyle}
              onFocus={handleFocus} onBlur={handleBlur} />
          </div>
        </div>

        <div>
          <label style={labelStyle}>Subject</label>
          <input type="text" name="subject" value={form.subject} onChange={handleChange}
            placeholder="Internship / Project idea / etc." style={inputStyle}
            onFocus={handleFocus} onBlur={handleBlur} />
        </div>

        <div>
          <label style={labelStyle}>Message *</label>
          <textarea name="message" value={form.message} onChange={handleChange} rows={5}
            placeholder="Tell me about the opportunity or project..."
            style={{ ...inputStyle, resize: "none" }}
            onFocus={handleFocus} onBlur={handleBlur} />
        </div>

        {status === "error" && (
          <p className="text-xs font-mono text-red-500">Please fill in Name, Email, and Message.</p>
        )}
        {status === "sent" && (
          <p className="text-xs font-mono text-green-500">✓ Opening your email client...</p>
        )}

        <button onClick={handleSubmit}
          className="flex items-center justify-center gap-2 w-full py-3 text-white font-mono text-sm tracking-widest rounded-sm transition-colors"
          style={{ backgroundColor: "var(--accent)" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--accent-hover)"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "var(--accent)"}
        >
          <SendIcon /> SEND MESSAGE
        </button>
      </div>
    </div>
  );
}