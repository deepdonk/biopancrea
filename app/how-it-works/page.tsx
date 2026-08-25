import { PageHero } from "../components/PageHero";
import { ProcessStory } from "../components/ProcessStory";
import { KeyTerms } from "../components/KeyTerms";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "How BioPancrea Works | Cell-Based Artificial Pancreas",
  description: "Explore the BioPancrea concept, from patient-derived cells and iPSCs to beta-like cells, hydrogel integration and a stent-based vascular platform.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return <main>
    <PageHero index="02" label="How it works" title="How BioPancrea works" copy="BioPancrea is developing an artificial-pancreas concept through seven connected steps spanning cell reprogramming, beta-like cell differentiation, biomaterials, and vascular device design." variant="sage" />
    <ProcessStory />
    <section className="process-disclaimer process-disclaimer-simple container"><p>BioPancrea is a research-stage concept and is not an approved medical treatment.</p></section>
    <KeyTerms />
    <nav className="contextual-links container" aria-label="Explore BioPancrea">
      <a className="button button-dark" href="/mission">Read about our mission</a>
    </nav>
  </main>;
}
