import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Team",
  description: "The disciplines behind BioPancrea’s research-stage platform concept.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="page-lead team-lead">
        <p className="kicker"><span>03</span>Team</p>
        <h1>Built across biological and engineered disciplines.</h1>
        <p>BioPancrea brings together experience across cell biology, biomaterials, medical devices, and translational development.</p>
      </section>
      <section className="team-section section-pad">
        <div className="team-statement">
          <span>Public team information</span>
          <h2>Verified profiles will be published when appropriate.</h2>
          <p>BioPancrea does not publish placeholder identities, unverified biographies, or implied affiliations. This page will show names, roles, relevant expertise, photographs, and professional links only after they are verified and approved for public release.</p>
        </div>
        <div className="discipline-map" aria-label="BioPancrea team disciplines">
          {[["01", "Cell biology"], ["02", "Biomaterials"], ["03", "Medical devices"], ["04", "Translation"]].map(([number, label]) => <div key={number}><span>{number}</span><p>{label}</p></div>)}
        </div>
      </section>
      <section className="team-contact section-pad"><p className="kicker kicker-light"><span>04</span>Connect</p><div><h2>Bring a relevant perspective?</h2><p>We welcome thoughtful conversations with people working across the disciplines that shape this concept.</p><Link className="button button-acid" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
