import { PlatformModel } from "./PlatformModel";

export function HeroStent() {
  return (
    <figure className="hero-stent-field" data-diagram="labelled-platform">
      <PlatformModel
        id="hero-platform"
        className="hero-platform-model"
        showLabels
        title="BioPancrea vascular implant concept"
        description="A conceptual platform combining cells, a supportive gel and a vascular stent."
      />
      <figcaption className="hero-platform-key">
        <span><i className="key-cell" aria-hidden="true" />Cells</span>
        <span><i className="key-gel" aria-hidden="true" />Supportive gel</span>
        <span><i className="key-stent" aria-hidden="true" />Vascular stent</span>
      </figcaption>
    </figure>
  );
}
