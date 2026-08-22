import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "Approach", description: "How BioPancrea thinks—from biological insight toward meaningful possibility." };
const steps = [["Observe", "Begin with the biology and the unmet need."], ["Understand", "Explore complexity through multiple scientific perspectives."], ["Define", "Identify opportunities with meaningful human relevance."], ["Develop", "Advance ideas with discipline and measurable intent."], ["Translate", "Build toward responsible real-world application."]] as const;
const collaborators = ["Researchers", "Clinical experts", "Academic groups", "Strategic partners", "Mission-aligned investors"];

export default function ApproachPage() {
  return <main>
    <PageHero index="03" label="Our approach" title="From biological insight to meaningful possibility." copy="A deliberate path shaped by evidence, interdisciplinary thinking, and human relevance." variant="navy" />
    <section className="process-section container"><div className="section-heading-row"><div><p className="section-label"><span>01</span>Our process</p><h2>Purposeful at<br />every stage.</h2></div><p>Our process is a framework for thinking—not a disclosure of proprietary methods.</p></div><div className="process-track">{steps.map(([title,copy],index) => <article key={title}><div><span>0{index + 1}</span><i /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="philosophy-section"><div className="philosophy-art" aria-hidden="true"><i /><i /><span /></div><div><p className="section-label light"><span>02</span>Our philosophy</p><h2>Science first.<br /><em>Purpose throughout.</em></h2><p>We value evidence, careful decision-making, collaboration, and long-term thinking. Each helps turn focused ambition into progress that can withstand scrutiny.</p></div></section>
    <section className="collaborator-cta container"><div><p className="section-label"><span>03</span>Collaboration</p><h2>Different perspectives.<br />Shared intent.</h2><p>Important questions benefit from a thoughtful range of expertise.</p><Link className="button button-dark" href="/contact">Open a conversation <span aria-hidden="true">↗</span></Link></div><div className="collaborator-list">{collaborators.map((item,index) => <div key={item}><span>0{index + 1}</span><p>{item}</p><i aria-hidden="true">↗</i></div>)}</div></section>
  </main>;
}
