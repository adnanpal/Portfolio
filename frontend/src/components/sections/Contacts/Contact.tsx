import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import ContactForm from "./ContactForm";
import ContactLinks from "./ContactLinks";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-8 sm:py-28 lg:px-12" data-testid="contact-section">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20"><div><SectionHeader index="06" label="Contact" title="Let's" accent="Connect." /><p className="max-w-md text-lg leading-relaxed text-[var(--text-muted)]" data-testid="contact-description">Open to internship roles, freelance projects, and interesting collaborations. Drop a message.</p></div><div className="grid gap-10 xl:grid-cols-2"><ContactLinks /><ContactForm /></div></div>
      <Footer />
    </section>
  );
}