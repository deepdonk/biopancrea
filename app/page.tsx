import Link from "next/link";
import { ConceptSequence } from "./components/ConceptSequence";
import { PlatformField } from "./components/PlatformField";

export default function Home() {
  return (
    <main>
      <section className="home-hero home-hero-platform">
        <div className="home-hero-copy">
          <p className="eyebrow"><span>BP—01</span>Research-stage cell-therapy platform</p>
          <h1>Patient-derived insulin-producing cells, supported by a vascular implant.</h1>
          <p>BioPancrea is developing a research-stage platform that begins with a small skin-cell sample, reprograms those cells into iPSCs, differentiates them into insulin-producing beta-like cells, and supports them within a hydrogel and stent-based implant.</p>
          <div className="button-row"><Link className="button button-dark" href="/how-it-works">See how it works <span aria-hidden="true">↗</span></Link><Link className="button button-line" href="/science">Explore the science</Link></div>
          <p className="hero-sequence">Cells → iPSCs → beta-like cells → hydrogel → stent <span>Intended placement: femoral artery</span></p>
        </div>
        <PlatformField />
      </section>

      <ConceptSequence />

      <section className="intro-section platform-purpose container">
        <p className="section-label"><span>02</span>Problem and approach</p>
        <div className="intro-grid reveal">
          <h2>A biological response.<br /><em>A supported path.</em></h2>
          <div><p>The BioPancrea concept connects patient-derived cell biology with a supportive biomaterial and a vascular delivery platform. The aim is to study these elements as one research-stage system while keeping each scientific and engineering question clearly defined.</p><Link className="inline-link" href="/how-it-works">Follow the process <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="system-line" aria-hidden="true"><span>Reprogram</span><i /><span>Differentiate</span><i /><span>Support</span><i /><span>Deliver</span></div>
      </section>

      <section className="home-science-preview container">
        <div><p className="section-label light"><span>03</span>Science</p><h2>Four connected disciplines. One research-stage concept.</h2></div>
        <div><p>Cell reprogramming, beta-cell differentiation, biomaterials, and vascular platform design each shape a different part of the BioPancrea concept.</p><Link className="button button-light" href="/science">Explore the science <span aria-hidden="true">↗</span></Link></div>
      </section>

      <section className="home-team-preview container">
        <p className="section-label"><span>04</span>Meet the team</p>
        <div><h2>Built across biological and engineered disciplines.</h2><div><p>BioPancrea brings together relevant thinking across cell biology, biomaterials, medical devices, and translational development. Individual profiles will be published only when verified and approved.</p><Link className="inline-link" href="/team">Meet the team <span aria-hidden="true">↗</span></Link></div></div>
      </section>

      <section className="closing-cta container">
        <div><p className="section-label"><span>05</span>Connect</p><h2>Let’s start a thoughtful conversation.</h2></div>
        <div><p>We welcome conversations with researchers, clinical experts, strategic partners, and investors whose interests align with the platform.</p><Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
