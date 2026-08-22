const technologies = [
  ["01", "Patient-derived cells", "A small skin-cell sample provides the biological starting point."],
  ["02", "Cell engineering", "The cells are reprogrammed into iPSCs and guided toward insulin-producing beta-like cells."],
  ["03", "Vascular platform", "The cells are supported within a hydrogel and integrated with a stent-based implant."],
] as const;

export function PlatformIdea() {
  return (
    <section className="platform-idea container" id="platform-idea">
      <div className="platform-idea-heading"><p className="section-label"><span>01</span>The idea</p><h2>One platform.<br /><em>Three technologies.</em></h2></div>
      <div className="technology-continuum">
        <div className="technology-line" aria-hidden="true"><i /><i /><i /><b /></div>
        <ol>
          {technologies.map(([number, title, copy]) => <li key={number}><div className={`technology-glyph technology-glyph-${number}`} aria-hidden="true"><i /><i /><i /><i /></div><span>{number}</span><h3>{title}</h3><p>{copy}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
