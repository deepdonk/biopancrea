import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How BioPancrea handles information on this website." };
export default function PrivacyPage() { return <LegalPage title="Privacy policy" intro="A short overview of this website’s current privacy approach.">
  <h2>Information collection</h2><p>This website does not currently use a contact form, advertising cookies, or analytics tools. Contact takes place through the visitor’s own email application.</p>
  <h2>External services</h2><p>Links to email or LinkedIn may open external services. Those services operate under their own privacy policies.</p>
  <h2>Future updates</h2><p>This policy may be refined as BioPancrea’s operations and public contact arrangements develop. Material changes will be reflected on this page.</p>
  </LegalPage>; }
