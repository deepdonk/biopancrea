"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  { id: "cells", index: "01", name: "Cells", copy: "Patient-derived cells are reprogrammed and guided toward insulin-producing beta-like cells." },
  { id: "hydrogel", index: "02", name: "Hydrogel", copy: "A supportive hydrogel provides the cells with a structured environment." },
  { id: "stent", index: "03", name: "Stent", copy: "A vascular stent carries the cell-containing platform." },
] as const;

type LayerId = typeof layers[number]["id"];

export function LayeredPlatform() {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: .22 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = section.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 7;
    section.style.setProperty("--platform-shift", `translate3d(${x}px,${y}px,0) rotate(${x * .08}deg)`);
    section.style.setProperty("--particle-shift", `translate3d(${x * .35}px,${y * .35}px,0)`);
  }

  function resetGraphic() {
    sectionRef.current?.style.setProperty("--platform-shift", "translate3d(0,0,0) rotate(0deg)");
    sectionRef.current?.style.setProperty("--particle-shift", "translate3d(0,0,0)");
  }

  return (
    <section className={`layered-platform container${visible ? " is-visible" : ""}`} ref={sectionRef} onPointerMove={handlePointerMove} onPointerLeave={resetGraphic}>
      <div className="bio-particle-field platform-particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
      </div>
      <header className="layered-platform-heading">
        <p className="section-label light"><span>02</span>Platform architecture</p>
        <h2>One platform. Three connected layers.</h2>
      </header>
      <div className="layered-platform-body">
        <div className={`layered-platform-graphic${activeLayer ? ` isolate-${activeLayer}` : ""}`} role="img" aria-label="A beta-like cell cluster surrounded by a supportive hydrogel and an open cylindrical vascular stent">
          <div className="platform-layer platform-layer-cells" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="platform-layer platform-layer-hydrogel" aria-hidden="true"><i /><i /><i /><i /><i /></div>
          <div className="platform-layer platform-layer-stent" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => <i key={index} />)}
          </div>
          <span className="platform-channel-label">Open vascular channel</span>
        </div>
        <div className="layered-platform-controls" aria-label="Platform layers">
          {layers.map((layer) => (
            <button key={layer.id} type="button" aria-pressed={activeLayer === layer.id} onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}>
              <span>{layer.index}</span>
              <div><h3>{layer.name}</h3><p>{layer.copy}</p></div>
              <i aria-hidden="true">{activeLayer === layer.id ? "−" : "+"}</i>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
