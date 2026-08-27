"use client";

import { useState } from "react";

const questions = [
  {
    question: "Is BioPancrea an approved treatment?",
    answer: "No. BioPancrea is an early-stage biotechnology concept and is not currently an approved medical treatment.",
  },
  {
    question: "Where is the platform intended to be placed?",
    answer: "The current concept is being explored for placement within the femoral artery using a stent-based vascular platform.",
  },
  {
    question: "What is the intended goal?",
    answer: "The goal is to investigate whether supported beta-like cells could respond to changing glucose levels and release insulin from within the body.",
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
