// ─────────────────────────────────────────────
// src/components/sections/Contact/Contact.jsx
// Composes ContactLinks + ContactForm side by side.
// ─────────────────────────────────────────────

import SectionHeader from "../../ui/SectionHeader";
import Footer from "../../layout/Footer";
import ContactLinks from "./ContactLinks";
import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto">
      <SectionHeader index="04" label="Contact" title="Let's" accent="Connect" />

      <p className="space-y-4 leading-relaxed mb-12 max-w-md -mt-6"
      style = {{color: 'var(--text-muted)'}}>
        Open to internship roles, freelance projects, and interesting collaborations.
        Drop a message.
      </p>

      <div className="grid md:grid-cols-2 gap-12">
        <ContactLinks />
        <ContactForm />
      </div>

      <Footer />
    </section>
  );
}