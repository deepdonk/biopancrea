export function OrganicField({ variant = "sage" }: { variant?: "sage" | "navy" | "coral" }) {
  return (
    <div className={`organic-field organic-${variant}`} aria-hidden="true">
      <div className="organic-orb organic-orb-a"><span /><span /><span /></div>
      <div className="organic-orb organic-orb-b"><span /><span /></div>
      <div className="organic-orb organic-orb-c"><span /></div>
      <i className="organic-path path-a" /><i className="organic-path path-b" />
      <span className="field-index">BP—BIO / 01</span>
    </div>
  );
}
