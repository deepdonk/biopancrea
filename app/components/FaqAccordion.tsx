"use client";

import { useState } from "react";

const questions = [
  {
    question: "Is BioPancrea available as a treatment?",
    answer: "No. BioPancrea is an early-stage concept and is not an approved medical treatment.",
  },
  {
    question: "What is BioPancrea developing?",
    answer: "An artificial-pancreas concept combining cells, a supportive gel, and a vascular stent.",
  },
  {
    question: "Can I learn more?",
    answer: "Additional information may be shared as the project develops. You can book a meeting or contact the BioPancrea team.",
  },
] as const;

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-accordion">
      {questions.map(({ question, answer }, index) => {
        const isOpen = openIndex === index;
        const panelId = `mission-faq-panel-${index}`;
        const buttonId = `mission-faq-button-${index}`;
        return (
          <div className={`faq-row${isOpen ? " is-open" : ""}`} key={question}>
            <h3>
              <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setOpenIndex(isOpen ? null : index)}>
                <span>{question}</span><i aria-hidden="true">{isOpen ? "−" : "+"}</i>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen}>
              <p>{answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
