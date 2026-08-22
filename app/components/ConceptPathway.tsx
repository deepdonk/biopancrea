const stages = [
  ["01", "Your cells", "A small skin-cell sample provides the biological starting material."],
  ["02", "iPSCs", "Skin cells are reprogrammed into induced pluripotent stem cells."],
  ["03", "Beta-like cells", "iPSCs are guided through staged differentiation toward an insulin-producing identity."],
  ["04", "Hydrogel", "The resulting cells are incorporated into a supportive biomaterial environment."],
  ["05", "Stent platform", "The hydrogel and cells meet a stent-based concept intended for vascular placement."],
] as const;

export function ConceptPathway() {
  return (
    <ol className="concept-pathway" aria-label="BioPancrea concept overview">
      {stages.map(([number, title, copy]) => (
        <li key={number}>
          <details>
            <summary><span>{number}</span><strong>{title}</strong><i aria-hidden="true">+</i></summary>
            <p>{copy}</p>
          </details>
        </li>
      ))}
    </ol>
  );
}
