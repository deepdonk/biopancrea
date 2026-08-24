"use client";

import { useRef } from "react";
import { PlatformModel } from "./PlatformModel";

export function HeroStent() {
  const fieldRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = field.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 16;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 10;
    field.style.setProperty("--stent-shift", `translate3d(${x}px,${y}px,0) rotate(${x * .08}deg)`);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function resetPosition() {
    fieldRef.current?.style.setProperty("--stent-shift", "translate3d(0,0,0)");
  }

  return (
    <div className="hero-stent-field" ref={fieldRef} onPointerMove={handlePointerMove} onPointerDown={handlePointerDown} onPointerUp={resetPosition} onPointerLeave={resetPosition}>
      <div className="hero-stent-pointer">
        <PlatformModel id="hero-platform" className="hero-platform-model" showLabels />
      </div>
      <span className="field-index">BP—VASCULAR / CONCEPT</span>
    </div>
  );
}
