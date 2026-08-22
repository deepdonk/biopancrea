import Link from "next/link";

const stages = [
  ["01", "Skin cells", "A small skin-cell sample provides the biological starting point."],
  ["02", "iPSCs", "The collected cells are reprogrammed into induced pluripotent stem cells."],
  ["03", "Beta-like cells", "The iPSCs are guided toward insulin-producing pancreatic beta-like cells."],
  ["04", "Hydrogel", "The cells are incorporated into a supportive biomaterial environment."],
  ["05", "Stent platform", "The cell-containing material is integrated with a stent-based vascular platform."],
] as const;

export function ConceptSequence() {
  return (
    <section className="concept-sequence container">
      <p className="section-label"><span>01</span>The platform sequence</p>
      <div className="sequence-line" aria-hidden="true"><i /><i /><i /><i /><i /></div>
      <ol>
        {stages.map(([number, title, copy]) => (
          <li key={number}>
            <div className={`sequence-glyph sequence-glyph-${number}`} aria-hidden="true"><i /><i /><i /></div>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </li>
        ))}
      </ol>
      <Link className="inline-link" href="/how-it-works">Explore the complete process <span aria-hidden="true">↗</span></Link>
    </section>
  );
}
