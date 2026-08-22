"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  ["Cell sample", "A small skin-cell sample provides the starting material."],
  ["Reprogramming", "The skin cells are reprogrammed into induced pluripotent stem cells, giving them the ability to develop toward another specialised cell type."],
  ["Differentiation", "The iPSCs are guided through a controlled differentiation process toward insulin-producing beta-like cells."],
  ["Hydrogel integration", "The cells are incorporated into a hydrogel designed to provide a supportive structural environment."],
  ["Stent integration", "The cell-containing hydrogel is integrated with BioPancrea’s stent-based platform."],
  ["Intended placement", "The platform is being explored for placement in the femoral artery through a vascular delivery approach."],
  ["Intended biological response", "The aim is to investigate whether the cells can respond to changing glucose levels by releasing insulin into the bloodstream."],
] as const;

export function ProcessStory() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  function goToStep(index: number) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[index]?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveStep(Number((visible.target as HTMLElement).dataset.step));
      },
      { rootMargin: "-28% 0px -42%", threshold: [0.2, 0.5, 0.8] },
    );
    stepRefs.current.forEach((step) => step && observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-story container">
      <div className="process-visual-column">
        <div className="process-visual-sticky">
          <div className="process-progress" aria-label={`Stage ${activeStep + 1} of ${steps.length}`}>
            <span>0{activeStep + 1}</span><i><b style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }} /></i><span>0{steps.length}</span>
          </div>
          <ProcessDiagram activeStep={activeStep} />
          <div className="process-stage-nav" aria-label="Process stages">
            {steps.map(([title], index) => <button key={title} type="button" className={activeStep === index ? "is-active" : ""} onClick={() => goToStep(index)}><span className="visually-hidden">Go to {title}</span></button>)}
          </div>
        </div>
      </div>
      <div className="process-copy-column">
        {steps.map(([title, copy], index) => (
          <article
            className={`process-copy-step${activeStep === index ? " is-active" : ""}`}
            data-step={index}
            key={title}
            ref={(element) => { stepRefs.current[index] = element; }}
          >
            <p className="section-label"><span>0{index + 1}</span>Step {index + 1}</p>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProcessDiagram({ activeStep }: { activeStep: number }) {
  return (
    <figure className="process-diagram" data-stage={activeStep}>
      <svg viewBox="0 0 680 620" role="img" aria-labelledby="process-diagram-title process-diagram-description">
        <title id="process-diagram-title">{steps[activeStep][0]}</title>
        <desc id="process-diagram-description">A conceptual vector animation showing the active stage in the BioPancrea research process.</desc>
        <g className="diagram-grid" aria-hidden="true">{Array.from({ length: 10 }).map((_, index) => <path key={`g${index}`} d={`M 70 ${80 + index * 52} H 610 M ${80 + index * 58} 60 V 560`} />)}</g>
        <g className="diagram-hand" aria-hidden="true">
          <path d="M162 418 C140 382 142 327 162 292 L188 239 C195 225 214 231 212 247 L203 300 L216 184 C218 166 240 166 243 184 L245 284 L256 160 C258 143 281 144 283 162 L282 286 L296 183 C299 165 321 169 321 187 L313 302 L333 229 C338 211 360 219 356 237 L339 344 C335 384 313 427 280 453 Z" />
          <circle cx="194" cy="326" r="12" />
        </g>
        <g className="diagram-cells" aria-hidden="true">
          {[[278,294,31],[327,269,34],[373,302,32],[318,327,29],[365,345,27],[410,321,24]].map(([cx,cy,r], index) => <g key={index} className={`diagram-cell diagram-cell-${index + 1}`}><circle cx={cx} cy={cy} r={r} /><circle cx={cx - 7} cy={cy - 6} r={r * .22} /></g>)}
        </g>
        <g className="diagram-hydrogel" aria-hidden="true">
          <rect x="220" y="208" width="270" height="220" rx="110" />
          {Array.from({ length: 8 }).map((_, index) => <path key={`hg${index}`} d={`M 230 ${230 + index * 25} Q 355 ${205 + index * 27} 480 ${230 + index * 25}`} />)}
          {Array.from({ length: 7 }).map((_, index) => <path key={`hv${index}`} d={`M ${245 + index * 38} 210 Q ${275 + index * 30} 320 ${245 + index * 38} 428`} />)}
        </g>
        <g className="diagram-stent" aria-hidden="true">
          <rect x="178" y="180" width="354" height="274" rx="137" />
          {[-45,0,45].map((offset) => <path key={`sa${offset}`} d={`M ${224 + offset} 199 L ${465 + offset} 435`} />)}
          {[-45,0,45].map((offset) => <path key={`sb${offset}`} d={`M ${224 + offset} 435 L ${465 + offset} 199`} />)}
        </g>
        <g className="diagram-vessel" aria-hidden="true">
          <path d="M40 235 C185 164 495 167 640 235" />
          <path d="M40 415 C185 486 495 483 640 415" />
          <path className="vessel-centre" d="M40 325 C210 292 470 292 640 325" />
        </g>
        <g className="diagram-flow glucose-flow" aria-hidden="true">
          {[[92,304],[154,345],[540,292],[595,342]].map(([cx,cy], index) => <path key={index} d={`M${cx - 7} ${cy} L${cx} ${cy - 7} L${cx + 7} ${cy} L${cx} ${cy + 7}Z`} />)}
        </g>
        <g className="diagram-flow insulin-flow" aria-hidden="true">
          {[[468,286],[500,315],[470,350]].map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r="5" />)}
        </g>
        <g className="diagram-labels" aria-hidden="true">
          <text x="54" y="74">BIOPANCREA / PROCESS</text>
          <text className="label-ipsc" x="298" y="505">iPSC</text>
          <text className="label-beta" x="288" y="505">BETA-LIKE CELLS</text>
          <text className="label-gel" x="300" y="505">HYDROGEL</text>
          <text className="label-stent-diagram" x="286" y="505">STENT PLATFORM</text>
          <text className="label-artery" x="280" y="505">INTENDED PLACEMENT</text>
          <text className="label-response" x="270" y="505">INTENDED RESPONSE</text>
        </g>
      </svg>
      <figcaption>Concept illustration / Not to scale / Research-stage</figcaption>
    </figure>
  );
}
