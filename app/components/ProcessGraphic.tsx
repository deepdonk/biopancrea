import { BetaCellCluster, PlatformAssembly } from "./PlatformGraphic";

function CellColony({ x, y, scale = 1, className = "" }: { x: number; y: number; scale?: number; className?: string }) {
  const cells = [[0, 0, 16], [-20, 5, 13], [18, -10, 14], [23, 18, 12], [-10, -20, 12], [-15, 24, 11]] as const;

  return (
    <g className={`process-colony ${className}`.trim()} transform={`translate(${x} ${y}) scale(${scale})`} aria-hidden="true">
      {cells.map(([cx, cy, radius]) => <circle cx={cx} cy={cy} r={radius} key={`${cx}-${cy}`} />)}
    </g>
  );
}

export function ArteryCutaway() {
  return (
    <g className="artery-cutaway" aria-hidden="true">
      <path className="artery-wall" d="M55 146 C252 88 706 82 905 150 L905 182 C704 125 254 131 55 180 Z" />
      <path className="artery-wall" d="M55 410 C254 469 704 463 905 395 L905 427 C706 496 252 501 55 444 Z" />
      <path className="artery-edge" d="M55 180 C254 131 704 125 905 182 M55 410 C254 469 704 463 905 395" />
      <path className="artery-axis" d="M80 296 C320 273 642 250 880 240" />
    </g>
  );
}

function SkinSample() {
  return (
    <g className="process-skin-sample" aria-hidden="true">
      <path className="skin-layer skin-layer-top" d="M120 196 C220 171 316 177 410 200 L410 236 C316 216 220 210 120 234 Z" />
      <path className="skin-layer skin-layer-middle" d="M120 234 C220 210 316 216 410 236 L410 314 C310 294 218 290 120 316 Z" />
      <path className="skin-layer skin-layer-base" d="M120 316 C218 290 310 294 410 314 L410 362 C310 343 216 338 120 366 Z" />
      <path className="sample-guide" d="M314 244 V160 H505" />
      <circle className="sample-extraction" cx="314" cy="244" r="18" />
      <circle className="sample-cell" cx="524" cy="160" r="17" />
      <circle className="sample-cell-detail" cx="519" cy="155" r="4" />
      <text x="120" y="402">SKIN-CELL CROSS-SECTION</text>
      <text x="505" y="126">EXTRACTED CELL SAMPLE</text>
    </g>
  );
}

function DifferentiationSequence() {
  return (
    <g className="differentiation-sequence" aria-hidden="true">
      <CellColony x={160} y={284} scale={.66} className="ipsc-colony" />
      <CellColony x={370} y={284} scale={.72} className="intermediate-colony intermediate-colony-one" />
      <CellColony x={580} y={284} scale={.78} className="intermediate-colony intermediate-colony-two" />
      <BetaCellCluster x={795} y={284} scale={1.15} />
      <path className="process-arrow" d="M222 284 H300 M432 284 H510 M642 284 H720" />
      <path className="process-arrow-head" d="M292 278 L302 284 L292 290 M502 278 L512 284 L502 290 M712 278 L722 284 L712 290" />
      <text x="160" y="390" textAnchor="middle">iPSC COLONY</text>
      <text x="370" y="390" textAnchor="middle">INTERMEDIATE I</text>
      <text x="580" y="390" textAnchor="middle">INTERMEDIATE II</text>
      <text x="795" y="390" textAnchor="middle">BETA-LIKE CELLS</text>
    </g>
  );
}

function IntendedResponse() {
  return (
    <g className="intended-response" aria-hidden="true">
      <g className="process-glucose-markers">
        {[[170, 294], [285, 278], [400, 269]].map(([x, y], index) => <path key={index} d={`M${x - 7} ${y} L${x} ${y - 7} L${x + 7} ${y} L${x} ${y + 7} Z`} />)}
      </g>
      <g className="process-insulin-markers">
        {[[620, 250], [700, 236], [770, 224]].map(([cx, cy], index) => <circle key={index} cx={cx} cy={cy} r="5" />)}
      </g>
      <g className="process-legend">
        <path d="M746 74 L753 67 L760 74 L753 81 Z" />
        <text x="770" y="78">Glucose</text>
        <circle cx="753" cy="105" r="5" />
        <text x="770" y="109">Insulin</text>
      </g>
    </g>
  );
}

export function ProcessGraphic({ activeStep, title }: { activeStep: number; title: string }) {
  return (
    <figure className="process-diagram" data-stage={activeStep}>
      <svg viewBox="0 0 960 560" role="img" aria-labelledby="process-graphic-title process-graphic-description">
        <title id="process-graphic-title">{title}</title>
        <desc id="process-graphic-description">A continuous seven-stage scientific diagram following a skin-cell sample through reprogramming, beta-like-cell development, hydrogel and stent integration, vascular placement, and an intended glucose-responsive insulin release.</desc>

        <g className="process-scene process-scene-skin"><SkinSample /></g>

        <g className="process-scene process-scene-ipsc" aria-hidden="true">
          <circle className="process-source-cell" cx="307" cy="280" r="22" />
          <path className="process-shape-arrow" d="M358 280 H438" />
          <path className="process-arrow-head" d="M428 274 L438 280 L428 286" />
          <CellColony x={570} y={280} scale={1.35} className="ipsc-colony" />
          <text x="307" y="362" textAnchor="middle">EXTRACTED CELL</text>
          <text x="570" y="362" textAnchor="middle">iPSC COLONY</text>
        </g>

        <g className="process-scene process-scene-differentiation"><DifferentiationSequence /></g>

        <g className="process-scene process-scene-hydrogel">
          <PlatformAssembly id="process-hydrogel" showStent={false} showFlow={false} />
          <text className="process-annotation" x="480" y="492" textAnchor="middle">CELLS SUPPORTED WITHIN A REGULAR POROUS HYDROGEL</text>
        </g>

        <g className="process-scene process-scene-stent">
          <PlatformAssembly id="process-stent" showFlow={false} />
          <text className="process-annotation" x="480" y="492" textAnchor="middle">HYDROGEL AND CELLS ALIGNED WITH THE VASCULAR SCAFFOLD</text>
        </g>

        <g className="process-scene process-scene-artery">
          <ArteryCutaway />
          <g className="process-platform-in-artery"><PlatformAssembly id="process-artery" showFlow={false} /></g>
          <text className="process-annotation" x="480" y="514" textAnchor="middle">LONGITUDINAL FEMORAL-ARTERY CUTAWAY / CONCEPTUAL / NOT TO SCALE</text>
        </g>

        <g className="process-scene process-scene-response">
          <ArteryCutaway />
          <g className="process-platform-in-artery"><PlatformAssembly id="process-response" showFlow={false} /></g>
          <IntendedResponse />
          <text className="process-annotation" x="480" y="514" textAnchor="middle">INTENDED BIOLOGICAL RESPONSE / INVESTIGATIONAL CONCEPT</text>
        </g>
      </svg>
      <figcaption>Concept illustration / Not to scale / Research-stage</figcaption>
    </figure>
  );
}
