import Link from "next/link";
import { HeroStent } from "./components/HeroStent";
import { LandingJourney } from "./components/LandingJourney";

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">Research-stage cell-therapy platform</p>
          <h1>A living cell therapy, built into a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is developing a stent-based platform that combines patient-derived beta-like cells, a supportive hydrogel, and a vascular implant.</p>
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
