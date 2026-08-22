import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = { title: "Website Disclaimer", description: "Important limitations on BioPancrea website information." };
export default function DisclaimerPage() { return <LegalPage title="Website disclaimer" intro="Important context for interpreting information presented on this website.">
  <h2>Not medical advice</h2><p>Nothing on this website is intended as medical advice, diagnosis, treatment guidance, or a substitute for advice from a qualified healthcare professional.</p>
  <h2>No scientific or product claims</h2><p>Content is deliberately high-level. It does not describe a specific product, programme, mechanism, therapeutic target, clinical result, regulatory position, or development timeline.</p>
  <h2>No offer or solicitation</h2><p>Nothing on this website constitutes an offer, recommendation, investment solicitation, or commitment relating to a transaction or partnership.</p>
  <h2>Forward-looking language</h2><p>Statements about purpose, ambition, or future possibility express general direction only. They should not be read as promises, forecasts, or assurances of outcome.</p>
  <h2>Professional guidance</h2><p>For questions about personal health, seek advice from an appropriately qualified healthcare professional.</p>
  </LegalPage>; }
