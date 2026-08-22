import Image from "next/image";

export function PlatformVisual() {
  return (
    <figure className="platform-visual">
      <Image
        src="/platform-hero.png"
        alt="Abstract concept illustration of beta-like cells within a translucent hydrogel and metallic stent structure."
        fill
        priority
        sizes="(max-width: 800px) 100vw, 54vw"
      />
      <span className="platform-scan" aria-hidden="true" />
      <span className="platform-pulse pulse-a" aria-hidden="true" />
      <span className="platform-pulse pulse-b" aria-hidden="true" />
      <div className="platform-label label-cells"><i />Beta-like cells</div>
      <div className="platform-label label-hydrogel"><i />Hydrogel support</div>
      <div className="platform-label label-stent"><i />Stent concept</div>
      <figcaption>Concept illustration / Not to scale</figcaption>
    </figure>
  );
}
