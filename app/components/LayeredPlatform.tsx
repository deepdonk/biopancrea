import { PlatformModel } from "./PlatformModel";

const layers = [
  { index: "01", stage: "cells", name: "Cells", copy: "Insulin-producing cells form the biological component." },
  { index: "02", stage: "hydrogel", name: "Supportive gel", copy: "A supportive biomaterial holds the cells within the platform." },
  { index: "03", stage: "stent", name: "Vascular stent", copy: "An expandable scaffold carries the implantable platform." },
  { index: "04", stage: "assembled", name: "Assembled platform", copy: "Together, these components form BioPancrea’s investigational artificial-pancreas concept." },
] as const;

export function LayeredPlatform() {
  return (
    <section className="layered-platform container" aria-labelledby="platform-heading" data-header-tone="dark" data-platform-story data-platform-stage="cells" data-reveal>
      <header className="layered-platform-heading">
        <p className="section-label light" data-reveal-label><span>01</span>The concept</p>
        <div className="layered-platform-introduction">
          <h2 id="platform-heading" data-reveal-heading>Three components. One concept.</h2>
          <div data-reveal-copy>
            <p>BioPancrea is developing a vascular implant that combines insulin-producing beta-like cells, a supportive hydrogel, and a stent-based platform.</p>
            <p>The aim is to investigate whether the cells can sense glucose and release insulin from within the body.</p>
          </div>
        </div>
      </header>
      <div className="layered-platform-body">
        <div className="layered-platform-graphic" data-reveal-graphic>
          <PlatformModel id="layered-platform" showLabels />
        </div>
        <div className="layered-platform-controls">
          {layers.map((layer) => (
            <article key={layer.name} data-platform-step={layer.stage}>
              <button type="button" data-platform-jump={layer.stage} aria-label={`Show ${layer.name}`}>
                <span>{layer.index}</span>
                <div><h3>{layer.name}</h3><p>{layer.copy}</p></div>
                <i aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
