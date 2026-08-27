type PlatformLayer = "cells" | "gel" | "stent";

type PlatformModelProps = {
  id: string;
  className?: string;
  exploded?: boolean;
  assembled?: boolean;
  activeLayer?: PlatformLayer | null;
  showLabels?: boolean;
  title?: string;
  description?: string;
};

type PlatformLayersProps = Pick<PlatformModelProps, "exploded" | "assembled" | "activeLayer" | "showLabels">;

const stations = Array.from({ length: 13 }, (_, index) => index);
const lanes = Array.from({ length: 8 }, (_, index) => index);
const conceptualCellGroups = [
  [360, 330],
  [470, 216],
  [555, 324],
  [650, 205],
] as const;

const clusterCells = [
  [-12, -4, 10], [8, -10, 9], [-2, 11, 11], [15, 8, 8],
] as const;

function stationPoint(station: number, lane: number) {
  const progress = station / 12;
  const centreX = 166 + progress * 632;
  const centreY = 274 - progress * 32;
  const radiusX = 34 - progress * 6;
  const radiusY = 80 - progress * 12;
  const angle = lane * Math.PI / 4;
  return {
    x: centreX + Math.cos(angle) * radiusX,
    y: centreY + Math.sin(angle) * radiusY,
    front: Math.cos(angle) >= 0,
  };
}

const lattice = [-1, 1].flatMap((direction) =>
  lanes.flatMap((lane) =>
    stations.slice(0, -1).map((station) => {
      const from = stationPoint(station, lane);
      const to = stationPoint(station + 1, (lane + direction + lanes.length) % lanes.length);
      return {
        key: `${direction}-${lane}-${station}`,
        from,
        to,
        front: from.front || to.front,
      };
    }),
  ),
);

function Lattice({ front }: { front: boolean }) {
  return lattice
    .filter((segment) => segment.front === front)
    .map((segment) => (
      <line
        key={segment.key}
        x1={segment.from.x}
        y1={segment.from.y}
        x2={segment.to.x}
        y2={segment.to.y}
      />
    ));
}

export function PlatformModelLayers({
  exploded = false,
  assembled = true,
  activeLayer = null,
  showLabels = false,
}: PlatformLayersProps) {
  const state = [
    "master-platform",
    exploded ? "is-exploded" : "",
    assembled ? "is-assembled" : "",
    activeLayer ? `isolate-${activeLayer}` : "",
  ].filter(Boolean).join(" ");

  return (
    <g className={state}>
      <g className="master-stent master-stent-back" aria-hidden="true">
        <Lattice front={false} />
        {stations.filter((station) => station % 2 === 0).map((station) => {
          const progress = station / 12;
          return <ellipse key={station} cx={166 + progress * 632} cy={274 - progress * 32} rx={34 - progress * 6} ry={80 - progress * 12} />;
        })}
      </g>

      <g className="master-gel" aria-hidden="true">
        <path className="master-gel-surface" d="M174 312 C318 342 630 329 792 287 L792 310 C630 354 318 367 173 337 Z" />
        <path className="master-gel-surface" d="M174 220 C320 198 635 188 793 194 L793 211 C632 209 321 218 175 242 Z" />
        {[0, 1, 2, 3, 4].map((index) => (
          <path key={`lower-${index}`} className="master-gel-network" d={`M182 ${316 + index * 5} C330 ${344 + index * 4} 630 ${331 + index * 3} 784 ${292 + index * 5}`} />
        ))}
        {[0, 1, 2].map((index) => (
          <path key={`upper-${index}`} className="master-gel-network" d={`M183 ${224 + index * 7} C335 ${202 + index * 5} 630 ${192 + index * 4} 784 ${198 + index * 5}`} />
        ))}
        {[250, 330, 420, 515, 610, 700].map((x, index) => (
          <path key={`mark-${x}`} className="master-gel-mark" d={`M${x} ${index % 2 ? 320 : 329} q14 13 0 27 q-14-14 0-27 M${x + 12} ${index % 2 ? 207 : 201} q12 10 0 21 q-12-11 0-21`} />
        ))}
      </g>

      <g className="master-cells" aria-hidden="true">
        {conceptualCellGroups.map(([cx, cy], clusterIndex) => (
          <g key={`${cx}-${cy}`} className={`master-cell-cluster master-cell-cluster-${clusterIndex + 1}`}>
            {clusterCells.map(([offsetX, offsetY, radius], cellIndex) => (
              <g key={`${offsetX}-${offsetY}`} className={`master-cell master-cell-${cellIndex + 1}`}>
                <circle cx={cx + offsetX} cy={cy + offsetY} r={radius} />
                <circle cx={cx + offsetX - radius * .25} cy={cy + offsetY - radius * .24} r={radius * .22} />
              </g>
            ))}
          </g>
        ))}
      </g>

      <g className="master-stent master-stent-front" aria-hidden="true">
        <Lattice front />
        <ellipse cx="166" cy="274" rx="34" ry="80" />
        <ellipse className="master-inner-ring" cx="166" cy="274" rx="25" ry="65" />
        <ellipse cx="798" cy="242" rx="28" ry="68" />
        <ellipse className="master-inner-ring" cx="798" cy="242" rx="20" ry="55" />
      </g>

      {showLabels && (
        <g className="master-labels" aria-hidden="true">
          <g><path d="M650 205 L700 112 H858" /><circle cx="650" cy="205" r="3" /><text x="706" y="101">Cells</text></g>
          <g><path d="M555 324 L700 410 H858" /><circle cx="555" cy="324" r="3" /><text x="706" y="433">Supportive gel</text></g>
          <g><path d="M292 205 L232 112 H94" /><circle cx="292" cy="205" r="3" /><text x="94" y="101">Vascular stent</text></g>
        </g>
      )}
    </g>
  );
}

export function PlatformModel({
  id,
  className = "",
  title = "Conceptual BioPancrea vascular platform",
  description = "A conceptual illustration showing cells, a supportive gel and a vascular stent as three parts of one platform.",
  ...layerProps
}: PlatformModelProps) {
  return (
    <svg className={`platform-model ${className}`.trim()} viewBox="0 0 960 520" role="img" aria-label={title} aria-describedby={`${id}-description`}>
      <desc id={`${id}-description`}>{description}</desc>
      <g className="platform-model-grid" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => <path key={index} d={`M40 ${54 + index * 52} H920 M${60 + index * 105} 30 V490`} />)}
      </g>
      <PlatformModelLayers {...layerProps} />
    </svg>
  );
}
