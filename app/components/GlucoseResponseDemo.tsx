"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { PlatformModelLayers } from "./PlatformModel";

const MIN_GLUCOSE = 60;
const MAX_GLUCOSE = 260;
const PARTICLE_COUNT = 12;

// Glucose travels along the stent lumen, from its open end at the left to the far end at the right.
const LUMEN_START = { x: 110, y: 277 };
const LUMEN_TRAVEL = { x: 740, y: -37 };
const GLUCOSE_LANES = [-38, 14, -12, 34, -26, 2, 26, -4, -34, 20, -18, 8];

// Insulin leaves each beta-like cell cluster and drifts outward into the surrounding blood.
const INSULIN_SOURCES = [
  { x: 360, y: 330, dx: 34, dy: 64 },
  { x: 470, y: 216, dx: 30, dy: -66 },
  { x: 555, y: 324, dx: 42, dy: 60 },
  { x: 650, y: 205, dx: 36, dy: -62 },
] as const;

const presets = [
  { label: "Low", value: 60 },
  { label: "Typical", value: 100 },
  { label: "After a meal", value: 220 },
] as const;

// Illustrative curve only: the intended output stays minimal at low glucose and climbs steeply above ~130 mg/dL.
function insulinResponse(glucose: number) {
  return 1 / (1 + Math.exp(-(glucose - 130) / 20));
}

function glucoseBand(glucose: number) {
  if (glucose < 70) return "Below range";
  if (glucose <= 180) return "In range";
  return "Above range";
}

function releaseLevel(response: number) {
  if (response < 0.1) return "Minimal";
  if (response < 0.35) return "Low";
  if (response < 0.7) return "Moderate";
  return "Strong";
}

function cssVars(vars: Record<string, string | number>) {
  return vars as CSSProperties;
}

export function GlucoseResponseDemo() {
  const [glucose, setGlucose] = useState(100);
  const response = insulinResponse(glucose);
  const band = glucoseBand(glucose);
  const release = releaseLevel(response);
  const activeGlucose = Math.max(1, Math.round(((glucose - MIN_GLUCOSE) / (MAX_GLUCOSE - MIN_GLUCOSE)) * PARTICLE_COUNT));
  const activeInsulin = Math.round(response * PARTICLE_COUNT);
  const mmol = (glucose / 18).toFixed(1);
  const valueText = `${glucose} mg/dL, ${band.toLowerCase()}. ${release} insulin release.`;

  return (
    <section className="glucose-demo container" aria-labelledby="glucose-demo-heading" data-reveal>
      <header>
        <p className="section-label light" data-reveal-label><span>07</span>Interactive</p>
        <div>
          <h2 id="glucose-demo-heading" data-reveal-heading>See how it is meant to respond</h2>
          <p data-reveal-copy>Drag the blood-glucose slider. As glucose rises, the beta-like cells in the concept are intended to release more insulin, and to ease off again as it falls.</p>
        </div>
      </header>

      <div className="glucose-demo-body">
        <figure className="glucose-demo-visual" style={cssVars({ "--response": response.toFixed(3) })} data-reveal-graphic>
          <svg viewBox="70 90 820 340" role="img" aria-label={`Concept illustration at ${valueText}`}>
            <defs>
              <radialGradient id="glucose-demo-glow">
                <stop offset="0" stopColor="#edb7a9" stopOpacity=".85" />
                <stop offset="1" stopColor="#edb7a9" stopOpacity="0" />
              </radialGradient>
            </defs>
            <g aria-hidden="true">
              {INSULIN_SOURCES.map(({ x, y }) => <circle key={`glow-${x}`} className="glucose-demo-glow" cx={x} cy={y} r="62" fill="url(#glucose-demo-glow)" />)}
            </g>
            <PlatformModelLayers showFlow={false} />
            <g className="glucose-demo-glucose" aria-hidden="true">
              {GLUCOSE_LANES.map((lane, index) => {
                const progress = index / PARTICLE_COUNT;
                return (
                  <g key={index} className={`glucose-particle${index < activeGlucose ? " is-active" : ""}`}>
                    <g
                      className="glucose-particle-motion"
                      style={cssVars({
                        "--delay": `${(-progress * 6).toFixed(2)}s`,
                        "--travel-x": `${LUMEN_TRAVEL.x}px`,
                        "--travel-y": `${LUMEN_TRAVEL.y}px`,
                        "--rest-x": `${(LUMEN_TRAVEL.x * progress).toFixed(1)}px`,
                        "--rest-y": `${(LUMEN_TRAVEL.y * progress).toFixed(1)}px`,
                      })}
                    >
                      <path d={`M${LUMEN_START.x - 7} ${LUMEN_START.y + lane} l7 -7 l7 7 l-7 7 z`} />
                    </g>
                  </g>
                );
              })}
            </g>
            <g className="glucose-demo-insulin" aria-hidden="true">
              {Array.from({ length: PARTICLE_COUNT }, (_, index) => {
                const source = INSULIN_SOURCES[index % INSULIN_SOURCES.length];
                const wave = Math.floor(index / INSULIN_SOURCES.length);
                const spread = (wave - 1) * 18;
                return (
                  <g key={index} className={`insulin-particle${index < activeInsulin ? " is-active" : ""}`}>
                    <g
                      className="insulin-particle-motion"
                      style={cssVars({
                        "--delay": `${(-wave * 0.9 - index * 0.13).toFixed(2)}s`,
                        "--travel-x": `${source.dx + spread}px`,
                        "--travel-y": `${source.dy}px`,
                        "--rest-x": `${((source.dx + spread) * 0.6).toFixed(1)}px`,
                        "--rest-y": `${(source.dy * 0.6).toFixed(1)}px`,
                      })}
                    >
                      <circle cx={source.x} cy={source.y} r="5.5" />
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
          <figcaption>
            <span className="glucose-demo-key"><i className="key-glucose" aria-hidden="true" />Glucose</span>
            <span className="glucose-demo-key"><i className="key-insulin" aria-hidden="true" />Insulin</span>
            <span className="glucose-demo-key"><i className="key-cells" aria-hidden="true" />Beta-like cells</span>
            <small>Concept illustration only. Not experimental data and not a medical device.</small>
          </figcaption>
        </figure>

        <div className="glucose-demo-controls" data-reveal-copy>
          <label htmlFor="glucose-level">Blood glucose</label>
          <p className="glucose-demo-value"><strong>{glucose}</strong> mg/dL <small>{mmol} mmol/L</small></p>
          <input
            id="glucose-level"
            className="glucose-demo-range"
            type="range"
            min={MIN_GLUCOSE}
            max={MAX_GLUCOSE}
            step={5}
            value={glucose}
            aria-valuetext={valueText}
            onChange={(event) => setGlucose(Number(event.target.value))}
          />
          <div className="glucose-demo-scale" aria-hidden="true"><span>{MIN_GLUCOSE}</span><span>{MAX_GLUCOSE}</span></div>
          <div className="glucose-demo-presets" role="group" aria-label="Example glucose levels">
            {presets.map(({ label, value }) => (
              <button key={label} type="button" aria-pressed={glucose === value} onClick={() => setGlucose(value)}>{label}</button>
            ))}
          </div>
          <dl className="glucose-demo-readout">
            <div><dt>Glucose</dt><dd data-band={band}>{band}</dd></div>
            <div><dt>Intended insulin release</dt><dd>{release}</dd></div>
          </dl>
          <div className="glucose-demo-meter" aria-hidden="true"><span style={{ transform: `scaleX(${response.toFixed(3)})` }} /></div>
        </div>
      </div>
    </section>
  );
}
