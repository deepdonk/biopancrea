import { TeamProfiles } from "../components/TeamProfiles";
import { createPageMetadata } from "../lib/metadata";

export const metadata = createPageMetadata({
  title: "Meet the BioPancrea Founders",
  description: "Meet BioPancrea founders Deepta Suresh and Janefrances Muoneke.",
  path: "/meet-the-team",
});

export default function MeetTheTeamPage() {
  return (
    <main>
      <section className="simple-page-heading container">
        <p className="eyebrow"><span>03</span>BioPancrea</p>
        <h1>Meet the team</h1>
      </section>
      <section className="team-profiles-section simple-team-profiles container">
        <TeamProfiles />
      </section>
      <nav className="contextual-links container" aria-label="Contact BioPancrea">
        <a className="button button-dark" href="/contact">Contact the BioPancrea team</a>
      </nav>
    </main>
  );
}
