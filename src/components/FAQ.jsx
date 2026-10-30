
import { useState } from "react";
import "./FAQ.css";

const faqItems = [
  {
    question: "What is Felixa Vistas?",
    answer:
      "Felixa Vistas is a lifestyle plotted development designed for comfortable living in Padappai, Chennai.",
  },
  {
    question: "Where is Felixa Vistas located?",
    answer:
      "Felixa Vistas is located in Padappai, with convenient connectivity to Vandalur, Mudichur and Tambaram.",
  },
  {
    question: "What plot sizes are available at Felixa Vistas?",
    answer:
      "Plots range from approximately 650 sq. ft. to 2,000 sq. ft.",
  },
  {
    question: "What amenities does Felixa Vistas offer?",
    answer:
      "The project features 25+ lifestyle amenities, including landscaped gardens, a children's play area and a sports court.",
  },
  {
    question: "Is Felixa Vistas a gated community?",
    answer:
      "Yes, it offers a secured gated community with a grand entrance arch and a solid compound wall.",
  },
  {
    question: "Are home loan facilities available for Felixa Vistas?",
    answer:
      "Yes, APF approval is available from SBI, HDFC, ICICI, Axis Bank, IDBI and LIC, with loans of up to 80%, subject to eligibility and bank terms.",
  },
  {
    question:
      "What infrastructure facilities are available at Felixa Vistas?",
    answer:
      "The project includes blacktop internal roads, street lights, EB line provision and potable groundwater.",
  },
  {
    question:
      "How far is Felixa Vistas from Vandalur Bus Stand?",
    answer:
      "Felixa Vistas is approximately a 10-minute drive from Vandalur Bus Stand.",
  },
];

function FAQ() {
  // The second item is initially open to match the reference design.
  const [activeIndex, setActiveIndex] = useState(1);

  const toggleItem = (index) => {
    setActiveIndex((currentIndex) =>
      currentIndex === index ? -1 : index
    );
  };

  return (
    <section className="fv-faq" id="faq">
      <div className="fv-faq-container">
        {/* LEFT: INTRODUCTION */}
        <div className="fv-faq-intro">
          <span className="fv-faq-eyebrow">
            FREQUENTLY ASKED QUESTIONS
          </span>

          <h2 className="fv-faq-title">
            EVERYTHING YOU NEED TO KNOW BEFORE CHOOSING FELIXA VISTAS.
          </h2>

          <p className="fv-faq-description">
            Everything you need to know before
            <br className="fv-faq-desktop-break" />
            your stay with HomeHouse.
          </p>

          <a className="fv-faq-cta" href="#location">
            <span>Visit us Now</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 12h15M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* RIGHT: FAQ ACCORDION */}
        <div className="fv-faq-list">
          {faqItems.map((item, index) => {
            const isOpen = activeIndex === index;
            const answerId = `fv-faq-answer-${index}`;
            const triggerId = `fv-faq-question-${index}`;

            return (
              <article
                className={`fv-faq-item ${
                  isOpen ? "is-open" : ""
                }`}
                key={item.question}
              >
                <h3 className="fv-faq-question-heading">
                  <button
                    type="button"
                    id={triggerId}
                    className="fv-faq-question"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                  >
                    <span>{item.question}</span>

                    <span
                      className="fv-faq-icon"
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                    </span>
                  </button>
                </h3>

                <div
                  id={answerId}
                  className="fv-faq-answer"
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                >
                  <div className="fv-faq-answer-inner">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
