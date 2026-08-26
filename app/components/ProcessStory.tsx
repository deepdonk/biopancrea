"use client";

import { useEffect, useRef, useState } from "react";
import { PlatformModelLayers } from "./PlatformModel";

const steps = [
  ["Small skin-cell sample", "A small scientific tissue sample provides the starting material."],
  ["Skin cell", "A skin cell is isolated from the sample as the biological starting point."],
  ["iPSC colony", "The skin cell is reprogrammed into induced pluripotent stem cells."],
  ["Beta-like cell cluster", "The iPSCs are guided toward insulin-producing beta-like cells."],
  ["Hydrogel integration", "The beta-like cell clusters are incorporated into a supportive hydrogel."],
  ["Stent integration", "The cell-containing hydrogel is integrated near the wall of the vascular stent."],
  ["Femoral-artery placement", "The investigational platform is intended for placement in the femoral artery."],
  ["Intended glucose-responsive insulin release", "The aim is to investigate whether the cells can respond to changing glucose levels and release insulin into the bloodstream."],
] as const;

const progressLabels = ["Sample", "Skin cell", "iPSCs", "Beta-like cells", "Hydrogel", "Stent", "Placement", "Response"] as const;

export function ProcessStory() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  function goToStep(index: number) {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[index]?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "center" });
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
      <div className="process-visual-column">
        <div className="process-visual-sticky">
          <div className="process-visual-layout">
            <nav className="process-stage-nav" aria-label={`Process stages. Stage ${activeStep + 1} of ${steps.length} is active.`}>
              {progressLabels.map((label, index) => (
                <button
                  key={label}
                  type="button"
                  className={index === activeStep ? "is-active" : index < activeStep ? "is-complete" : "is-future"}
                  aria-current={index === activeStep ? "step" : undefined}
                  onClick={() => goToStep(index)}
                >
                  <span>0{index + 1}</span><small>{label}</small>
                </button>
              ))}
            </nav>
            <ProcessDiagram activeStep={activeStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessDiagram({ activeStep }: { activeStep: number }) {
  return (
    <figure className="process-diagram process-diagram-clean" data-stage={activeStep}>
      <svg viewBox="0 0 680 620" role="img" aria-label={`${steps[activeStep][0]}. Conceptual illustration of this stage in the BioPancrea research process.`}>

        <g className="process-sample" aria-hidden="true">
          <path className="sample-surface" d="M92 205 C225 164 458 168 588 212 L570 410 C444 454 225 450 110 408 Z" />
          <path d="M100 272 C236 226 452 232 580 275 M105 344 C245 304 442 307 575 346" />
          <path className="sample-biopsy" d="M315 164 L371 164 L396 404 L292 404 Z" />
          <g className="sample-cells">
            <path d="M158 298 l22-14 25 12-2 26-27 10-22-14z" />
            <path d="M455 244 l24-12 23 15-5 25-27 7-18-17z" />
            <path d="M468 361 l23-13 24 14-4 25-28 8-19-18z" />
          </g>
        </g>

        <g className="process-fibroblast" aria-hidden="true">
          <path d="M176 318 C225 252 281 267 330 303 C385 344 440 355 504 287 C470 370 399 398 326 354 C265 318 222 318 176 318 Z" />
          <ellipse cx="337" cy="324" rx="30" ry="18" />
        </g>

        <g className="process-ipsc" aria-hidden="true">
          {[[265,275],[315,250],[367,266],[414,302],[380,348],[322,360],[274,329],[330,305]].map(([x, y], index) => (
            <path key={index} d={`M${x - 24} ${y - 12} L${x - 5} ${y - 25} L${x + 22} ${y - 14} L${x + 26} ${y + 12} L${x + 4} ${y + 25} L${x - 23} ${y + 14} Z`} />
          ))}
        </g>

        <g className="process-beta-cluster" aria-hidden="true">
          {[[294,285,34],[344,260,37],[394,288,33],[318,329,31],[371,337,35]].map(([cx, cy, radius], index) => (
            <g key={index}><circle cx={cx} cy={cy} r={radius} /><circle cx={cx - 7} cy={cy - 6} r={radius * .2} /></g>
          ))}
        </g>

        <g className="process-platform-stage" aria-hidden="true">
          <g transform="translate(5 138) scale(.7)">
            <PlatformModelLayers showLabels={false} showFlow={activeStep === 7} />
          </g>
        </g>

        <g className="process-vessel" aria-hidden="true">
          <path d="M36 215 C190 150 492 150 644 215" />
          <path d="M36 425 C190 490 492 490 644 425" />
        </g>

        <g className="process-glucose" aria-hidden="true">
          {[[82,305],[132,350],[548,292]].map(([x, y], index) => <path key={index} d={`M${x - 8} ${y} L${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} Z`} />)}
        </g>
        <g className="process-insulin" aria-hidden="true">
          {[[492,316],[536,350],[584,320]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="6" />)}
        </g>
      </svg>
      <figcaption><span>0{activeStep + 1}</span>{steps[activeStep][0]}</figcaption>
    </figure>
  );
}
