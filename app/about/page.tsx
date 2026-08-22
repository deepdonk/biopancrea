import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "About", description: "BioPancrea’s purpose, mission, values, and long-term ambition for pancreatic health." };

const values = [
  ["01", "Scientific integrity", "We follow evidence carefully and communicate with clarity about what is known—and what is not."],
  ["02", "Focused curiosity", "We ask precise questions while remaining open to connections across disciplines."],
  ["03", "Human relevance", "We keep real human needs in view as we consider where science may create value."],
  ["04", "Responsible progress", "We favour thoughtful decisions, meaningful standards, and long-term purpose."],
] as const;

const journey = [["Foundation", "A clear conviction and a deliberately focused field."], ["Exploration", "Looking closely across biological and human context."], ["Development", "Advancing selected ideas with discipline."], ["Translation", "Building responsibly toward real-world relevance."]] as const;

export default function AboutPage() {
  return <main>
    <PageHero index="01" label="About BioPancrea" title="Progress begins by looking closer." copy="BioPancrea was created around a simple conviction: important biological challenges deserve focused, interdisciplinary thinking." />
    <section className="mission-band container"><p className="section-label light"><span>Mission</span>What guides us</p><blockquote>“Our mission is to help create a better future for pancreatic health through disciplined, biology-led innovation.”</blockquote></section>
    <section className="split-editorial container"><div><p className="section-label"><span>01</span>Our vision</p><h2>Attention creates possibility.</h2></div><div><p>We envision a future where pancreatic health receives greater scientific attention—and where thoughtful ideas can move responsibly from insight toward real-world value.</p><p>That future requires humility around complex biology, commitment to human relevance, and the patience to build well.</p></div></section>
    <section className="values-section container"><div className="section-heading-row"><div><p className="section-label"><span>02</span>Our values</p><h2>How we choose<br />to move forward.</h2></div><p>Principles that keep ambition grounded.</p></div><div className="value-grid">{values.map(([number,title,copy]) => <button className="value-card" type="button" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">+</i></button>)}</div></section>
    <section className="journey-section container"><p className="section-label light"><span>03</span>Our evolving path</p><h2>Built with intention.</h2><div className="journey-path">{journey.map(([title,copy],index) => <article key={title}><span>0{index + 1}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    <section className="collaboration-section container"><div className="collaboration-art" aria-hidden="true"><i /><i /><i /><span /></div><div><p className="section-label"><span>04</span>Our team</p><h2>Built through collaboration.</h2><p>BioPancrea brings together perspectives from science, medicine, technology, and venture development. Our team structure will be shared as the company’s public profile develops.</p><div className="team-placeholder" aria-label="Future team profiles"><span>Future profile</span><span>Future profile</span><span>Future profile</span></div></div></section>
    <section className="careers-section container" id="careers"><p className="section-label"><span>05</span>Careers</p><div><h2>Help shape what<br />comes next.</h2><p>We are interested in hearing from thoughtful, mission-driven people across science, medicine, technology, and company building.</p><strong>We do not currently have any published roles, but we are always interested in exceptional people.</strong><Link className="button button-dark" href="/contact">Express your interest <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
