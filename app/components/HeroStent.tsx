"use client";

import { useRef } from "react";

type LatticeSegment = { key: string; x1: number; y1: number; x2: number; y2: number; back: boolean };

const latticeSegments: LatticeSegment[] = [];
const latticeStart = 170;
const latticeStep = 50;
const latticeCentre = 310;
const latticeRadius = 120;

for (const direction of [-1, 1]) {
  for (let lane = 0; lane < 8; lane += 1) {
    for (let station = 0; station < 11; station += 1) {
      const angleA = lane * Math.PI / 4 + direction * station * Math.PI / 4;
      const angleB = lane * Math.PI / 4 + direction * (station + 1) * Math.PI / 4;
      latticeSegments.push({
        key: `${direction}-${lane}-${station}`,
        x1: latticeStart + station * latticeStep + Math.cos(angleA) * 8,
        y1: latticeCentre + Math.sin(angleA) * latticeRadius,
        x2: latticeStart + (station + 1) * latticeStep + Math.cos(angleB) * 8,
        y2: latticeCentre + Math.sin(angleB) * latticeRadius,
        back: (Math.cos(angleA) + Math.cos(angleB)) / 2 < 0,
      });
    }
  }
}

const backStruts = latticeSegments.filter((segment) => segment.back);
const frontStruts = latticeSegments.filter((segment) => !segment.back);
const cells = [[340, 376, 17], [382, 392, 14], [425, 370, 19], [472, 389, 13], [515, 368, 16]] as const;

export function HeroStent() {
  const fieldRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = field.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    field.style.setProperty("--stent-shift", `translate3d(${x}px,${y}px,0) rotate(${x * .08}deg)`);
    field.style.setProperty("--particle-shift", `translate3d(${x * .28}px,${y * .28}px,0)`);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function resetPosition() {
    fieldRef.current?.style.setProperty("--stent-shift", "translate3d(0,0,0)");
    fieldRef.current?.style.setProperty("--particle-shift", "translate3d(0,0,0)");
  }

  return (
    <div className="hero-stent-field" ref={fieldRef} onPointerMove={handlePointerMove} onPointerDown={handlePointerDown} onPointerUp={resetPosition} onPointerLeave={resetPosition}>
      <div className="bio-particle-field" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
      </div>
      <svg viewBox="0 0 900 620" role="img" aria-labelledby="hero-stent-title hero-stent-description">
        <title id="hero-stent-title">Conceptual vascular stent platform</title>
        <desc id="hero-stent-description">An open cylindrical stent with a repeating diamond lattice, a thin hydrogel layer and small beta-like cell clusters positioned away from the central blood-flow channel.</desc>
        <g className="hero-stent-grid" aria-hidden="true">{Array.from({ length: 12 }).map((_, index) => <path key={index} d={`M30 ${40 + index * 50} H870 M${50 + index * 72} 20 V600`} />)}</g>
        <g className="hero-stent-pointer">
          <g className="hero-stent-assembly">
            <g className="hero-stent-back" aria-hidden="true">
              {backStruts.map((segment) => <line key={segment.key} x1={segment.x1} y1={segment.y1} x2={segment.x2} y2={segment.y2} />)}
              <ellipse cx="170" cy="310" rx="38" ry="121" />
              <ellipse cx="720" cy="310" rx="38" ry="121" />
            </g>
            <g className="hero-hydrogel" aria-hidden="true">
              <path d="M178 357 C315 382 565 385 712 354 L713 405 C560 438 320 432 177 405 Z" />
              {Array.from({ length: 7 }).map((_, index) => <path key={index} d={`M190 ${369 + index * 7} C340 ${393 + index * 5} 560 ${395 + index * 3} 702 ${365 + index * 6}`} />)}
            </g>
            <g className="hero-beta-cells" aria-hidden="true">
              {cells.map(([cx, cy, radius], index) => <g key={`${cx}-${cy}`} className={`hero-beta-cell hero-beta-cell-${index + 1}`}><circle cx={cx} cy={cy} r={radius} /><circle cx={cx - 4} cy={cy - 4} r={radius * .22} /></g>)}
            </g>
            <g className="hero-flow-particles" aria-hidden="true">
              {[[205,287,4],[285,322,3],[380,297,5],[475,319,3],[570,289,4],[660,316,3]].map(([cx,cy,r], index) => <circle key={index} cx={cx} cy={cy} r={r} />)}
            </g>
            <g className="hero-stent-front" aria-hidden="true">
              {frontStruts.map((segment) => <line key={segment.key} x1={segment.x1} y1={segment.y1} x2={segment.x2} y2={segment.y2} />)}
              <ellipse cx="170" cy="310" rx="38" ry="121" />
              <ellipse cx="170" cy="310" rx="27" ry="98" />
              <ellipse cx="720" cy="310" rx="38" ry="121" />
              <ellipse cx="720" cy="310" rx="27" ry="98" />
            </g>
          </g>
          <g className="hero-stent-callouts" aria-hidden="true">
            <path d="M360 379 L276 494 L142 494" /><circle cx="360" cy="379" r="3" />
            <path d="M530 406 L624 493 L770 493" /><circle cx="530" cy="406" r="3" />
            <path d="M620 218 L696 132 L808 132" /><circle cx="620" cy="218" r="3" />
          </g>
        </g>
      </svg>
      <span className="stent-callout stent-callout-cells">Beta-like cells</span>
      <span className="stent-callout stent-callout-gel">Hydrogel matrix</span>
      <span className="stent-callout stent-callout-scaffold">Stent scaffold</span>
      <span className="stent-channel-label">Open blood-flow channel</span>
      <span className="field-index">BP—VASCULAR / CONCEPT</span>
    </div>
  );
}
