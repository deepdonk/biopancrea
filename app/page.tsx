import { ContactForm } from "./ContactForm";

const principles = [
  { number: "01", title: "Biology-led", copy: "We begin with the complexity of biology and let evidence shape the way forward." },
  { number: "02", title: "Patient-centred", copy: "Human needs and lived experience remain at the centre of how we think." },
  { number: "03", title: "Built for meaningful translation", copy: "We pursue ideas with the potential to move thoughtfully from insight to impact." },
];

export default function Home() {
  return (
    <main>
      <header className="site-header" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="BioPancrea home">
          <span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span>
          BioPancrea
        </a>
        <nav>
          <a href="#purpose">Purpose</a>
          <a href="#approach">Approach</a>
          <a className="nav-contact" href="#contact">Connect</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> Pancreatic &amp; metabolic health</p>
          <h1>Rethinking<br />pancreatic health.</h1>
          <p className="hero-support">BioPancrea is exploring new possibilities at the intersection of biology, technology, and human health.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">Connect with us <span aria-hidden="true">↗</span></a>
            <p><span className="pulse" /> Currently operating in focused development.</p>
          </div>
        </div>
        <div className="bio-visual" aria-hidden="true">
          <div className="orb orb-one"><span /><span /><span /></div>
          <div className="orb orb-two"><span /><span /></div>
          <div className="orb orb-three"><span /></div>
          <div className="field-line line-one" /><div className="field-line line-two" />
          <p className="visual-label label-a">CELLULAR ENVIRONMENT</p>
          <p className="visual-label label-b">BIOLOGICAL SYSTEMS</p>
          <p className="visual-index">BP—01</p>
        </div>
      </section>

      <section className="purpose section-pad" id="purpose">
        <div className="section-kicker"><span>01</span><p>Our purpose</p></div>
        <div className="purpose-content">
          <h2>A vital organ.<br /><em>An overlooked frontier.</em></h2>
          <div className="purpose-statement">
            <p>The pancreas plays a central role in human health, yet much remains to be understood. BioPancrea is working toward a deeper view of its biology—and toward better possibilities for the future.</p>
            <a className="text-link" href="#approach">How we think <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <div className="purpose-mark" aria-hidden="true"><span>Understand</span><i /><span>Explore</span><i /><span>Translate</span></div>
      </section>

      <section className="approach section-pad" id="approach">
        <div className="section-kicker light"><span>02</span><p>Our approach</p></div>
        <div className="approach-heading">
          <h2>Principled by design.</h2>
          <p>Clear thinking, patient attention, and scientific discipline guide each step.</p>
        </div>
        <div className="principle-grid">
          {principles.map((principle) => (
            <article className="principle" key={principle.number}>
              <div className="principle-top"><span>{principle.number}</span><i aria-hidden="true" /></div>
              <h3>{principle.title}</h3><p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="vision section-pad" id="vision">
        <div className="vision-art" aria-hidden="true">
          <div className="vision-ring ring-a" /><div className="vision-ring ring-b" /><div className="vision-ring ring-c" />
          <span className="vision-dot dot-a" /><span className="vision-dot dot-b" /><span className="vision-dot dot-c" />
        </div>
        <div className="vision-copy">
          <div className="section-kicker"><span>03</span><p>Our vision</p></div>
          <h2>Building toward<br />a healthier future.</h2>
          <p>We are pursuing scientifically grounded innovation with care, discipline, and a sense of long-term purpose.</p>
          <div className="quiet-note"><i /> Thoughtful progress, grounded in biology.</div>
        </div>
      </section>

      <section className="contact section-pad" id="contact">
        <div className="contact-intro">
          <div className="section-kicker"><span>04</span><p>Contact</p></div>
          <h2>Let’s start a<br />conversation.</h2>
          <p>We welcome thoughtful conversations with aligned researchers, clinical experts, strategic partners, and investors.</p>
          <a href="mailto:hello@biopancrea.com">hello@biopancrea.com <span aria-hidden="true">↗</span></a>
        </div>
        <ContactForm />
      </section>

      <footer>
        <div className="footer-main">
          <div>
            <a className="wordmark footer-wordmark" href="#top" aria-label="BioPancrea home"><span className="wordmark-mark" aria-hidden="true"><i /><i /><i /></span>BioPancrea</a>
            <p>Advancing pancreatic health.</p>
          </div>
          <a className="back-top" href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
        <div className="footer-bottom">
          <p id="legal-note">© {new Date().getFullYear()} BioPancrea. General corporate information only; not medical advice.</p>
          <div><a href="#privacy-note">Privacy</a><a href="#legal-note">Legal</a></div>
          <p id="privacy-note" className="visually-hidden">Contact details are used only to respond to your enquiry.</p>
        </div>
      </footer>
    </main>
  );
}
