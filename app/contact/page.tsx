import type { Metadata } from "next";
import { ContactForm } from "../ContactForm";

export const metadata: Metadata = { title: "Contact", description: "Start a conversation with BioPancrea." };

export default function ContactPage() {
  return <main>
    <section className="page-lead contact-lead"><p className="kicker"><span>04</span>Contact</p><h1>Let’s start a conversation.</h1><p>We welcome contact from aligned researchers, clinical experts, strategic partners, and investors.</p></section>
    <section className="contact-page section-pad"><div className="contact-aside"><p className="kicker"><span>01</span>Make contact</p><h2>Relevant expertise. Open dialogue.</h2><p>Tell us where your interests connect with the BioPancrea concept. Please do not include personal medical information or confidential technical details.</p><div className="contact-notes"><span>Every message is reviewed</span><span>Your details are handled with care</span><span>No confidential information is required</span></div></div><ContactForm /></section>
  </main>;
}
