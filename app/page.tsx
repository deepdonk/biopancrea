import Link from "next/link";
import { ArteryResponse } from "./components/ArteryResponse";
import { HeroStent } from "./components/HeroStent";
import { LandingJourney } from "./components/LandingJourney";
import { PlatformIdea } from "./components/PlatformIdea";

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow"><span>BP—01</span>Research-stage cell-therapy platform</p>
          <h1>A living cell therapy, built into a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is developing a stent-based platform designed to support insulin-producing beta-like cells within the femoral artery.</p>
          <p className="landing-hero-detail">The concept combines patient-derived cells, a supportive hydrogel, and a vascular implant.</p>
          <div className="landing-hero-actions">
            <Link className="button button-dark" href="#platform-idea">Learn how it works <span aria-hidden="true">↓</span></Link>
            <Link className="inline-link" href="/science">Explore the science <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <HeroStent />
      </section>

      <PlatformIdea />
      <LandingJourney />
      <ArteryResponse />

      <section className="landing-explore container">
        <div><p className="section-label"><span>04</span>Explore further</p><h2>See the complete platform.</h2></div>
        <div><p>Explore the biology, biomaterials, and vascular design behind the BioPancrea concept.</p><div className="button-row"><Link className="button button-dark" href="/how-it-works">How it works <span aria-hidden="true">↗</span></Link><Link className="button button-line" href="/science">Explore the science</Link></div></div>
      </section>
    </main>
  );
}
