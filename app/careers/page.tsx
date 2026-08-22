import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = {
  title: "Careers",
  description: "Future opportunities to contribute to BioPancrea’s purpose.",
};

export default function CareersPage() {
  return (
    <main>
      <PageHero index="04" label="Careers" title="Help shape what comes next." copy="BioPancrea welcomes interest from thoughtful, mission-driven people across science, medicine, technology, and company building." variant="sage" />
      <section className="careers-openings container">
        <p className="section-label"><span>01</span>Current opportunities</p>
        <div><h2>No public roles are listed at present.</h2><p>When approved opportunities become available, they will be published here with a clear role description and application process. We do not collect sensitive or confidential information through general enquiries.</p><Link className="button button-dark" href="/contact">Share your interest <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
