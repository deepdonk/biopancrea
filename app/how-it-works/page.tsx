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
    <PageHero index="02" label="How it works" title="How BioPancrea works" copy="Eight connected stages show how the research-stage concept moves from a small skin-cell sample to an intended glucose-responsive vascular platform." variant="sage" />
    <ProcessStory />
    <section className="process-disclaimer process-disclaimer-simple container"><p>BioPancrea is a research-stage concept and is not an approved medical treatment.</p></section>
    <KeyTerms />
    <nav className="contextual-links container" aria-label="Explore BioPancrea">
      <a className="button button-dark" href="/mission">Read about our mission</a>
      <a className="button button-line" href="/contact#book-a-meeting">Book a meeting</a>
    </nav>
  </main>;
}
