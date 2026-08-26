import { PlatformModel } from "./PlatformModel";

export function HeroStent() {
  return (
    <figure className="hero-stent-field">
      <PlatformModel
        id="hero-platform"
        className="hero-platform-model"
        showLabels
        title="BioPancrea vascular implant concept"
        description="A long open vascular stent containing a thin hydrogel layer and beta-like cell clusters."
      />
      <figcaption className="hero-platform-key">
        <span><i className="key-cell" aria-hidden="true" />Beta-like cells</span>
        <span><i className="key-gel" aria-hidden="true" />Hydrogel</span>
        <span><i className="key-stent" aria-hidden="true" />Vascular stent</span>
      </figcaption>
    </figure>
  );
}
