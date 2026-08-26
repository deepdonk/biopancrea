"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

const initialFields = { name: "", email: "", message: "", website: "" };

export function ContactForm() {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field: keyof typeof fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    if (status === "error") {
      setStatus("idle");
      setErrorMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setErrorMessage("Please check your details. Your message must be at least 10 characters.");
        } else if (response.status === 429) {
          setErrorMessage("Too many attempts. Please wait a few minutes and try again.");
        } else {
          setErrorMessage("We couldn’t send your message. Please try again later.");
        }
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("We couldn’t send your message. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success" role="status" aria-live="polite">
        <span aria-hidden="true">✓</span>
        <h2>Message sent. We’ll get back to you.</h2>
      </div>
    );
  }

  return (
    <form className="contact-message-form" onSubmit={handleSubmit} noValidate>
      <div className={`contact-form-field${fields.name ? " has-value" : ""}`}>
        <label htmlFor="contact-name">Name</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          minLength={2}
          maxLength={100}
          required
          value={fields.name}
          onChange={(event) => updateField("name", event.target.value)}
        />
      </div>

      <div className={`contact-form-field${fields.email ? " has-value" : ""}`}>
        <label htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={254}
          required
          value={fields.email}
          onChange={(event) => updateField("email", event.target.value)}
        />
      </div>

      <div className={`contact-form-field contact-form-message${fields.message ? " has-value" : ""}`}>
        <label htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          minLength={10}
          maxLength={2000}
          required
          aria-describedby={status === "error" ? "contact-message-help contact-form-error" : "contact-message-help"}
          value={fields.message}
          onChange={(event) => updateField("message", event.target.value)}
        />
        <span className="contact-message-help" id="contact-message-help">Minimum 10 characters</span>
        <span className="contact-character-count" aria-hidden="true">{fields.message.length}/2000</span>
      </div>

      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={fields.website}
          onChange={(event) => updateField("website", event.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="contact-form-error" id="contact-form-error" role="alert">
          {errorMessage}
        </p>
      )}

      <button className="contact-submit" type="submit" disabled={status === "loading"}>
        <span>{status === "loading" ? "Sending…" : "Send message"}</span>
        <i aria-hidden="true">→</i>
      </button>
    </form>
  );
}
