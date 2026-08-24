import type { Metadata } from "next";
import { TeamProfiles } from "../components/TeamProfiles";
import { MissionPlatformGraphic } from "../components/MissionPlatformGraphic";
import { FaqAccordion } from "../components/FaqAccordion";

export const metadata: Metadata = {
  title: "Mission",
  description: "BioPancrea’s mission is to explore a cell-based artificial pancreas that can operate from within the body.",
};

const milestones = [
  "Concept definition",
  "Platform design",
  "Experimental validation",
  "Preclinical development",
  "Clinical development",
] as const;

export default function MissionPage() {
  return (
    <main>
      <section className="mission-hero container">
        <p className="eyebrow"><span>01</span>Mission</p>
        <h1>Our mission</h1>
        <p className="mission-statement">To explore a cell-based artificial pancreas that can operate from within the body.</p>
        <p className="mission-support">BioPancrea is bringing together cell engineering, biomaterials, and vascular-device design to investigate a new approach to insulin production.</p>
      </section>

      <section className="mission-building container">
        <div className="mission-section-copy">
          <p className="section-label"><span>01</span>The concept</p>
          <h2>What we are building</h2>
          <p>BioPancrea is developing a concept in which patient-derived cells are guided toward an insulin-producing beta-like identity, supported within a hydrogel, and incorporated into a vascular stent platform.</p>
        </div>
        <MissionPlatformGraphic />
      </section>

      <section className="mission-why container">
        <p className="section-label light"><span>02</span>Ambition</p>
        <div><h2>Why we are building it</h2><p>Our ambition is to move beyond systems that only deliver insulin externally and explore whether living insulin-producing cells could provide a more direct biological response to changing glucose levels.</p></div>
      </section>

      <section className="mission-progress container">
        <header><p className="section-label"><span>03</span>Development</p><div><h2>Current stage</h2><p>BioPancrea is currently developing and refining the artificial-pancreas concept. Further biological, engineering, preclinical, clinical, and regulatory validation will be required.</p></div></header>
        <ol>{milestones.map((name, index) => <li key={name}><span>0{index + 1}</span><i aria-hidden="true"/><h3>{name}</h3></li>)}</ol>
      </section>

      <section className="mission-team container">
        <header><p className="section-label"><span>04</span>Founders</p><h2>Built by the founders</h2></header>
        <TeamProfiles />
      </section>

      <section className="mission-questions container">
        <header><p className="section-label"><span>05</span>Practical information</p><h2>Questions</h2></header>
        <FaqAccordion />
      </section>
    </main>
  );
}
