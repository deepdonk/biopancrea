"use client";

import { useEffect, useRef, useState } from "react";
import { ProcessGraphic } from "./ProcessGraphic";

const steps = [
  ["Skin-cell sample", "A small skin-cell sample provides the starting material."],
  ["Reprogramming into iPSCs", "The skin cells are reprogrammed into induced pluripotent stem cells, giving them the ability to develop toward another specialised cell type."],
  ["Differentiation into beta-like cells", "The iPSCs are guided through a controlled differentiation process toward insulin-producing beta-like cells."],
  ["Integration with the hydrogel", "The cells are incorporated into a hydrogel designed to provide a supportive structural environment."],
  ["Integration with the stent", "The cell-containing hydrogel is integrated with BioPancrea’s stent-based platform."],
  ["Intended femoral-artery placement", "The platform is being explored for placement in the femoral artery through a vascular delivery approach."],
  ["Intended glucose-responsive insulin release", "The aim is to investigate whether the cells can respond to changing glucose levels by releasing insulin into the bloodstream."],
] as const;

const progressLabels = ["Cell sample", "Reprogramming", "Beta-like cells", "Hydrogel", "Stent", "Placement", "Intended response"] as const;

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
            <div className="process-stage-rail">
              <p className="process-progress-count"><span>0{activeStep + 1}</span><i />07</p>
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
            </div>
            <ProcessGraphic activeStep={activeStep} title={steps[activeStep][0]} />
          </div>
        </div>
      </div>
    </section>
  );
}
