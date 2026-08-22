"use client";

import { FormEvent, useState } from "react";

export function NewsletterForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: form.get("email") }) }).catch(() => null);
    setState(response?.ok ? "success" : "error");
    if (response?.ok) event.currentTarget.reset();
  }

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <label htmlFor="newsletter-email">Occasional updates from BioPancrea. No noise.</label>
      <div>
        <input id="newsletter-email" name="email" type="email" placeholder="Email address" autoComplete="email" required disabled={state === "sending"} />
        <button type="submit" disabled={state === "sending"}>{state === "sending" ? "Joining…" : "Join the list"}<span aria-hidden="true">↗</span></button>
      </div>
      <p aria-live="polite">{state === "success" ? "Thank you. You’re on the list." : state === "error" ? "Something went wrong. Please try again." : "By subscribing, you agree to our Privacy Policy."}</p>
    </form>
  );
}
