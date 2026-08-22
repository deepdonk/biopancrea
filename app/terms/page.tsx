import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = { title: "Terms of Use", description: "Terms governing use of the BioPancrea website." };
export default function TermsPage() { return <LegalPage title="Terms of use" intro="These terms set out the basis on which this website may be used.">
  <h2>General information</h2><p>This website presents high-level corporate and educational information about BioPancrea. Content may change as the company’s work and public profile develop.</p>
  <h2>Permitted use</h2><p>You may access and share links to this website for lawful, non-commercial purposes. You must not misuse the website, attempt to disrupt it, or represent its content as medical or professional advice.</p>
  <h2>Intellectual property</h2><p>The BioPancrea name, visual identity, writing, and original site materials are intended to remain associated with BioPancrea. No rights are granted beyond ordinary website use.</p>
  <h2>External information</h2><p>Where the website later links to external material, BioPancrea is not responsible for the availability or content of third-party sites.</p>
  <h2>Availability</h2><p>Access may be changed, suspended, or withdrawn without notice. No guarantee is made that every page will always be available or free from technical interruption.</p>
  </LegalPage>; }
