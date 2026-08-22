"use client";

import { useRef, useState } from "react";

const placeholders = [
  { number: "01", mark: "A" },
  { number: "02", mark: "B" },
  { number: "03", mark: "C" },
] as const;

export function TeamProfiles() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [activeProfile, setActiveProfile] = useState(0);

  function openProfile(index: number) {
    setActiveProfile(index);
    dialogRef.current?.showModal();
  }

  function closeProfile() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="team-profile-grid">
        {placeholders.map(({ number, mark }, index) => (
          <article className="team-profile" key={number}>
            <div className="team-profile-portrait" role="img" aria-label="Professional photograph pending approval">
              <span aria-hidden="true">{mark}</span><i aria-hidden="true" /><i aria-hidden="true" />
              <small>Photograph pending approval</small>
            </div>
            <div className="team-profile-copy">
              <span>Profile placeholder — {number}</span>
              <h2>Full name pending approval</h2>
              <p className="team-profile-role">Role pending confirmation</p>
              <p>Biography will be added after the individual’s information has been verified and approved for publication.</p>
              <dl><dt>Relevant expertise</dt><dd>Pending verification</dd></dl>
              <button type="button" onClick={() => openProfile(index)}>View placeholder details <span aria-hidden="true">↗</span></button>
            </div>
            <div className="team-profile-personal" aria-hidden="true"><span>What drives my work.</span><p>Personal statement pending approval.</p></div>
          </article>
        ))}
      </div>

      <dialog
        className="team-profile-dialog"
        ref={dialogRef}
        aria-labelledby="team-dialog-title"
      >
        <div className="team-dialog-inner">
          <button className="team-dialog-close" type="button" onClick={closeProfile} aria-label="Close profile">×</button>
          <p className="section-label"><span>{placeholders[activeProfile].number}</span>Profile placeholder</p>
          <h2 id="team-dialog-title">Full name pending approval</h2>
          <p className="team-dialog-role">Role at BioPancrea — pending confirmation</p>
          <dl>
            <div><dt>Professional background</dt><dd>Pending verification and approval.</dd></div>
            <div><dt>Area of expertise</dt><dd>Pending verification and approval.</dd></div>
            <div><dt>Personal motivation</dt><dd>“What drives my work” statement pending approval.</dd></div>
            <div><dt>Selected publications or experience</dt><dd>Shown only when verified and relevant for public disclosure.</dd></div>
          </dl>
          <p className="team-dialog-note">This is a clearly labelled design placeholder. It does not represent a named person, position, qualification, or affiliation.</p>
        </div>
      </dialog>
    </>
  );
}
