export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark${light ? " brand-mark-light" : ""}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

export function BrandWordmark() {
  return (
    <span className="brand-wordmark" aria-hidden="true">
      BioPancrea<sup className="brand-trademark">™</sup>
    </span>
  );
}
