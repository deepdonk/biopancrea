import { PageHero } from "../components/PageHero";
import { ProcessStory } from "../components/ProcessStory";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "The BioPancrea Concept | Cells, Gel and Stent",
  description: "Explore the three high-level components of the BioPancrea artificial-pancreas concept: cells, supportive gel and a vascular stent.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return <main>
    <PageHero index="02" label="How it works" title="The BioPancrea concept" copy="Three high-level components are being developed as one artificial-pancreas platform." variant="sage" />
    <ProcessStory />
    <section className="process-closing container"><p>BioPancrea is currently developing and refining how these components may operate as one platform.</p></section>
    <section className="process-disclaimer process-disclaimer-simple container"><p>BioPancrea is a research-stage concept and is not an approved medical treatment.</p></section>
    <nav className="contextual-links container" aria-label="Explore BioPancrea">
      <a className="button button-dark" href="/mission">Read about our mission</a>
      <a className="button button-line" href="/contact#book-a-meeting">Book a meeting</a>
    </nav>
  </main>;
}
