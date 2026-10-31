const routes = [
  { audience: "Investors", cta: "Talk to us about investing", topic: "investment" },
  { audience: "Research collaborators", cta: "Propose a collaboration", topic: "research" },
  { audience: "Clinicians", cta: "Share a clinical perspective", topic: "clinical" },
] as const;

export function HomePartner() {
  return (
    <section className="home-statement home-partner container" aria-labelledby="home-partner-heading" data-reveal>
      <p className="section-label" data-reveal-label><span>04</span>Contact</p>
      <div>
        <h2 id="home-partner-heading" data-reveal-heading>Partner or build with BioPancrea.</h2>
        <ul className="home-partner-routes" data-reveal-copy>
          {routes.map(({ audience, cta, topic }) => (
            <li key={topic}>
              <a href={`/contact?topic=${topic}#message-heading`}>
                <span>{audience}</span>
                <strong>{cta}</strong>
                <i aria-hidden="true">→</i>
              </a>
            </li>
          ))}
        </ul>
        <a className="button button-line" href="/work-with-us" data-reveal-copy>How working with us starts</a>
      </div>
    </section>
  );
}
