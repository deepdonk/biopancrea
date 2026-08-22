export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-mark${light ? " brand-mark-light" : ""}`} aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}
