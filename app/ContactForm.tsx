"use client";

import { FormEvent, useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      `BioPancrea enquiry from ${String(form.get("name") || "website visitor")}`,
    );
    const body = encodeURIComponent(
      `Name: ${form.get("name")}\nEmail: ${form.get("email")}\nOrganisation: ${form.get("organisation")}\n\n${form.get("message")}`,
    );
    setSubmitted(true);
    window.location.href = `mailto:hello@biopancrea.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="field-row">
        <label>
          <span>Name</span>
          <input name="name" type="text" autoComplete="name" required />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        <span>Organisation <small>Optional</small></span>
        <input name="organisation" type="text" autoComplete="organization" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows={4} required />
      </label>
      <div className="form-submit">
        <button type="submit">Send enquiry <span aria-hidden="true">↗</span></button>
        <p aria-live="polite">
          {submitted ? "Your email application is opening." : "We treat every conversation with discretion."}
        </p>
      </div>
    </form>
  );
}
