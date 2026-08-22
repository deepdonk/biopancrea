import type { Metadata } from "next";
import Link from "next/link";
import { TeamNetworkField } from "../components/TeamNetworkField";
import { TeamProfiles } from "../components/TeamProfiles";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Meet the people and perspectives shaping BioPancrea’s purpose.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="page-hero team-page-hero">
        <div className="page-hero-copy">
          <p className="eyebrow"><span>03</span>Meet the team</p>
          <h1>The people behind the purpose.</h1>
          <p className="page-hero-support">BioPancrea brings together people united by scientific curiosity, thoughtful execution, and a shared commitment to advancing pancreatic health.</p>
        </div>
        <TeamNetworkField />
        <div className="scroll-cue" aria-hidden="true"><i /> Scroll to meet the team</div>
      </section>

      <section className="team-profiles-section container">
        <div className="team-profiles-heading">
          <div><p className="section-label"><span>01</span>Team profiles</p><h2>Credibility begins with accuracy.</h2></div>
          <div><p>Profiles will appear here only after names, roles, photographs, biographies, expertise, and professional links have been verified and approved.</p><span>Layout placeholders do not represent or imply team size.</span></div>
        </div>
        <TeamProfiles />
      </section>

      <section className="team-disclosure container">
        <p className="section-label"><span>02</span>Leadership, advisors and collaborators</p>
        <div><h2>Published only with explicit approval.</h2><p>Leadership distinctions, scientific advisors, collaborators, affiliations, and institutional relationships remain intentionally unpublished until each association has been confirmed for public use.</p></div>
      </section>

      <section className="team-philosophy container">
        <p className="section-label light"><span>03</span>Team philosophy</p>
        <div><h2>Different perspectives.<br /><em>One shared purpose.</em></h2><p>Meaningful innovation benefits from thoughtful collaboration across science, medicine, technology, and company building. We value rigorous thinking, open exchange, and care in how ideas move forward.</p></div>
      </section>

      <section className="team-careers container">
        <div><p className="section-label"><span>04</span>Future opportunities</p><h2>Help shape what comes next.</h2></div>
        <div><p>We welcome interest from thoughtful, mission-driven people who may want to contribute as BioPancrea develops.</p><Link className="button button-dark" href="/careers">Explore future opportunities <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
