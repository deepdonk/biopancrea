import { PlatformModel } from "./PlatformModel";

const layers = [
  { index: "01", name: "Beta-like cells", copy: "Insulin-producing cells form the biological component." },
  { index: "02", name: "Hydrogel", copy: "A supportive biomaterial holds the cells within the platform." },
  { index: "03", name: "Vascular stent", copy: "An expandable scaffold carries the implantable platform." },
] as const;

export function LayeredPlatform() {
  return (
    <section className="layered-platform container" aria-labelledby="platform-heading">
      <header className="layered-platform-heading">
        <p className="section-label light"><span>01</span>The concept</p>
        <div className="layered-platform-introduction">
          <h2 id="platform-heading">What BioPancrea is building</h2>
          <p>BioPancrea is developing a vascular implant that combines insulin-producing beta-like cells, a supportive hydrogel, and a stent-based platform.</p>
          <p>The aim is to investigate whether the cells can sense glucose and release insulin from within the body.</p>
        </div>
      </header>
      <div className="layered-platform-body">
        <div className="layered-platform-graphic">
          <PlatformModel id="layered-platform" showLabels showFlow />
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
      <p className="layered-platform-summary">Together, these components form BioPancrea’s investigational artificial-pancreas concept.</p>
    </section>
  );
}
