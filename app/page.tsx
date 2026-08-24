import dynamic from "next/dynamic";
import { HeroStent } from "./components/HeroStent";
import { WhyItMatters } from "./components/WhyItMatters";

const LayeredPlatform = dynamic(() => import("./components/LayeredPlatform").then((module) => module.LayeredPlatform));

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">ARTIFICIAL PANCREAS STARTUP</p>
          <h1>Building an <span className="hero-headline-accent">artificial pancreas</span> within a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is an early-stage biotechnology startup developing an implantable, cell-based artificial-pancreas concept. The platform brings together insulin-producing beta-like cells, a supportive hydrogel, and a vascular stent intended for placement in the femoral artery.</p>
          <div className="landing-hero-actions">
            <a className="button button-dark" href="#why-it-matters">Why BioPancrea?</a>
            <a className="button button-line" href="/how-it-works">How it works</a>
          </div>
        </div>
        <HeroStent />
      </section>

      <WhyItMatters />
      <LayeredPlatform />
      <section className="mission-preview container">
        <div>
          <p className="section-label"><span>03</span>Mission</p>
          <h2>Why we are building it.</h2>
        </div>
        <div>
          <p>BioPancrea was created to explore a different approach to restoring insulin production through the combination of cell biology, biomaterials, and vascular-device design.</p>
          <a className="button button-dark" href="/mission">Our mission</a>
        </div>
      </section>
    </main>
  );
}
