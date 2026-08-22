"use client";

import { useEffect, useRef } from "react";

export function CursorAura() {
  const auraRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (auraRef.current) auraRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener("pointermove", move); };
  }, []);

  return <span className="cursor-aura" ref={auraRef} aria-hidden="true" />;
}
