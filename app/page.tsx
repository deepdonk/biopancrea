import Link from "next/link";
import { HeroStent } from "./components/HeroStent";
import { LandingJourney } from "./components/LandingJourney";

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">ARTIFICIAL PANCREAS STARTUP</p>
          <h1>Building an artificial pancreas within a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is a biotechnology startup developing an implantable artificial-pancreas concept. The platform combines patient-derived insulin-producing beta-like cells, a supportive hydrogel, and a vascular stent designed for placement in the femoral artery.</p>
          <p className="landing-startup-statement">An early-stage biotechnology startup developing a new approach to insulin delivery.</p>
          <div className="landing-hero-actions">
            <Link className="button button-dark" href="/how-it-works">How it works</Link>
          </div>
        </div>
        <HeroStent />
      </section>

      <LandingJourney />
    </main>
  );
}
