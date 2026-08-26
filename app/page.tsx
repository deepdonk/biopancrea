import type { Metadata } from "next";
import { HeroStent } from "./components/HeroStent";
import { LayeredPlatform } from "./components/LayeredPlatform";
import { WhyItMatters } from "./components/WhyItMatters";
import { createPageMetadata } from "./lib/metadata";
import { absoluteUrl } from "./lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "BioPancrea | Artificial Pancreas Startup",
  description: "BioPancrea is developing a research-stage, implantable artificial-pancreas concept combining beta-like cells, hydrogel and a vascular stent.",
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
      description: "A biotechnology startup developing a research-stage, implantable artificial-pancreas concept.",
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
          <h1>An artificial pancreas built around living cells.</h1>
          <p className="landing-hero-lead">A research-stage vascular implant.</p>
          <div className="landing-hero-actions">
            <a className="button button-dark" href="/how-it-works">See the concept</a>
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
