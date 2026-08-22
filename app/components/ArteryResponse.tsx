const arteryStruts = Array.from({ length: 10 }, (_, index) => ({ x: 215 + index * 44, reverse: index % 2 === 0 }));

export function ArteryResponse() {
  return (
    <section className="artery-response container">
      <div className="artery-response-copy"><p className="section-label light"><span>03</span>Inside the artery</p><h2>The intended response.</h2><p>The long-term aim is to investigate whether the supported cells can sense changing glucose levels and release insulin into the bloodstream.</p><aside>Investigational research aim—not a proven clinical result.</aside></div>
      <figure className="artery-visual">
        <svg viewBox="0 0 860 600" role="img" aria-labelledby="artery-title artery-description">
          <title id="artery-title">Conceptual stent placement within an artery</title>
          <desc id="artery-description">An open cylindrical stent rests against the vessel wall while blood-flow and glucose particles pass through its centre and smaller insulin particles enter the flow.</desc>
          <g className="artery-wall" aria-hidden="true"><path d="M30 145 C230 80 630 80 830 145 L830 455 C630 520 230 520 30 455 Z"/><path d="M30 185 C250 125 615 125 830 185 M30 415 C250 475 615 475 830 415"/></g>
          <g className="artery-hydrogel" aria-hidden="true"><path d="M218 360 C355 393 573 391 704 356 L705 405 C562 441 355 442 217 408 Z"/>{Array.from({length:6}).map((_,index)=><path key={index} d={`M226 ${370 + index * 7} C360 ${402 + index * 4} 570 ${400 + index * 4} 697 ${366 + index * 7}`}/>)}</g>
          <g className="artery-stent" aria-hidden="true"><ellipse cx="210" cy="302" rx="31" ry="125"/><ellipse cx="710" cy="302" rx="31" ry="125"/>{arteryStruts.map(({x,reverse},index)=><path key={index} d={reverse ? `M${x} 184 L${x+44} 420 L${x+88} 184` : `M${x} 420 L${x+44} 184 L${x+88} 420`}/>)}</g>
          <g className="artery-cells" aria-hidden="true">{[[350,376,15],[395,394,12],[442,375,17],[492,392,12],[535,374,14]].map(([cx,cy,r])=><g key={`${cx}-${cy}`}><circle cx={cx} cy={cy} r={r}/><circle cx={cx-4} cy={cy-3} r={r*.2}/></g>)}</g>
          <g className="artery-glucose" aria-hidden="true">{[[80,274],[185,321],[310,282],[440,314],[575,272],[730,318]].map(([cx,cy],index)=><circle key={index} cx={cx} cy={cy} r="5"/>)}</g>
          <g className="artery-insulin" aria-hidden="true">{[[421,356],[457,345],[493,360],[527,343]].map(([cx,cy],index)=><circle key={index} cx={cx} cy={cy} r="2.5"/>)}</g>
          <g className="artery-labels" aria-hidden="true"><text x="55" y="118">Femoral artery / conceptual section</text><text x="650" y="288">Open flow channel</text><text x="556" y="466">Supported cells</text></g>
        </svg>
        <figcaption>Conceptual placement and biological response</figcaption>
      </figure>
    </section>
  );
}
