import type { Metadata } from "next";
import { TeamProfiles } from "../components/TeamProfiles";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Meet the two people behind BioPancrea.",
};

export default function TeamPage() {
  return (
    <main>
      <section className="simple-page-heading container">
        <p className="eyebrow"><span>02</span>BioPancrea</p>
        <h1>Meet the team</h1>
      </section>
      <section className="team-profiles-section simple-team-profiles container">
        <TeamProfiles />
      </section>
    </main>
  );
}
