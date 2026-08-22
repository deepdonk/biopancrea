import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Science",
  description: "The scientific disciplines and evidence boundaries informing BioPancrea’s research-stage concept.",
};

const disciplines = [
  ["01", "Cell reprogramming", "Mature skin cells can be reprogrammed into induced pluripotent stem cells, creating a flexible biological starting point.", "The concept begins with patient-derived skin cells. Reprogramming changes their developmental state; it does not make them pancreatic cells by itself."],
  ["02", "Beta-cell differentiation", "iPSCs can be guided through staged differentiation toward insulin-producing pancreatic beta-like cells.", "“Beta-like” is deliberate: it communicates the intended cellular identity without claiming equivalence to native human beta cells."],
  ["03", "Biomaterials", "Hydrogels are being studied as supportive three-dimensional environments for living cell systems.", "BioPancrea describes structural support only. The website makes no claim about immune protection, oxygen delivery, survival, or long-term function."],
  ["04", "Vascular device design", "The platform concept explores how cells and hydrogel might be integrated with an engineered stent structure.", "The stent integration and intended femoral-artery placement are BioPancrea concepts under development—not established treatments or validated clinical procedures."],
] as const;

export default function SciencePage() {
  return (
    <main>
      <section className="page-lead science-lead">
        <p className="kicker"><span>02</span>Science</p>
        <span className="status-pill status-pill-dark">Research-stage concept</span>
        <h1>Four disciplines. One carefully bounded idea.</h1>
        <p>BioPancrea is exploring how cell reprogramming, directed differentiation, biomaterials, and vascular device design could be brought together.</p>
      </section>

      <section className="discipline-section section-pad">
        <div className="discipline-grid">
          {disciplines.map(([number, title, copy, technical]) => (
            <article key={number}>
              <span>{number}</span>
              <h2>{title}</h2>
              <p>{copy}</p>
              <details><summary>Technical overview <i aria-hidden="true">+</i></summary><p>{technical}</p></details>
            </article>
          ))}
        </div>
      </section>

      <section className="evidence-section section-pad">
        <div className="evidence-intro"><p className="kicker kicker-light"><span>03</span>Published context</p><h2>Context, not validation.</h2><p>These publications help explain the broader scientific fields. They do not report BioPancrea data or validate the combined platform concept.</p></div>
        <div className="evidence-list">
          <a href="https://pubmed.ncbi.nlm.nih.gov/25908839/" target="_blank" rel="noreferrer"><span>Cell differentiation</span><h3>Controlled induction of human pancreatic progenitors produces functional beta-like cells in vitro</h3><p>EMBO Journal · PMID 25908839</p><i aria-hidden="true">↗</i></a>
          <a href="https://pubmed.ncbi.nlm.nih.gov/29527325/" target="_blank" rel="noreferrer"><span>Hydrogel context</span><h3>Injectable polyethylene glycol hydrogel for islet encapsulation</h3><p>Biomedical Physics &amp; Engineering Express · PMID 29527325</p><i aria-hidden="true">↗</i></a>
        </div>
      </section>

      <section className="disclosure-section section-pad">
        <p className="kicker"><span>04</span>Disclosure boundary</p>
        <div><h2>Enough detail to understand the idea. No proprietary recipe.</h2><ul><li>Exact laboratory protocols</li><li>Cell-culture conditions</li><li>Proprietary materials</li><li>Device dimensions or geometry</li><li>Manufacturing methods</li><li>Unpublished data or timelines</li></ul></div>
      </section>

      <section className="science-status section-pad">
        <span>Research-stage concept</span>
        <p>BioPancrea’s platform is investigational and remains subject to scientific, preclinical, clinical, and regulatory evaluation.</p>
        <Link className="button button-dark" href="/contact">Discuss the concept <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
