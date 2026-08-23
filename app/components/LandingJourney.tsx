"use client";

import { useEffect, useRef, useState } from "react";

const stages = ["Skin cell", "iPSC", "Beta-like cell", "Hydrogel", "Stent platform"] as const;

export function LandingJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveStage(Number((visible.target as HTMLElement).dataset.stage));
    }, { rootMargin: "-38% 0px -42%", threshold: [0.15, 0.5, 0.85] });

    stageRefs.current.forEach((stage) => stage && observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="transformation-section" aria-labelledby="transformation-title">
      <h2 className="visually-hidden" id="transformation-title">Cell-to-stent transformation</h2>
      <div className="transformation-sticky">
        <div className="transformation-technical-line" aria-hidden="true"><i /></div>
        <div className="transformation-stage-heading" aria-live="polite">
          <span>0{activeStage + 1}</span>
          <strong>{stages[activeStage]}</strong>
          <span>05</span>
        </div>
        <JourneyDiagram stage={activeStage} id="desktop-transformation" />
        <div className="transformation-index" aria-hidden="true">
          {stages.map((stage, index) => <span key={stage} className={activeStage === index ? "is-active" : ""}>{stage}</span>)}
        </div>
      </div>
      <div className="transformation-triggers" aria-hidden="true">
        {stages.map((stage, index) => (
          <span key={stage} data-stage={index} ref={(element) => { stageRefs.current[index] = element; }} />
        ))}
      </div>
      <div className="transformation-mobile" aria-label="Swipe through the cell-to-stent transformation">
        <div className="transformation-mobile-track">
          {stages.map((stage, index) => (
            <article key={stage}>
              <span>0{index + 1} / 05</span>
              <JourneyDiagram stage={index} id={`mobile-transformation-${index}`} />
              <h3>{stage}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneyDiagram({ stage, id }: { stage: number; id: string }) {
  return (
    <figure className="journey-diagram" data-stage={stage}>
      <svg viewBox="0 0 680 560" role="img" aria-labelledby={`journey-title-${id} journey-description-${id}`}>
        <title id={`journey-title-${id}`}>{stages[stage]}</title>
        <desc id={`journey-description-${id}`}>A conceptual line illustration of the {stages[stage].toLowerCase()} stage in the BioPancrea platform.</desc>
        <g className="journey-grid" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <path key={index} d={`M55 ${72 + index * 54} H625 M${70 + index * 67} 55 V505`} />)}</g>
        <g className="journey-hand" aria-hidden="true"><path d="M133 388 C109 350 114 295 136 256 L159 214 C167 198 187 205 184 222 L177 269 L190 161 C192 143 214 143 217 162 L219 259 L231 142 C233 124 256 127 258 145 L257 262 L272 163 C275 145 297 151 296 169 L288 276 L310 213 C317 196 337 207 332 224 L315 326 C309 369 285 411 252 435 Z"/><circle cx="167" cy="292" r="11"/></g>
        <g className="journey-cells" aria-hidden="true">{[[282,276,28],[326,251,31],[371,280,29],[318,310,26],[363,325,24],[407,302,22]].map(([cx,cy,r], index) => <g key={index} className={`journey-cell journey-cell-${index + 1}`}><circle cx={cx} cy={cy} r={r}/><circle cx={cx - 6} cy={cy - 5} r={r * .22}/></g>)}</g>
        <g className="journey-gel" aria-hidden="true"><path d="M226 198 C311 168 438 183 474 253 C512 327 463 393 379 414 C289 437 209 391 198 313 C192 263 201 219 226 198 Z"/>{Array.from({ length: 7 }).map((_,index)=><path key={index} d={`M210 ${229 + index * 25} Q340 ${200 + index * 28} 474 ${232 + index * 24}`}/>)}</g>
        <g className="journey-stent" aria-hidden="true"><ellipse cx="179" cy="303" rx="30" ry="113"/><ellipse cx="502" cy="303" rx="30" ry="113"/>{Array.from({length:7}).map((_,row)=><path key={`a-${row}`} d={`M${172 + row * 5} ${204 + row * 27} L${495 + row * 3} ${399 - row * 27} M${172 + row * 5} ${399 - row * 27} L${495 + row * 3} ${204 + row * 27}`}/>)}</g>
      </svg>
    </figure>
  );
}
