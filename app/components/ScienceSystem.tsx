"use client";

import { useState } from "react";

const areas = [
  ["Cell reprogramming", "A small skin-cell sample provides somatic cells that can be reprogrammed into induced pluripotent stem cells."],
  ["Beta-cell differentiation", "iPSCs can be guided through staged differentiation toward an insulin-producing pancreatic beta-like identity."],
  ["Biomaterials", "The concept incorporates cells into a hydrogel intended to provide a supportive structural environment."],
  ["Vascular platform", "BioPancrea is exploring integration with a conceptual stent-based platform intended for femoral-artery placement."],
] as const;

export function ScienceSystem() {
  const [activeArea, setActiveArea] = useState(0);

  return (
    <section className="science-system container">
      <div className="science-system-intro">
        <p className="section-label"><span>01</span>Connected disciplines</p>
        <h2>One platform, informed by four fields.</h2>
        <p>Select an area to understand its role in the concept.</p>
      </div>
      <div className="science-system-map" data-area={activeArea}>
        <svg viewBox="0 0 620 520" aria-hidden="true">
          <path d="M108 116 C230 90 390 90 512 116 M108 404 C230 430 390 430 512 404 M108 116 C76 220 76 300 108 404 M512 116 C544 220 544 300 512 404" />
          <path d="M108 116 L310 260 L512 116 M108 404 L310 260 L512 404" />
          <circle cx="310" cy="260" r="105" />
          <circle cx="310" cy="260" r="63" />
          <g className="science-system-cells">{[[285,245],[326,232],[341,273],[299,287]].map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 2 ? 16 : 19} />)}</g>
        </svg>
        {areas.map(([title], index) => <button key={title} type="button" className={`science-node science-node-${index + 1}${activeArea === index ? " is-active" : ""}`} aria-pressed={activeArea === index} onClick={() => setActiveArea(index)}><span>0{index + 1}</span>{title}</button>)}
        <div className="science-map-centre" aria-hidden="true"><span>BP</span><i /></div>
      </div>
      <div className="science-system-copy" aria-live="polite">
        <span>0{activeArea + 1} / 04</span>
        <h3>{areas[activeArea][0]}</h3>
        <p>{areas[activeArea][1]}</p>
      </div>
    </section>
  );
}
