import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { HeroStent } from "./components/HeroStent";
import { WhyItMatters } from "./components/WhyItMatters";
import { createPageMetadata } from "./lib/metadata";
import { absoluteUrl } from "./lib/site";

const LayeredPlatform = dynamic(() => import("./components/LayeredPlatform").then((module) => module.LayeredPlatform));

export const metadata: Metadata = createPageMetadata({
  title: "BioPancrea | Artificial Pancreas Startup",
  description: "BioPancrea is an early-stage biotechnology startup developing a cell-based artificial-pancreas concept combining beta-like cells, hydrogel and a vascular stent.",
  path: "/",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${absoluteUrl("/")}#organization`,
      name: "BioPancrea",
      url: absoluteUrl("/"),
      logo: { "@type": "ImageObject", url: absoluteUrl("/favicon.png") },
      description: "An early-stage biotechnology startup developing a cell-based artificial-pancreas concept.",
      founder: [
        {
          "@type": "Person",
          name: "Deepta Suresh",
          jobTitle: "CEO and Co-Founder",
          sameAs: "https://www.linkedin.com/in/deepta-suresh-b51913367/",
        },
        {
          "@type": "Person",
          name: "Janefrances Muoneke",
          jobTitle: "Co-Founder",
          sameAs: "https://www.linkedin.com/in/janefrances-muoneke-3313113a2/",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${absoluteUrl("/")}#website`,
      name: "BioPancrea",
      url: absoluteUrl("/"),
      publisher: { "@id": `${absoluteUrl("/")}#organization` },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <section className="landing-hero">
        <div className="landing-hero-copy">
          <p className="eyebrow">ARTIFICIAL PANCREAS STARTUP</p>
          <h1>Building an <span className="hero-headline-accent">artificial pancreas</span> within a vascular stent.</h1>
          <p className="landing-hero-lead">BioPancrea is an early-stage biotechnology startup developing an implantable, cell-based artificial-pancreas concept. The platform brings together insulin-producing beta-like cells, a supportive hydrogel, and a vascular stent intended for placement in the femoral artery.</p>
          <p className="landing-hero-detail">The investigational goal is glucose-responsive insulin release from within the body. BioPancrea remains a research-stage concept and is not an approved medical treatment.</p>
          <div className="landing-hero-actions">
            <a className="button button-dark" href="#why-it-matters">Why BioPancrea?</a>
            <a className="button button-line" href="/how-it-works">How it works</a>
          </div>
        </div>
        <HeroStent />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

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
