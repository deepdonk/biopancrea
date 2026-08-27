import type { Metadata } from "next";
import { HeroStent } from "./components/HeroStent";
import { LayeredPlatform } from "./components/LayeredPlatform";
import { WhyItMatters } from "./components/WhyItMatters";
import { createPageMetadata } from "./lib/metadata";
import { absoluteUrl } from "./lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "BioPancrea | Artificial Pancreas Startup",
  description: "BioPancrea is an early-stage biotechnology startup developing an artificial-pancreas concept combining cells, a supportive gel and a vascular stent.",
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
      description: "An early-stage biotechnology startup developing an artificial-pancreas concept combining cells, a supportive gel and a vascular stent.",
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
      description: "An early-stage biotechnology startup developing an artificial-pancreas concept combining cells, a supportive gel and a vascular stent.",
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
          <h1>Building a new kind of artificial pancreas.</h1>
          <p className="landing-hero-lead">BioPancrea is an early-stage biotechnology startup developing an implantable concept that brings together living cells, a supportive gel, and a vascular stent.</p>
          <p className="landing-hero-detail">Three components designed to work as one platform.</p>
          <div className="landing-hero-actions">
            <a className="button button-dark" href="/how-it-works">Explore the concept</a>
            <a className="button button-line" href="/contact#book-a-meeting">Book a meeting</a>
          </div>
        </div>
        <HeroStent />
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <LayeredPlatform />
      <WhyItMatters />
    </main>
  );
}
