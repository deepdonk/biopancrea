import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = { title: "Cookie Policy", description: "BioPancrea website cookie and device-storage information." };
export default function CookiesPage() { return <LegalPage title="Cookie policy" intro="This website currently uses only the storage needed for a simple, respectful experience.">
  <h2>Current use</h2><p>BioPancrea does not currently use advertising or analytics cookies. The website stores a small preference on your device when you acknowledge the cookie notice so that it does not appear repeatedly.</p>
  <h2>Essential technologies</h2><p>Hosting and security providers may use strictly necessary technologies to deliver pages, protect the service, and maintain reliable operation.</p>
  <h2>Your control</h2><p>You can clear site data at any time through your browser settings. Doing so will cause the notice to appear again on your next visit.</p>
  <h2>Changes</h2><p>If optional analytics or other non-essential technologies are introduced in future, this policy and the available controls will be updated before they are used.</p>
  </LegalPage>; }
