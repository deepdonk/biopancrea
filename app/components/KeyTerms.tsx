const terms = [
  ["Cell engineering", "The process of guiding cells toward a specialised biological identity."],
  ["Beta-like cell", "A stem-cell-derived cell designed to reproduce important characteristics of an insulin-producing pancreatic beta cell."],
  ["Hydrogel", "A water-rich biomaterial that can provide cells with a supportive three-dimensional environment."],
  ["Vascular stent", "A small expandable scaffold designed to sit within a blood vessel."],
] as const;

export function KeyTerms() {
  return (
    <section className="key-terms container">
      <header><p className="section-label"><span>08</span>Reference</p><h2>Key terms</h2></header>
      <div className="key-term-rows">
        {terms.map(([term, definition]) => (
          <details key={term}>
            <summary><span>{term}</span><i aria-hidden="true">+</i></summary>
            <p>{definition}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
