import { ContactForm } from "../components/ContactForm";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Book a Meeting or Contact BioPancrea",
  description: "Book a meeting with the BioPancrea team or send a message about its investigational artificial-pancreas concept.",
  path: "/contact",
});

function configuredBookingUrl() {
  const value = process.env.NEXT_PUBLIC_BOOKING_URL;
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function ContactPage() {
  const bookingUrl = configuredBookingUrl();

  return (
    <main className="contact-split">
      <section className="contact-introduction" data-reveal>
        <div className="contact-introduction-copy">
          <p className="contact-label" data-reveal-label>CONTACT</p>
          <h1 data-reveal-heading>Let’s talk.</h1>
          <p data-reveal-copy>Book a meeting or send the BioPancrea team a message.</p>
          <i className="contact-coral-line" aria-hidden="true" />
          <div className="booking-panel" id="book-a-meeting">
            <p className="booking-index">01</p>
            <h2>Book a meeting</h2>
            <p>Choose a time that works for you.</p>
            {bookingUrl ? (
              <a className="button booking-provider-link" href={bookingUrl} target="_blank" rel="noopener noreferrer">
                Open booking calendar <span aria-hidden="true">→</span>
              </a>
            ) : null}
            {!bookingUrl && process.env.NODE_ENV !== "production" ? (
              <p className="booking-setup-note">Set NEXT_PUBLIC_BOOKING_URL to enable online scheduling.</p>
            ) : null}
          </div>
        </div>
      </section>
      <section className="contact-form-panel" aria-labelledby="message-heading" data-reveal>
        <header className="contact-form-heading">
          <p className="contact-label" data-reveal-label>02</p>
          <h2 id="message-heading" data-reveal-heading>Send a message</h2>
        </header>
        <div data-reveal-copy><ContactForm /></div>
      </section>
    </main>
  );
}
