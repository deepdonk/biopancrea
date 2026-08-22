import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { ProcessStory } from "../components/ProcessStory";

export const metadata: Metadata = { title: "How It Works", description: "Follow the BioPancrea concept from skin cells to a research-stage vascular platform." };

export default function HowItWorksPage() {
  return <main>
    <PageHero index="01" label="How it works" title="From a patient’s cells to an implantable platform." copy="The BioPancrea concept combines cell reprogramming, beta-cell differentiation, biomaterials, and vascular device design within one research-stage platform." variant="sage" />
    <ProcessStory />
    <section className="process-disclaimer container"><p className="section-label light"><span>08</span>Research boundary</p><div><h2>One connected concept. Many questions still to evaluate.</h2><p>The cell-processing sequence draws on established areas of research. BioPancrea’s combined hydrogel, stent integration, intended vascular placement, and biological response remain investigational concepts subject to further evaluation.</p><Link className="button button-light" href="/science">Review the science <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
