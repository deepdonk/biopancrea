export function PageHero({ index, label, title, copy, variant = "sage" }: { index: string; label: string; title: string; copy?: string; variant?: "sage" | "navy" | "coral" }) {
  return (
    <section className={`page-hero page-hero-${variant}`}>
      <div className="page-hero-copy">
        <p className="eyebrow"><span>{index}</span>{label}</p>
        <h1>{title}</h1>
        {copy ? <p className="page-hero-support">{copy}</p> : null}
      </div>
      <div className="page-hero-plane" aria-hidden="true" />
      <div className="scroll-cue" aria-hidden="true"><i /> Scroll to explore</div>
    </section>
  );
}
