"use client";

import { FormEvent, useState } from "react";

const interests = ["Research", "Clinical collaboration", "Strategic partnership", "Investment", "Media", "General enquiry"];

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => null);
    setState(response?.ok ? "success" : "error");
    if (response?.ok) event.currentTarget.reset();
  }

  if (state === "success") {
    return (
      <div className="form-success" role="status">
        <span aria-hidden="true">✓</span>
        <p>Thank you</p>
        <h2>Your message has been received.</h2>
        <p>We appreciate your interest in BioPancrea and will review your enquiry with care.</p>
        <button type="button" onClick={() => setState("idle")}>Send another message</button>
      </div>
    );
  }

  return (
    <form className={`contact-form${compact ? " contact-form-compact" : ""}`} onSubmit={handleSubmit}>
      <div className="field-row">
        <label><span>Name</span><input name="name" type="text" autoComplete="name" maxLength={100} required /></label>
        <label><span>Email</span><input name="email" type="email" autoComplete="email" maxLength={180} required /></label>
      </div>
      <div className="field-row">
        <label><span>Organisation <small>Optional</small></span><input name="organisation" type="text" autoComplete="organization" maxLength={140} /></label>
        <label><span>Area of interest</span><select name="interest" defaultValue="" required><option value="" disabled>Select an area</option>{interests.map((interest) => <option key={interest}>{interest}</option>)}</select></label>
      </div>
      <label><span>Message</span><textarea name="message" rows={compact ? 3 : 5} maxLength={3000} required /></label>
      <label className="consent-field"><input name="consent" type="checkbox" value="yes" required /><span>I agree that BioPancrea may use these details to respond to my enquiry. See our <a href="/privacy">Privacy Policy</a>.</span></label>
      <div className="form-submit">
        <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send enquiry"}<span aria-hidden="true">↗</span></button>
        <p aria-live="polite">{state === "error" ? "We couldn’t send your message. Please try again." : "We treat every conversation with discretion."}</p>
      </div>
    </form>
  );
}
