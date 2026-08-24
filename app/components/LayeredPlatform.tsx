"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PlatformGraphic } from "./PlatformGraphic";

const layers = [
  { id: "cells", index: "01", name: "Insulin-producing cells", copy: "Beta-like cells form the biological component of the platform." },
  { id: "hydrogel", index: "02", name: "Supportive hydrogel", copy: "A hydrogel provides a structured environment for the cells." },
  { id: "stent", index: "03", name: "Vascular stent", copy: "A stent-based system provides the implantable platform." },
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

  return (
    <section className={`layered-platform container${visible ? " is-visible" : ""}`} ref={sectionRef}>
      <header className="layered-platform-heading">
        <p className="section-label light"><span>02</span>The concept</p>
        <h2>One concept. Three connected components.</h2>
      </header>
      <div className="layered-platform-body">
        <div className="layered-platform-graphic">
          <PlatformGraphic id="layered-platform" className="platform-graphic-layered" activeLayer={activeLayer} showLabels />
        </div>
        <div className="layered-platform-controls" aria-label="Platform layers">
          {layers.map((layer) => (
            <button key={layer.id} type="button" aria-pressed={activeLayer === layer.id} onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}>
              <span>{layer.index}</span>
              <div><h3>{layer.name}</h3><p>{layer.copy}</p></div>
              <i aria-hidden="true">{activeLayer === layer.id ? "−" : "+"}</i>
            </button>
          ))}
          <Link className="button concept-button" href="/how-it-works">See how it works</Link>
        </div>
      </div>
    </section>
  );
}
