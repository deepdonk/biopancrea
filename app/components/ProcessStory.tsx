"use client";

import { useEffect, useRef, useState } from "react";
import { PlatformModel } from "./PlatformModel";

const steps = [
  ["Cells", "The biological component", "Living cells form the biological element of the BioPancrea concept."],
  ["Supportive gel", "The supporting environment", "A specialised gel is intended to provide the cells with a structured environment."],
  ["Vascular stent", "The implantable platform", "A vascular stent provides the scaffold that brings the concept together."],
] as const;

export function ProcessStory() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);

  function goToStep(index: number) {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    stepRefs.current[index]?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .toSorted((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
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
        {steps.map(([label, heading, copy], index) => (
          <article
            className={`process-copy-step${activeStep === index ? " is-active" : ""}`}
            data-step={index}
            key={label}
            ref={(element) => { stepRefs.current[index] = element; }}
          >
            <p className="section-label"><span>0{index + 1}</span>{label}</p>
            <h2>{heading}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>

      <div className="process-visual-column">
        <div className="process-visual-sticky">
          <div className="process-visual-layout process-visual-layout-simple">
            <nav className="process-stage-nav" aria-label={`Concept components. Component ${activeStep + 1} of ${steps.length} is active.`}>
              {steps.map(([label], index) => (
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

            <figure className="process-diagram process-diagram-clean process-platform-concept" data-diagram="three-part-platform" data-stage={activeStep}>
              <PlatformModel
                id="process-platform"
                className="process-platform-model"
                title={`${steps[activeStep][0]} — BioPancrea concept`}
                description="A conceptual illustration showing cells, a supportive gel and a vascular stent as one platform."
              />
              <div className="process-concept-labels" aria-hidden="true">
                {steps.map(([label], index) => <span className={index === activeStep ? "is-active" : ""} key={label}>{label}</span>)}
              </div>
              <figcaption><span>0{activeStep + 1}</span><strong>{steps[activeStep][0]}</strong><small>Conceptual illustration · Not to scale</small></figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
