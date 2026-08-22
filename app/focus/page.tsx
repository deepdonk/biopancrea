import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "Our Focus", description: "Why BioPancrea is focused on the complex biological frontier of pancreatic and metabolic health." };
const areas = [["Understanding complex biology", "Looking across connected systems with care and curiosity."], ["Identifying meaningful opportunities", "Seeking directions where focused attention may create lasting value."], ["Connecting research with human need", "Keeping the human context present in scientific thinking."], ["Supporting responsible translation", "Considering how insight can move forward with discipline."]] as const;

export default function FocusPage() {
  return <main>
    <PageHero index="02" label="Our focus" title="Focused on a complex biological frontier." copy="We are creating space for deeper attention to an organ that sits at the centre of several vital biological systems." variant="coral" />
    <section className="focus-context container"><div><p className="section-label"><span>01</span>Context</p><h2>Connected by nature.</h2></div><div><p>The pancreas connects important digestive, endocrine, and metabolic processes. Its biology is intricate, interdependent, and consequential.</p><p>BioPancrea approaches this landscape with a wide lens and a focused purpose—building understanding before drawing conclusions.</p></div></section>
    <section className="focus-map container"><div className="focus-map-intro"><p className="section-label light"><span>02</span>Broad themes</p><h2>A connected<br />field of enquiry.</h2><p>Our public focus is expressed through themes, not programmes.</p></div><div className="node-system" aria-label="Four connected focus areas">{areas.map(([title,copy],index) => <article className={`node node-${index + 1}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}<i className="node-line node-line-a" /><i className="node-line node-line-b" /><i className="node-line node-line-c" /></div></section>
    <section className="disclosure-band container"><span className="disclosure-mark" aria-hidden="true"><i /><i /><i /></span><div><p className="section-label"><span>03</span>Focused disclosure</p><blockquote>“BioPancrea is currently operating with a focused level of disclosure. Further information will be shared as our work develops.”</blockquote></div></section>
  </main>;
}
