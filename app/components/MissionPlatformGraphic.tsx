"use client";

import { useEffect, useRef, useState } from "react";
import { PlatformModel } from "./PlatformModel";

export function MissionPlatformGraphic() {
  const [assembled, setAssembled] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => setAssembled(entry.isIntersecting), { threshold: .42 });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={`mission-concept-diagram${assembled ? " is-assembled" : ""}`} ref={figureRef}>
      <PlatformModel id="mission-platform" exploded assembled={assembled} showLabels={false} showFlow={false} />
      <div className="mission-platform-labels" aria-hidden="true">
        <span>Beta-like cell clusters</span><span>Hydrogel layer</span><span>Stent scaffold</span>
      </div>
      <figcaption>Cell biology, biomaterials, and vascular engineering brought together in one concept.</figcaption>
    </figure>
  );
}
