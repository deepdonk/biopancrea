import Image from "next/image";

const team = [
  {
    name: "Janefrances Muoneke",
    role: "Co-Founder",
    linkedIn: "https://www.linkedin.com/in/janefrances-muoneke-3313113a2/",
    image: "/team/janefrances-muoneke-bio-pancrea.jpeg",
    width: 702,
    height: 1600,
    imageClass: "team-photo-janefrances",
    imageAlt: "Janefrances Muoneke, Co-Founder of BioPancrea",
  },
  {
    name: "Deepta Suresh",
    role: "CEO & Co-Founder",
    linkedIn: "https://www.linkedin.com/in/deepta-suresh-b51913367/",
    image: "/team/deepta-suresh-bio-pancrea.png",
    width: 1000,
    height: 666,
    imageClass: "team-photo-deepta",
    imageAlt: "Deepta Suresh, CEO and Co-Founder of BioPancrea",
  },
] as const;

export function TeamProfiles() {
  return (
    <div className="team-profile-grid">
      {team.map(({ name, role, linkedIn, image, width, height, imageClass, imageAlt }) => (
        <article className="team-profile" key={name}>
          <div className="team-profile-portrait has-photo">
            <Image className={imageClass} src={image} alt={imageAlt} width={width} height={height} sizes="(max-width: 760px) calc(100vw - 56px), 50vw" />
          </div>
          <div className="team-profile-copy">
            <h2>{name}</h2>
            <p className="team-profile-role">{role}</p>
            <a className="button button-dark team-link" href={linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </article>
      ))}
    </div>
  );
}
