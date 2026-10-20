"use client";

import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Where can I get application forms?",
      answer: (
        <>
          Proceed to apply online at{" "}
          <a
            href="https://apply.gimpa.edu.gh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://apply.gimpa.edu.gh/
            <ArrowUpRight size={13} />
          </a>
          .
          <br />
          <br />
          Admission fee is payable ONLY after you submit your application.
          Obtain your application code (e.g. APPL0000) from your dashboard
          by clicking on <strong>Application Summary</strong>.
          <br />
          <br />
          <strong>Payment Modes:</strong>
          <br />
          CBG USSD: Dial *924*200*16# → select Application Form → enter
          your code → pay.
          <br />
          Ecobank (VISA/Mobile Money): Select Ecobank at payment prompt
          or use the dashboard “Pay Application” button.
          <br />
          <br />
          To proceed contact{" "}
          <a href="mailto:admissions@gimpa.edu.gh">
            admissions@gimpa.edu.gh
            <ArrowUpRight size={13} />
          </a>
          .
        </>
      ),
    },
    {
      question: "How much is the application fee?",
      answer: (
        <>
          <strong>Fees by program:</strong>
          <br />
          Post First Degree Law (LLB): GHC 350
          <br />
          Masters / Postgraduate Diploma: GHC 250
          <br />
          Bachelors / Diploma: GHC 200
          <br />
          International Students: USD 100
        </>
      ),
    },
    {
      question: "What number can I call for enquiries?",
      answer: (
        <>
          <strong>Main lines:</strong>
          <br />
          <a href="tel:+233501620138">+233 (0)501 620138</a>
          <br />
          <a href="tel:+233302908076">+233 (0)302 908076</a>
          <br />
          <br />
          Email:{" "}
          <a href="mailto:csshead@gimpa.edu.gh">
            csshead@gimpa.edu.gh
          </a>
        </>
      ),
    },
    {
      question: "What is the duration of your degree programmes?",
      answer: (
        <>
          Undergraduate: 4 years
          <br />
          Masters: 1–2 years depending on program
          <br />
          PG Diploma: 1 year
        </>
      ),
    },
    {
      question: "Do you offer short courses?",
      answer:
        "Yes. We offer short courses through the GIMPA Training and Consulting Unit.",
    },
  ];

  return (
    <section className="faq-section">
      <div className="faq-container">
        <div className="faq-layout">
          {/* Left: Introduction and contact details */}
          <div className="faq-intro">
            

            <h2 className="faq-heading">
              Frequently asked
              <br />
              questions.
            </h2>

            <p className="faq-description">
              Find answers to common questions about applications,
              programme fees, admissions, and studying at GIMPA.
            </p>

            <div className="faq-contact">
              <p>
                Still need help?
              </p>

              <a
                href="mailto:csshead@gimpa.edu.gh"
                className="faq-contact-link"
              >
                Contact our support team
                <ArrowUpRight size={16} />
              </a>
            </div>
          </div>

          {/* Right: Accordion */}
          <div className="faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  className={`faq-item ${
                    isOpen ? "faq-item-open" : ""
                  }`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    className="faq-question"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                  >
                    <span className="faq-question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="faq-question-text">
                      {faq.question}
                    </span>

                    <span className="faq-toggle">
                      <Plus
                        size={18}
                        strokeWidth={1.8}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer-wrapper"
                    aria-hidden={!isOpen}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <div className="faq-answer-inner">
                      <div className="faq-answer">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        .faq-section {
          width: 100%;
          padding: 84px 24px 88px;
          background: #ffffff;
          color: #15191e;
          font-family: Poppins, sans-serif;
        }

        .faq-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Main two-column structure */

        .faq-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.35fr);
          align-items: start;
          gap: 90px;
        }

        /* Introduction */

        .faq-intro {
          max-width: 390px;
        }

        .faq-eyebrow {
          display: inline-block;
          color: #027cb9;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.6px;
        }

        .faq-heading {
          margin: 21px 0 19px;
          color: #171b20;
          font-size: clamp(34px, 4vw, 45px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: -1.6px;
        }

        .faq-description {
          max-width: 340px;
          margin: 0;
          color: #68727d;
          font-size: 13px;
          line-height: 1.95;
        }

        .faq-contact {
          margin-top: 33px;
          padding-top: 20px;
          border-top: 1px solid #e9edf0;
        }

        .faq-contact p {
          margin: 0 0 9px;
          color: #77818b;
          font-size: 12px;
        }

        .faq-contact-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #027cb9;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 200ms ease;
        }

        .faq-contact-link:hover {
          gap: 12px;
        }

        .faq-contact-link svg {
          transition: transform 200ms ease;
        }

        .faq-contact-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* Accordion: open rows without individual card backgrounds */

        .faq-list {
          min-width: 0;
          border-top: 1px solid #e5e9ed;
        }

        .faq-item {
          border-bottom: 1px solid #e5e9ed;
        }

        .faq-question {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr) 34px;
          align-items: center;
          gap: 14px;
          width: 100%;
          padding: 22px 0;
          border: none;
          background: transparent;
          color: #222a34;
          font-family: inherit;
          text-align: left;
          cursor: pointer;
        }

        .faq-question-number {
          color: #9aa4ad;
          font-size: 11px;
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          transition: color 200ms ease;
        }

        .faq-question-text {
          color: #222a34;
          font-size: 13px;
          font-weight: 600;
          line-height: 1.75;
          transition: color 200ms ease;
        }

        .faq-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: 1px solid #e6ebef;
          border-radius: 50%;
          background: #ffffff;
          color: #596573;
          transition:
            color 220ms ease,
            background 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        .faq-item-open .faq-question-number,
        .faq-item-open .faq-question-text {
          color: #027cb9;
        }

        .faq-item-open .faq-toggle {
          border-color: #027cb9;
          background: #027cb9;
          color: #ffffff;
          transform: rotate(45deg);
        }

        .faq-question:hover .faq-question-number {
          color: #027cb9;
        }

        .faq-question:hover .faq-toggle {
          border-color: #027cb9;
        }

        .faq-question:focus-visible {
          outline: 2px solid #027cb9;
          outline-offset: 5px;
          border-radius: 3px;
        }

        /* Animated answer area */

        .faq-answer-wrapper {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          visibility: hidden;
          transition:
            grid-template-rows 280ms ease,
            opacity 220ms ease,
            visibility 220ms ease;
        }

        .faq-item-open .faq-answer-wrapper {
          grid-template-rows: 1fr;
          opacity: 1;
          visibility: visible;
        }

        .faq-answer-inner {
          min-height: 0;
          overflow: hidden;
        }

        .faq-answer {
          padding: 0 48px 23px 44px;
          color: #68727d;
          font-size: 12px;
          line-height: 1.95;
          overflow-wrap: anywhere;
        }

        .faq-answer strong {
          color: #313c48;
          font-weight: 700;
        }

        .faq-answer a {
          display: inline;
          color: #027cb9;
          font-weight: 600;
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        .faq-answer a svg {
          display: inline-block;
          vertical-align: -2px;
          margin-left: 2px;
        }

        .faq-answer a:hover {
          color: #015b89;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* Tablet */

        @media (max-width: 900px) {
          .faq-section {
            padding: 66px 24px 68px;
          }

          .faq-layout {
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.3fr);
            gap: 42px;
          }

          .faq-heading {
            font-size: 35px;
          }

          .faq-question {
            grid-template-columns: 24px minmax(0, 1fr) 32px;
            gap: 10px;
            padding: 20px 0;
          }

          .faq-answer {
            padding-right: 30px;
            padding-left: 34px;
          }
        }

        /* Mobile */

        @media (max-width: 620px) {
          .faq-section {
            padding: 48px 20px 54px;
          }

          .faq-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .faq-intro {
            max-width: 500px;
          }

          .faq-heading {
            margin: 17px 0 15px;
            font-size: clamp(34px, 8.5vw, 42px);
            letter-spacing: -1.3px;
          }

          .faq-description {
            font-size: 12px;
            line-height: 1.9;
          }

          .faq-contact {
            margin-top: 22px;
            padding-top: 16px;
          }

          .faq-list {
            width: 100%;
          }

          .faq-question {
            grid-template-columns: 25px minmax(0, 1fr) 30px;
            gap: 10px;
            padding: 18px 0;
          }

          .faq-question-text {
            font-size: 12px;
          }

          .faq-toggle {
            width: 29px;
            height: 29px;
          }

          .faq-answer {
            padding: 0 10px 21px 35px;
            font-size: 12px;
            line-height: 1.9;
          }
        }

        @media (max-width: 360px) {
          .faq-section {
            padding-right: 16px;
            padding-left: 16px;
          }

          .faq-question {
            grid-template-columns: 21px minmax(0, 1fr) 28px;
            gap: 8px;
          }

          .faq-question-text {
            font-size: 11px;
          }

          .faq-answer {
            padding-left: 29px;
            padding-right: 0;
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-question-number,
          .faq-question-text,
          .faq-toggle,
          .faq-answer-wrapper,
          .faq-contact-link,
          .faq-contact-link svg {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}