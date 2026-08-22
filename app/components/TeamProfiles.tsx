const team = [
  {
    name: "Deepta Suresh",
    role: "CEO & Co-Founder",
    linkedIn: "https://www.linkedin.com/in/deepta-suresh-b51913367/",
    initials: "DS",
    imageAlt: "Deepta Suresh, CEO and Co-Founder of BioPancrea",
  },
  {
    name: "Janefrances Muoneke",
    role: "Co-Founder",
    linkedIn: "https://www.linkedin.com/in/janefrances-muoneke-3313113a2/",
    initials: "JM",
    imageAlt: "Janefrances Muoneke, Co-Founder of BioPancrea",
  },
] as const;

export function TeamProfiles() {
  return (
    <div className="team-profile-grid">
      {team.map(({ name, role, linkedIn, initials, imageAlt }) => (
        <article className="team-profile" key={name}>
          <div className="team-profile-portrait is-placeholder" role="img" aria-label={imageAlt}>
            <span aria-hidden="true">{initials}</span>
            <small>LinkedIn photo could not be retrieved — image needed</small>
          </div>
          <div className="team-profile-copy">
            <h2>{name}</h2>
            <p className="team-profile-role">{role}</p>
            <a className="button button-dark team-link" href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </article>
      ))}
    </div>
  );
}
