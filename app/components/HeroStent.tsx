import { PlatformGraphic } from "./PlatformGraphic";

export function HeroStent() {
  return (
    <div className="hero-stent-field">
      <PlatformGraphic id="hero-platform" className="platform-graphic-hero" showLabels />
      <span className="field-index">BP—VASCULAR / CONCEPT</span>
    </div>
  );
}
