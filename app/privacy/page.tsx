import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = { title: "Privacy Policy", description: "How BioPancrea handles information submitted through this website." };
export default function PrivacyPage() { return <LegalPage title="Privacy policy" intro="A clear overview of the limited information this website collects and why.">
  <h2>Information you provide</h2><p>When you use our contact form, we collect your name, email address, organisation if supplied, area of interest, message, and consent choice. When you join our updates list, we collect your email address.</p>
  <h2>How information is used</h2><p>We use contact details only to review and respond to enquiries, manage expressions of interest, and send updates where requested. We do not sell personal information.</p>
  <h2>Storage and retention</h2><p>Submitted information is stored using the website’s managed infrastructure. It is retained only for as long as reasonably needed for the purpose for which it was supplied, subject to applicable obligations.</p>
  <h2>Your choices</h2><p>You may choose not to submit personal information. You may also request that a subscription or enquiry record be reviewed or removed once BioPancrea publishes an appropriate privacy contact channel.</p>
  <h2>Future updates</h2><p>This policy may be refined as BioPancrea’s operations and public contact arrangements develop. Material changes will be reflected on this page.</p>
  </LegalPage>; }
