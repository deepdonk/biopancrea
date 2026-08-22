import Link from "next/link";
import { ConceptPathway } from "./components/ConceptPathway";
import { PlatformVisual } from "./components/PlatformVisual";
import { StageKind, StageVisual } from "./components/StageVisual";

const components = [
  ["01", "Patient-derived cells", "A small skin-cell sample provides the starting material. The sample does not contain islet cells."],
  ["02", "Insulin-producing beta-like cells", "The skin cells are reprogrammed into iPSCs and differentiated toward a pancreatic beta-cell identity."],
  ["03", "A protected vascular platform", "The resulting cells are incorporated into a hydrogel-supported stent concept intended for vascular placement."],
] as const;

const journey: Array<[string, string, string, StageKind]> = [
  ["01", "Skin sample", "A small sample from the hand provides skin cells.", "sample"],
  ["02", "Individual cells", "The starting cells are isolated and expanded.", "cells"],
  ["03", "iPSC state", "Cells are reprogrammed into a pluripotent state.", "ipsc"],
  ["04", "Beta-like cluster", "Directed differentiation guides a pancreatic identity.", "cluster"],
  ["05", "Hydrogel support", "The cluster enters a translucent biomaterial environment.", "hydrogel"],
  ["06", "Stent integration", "Cells and hydrogel meet an engineered structure.", "stent"],
  ["07", "Completed concept", "The elements form one investigational platform.", "stent"],
  ["08", "Intended placement", "The platform is being explored for the femoral artery.", "artery"],
];

export default function Home() {
  return (
    <main>
      <section className="concept-hero">
        <div className="concept-hero-copy">
          <p className="kicker"><span>BP / 01</span>An investigational cell-therapy platform</p>
          <h1>Insulin-producing cells, supported by an implantable platform.</h1>
          <p className="hero-support">BioPancrea is developing an investigational platform that begins with a small sample of a patient’s skin cells, reprograms them into induced pluripotent stem cells, differentiates them into insulin-producing beta-like cells, and incorporates them into a hydrogel-supported stent concept.</p>
          <div className="button-row">
            <Link className="button button-acid" href="/how-it-works">See how it works <span aria-hidden="true">↗</span></Link>
            <Link className="button button-ghost-light" href="/science">Explore the science</Link>
          </div>
          <p className="concept-status"><i />Research-stage concept · Not approved for clinical use</p>
        </div>
        <PlatformVisual />
      </section>

      <section className="pathway-section section-pad">
        <div className="section-intro compact-intro">
          <p className="kicker"><span>01</span>The complete concept</p>
          <h2>Your cells <em>→</em> iPSCs <em>→</em> beta-like cells <em>→</em> protective hydrogel <em>→</em> stent-based implant</h2>
          <p>Open each stage for a plain-language explanation.</p>
        </div>
        <ConceptPathway />
      </section>

      <section className="central-idea section-pad">
        <div className="section-intro">
          <p className="kicker kicker-light"><span>02</span>The central idea</p>
          <h2>Biology, biomaterial, and delivery—designed as one concept.</h2>
        </div>
        <div className="component-grid">
          {components.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div className={`component-symbol symbol-${number}`} aria-hidden="true"><i /><i /><i /></div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-section-new section-pad">
        <header className="journey-header">
          <p className="kicker"><span>03</span>Scroll through the concept</p>
          <h2>From a hand sample to an intended vascular platform.</h2>
          <p>This sequence separates established cell-processing concepts from BioPancrea’s investigational integration and placement concept.</p>
        </header>
        <div className="journey-list">
          {journey.map(([number, title, copy, kind]) => (
            <article className="journey-step" key={number}>
              <StageVisual kind={kind} caption={`${number} / ${title}`} />
              <div><span>{number}</span><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="status-band section-pad">
        <p className="kicker kicker-light"><span>04</span>Status</p>
        <div>
          <span className="status-pill">Research-stage concept</span>
          <h2>Designed to ask a precise scientific question—not to promise an outcome.</h2>
          <p>BioPancrea’s platform is investigational and remains subject to scientific, preclinical, clinical, and regulatory evaluation.</p>
          <Link className="inline-link-light" href="/science">Review the scientific context <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className="home-contact section-pad">
        <p className="kicker"><span>05</span>Contact</p>
        <div><h2>Different disciplines. One considered platform.</h2><p>We welcome conversations with aligned researchers, clinical experts, strategic partners, and investors.</p><Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
