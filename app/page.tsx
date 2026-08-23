import Link from "next/link";
import dynamic from "next/dynamic";
import { HeroStent } from "./components/HeroStent";

const LandingJourney = dynamic(() => import("./components/LandingJourney").then((module) => module.LandingJourney));
const LayeredPlatform = dynamic(() => import("./components/LayeredPlatform").then((module) => module.LayeredPlatform));

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">ARTIFICIAL PANCREAS STARTUP</p>
          <h1>Building an <span className="hero-headline-accent">artificial pancreas</span> within a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is a biotechnology startup developing an implantable artificial-pancreas concept that combines patient-derived beta-like cells, a supportive hydrogel, and a vascular stent.</p>
          <div className="landing-hero-actions">
            <Link className="button button-dark" href="/how-it-works">How it works</Link>
          </div>
        </div>
        <HeroStent />
      </section>

      <LandingJourney />
      <LayeredPlatform />
    </main>
  );
}
