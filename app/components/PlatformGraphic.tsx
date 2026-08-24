type PlatformLayer = "cells" | "hydrogel" | "stent";

type StentSurface = "front" | "rear";

type PlatformGraphicProps = {
  id: string;
  className?: string;
  showLabels?: boolean;
  showFlow?: boolean;
  activeLayer?: PlatformLayer | null;
  title?: string;
  description?: string;
};

type PlatformAssemblyProps = {
  id: string;
  showStent?: boolean;
  showHydrogel?: boolean;
  showCells?: boolean;
  showFlow?: boolean;
};

type LatticeSpec = {
  stations: number;
  nodes: number;
  className: string;
};

const desktopLattice: LatticeSpec = { stations: 10, nodes: 14, className: "stent-lattice-desktop" };
const mobileLattice: LatticeSpec = { stations: 8, nodes: 10, className: "stent-lattice-mobile" };

function stentPoint(station: number, node: number, spec: LatticeSpec) {
  const progress = station / spec.stations;
  const angle = (node / spec.nodes) * Math.PI * 2;
  const centreX = 148 + progress * 664;
  const centreY = 326 - progress * 102;
  const radiusX = 30 - progress * 6;
  const radiusY = 82 - progress * 10;

  return {
    x: centreX + Math.cos(angle) * radiusX,
    y: centreY + Math.sin(angle) * radiusY,
    depth: Math.sin(angle),
  };
}

function latticeSegments(spec: LatticeSpec, surface: StentSurface) {
  return [-1, 1].flatMap((direction) =>
    Array.from({ length: spec.nodes }, (_, node) =>
      Array.from({ length: spec.stations }, (_, station) => {
        const from = stentPoint(station, node, spec);
        const to = stentPoint(station + 1, (node + direction + spec.nodes) % spec.nodes, spec);
        const isFront = (from.depth + to.depth) / 2 >= 0;

        if ((surface === "front") !== isFront) return null;

        return (
          <line
            key={`${spec.className}-${surface}-${direction}-${node}-${station}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
          />
        );
      }),
    ),
  );
}

function OpeningRings({ surface }: { surface: StentSurface }) {
  if (surface === "rear") {
    return (
      <g className="stent-opening-rings stent-opening-rings-rear">
        <ellipse cx="148" cy="326" rx="30" ry="82" />
        <ellipse cx="148" cy="326" rx="22" ry="63" />
        <ellipse cx="812" cy="224" rx="24" ry="72" />
        <ellipse cx="812" cy="224" rx="17" ry="55" />
      </g>
    );
  }

  return (
    <g className="stent-opening-rings stent-opening-rings-front">
      <path d="M118 326 A30 82 0 0 0 178 326" />
      <path d="M126 326 A22 63 0 0 0 170 326" />
      <path d="M788 224 A24 72 0 0 0 836 224" />
      <path d="M795 224 A17 55 0 0 0 829 224" />
    </g>
  );
}

export function StentGeometry({ surface }: { surface: StentSurface }) {
  return (
    <g className={`stent-geometry stent-geometry-${surface}`} aria-hidden="true">
      {[desktopLattice, mobileLattice].map((spec) => (
        <g className={spec.className} key={`${spec.className}-${surface}`}>
          {latticeSegments(spec, surface)}
        </g>
      ))}
      <OpeningRings surface={surface} />
    </g>
  );
}

const upperHydrogel = "M170 248 C330 215 640 169 807 159 L807 181 C640 192 332 237 171 270 Z";
const lowerHydrogel = "M170 382 C334 386 643 338 807 286 L807 307 C644 360 333 408 169 404 Z";
const openLumen = "M173 273 C334 242 642 198 806 184 L806 282 C642 332 334 378 173 378 Z";

export function HydrogelLayer({ id, className = "" }: { id: string; className?: string }) {
  return (
    <g className={`hydrogel-layer ${className}`.trim()} mask={`url(#${id}-lumen-mask)`} aria-hidden="true">
      <defs>
        <pattern id={`${id}-hydrogel-mesh`} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
          <path d="M0 0 H18 M0 0 V18" />
        </pattern>
      </defs>
      <path className="hydrogel-surface" d={upperHydrogel} />
      <path className="hydrogel-surface" d={lowerHydrogel} />
      <path className="hydrogel-mesh" d={upperHydrogel} fill={`url(#${id}-hydrogel-mesh)`} />
      <path className="hydrogel-mesh" d={lowerHydrogel} fill={`url(#${id}-hydrogel-mesh)`} />
    </g>
  );
}

const cellPositions = [
  [-12, 0, 7],
  [-4, -9, 8],
  [7, -5, 6.5],
  [10, 7, 8],
  [-3, 10, 6],
] as const;

export function BetaCellCluster({ x, y, scale = 1, className = "" }: { x: number; y: number; scale?: number; className?: string }) {
  return (
    <g className={`beta-cell-cluster ${className}`.trim()} transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
      {cellPositions.map(([cx, cy, radius]) => (
        <g className="beta-cell" key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={radius} />
          <circle className="beta-cell-detail" cx={cx - radius * .24} cy={cy - radius * .24} r={radius * .18} />
        </g>
      ))}
    </g>
  );
}

export function PlatformCells({ className = "" }: { className?: string }) {
  return (
    <g className={`platform-cells ${className}`.trim()} aria-hidden="true">
      <BetaCellCluster x={337} y={237} scale={.88} className="cell-cluster-1" />
      <BetaCellCluster x={487} y={354} scale={.82} className="cell-cluster-2" />
      <BetaCellCluster x={625} y={186} scale={.78} className="cell-cluster-3" />
      <BetaCellCluster x={718} y={316} scale={.72} className="cell-cluster-4" />
    </g>
  );
}

export function BloodFlowMarkers({ className = "" }: { className?: string }) {
  return (
    <g className={`blood-flow-markers ${className}`.trim()} aria-hidden="true">
      {[[245, 314], [382, 294], [530, 270], [676, 246]].map(([cx, cy], index) => (
        <circle className={`flow-marker flow-marker-${index + 1}`} cx={cx} cy={cy} r={index % 2 ? 3 : 4} key={`${cx}-${cy}`} />
      ))}
    </g>
  );
}

export function PlatformAssembly({
  id,
  showStent = true,
  showHydrogel = true,
  showCells = true,
  showFlow = true,
}: PlatformAssemblyProps) {
  return (
    <g className="platform-assembly">
      <defs>
        <mask id={`${id}-lumen-mask`}>
          <rect width="960" height="560" fill="white" />
          <path d={openLumen} fill="black" />
        </mask>
      </defs>
      {showStent ? <StentGeometry surface="rear" /> : null}
      {showHydrogel ? <HydrogelLayer id={id} /> : null}
      {showCells ? <PlatformCells /> : null}
      {showFlow ? <BloodFlowMarkers /> : null}
      {showStent ? <StentGeometry surface="front" /> : null}
    </g>
  );
}

function PlatformLabels() {
  return (
    <g className="platform-labels" aria-hidden="true">
      <g><path d="M310 286 H250 V90 H62" /><circle cx="310" cy="286" r="2.5" /><text x="62" y="76">Open lumen</text></g>
      <g><path d="M487 354 H250 V466 H62" /><circle cx="487" cy="354" r="2.5" /><text x="62" y="490">Beta-like cells</text></g>
      <g><path d="M696 160 H768 V90 H900" /><circle cx="696" cy="160" r="2.5" /><text x="900" y="76" textAnchor="end">Stent scaffold</text></g>
      <g><path d="M690 310 H768 V466 H900" /><circle cx="690" cy="310" r="2.5" /><text x="900" y="490" textAnchor="end">Hydrogel</text></g>
    </g>
  );
}

export function PlatformGraphic({
  id,
  className = "",
  showLabels = false,
  showFlow = true,
  activeLayer = null,
  title = "BioPancrea vascular platform concept",
  description = "A precise axonometric illustration of an open vascular stent scaffold containing a thin porous hydrogel sleeve and four beta-like cell clusters while preserving the central lumen.",
}: PlatformGraphicProps) {
  const state = activeLayer ? ` isolate-${activeLayer}` : "";

  return (
    <figure className={`platform-graphic ${className}${state}`.trim()}>
      <svg viewBox="0 0 960 560" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-description`}>{description}</desc>
        <PlatformAssembly id={id} showFlow={showFlow} />
        {showLabels ? <PlatformLabels /> : null}
      </svg>
      {showLabels ? (
        <figcaption className="platform-mobile-labels">
          <span>Beta-like cells</span>
          <span>Hydrogel</span>
          <span>Stent scaffold</span>
          <span>Open lumen</span>
        </figcaption>
      ) : null}
    </figure>
  );
}
