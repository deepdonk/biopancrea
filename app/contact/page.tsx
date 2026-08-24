import type { Metadata } from "next";
import { ContactForm } from "../components/ContactForm";
import { PlatformModel } from "../components/PlatformModel";

export const metadata: Metadata = { title: "Contact", description: "Contact BioPancrea, an early-stage biotechnology startup." };

export default function ContactPage() {
  return (
    <main className="contact-split">
      <section className="contact-introduction">
        <div className="contact-introduction-copy">
          <p className="contact-label">CONTACT</p>
          <h1>Want to connect?</h1>
          <p>Send us a message and we’ll get back to you.</p>
          <i className="contact-coral-line" aria-hidden="true" />
        </div>
        <div className="contact-lattice" aria-hidden="true">
          <PlatformModel id="contact-lattice" showFlow={false} showLabels={false} />
        </div>
      </section>
      <section className="contact-form-panel" aria-label="Send BioPancrea a message">
        <ContactForm />
      </section>
    </main>
  );
}
