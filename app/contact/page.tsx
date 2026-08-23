import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact", description: "Contact BioPancrea, an early-stage biotechnology startup." };

const contactEmail = "d.suresh22@taylorshill.ie";
const emailHref = "mailto:d.suresh22@taylorshill.ie?subject=BioPancrea%20enquiry";

export default function ContactPage() {
  return (
    <main>
      <section className="simple-contact container">
        <p className="eyebrow"><span>03</span>Contact</p>
        <h1>Want to connect?</h1>
        <p>Email us at <a className="contact-email-link" href={emailHref}>{contactEmail}</a></p>
        <a className="button button-dark contact-email-button" href={emailHref}>Send an email</a>
      </section>
    </main>
  );
}
