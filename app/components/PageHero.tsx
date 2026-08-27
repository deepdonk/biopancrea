export function PageHero({ index, label, title, copy, variant = "sage" }: { index: string; label: string; title: string; copy?: string; variant?: "sage" | "navy" | "coral" }) {
  return (
    <section className={`page-hero page-hero-${variant}`} data-reveal>
      <div className="page-hero-copy">
        <p className="eyebrow" data-reveal-label><span>{index}</span>{label}</p>
        <h1 data-reveal-heading>{title}</h1>
        {copy ? <p className="page-hero-support" data-reveal-copy>{copy}</p> : null}
      </div>
      <div className="page-hero-tone" aria-hidden="true" />
    </section>
  );
}
