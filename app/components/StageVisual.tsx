export type StageKind = "sample" | "cells" | "ipsc" | "cluster" | "hydrogel" | "stent" | "artery" | "response";

export function StageVisual({ kind, caption }: { kind: StageKind; caption: string }) {
  return (
    <figure className={`stage-visual stage-${kind}`}>
      <div className="stage-grid" aria-hidden="true" />
      {kind === "sample" ? <div className="sample-hand" aria-hidden="true"><i /><i /><i /><i /><span /></div> : null}
      {kind === "cells" || kind === "ipsc" || kind === "cluster" ? (
        <div className="cell-field" aria-hidden="true">
          {Array.from({ length: kind === "cluster" ? 12 : 7 }).map((_, index) => <i key={index} />)}
        </div>
      ) : null}
      {kind === "hydrogel" ? <div className="gel-volume" aria-hidden="true"><div className="cell-field">{Array.from({ length: 9 }).map((_, index) => <i key={index} />)}</div></div> : null}
      {kind === "stent" ? <div className="stent-device" aria-hidden="true"><i /><i /><i /><i /><span className="gel-core" /></div> : null}
      {kind === "artery" ? <div className="artery-view" aria-hidden="true"><i /><span><b /></span><i /></div> : null}
      {kind === "response" ? <div className="response-view" aria-hidden="true"><div className="cell-field">{Array.from({ length: 8 }).map((_, index) => <i key={index} />)}</div><span /><span /><span /></div> : null}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
