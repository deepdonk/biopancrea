const status = [
  { label: "Stage", value: "Research-stage concept" },
  { label: "Focus", value: "Beta-like cells, hydrogel and a vascular stent" },
  { label: "Still required", value: "Biological, engineering, preclinical, clinical and regulatory validation" },
] as const;

export function HomeTeam() {
  return (
    <section className="home-statement container" aria-labelledby="home-team-heading" data-reveal>
      <p className="section-label" data-reveal-label><span>03</span>Team</p>
      <div>
        <h2 id="home-team-heading" data-reveal-heading>Led by its founders, from the first concept.</h2>
        <div data-reveal-copy>
          <p>Deepta Suresh and Janefrances Muoneke founded BioPancrea to bring cell engineering, biomaterials and vascular-device design together around one question: can living cells respond to glucose from within the body?</p>
          <dl className="home-status">
            {status.map(({ label, value }) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <a className="button button-line" href="/meet-the-team">Meet the team</a>
        </div>
      </div>
    </section>
  );
}
