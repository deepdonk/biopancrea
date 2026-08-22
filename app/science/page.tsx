import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";
import { ScienceSystem } from "../components/ScienceSystem";

export const metadata: Metadata = { title: "Science", description: "The four connected scientific and engineering areas informing BioPancrea’s research-stage concept." };

export default function SciencePage() {
  return <main>
    <PageHero index="02" label="Science" title="Connected disciplines. Carefully bounded claims." copy="BioPancrea is exploring a platform informed by cell reprogramming, beta-cell differentiation, biomaterials, and vascular device design." variant="navy" />
    <ScienceSystem />
    <section className="science-boundary container">
      <p className="section-label"><span>02</span>Disclosure boundary</p>
      <div><h2>Clear enough to understand. Deliberately short of a technical recipe.</h2><p>The website does not publish laboratory protocols, device dimensions, proprietary materials, manufacturing methods, unpublished results, or development timelines.</p><ul><li>Cell reprogramming</li><li>Beta-cell differentiation</li><li>Supportive biomaterials</li><li>Conceptual vascular platform</li></ul></div>
    </section>
    <section className="science-status container"><span>Research-stage concept</span><p>BioPancrea is a research-stage concept. The platform remains subject to scientific, preclinical, clinical, and regulatory evaluation.</p><Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
