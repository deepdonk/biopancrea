export function WhyItMatters() {
  return (
    <section className="why-matters container" id="why-it-matters">
      <div className="why-matters-copy">
        <p className="section-label"><span>01</span>Why it matters</p>
        <h2>Why an artificial pancreas?</h2>
        <p>Insulin therapy helps manage blood glucose, but it does not recreate every function of the body’s own pancreatic beta cells. BioPancrea is exploring whether insulin-producing cells could be supported within an implantable vascular platform and respond more directly to changing glucose levels.</p>
        <strong>The goal is a system that can sense glucose and release insulin from within the body.</strong>
      </div>
      <figure className="response-graphic">
        <svg viewBox="0 0 720 500" role="img" aria-labelledby="response-title response-description">
          <title id="response-title">Intended glucose-responsive insulin release</title>
          <desc id="response-description">A conceptual illustration of glucose entering the bloodstream, beta-like cells responding, and insulin being released.</desc>
          <g className="response-grid" aria-hidden="true">{Array.from({ length: 9 }).map((_, index) => <path key={index} d={`M45 ${52 + index * 50} H675 M${60 + index * 75} 35 V465`} />)}</g>
          <g className="response-vessel" aria-hidden="true"><path d="M30 145 C195 76 530 76 690 145"/><path d="M30 355 C195 424 530 424 690 355"/><path d="M40 250 H680"/></g>
          <g className="response-cells" aria-hidden="true">
            {[[318,220,30],[360,196,32],[402,223,29],[339,260,27],[385,266,31]].map(([cx,cy,r], index) => <g key={index}><circle cx={cx} cy={cy} r={r}/><circle cx={cx - 6} cy={cy - 5} r={r * .2}/></g>)}
          </g>
          <g className="response-glucose" aria-hidden="true">{[[92,220],[148,275],[210,228]].map(([x,y], index) => <path key={index} d={`M${x - 8} ${y} L${x} ${y - 8} L${x + 8} ${y} L${x} ${y + 8}Z`}/>)}</g>
          <g className="response-insulin" aria-hidden="true">{[[474,213],[528,257],[585,224],[630,279]].map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r="6"/>)}</g>
          <g className="response-labels" aria-hidden="true"><text x="74" y="112">GLUCOSE</text><text x="315" y="112">BETA-LIKE CELLS</text><text x="548" y="112">INSULIN</text></g>
        </svg>
        <figcaption>Intended biological response / Concept illustration</figcaption>
      </figure>
    </section>
  );
}
