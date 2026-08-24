"use client";

import { useEffect, useRef, useState } from "react";
import { PlatformAssembly } from "./PlatformGraphic";

export function MissionPlatformGraphic() {
  const [assembled, setAssembled] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setAssembled(true);
        observer.disconnect();
      }
    }, { threshold: .42 });
    observer.observe(figure);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={`mission-concept-diagram${assembled ? " is-assembled" : ""}`} ref={figureRef}>
      <svg viewBox="0 0 960 660" role="img" aria-labelledby="mission-platform-title mission-platform-description">
        <title id="mission-platform-title">Exploded BioPancrea platform concept</title>
        <desc id="mission-platform-description">Beta-like cell clusters, a porous hydrogel layer, and an open stent scaffold are separated vertically and then align into one platform concept.</desc>
        <path className="mission-alignment-line" d="M480 74 V570" aria-hidden="true" />
        <g className="mission-layer mission-layer-cells"><PlatformAssembly id="mission-cells" showStent={false} showHydrogel={false} showFlow={false} /></g>
        <g className="mission-layer mission-layer-hydrogel"><PlatformAssembly id="mission-hydrogel" showStent={false} showCells={false} showFlow={false} /></g>
        <g className="mission-layer mission-layer-stent"><PlatformAssembly id="mission-stent" showHydrogel={false} showCells={false} showFlow={false} /></g>
        <g className="mission-exploded-labels" aria-hidden="true">
          <text x="52" y="126">01  BETA-LIKE CELLS</text>
          <text x="52" y="328">02  HYDROGEL LAYER</text>
          <text x="52" y="542">03  STENT SCAFFOLD</text>
        </g>
      </svg>
      <figcaption>Cell biology, biomaterials, and vascular engineering brought together in one concept.</figcaption>
    </figure>
  );
}
