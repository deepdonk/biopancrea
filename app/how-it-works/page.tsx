import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { ProcessStory } from "../components/ProcessStory";

export const metadata: Metadata = { title: "How It Works", description: "Follow BioPancrea’s artificial-pancreas concept from skin cells to an investigational vascular platform." };

export default function HowItWorksPage() {
  return <main>
    <PageHero index="01" label="How it works" title="From a skin-cell sample to a vascular platform." copy="BioPancrea is developing an artificial-pancreas concept through seven connected steps spanning cell reprogramming, beta-like cell differentiation, biomaterials, and vascular device design." variant="sage" />
    <ProcessStory />
    <section className="process-disclaimer process-disclaimer-simple container"><p>BioPancrea is a research-stage concept and is not an approved medical treatment.</p></section>
  </main>;
}
