import { PlatformModel } from "./PlatformModel";

export function MissionPlatformGraphic() {
  return (
    <figure className="mission-concept-diagram">
      <PlatformModel id="mission-platform" showLabels showFlow={false} />
      <figcaption>BioPancrea’s investigational platform concept. Not to scale.</figcaption>
    </figure>
  );
}
