"use client";

import { useEffect, useRef, useState } from "react";

const journeySteps = [
  ["Skin sample", "A small skin-cell sample is collected."],
  ["iPSCs", "The cells are reprogrammed into iPSCs."],
  ["Beta-like cells", "The iPSCs are guided toward a pancreatic beta-cell identity."],
  ["Hydrogel", "The cells are incorporated into a supportive hydrogel."],
  ["Stent integration", "The cell-containing material is integrated with a vascular stent platform."],
] as const;

export function LandingJourney() {
  const [activeStage, setActiveStage] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let mostVisible: IntersectionObserverEntry | undefined;
      for (const entry of entries) {
        if (entry.isIntersecting && (!mostVisible || entry.intersectionRatio > mostVisible.intersectionRatio)) mostVisible = entry;
      }
      if (mostVisible) setActiveStage(Number((mostVisible.target as HTMLElement).dataset.stage));
    }, { rootMargin: "-25% 0px -40%", threshold: [0.25, 0.55, 0.8] });
    stepRefs.current.forEach((step) => { if (step) observer.observe(step); });
    return () => observer.disconnect();
  }, []);

  return (
    <section className="landing-journey container">
      <div className="landing-journey-visual">
        <div className="landing-journey-sticky">
          <div className="journey-progress"><span>0{activeStage + 1}</span><i><b style={{ width: `${((activeStage + 1) / journeySteps.length) * 100}%` }} /></i><span>05</span></div>
          <JourneyDiagram stage={activeStage} id={`desktop-${activeStage}`} />
        </div>
      </div>
      <div className="landing-journey-copy">
        <header><p className="section-label"><span>02</span>How it is created</p><h2>One continuous cell journey.</h2></header>
        {journeySteps.map(([title, copy], index) => (
          <article key={title} data-stage={index} className={activeStage === index ? "is-active" : ""} ref={(element) => { stepRefs.current[index] = element; }}>
            <div className="journey-mobile-diagram"><JourneyDiagram stage={index} id={`mobile-${index}`} /></div>
            <span>Stage 0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function JourneyDiagram({ stage, id }: { stage: number; id: string }) {
  return (
    <figure className="journey-diagram" data-stage={stage}>
      <svg viewBox="0 0 680 560" role="img" aria-labelledby={`journey-title-${id} journey-description-${id}`}>
        <title id={`journey-title-${id}`}>{journeySteps[stage][0]}</title>
        <desc id={`journey-description-${id}`}>A conceptual vector view of stage {stage + 1} in the BioPancrea cell journey.</desc>
        <g className="journey-grid" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <path key={index} d={`M55 ${72 + index * 54} H625 M${70 + index * 67} 55 V505`} />)}</g>
        <g className="journey-hand" aria-hidden="true"><path d="M133 388 C109 350 114 295 136 256 L159 214 C167 198 187 205 184 222 L177 269 L190 161 C192 143 214 143 217 162 L219 259 L231 142 C233 124 256 127 258 145 L257 262 L272 163 C275 145 297 151 296 169 L288 276 L310 213 C317 196 337 207 332 224 L315 326 C309 369 285 411 252 435 Z"/><circle cx="167" cy="292" r="11"/></g>
        <g className="journey-cells" aria-hidden="true">{[[282,276,28],[326,251,31],[371,280,29],[318,310,26],[363,325,24],[407,302,22]].map(([cx,cy,r], index) => <g key={index} className={`journey-cell journey-cell-${index + 1}`}><circle cx={cx} cy={cy} r={r}/><circle cx={cx - 6} cy={cy - 5} r={r * .22}/></g>)}</g>
        <g className="journey-gel" aria-hidden="true"><path d="M226 198 C311 168 438 183 474 253 C512 327 463 393 379 414 C289 437 209 391 198 313 C192 263 201 219 226 198 Z"/>{Array.from({ length: 7 }).map((_,index)=><path key={index} d={`M210 ${229 + index * 25} Q340 ${200 + index * 28} 474 ${232 + index * 24}`}/>)}</g>
        <g className="journey-stent" aria-hidden="true"><ellipse cx="179" cy="303" rx="30" ry="113"/><ellipse cx="502" cy="303" rx="30" ry="113"/>{Array.from({length:7}).map((_,row)=><path key={`a-${row}`} d={`M${172 + row * 5} ${204 + row * 27} L${495 + row * 3} ${399 - row * 27} M${172 + row * 5} ${399 - row * 27} L${495 + row * 3} ${204 + row * 27}`}/>)}</g>
        <g className="journey-labels" aria-hidden="true"><text className="label-ipsc" x="495" y="116">iPSC</text><text className="label-beta" x="470" y="116">Beta-like cells</text><text className="label-gel" x="470" y="116">Hydrogel</text><text className="label-stent" x="470" y="116">Stent platform</text></g>
      </svg>
      <figcaption>Stage 0{stage + 1} / {journeySteps[stage][0]}</figcaption>
    </figure>
  );
}
