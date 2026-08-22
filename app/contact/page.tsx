import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "Connect with BioPancrea." };

const contactEmail: string | null = null;

export default function ContactPage() {
  const emailHref = contactEmail ? `mailto:${contactEmail}?subject=${encodeURIComponent("BioPancrea enquiry")}` : null;

  return (
    <main>
      <section className="simple-contact container">
        <p className="eyebrow"><span>03</span>Contact</p>
        <h1>Want to connect?</h1>
        <p>Connect here.</p>
        {contactEmail && emailHref ? (
          <>
            <a className="contact-email-link" href={`mailto:${contactEmail}`}>{contactEmail}</a>
            <a className="button button-dark" href={emailHref}>Send an email</a>
          </>
        ) : (
          <div className="contact-email-pending">
            <span>Contact email pending confirmation</span>
            <span className="button button-disabled" aria-disabled="true">Send an email</span>
          </div>
        )}
      </section>
    </main>
  );
}
