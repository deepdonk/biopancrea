import Link from "next/link";
import { OrganicField } from "./components/OrganicField";

const principles = [
  ["01", "Biology-led", "We begin with the complexity of biology and let evidence shape the way forward."],
  ["02", "Patient-centred", "Human needs and lived experience remain at the centre of how we think."],
  ["03", "Built for translation", "We pursue ideas with the potential to move thoughtfully from insight to impact."],
] as const;

const previews = [
  ["Our purpose", "Why pancreatic health deserves deeper, more focused attention.", "/about"],
  ["Our focus", "A considered view of a complex and connected biological frontier.", "/focus"],
  ["Our approach", "How disciplined inquiry can move insight toward meaningful possibility.", "/approach"],
] as const;

export default function Home() {
  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="eyebrow"><span>BP—01</span>Pancreatic &amp; metabolic health</p>
          <h1>Rethinking<br />pancreatic health.</h1>
          <p>BioPancrea is exploring new possibilities at the intersection of biology, technology, and human health.</p>
          <div className="button-row"><Link className="button button-dark" href="/about">Discover our purpose <span aria-hidden="true">↗</span></Link><Link className="button button-line" href="/contact">Connect with us</Link></div>
        </div>
        <OrganicField />
        <div className="scroll-cue" aria-hidden="true"><i /> Scroll to explore</div>
      </section>

      <section className="intro-section container">
        <p className="section-label"><span>01</span>Our purpose</p>
        <div className="intro-grid reveal">
          <h2>A vital organ.<br /><em>An overlooked frontier.</em></h2>
          <div><p>The pancreas plays an important role across interconnected biological systems. We believe it deserves deeper attention, careful inquiry, and a wider field of possibility.</p><Link className="inline-link" href="/about">More about BioPancrea <span aria-hidden="true">↗</span></Link></div>
        </div>
        <div className="system-line" aria-hidden="true"><span>Observe</span><i /><span>Understand</span><i /><span>Translate</span></div>
      </section>

      <section className="principles-section container">
        <div className="section-heading-row"><div><p className="section-label light"><span>02</span>Principles</p><h2>Principled by design.</h2></div><p>Clear thinking, human relevance, and scientific discipline guide each step.</p></div>
        <div className="principle-cards">
          {principles.map(([number,title,copy]) => <article className="principle-card" key={number}><div><span>{number}</span><i /></div><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="visual-statement">
        <div className="visual-grain" aria-hidden="true"><i /><i /><i /></div>
        <p>Perspective / Biology / Purpose</p>
        <h2>Complex biology demands<br />a <em>new perspective.</em></h2>
        <span>BioPancrea — A focused biological frontier</span>
      </section>

      <section className="preview-section container">
        <p className="section-label"><span>03</span>Explore BioPancrea</p>
        <div className="preview-list">
          {previews.map(([title,copy,href],index) => <Link className="preview-row" href={href} key={href}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p><i aria-hidden="true">↗</i></Link>)}
        </div>
      </section>

      <section className="closing-cta container">
        <div><p className="section-label"><span>04</span>Connect</p><h2>The next chapter<br />is taking shape.</h2></div>
        <div><p>We welcome conversations with researchers, clinicians, strategic partners, and investors whose interests align with our purpose.</p><Link className="button button-dark" href="/contact">Start a conversation <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
