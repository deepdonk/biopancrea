import type { Metadata } from "next";
import Link from "next/link";
import { StageKind, StageVisual } from "../components/StageVisual";

export const metadata: Metadata = {
  title: "How It Works",
  description: "A step-by-step explanation of BioPancrea’s investigational cell-delivery concept.",
};

const steps: Array<[string, string, string, StageKind, string]> = [
  ["01", "Collect", "A small cell sample.", "sample", "A small sample of the patient’s skin cells provides the biological starting material."],
  ["02", "Reprogram", "Creating induced pluripotent stem cells.", "ipsc", "The collected cells are reprogrammed into induced pluripotent stem cells, commonly known as iPSCs."],
  ["03", "Differentiate", "Guiding the cells toward a beta-cell identity.", "cluster", "The iPSCs are guided through a staged differentiation process toward insulin-producing beta-like cells."],
  ["04", "Protect", "A supportive hydrogel environment.", "hydrogel", "The resulting cells are incorporated into a biocompatible hydrogel designed to provide structural support within the platform."],
  ["05", "Integrate", "Cells and biomaterial meet the stent.", "stent", "The hydrogel and cells are integrated with a purpose-designed stent-based delivery concept."],
  ["06", "Place", "Designed for vascular placement.", "artery", "The platform is being explored for placement within the femoral artery, where its design is intended to support interaction with the bloodstream."],
  ["07", "Intended function", "Aiming to restore a biological response.", "response", "The long-term aim is to investigate whether the implanted cells can sense changing glucose levels and release insulin in response."],
];

export default function HowItWorksPage() {
  return (
    <main>
      <section className="page-lead page-lead-dark">
        <p className="kicker kicker-light"><span>01</span>How it works</p>
        <h1>From a patient’s cells to an implantable platform.</h1>
        <p>The BioPancrea concept brings cell reprogramming, directed differentiation, biomaterials, and vascular delivery into one investigational platform.</p>
        <div className="lead-meta"><span>Seven conceptual stages</span><span>Research-stage</span><span>Not a clinical procedure</span></div>
      </section>

      <section className="process-story section-pad" aria-label="Concept stages">
        {steps.map(([number, label, title, kind, copy]) => (
          <article className="process-step" key={number}>
            <StageVisual kind={kind} caption={`${number} / ${label}`} />
            <div className="process-step-copy">
              <p className="kicker"><span>{number}</span>{label}</p>
              <h2>{title}</h2>
              <p>{copy}</p>
              {number === "01" ? <aside>Scientific wording note: the hand sample provides skin cells—not islet cells.</aside> : null}
              {number === "06" ? <aside>Investigational concept only. This is not an implantation instruction or an available treatment.</aside> : null}
              {number === "07" ? <aside>Intended function; not a claim of demonstrated performance.</aside> : null}
            </div>
          </article>
        ))}
      </section>

      <section className="process-boundary section-pad">
        <p className="kicker kicker-light"><span>Boundary</span>What the story means</p>
        <div><h2>Clear about the sequence. Careful about the evidence.</h2><p>Published research provides context for stem-cell differentiation and hydrogel-supported cell systems. The particular combination described here—including its stent-based integration and intended femoral-artery placement—is BioPancrea’s investigational concept.</p><Link className="button button-acid" href="/science">Explore the science <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
