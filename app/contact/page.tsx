import type { Metadata } from "next";
import { ContactForm } from "../ContactForm";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "Contact", description: "Start a thoughtful conversation with BioPancrea." };

export default function ContactPage() {
  return <main>
    <PageHero index="05" label="Contact" title="Let’s start a meaningful conversation." copy="We welcome conversations with people and organisations who share our interest in advancing pancreatic health." variant="coral" />
    <section className="contact-page container"><div className="contact-aside"><p className="section-label"><span>01</span>Make contact</p><h2>Aligned interests.<br />Open dialogue.</h2><p>We are especially interested in thoughtful conversations across research, clinical practice, strategic collaboration, investment, and company building.</p><div className="contact-notes"><span>01 — Every message is reviewed</span><span>02 — Your details are handled with care</span><span>03 — No confidential information is required</span></div></div><ContactForm /></section>
  </main>;
}
