const placeholders = [
  { number: "01", mark: "01" },
  { number: "02", mark: "02" },
] as const;

export function TeamProfiles() {
  return (
    <div className="team-profile-grid">
      {placeholders.map(({ number, mark }) => (
        <article className="team-profile" key={number}>
          <div className="team-profile-portrait" role="img" aria-label={`Team member ${number} photograph pending confirmation`}>
            <span aria-hidden="true">{mark}</span>
            <small>Real photograph pending</small>
          </div>
          <div className="team-profile-copy">
            <span>Team member {number}</span>
            <h2>Name pending confirmation</h2>
            <p className="team-profile-role">Role pending confirmation</p>
            <p>Short biography pending verified information.</p>
            <dl><dt>Relevant expertise</dt><dd>Pending confirmation</dd></dl>
            <span className="team-link-placeholder" aria-disabled="true">LinkedIn pending</span>
          </div>
        </article>
      ))}
    </div>
  );
}
