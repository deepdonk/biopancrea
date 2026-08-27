import { TeamProfiles } from "../components/TeamProfiles";
import { MissionPlatformGraphic } from "../components/MissionPlatformGraphic";
import { FaqAccordion } from "../components/FaqAccordion";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Our Mission | BioPancrea",
  description: "Learn about BioPancrea’s mission to develop a new implantable artificial-pancreas concept.",
  path: "/mission",
});

export default function MissionPage() {
  return (
    <main>
      <section className="mission-hero container">
        <p className="eyebrow"><span>01</span>Mission</p>
        <h1>Our mission</h1>
        <p className="mission-statement">BioPancrea is exploring a new artificial-pancreas concept that brings together cell biology, biomaterials, and vascular-device design.</p>
        <p className="mission-support">Our aim is to develop the concept responsibly while protecting the technical work that makes it distinct.</p>
      </section>

      <section className="mission-building container">
        <div className="mission-section-copy">
          <p className="section-label"><span>01</span>The concept</p>
          <h2>What we are building</h2>
          <p>An implantable platform combining cells, a supportive gel, and a vascular stent.</p>
        </div>
        <MissionPlatformGraphic />
      </section>

      <section className="mission-why container">
        <p className="section-label light"><span>02</span>Ambition</p>
        <div><h2>Why we are building it</h2><p>To explore a different approach to supporting people who depend on insulin management.</p></div>
      </section>

      <section className="mission-progress container">
        <header><p className="section-label"><span>03</span>Development</p><div><h2>Current stage</h2><p>BioPancrea is currently developing and refining the concept.</p></div></header>
      </section>

      <section className="mission-team container">
        <header><p className="section-label"><span>04</span>Founders</p><h2>Built by the founders</h2></header>
        <TeamProfiles />
      </section>

      <section className="mission-questions container">
        <header><p className="section-label"><span>05</span>Practical information</p><h2>Questions</h2></header>
        <FaqAccordion />
      </section>

      <nav className="contextual-links container" aria-label="Explore BioPancrea">
        <a className="button button-dark" href="/how-it-works">Explore how BioPancrea works</a>
        <a className="button button-line" href="/meet-the-team">Meet the BioPancrea founders</a>
      </nav>
    </main>
  );
}
