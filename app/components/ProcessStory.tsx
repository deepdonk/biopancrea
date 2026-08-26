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

const visualNotes = [
  "Layered skin tissue · sample area",
  "Cell membrane · nucleus",
  "Reprogrammed cells · dense colony",
  "Beta-like cells · islet-like cluster",
  "Beta-like cells held inside hydrogel",
  "Hydrogel near the stent wall · open lumen",
  "Implant positioned inside the femoral artery",
  "Glucose enters · insulin is released",
] as const;

function DiagramCallout({
  label,
  x,
  y,
  anchorX,
  anchorY,
  align = "start",
}: {
  label: string;
  x: number;
  y: number;
  anchorX: number;
  anchorY: number;
  align?: "start" | "end";
}) {
  const lineX = align === "end" ? x - 12 : x + 12;
  return (
    <g className="diagram-callout">
      <path d={`M${anchorX} ${anchorY} L${lineX} ${y}`} />
      <circle cx={anchorX} cy={anchorY} r="3" />
      <text x={x} y={y - 9} textAnchor={align}>{label}</text>
    </g>
  );
}

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
          <DiagramCallout label="Skin tissue" x={92} y={128} anchorX={178} anchorY={236} />
          <DiagramCallout label="Sample area" x={588} y={145} anchorX={350} anchorY={205} align="end" />
        </g>

        <g className="process-fibroblast" aria-hidden="true">
          <circle className="microscope-field" cx="340" cy="306" r="178" />
          <path className="cell-membrane" d="M167 316 C221 225 286 226 340 276 C397 226 471 240 520 313 C470 386 397 397 340 344 C281 395 215 390 167 316 Z" />
          <ellipse className="cell-nucleus" cx="344" cy="311" rx="46" ry="31" />
          <DiagramCallout label="Cell membrane" x={112} y={142} anchorX={226} anchorY={257} />
          <DiagramCallout label="Nucleus" x={568} y={176} anchorX={372} anchorY={304} align="end" />
        </g>

        <g className="process-ipsc" aria-hidden="true">
          {[[265,275],[315,250],[367,266],[414,302],[380,348],[322,360],[274,329],[330,305]].map(([x, y], index) => (
            <path key={index} d={`M${x - 24} ${y - 12} L${x - 5} ${y - 25} L${x + 22} ${y - 14} L${x + 26} ${y + 12} L${x + 4} ${y + 25} L${x - 23} ${y + 14} Z`} />
          ))}
          <DiagramCallout label="Reprogrammed cells" x={104} y={139} anchorX={276} anchorY={275} />
          <DiagramCallout label="Dense colony" x={576} y={163} anchorX={406} anchorY={304} align="end" />
        </g>

        <g className="process-beta-cluster" aria-hidden="true">
          {[[294,285,34],[344,260,37],[394,288,33],[318,329,31],[371,337,35]].map(([cx, cy, radius], index) => (
            <g key={index}><circle cx={cx} cy={cy} r={radius} /><circle cx={cx - 7} cy={cy - 6} r={radius * .2} /></g>
          ))}
          <DiagramCallout label="Beta-like cells" x={105} y={145} anchorX={294} anchorY={285} />
          <DiagramCallout label="Compact cluster" x={578} y={177} anchorX={395} anchorY={288} align="end" />
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

        <g className="process-hydrogel-callouts" aria-hidden="true">
          <DiagramCallout label="Beta-like cells" x={110} y={140} anchorX={338} anchorY={370} />
          <DiagramCallout label="Supportive hydrogel" x={576} y={166} anchorX={458} anchorY={354} align="end" />
        </g>

        <g className="process-stent-callouts" aria-hidden="true">
          <DiagramCallout label="Stent scaffold" x={108} y={142} anchorX={246} anchorY={292} />
          <DiagramCallout label="Open lumen" x={574} y={168} anchorX={354} anchorY={330} align="end" />
        </g>

        <g className="process-placement-callouts" aria-hidden="true">
          <DiagramCallout label="Femoral artery" x={108} y={132} anchorX={188} anchorY={215} />
          <DiagramCallout label="Implant location" x={574} y={156} anchorX={390} anchorY={320} align="end" />
        </g>

        <g className="process-glucose" aria-hidden="true">
          {[[82,305],[132,350],[548,292]].map(([x, y], index) => <path key={index} d={`M${x - 8} ${y} L${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8} Z`} />)}
        </g>
        <g className="process-insulin" aria-hidden="true">
          {[[492,316],[536,350],[584,320]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="6" />)}
        </g>

        <g className="process-response-callouts" aria-hidden="true">
          <DiagramCallout label="Glucose enters" x={108} y={136} anchorX={132} anchorY={350} />
          <DiagramCallout label="Insulin released" x={576} y={162} anchorX={536} anchorY={350} align="end" />
        </g>
      </svg>
      <figcaption>
        <span>0{activeStep + 1}</span>
        <strong>{steps[activeStep][0]}</strong>
        <small>{visualNotes[activeStep]}</small>
      </figcaption>
    </figure>
  );
}
