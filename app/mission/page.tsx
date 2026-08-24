import type { Metadata } from "next";
import { TeamProfiles } from "../components/TeamProfiles";

export const metadata: Metadata = {
  title: "Mission",
  description: "BioPancrea’s mission is to explore a cell-based artificial pancreas that can operate from within the body.",
};

const milestones = [
  ["Initial concept", "Concept defined"],
  ["Biological pathway", "Design exploration underway"],
  ["Hydrogel integration", "Further validation required"],
  ["Stent architecture", "Design exploration underway"],
  ["Preclinical planning", "Further validation required"],
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
        <figure className="mission-concept-diagram" role="img" aria-label="A simple diagram connecting beta-like cells, supportive hydrogel and a vascular stent">
          <div className="mission-diagram-cells" aria-hidden="true"><i/><i/><i/><i/><i/></div>
          <div className="mission-diagram-hydrogel" aria-hidden="true" />
          <div className="mission-diagram-stent" aria-hidden="true" />
          <figcaption><span>Beta-like cells</span><span>Supportive hydrogel</span><span>Vascular stent</span></figcaption>
        </figure>
      </section>

      <section className="mission-why container">
        <p className="section-label light"><span>02</span>Ambition</p>
        <div><h2>Why we are building it</h2><p>Our ambition is to move beyond systems that only deliver insulin externally and explore whether living insulin-producing cells could provide a more direct biological response to changing glucose levels.</p></div>
      </section>

      <section className="mission-progress container">
        <header><p className="section-label"><span>03</span>Current status</p><h2>Developing the concept</h2></header>
        <ol>{milestones.map(([name, status], index) => <li key={name}><span>0{index + 1}</span><h3>{name}</h3><p>{status}</p></li>)}</ol>
        <p className="mission-progress-note">Development descriptions are intentionally high-level. Further scientific and technical validation is required.</p>
      </section>

      <section className="mission-team container">
        <header><p className="section-label"><span>04</span>Founders</p><h2>Built by the founders</h2></header>
        <TeamProfiles />
      </section>
    </main>
  );
}
