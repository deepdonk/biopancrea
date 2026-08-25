import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | BioPancrea",
  description: "How BioPancrea handles information on this website.",
  robots: { index: false, follow: true },
};
export default function PrivacyPage() { return <LegalPage title="Privacy policy" intro="A short overview of this website’s current privacy approach.">
  <h2>Information collection</h2><p>When you submit the contact form, BioPancrea receives the name, email address, and message you provide. This information is used only to review and respond to your enquiry.</p>
  <h2>External services</h2><p>LinkedIn links may open an external service. That service operates under its own privacy policy.</p>
  <h2>Future updates</h2><p>This policy may be refined as BioPancrea’s operations and public contact arrangements develop. Material changes will be reflected on this page.</p>
  </LegalPage>; }
