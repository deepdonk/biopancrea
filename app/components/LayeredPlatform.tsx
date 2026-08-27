import { PlatformModel } from "./PlatformModel";

const layers = [
  { index: "01", name: "Cells", copy: "The biological component of the BioPancrea concept." },
  { index: "02", name: "Supportive gel", copy: "A structured environment designed to support the cells." },
  { index: "03", name: "Vascular stent", copy: "An implantable scaffold that carries the platform." },
] as const;

export function LayeredPlatform() {
  return (
    <section className="layered-platform container" aria-labelledby="platform-heading">
      <header className="layered-platform-heading">
        <p className="section-label light"><span>01</span>The concept</p>
        <div className="layered-platform-introduction">
          <h2 id="platform-heading">Three parts. One concept.</h2>
        </div>
      </header>
      <div className="layered-platform-body">
        <div className="layered-platform-graphic">
          <PlatformModel id="layered-platform" showLabels exploded assembled={false} />
        </div>
        <div className="layered-platform-controls">
          {layers.map((layer) => (
            <article key={layer.name}>
              <span>{layer.index}</span>
              <div><h3>{layer.name}</h3><p>{layer.copy}</p></div>
            </article>
          ))}
        </div>
      </div>
      <p className="layered-platform-summary">BioPancrea is exploring how these three components could work together as an artificial-pancreas platform.</p>
    </section>
  );
}
