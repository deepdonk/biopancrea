import { PlatformModel } from "./PlatformModel";

export function MissionPlatformGraphic() {
  return (
    <figure className="mission-concept-diagram">
      <PlatformModel id="mission-platform" showLabels />
      <figcaption>BioPancrea’s investigational platform concept. Not to scale.</figcaption>
    </figure>
  );
}
