import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "../components/PageHero";

export const metadata: Metadata = { title: "Meet the Team", description: "The disciplines shaping BioPancrea’s research-stage platform." };

export default function TeamPage() {
  return <main>
    <PageHero index="03" label="Meet the team" title="Experience across biology, materials, devices, and translation." copy="BioPancrea will publish individual profiles only when names, roles, biographies, photographs, expertise, and professional links are verified and approved." variant="coral" />
    <section className="verified-team container">
      <p className="section-label"><span>01</span>Verified information only</p>
      <div className="team-intro"><h2>No placeholders. No invented credentials.</h2><p>This page intentionally avoids fake portraits, implied affiliations, and unverified biographies. Approved team profiles can be added here without changing the existing BioPancrea visual system.</p></div>
      <div className="team-discipline-line" aria-label="Relevant team disciplines">
        {[["01","Cell biology"],["02","Biomaterials"],["03","Medical devices"],["04","Translational development"]].map(([number,title]) => <div key={number}><span>{number}</span><i aria-hidden="true" /><p>{title}</p></div>)}
      </div>
    </section>
    <section className="team-connect container"><div><p className="section-label light"><span>02</span>Connect</p><h2>Bring a relevant perspective?</h2></div><div><p>We welcome thoughtful conversations with people whose expertise connects with the platform.</p><Link className="button button-light" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
