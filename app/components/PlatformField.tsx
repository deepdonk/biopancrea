"use client";

import { useRef } from "react";

export function PlatformField({ compact = false }: { compact?: boolean }) {
  const fieldRef = useRef<HTMLDivElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const field = fieldRef.current;
    if (!field || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = field.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 12;
    field.style.setProperty("--field-x", `${x}px`);
    field.style.setProperty("--field-y", `${y}px`);
  }

  function resetPointer() {
    fieldRef.current?.style.setProperty("--field-x", "0px");
    fieldRef.current?.style.setProperty("--field-y", "0px");
  }

  return (
    <div
      className={`platform-field${compact ? " platform-field-compact" : ""}`}
      ref={fieldRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <svg viewBox="0 0 720 720" role="img" aria-labelledby={compact ? "platform-title-compact" : "platform-title"}>
        <title id={compact ? "platform-title-compact" : "platform-title"}>Conceptual BioPancrea platform</title>
        <desc>Beta-like cell clusters within a translucent hydrogel mesh and an abstract stent framework, with particles moving through the structure.</desc>
        <defs>
          <clipPath id={compact ? "gel-clip-compact" : "gel-clip"}>
            <rect x="162" y="260" width="396" height="200" rx="100" />
          </clipPath>
        </defs>
        <g className="platform-particles" aria-hidden="true">
          {[[80,320],[145,386],[610,342],[670,408],[36,420],[640,286]].map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r={index % 2 ? 3 : 5} />)}
        </g>
        <g className="platform-stent" aria-hidden="true">
          <rect x="122" y="224" width="476" height="272" rx="136" />
          {[-72,-24,24,72].map((offset) => <path key={`a${offset}`} d={`M ${185 + offset} 242 L ${470 + offset} 478`} />)}
          {[-72,-24,24,72].map((offset) => <path key={`b${offset}`} d={`M ${185 + offset} 478 L ${470 + offset} 242`} />)}
        </g>
        <g className="platform-hydrogel" clipPath={`url(#${compact ? "gel-clip-compact" : "gel-clip"})`} aria-hidden="true">
          <rect x="162" y="260" width="396" height="200" rx="100" />
          {Array.from({ length: 9 }).map((_, index) => <path key={`h${index}`} d={`M 160 ${278 + index * 21} Q 360 ${248 + index * 22} 560 ${278 + index * 21}`} />)}
          {Array.from({ length: 10 }).map((_, index) => <path key={`v${index}`} d={`M ${178 + index * 40} 250 Q ${208 + index * 36} 360 ${178 + index * 40} 470`} />)}
        </g>
        <g className="platform-cells" aria-hidden="true">
          {[[292,344,31],[338,320,37],[383,353,34],[326,382,29],[375,400,25],[426,372,27]].map(([cx,cy,r], index) => <g key={index} className={`platform-cell cell-${index + 1}`}><circle cx={cx} cy={cy} r={r} /><circle cx={cx - 7} cy={cy - 6} r={r * 0.24} /></g>)}
        </g>
        <g className="platform-leaders" aria-hidden="true">
          <path d="M 284 315 L 225 170 L 154 170" />
          <path d="M 474 297 L 574 154 L 654 154" />
          <path d="M 496 444 L 584 550 L 665 550" />
        </g>
      </svg>
      <span className="platform-label label-cells">Beta-like cells</span>
      <span className="platform-label label-gel">Hydrogel</span>
      <span className="platform-label label-stent">Stent platform</span>
      <span className="field-index">BP—PLATFORM / CONCEPT</span>
    </div>
  );
}
