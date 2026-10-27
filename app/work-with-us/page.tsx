import { PageHero } from "../components/PageHero";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Work with BioPancrea | Investors, Researchers and Clinicians",
  description: "How investors, research collaborators and clinicians can work with BioPancrea on its research-stage, cell-based artificial-pancreas concept.",
  path: "/work-with-us",
});

const audiences = [
  {
    index: "01",
    audience: "Investors",
    title: "Back an early-stage biotechnology company",
    copy: "We are building relationships with investors who understand the long timelines of cell therapy and medical-device development, and who want to be involved early.",
    lookingFor: ["Experience in biotechnology, cell therapy or medical devices", "Patience for preclinical and regulatory pathways", "Introductions, advice and networks as well as capital"],
    cta: "Talk to us about investing",
    topic: "investment",
  },
  {
    index: "02",
    audience: "Research collaborators",
    title: "Help test and refine the platform",
    copy: "The concept brings together three disciplines. We want to hear from laboratories and research groups whose work could help answer its open questions.",
    lookingFor: ["Cell engineering and beta-like cell differentiation", "Hydrogels and biomaterials for cell encapsulation", "Vascular stents and implantable-device design"],
    cta: "Propose a collaboration",
    topic: "research",
  },
  {
    index: "03",
    audience: "Clinicians",
    title: "Shape what the concept needs to get right",
    copy: "Clinical insight keeps the work grounded in how people live with diabetes today and what an implant would have to achieve to be worth pursuing.",
    lookingFor: ["Endocrinologists and diabetes specialists", "Vascular and interventional specialists", "Diabetes educators and care teams"],
    cta: "Share a clinical perspective",
    topic: "clinical",
  },
] as const;

const steps = [
  ["Send a message", "Choose the topic that fits on the contact form so your message reaches the right person."],
  ["Introductory call", "A short conversation to understand your interests and share where the concept stands."],
  ["Next steps", "If there is a fit, we agree what working together could look like, including any confidentiality needed."],
] as const;

export default function WorkWithUsPage() {
  return (
    <main>
      <PageHero index="04" label="Work with us" title="Work with us" copy="BioPancrea is a research-stage company. The people who join early will help decide what this concept becomes." variant="sage" />

      <section className="work-audiences container" aria-label="Who we want to hear from">
        {audiences.map(({ index, audience, title, copy, lookingFor, cta, topic }) => (
          <article key={audience} className="work-audience" data-reveal>
            <p className="section-label" data-reveal-label><span>{index}</span>{audience}</p>
            <div className="work-audience-body">
              <h2 data-reveal-heading>{title}</h2>
              <div data-reveal-copy>
                <p>{copy}</p>
                <h3>What we’re looking for</h3>
                <ul>{lookingFor.map((item) => <li key={item}>{item}</li>)}</ul>
                <a className="button button-dark" href={`/contact?topic=${topic}#message-heading`}>{cta}</a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="work-steps container" data-header-tone="dark" data-reveal>
        <header>
          <p className="section-label light" data-reveal-label><span>04</span>How it starts</p>
          <h2 data-reveal-heading>Three simple steps</h2>
        </header>
        <ol data-reveal-copy>
          {steps.map(([title, copy], index) => (
            <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>
          ))}
        </ol>
      </section>

      <section className="process-disclaimer process-disclaimer-simple container">
        <p>BioPancrea is a research-stage concept and is not an approved medical treatment. Nothing on this page is an offer to sell, or a solicitation of an offer to buy, any securities.</p>
      </section>

      <nav className="contextual-links container" aria-label="Explore BioPancrea">
        <a className="button button-dark" href="/contact">Contact the team</a>
        <a className="button button-line" href="/how-it-works">Explore how BioPancrea works</a>
      </nav>
    </main>
  );
}
