
// src/components/CTASection.tsx
"use client";

import { ArrowUpRight } from "lucide-react";

const ACCENT = "#027cb9";

export default function CTASection() {
  const departments = [
    {
      number: "01",
      title: "Economics & Applied Mathematics",
      description:
        "Quantitative foundations for computing, analytics, and data-driven decision making.",
      href: "https://gimpa.edu.gh/dept-economics-and-applied-mathematics/",
      current: false,
    },
    {
      number: "02",
      title: "Liberal Arts & Hospitality Studies",
      description:
        "Humanities, communication, and hospitality programmes within the School of Technology.",
      href: "https://gimpa.edu.gh/dept-liberal-arts-hospitality-studies/",
      current: false,
    },
    {
      number: "03",
      title: "Computer Science & Information Systems",
      description:
        "Explore this department's programmes, news, academic resources, and student services.",
      href: "",
      current: true,
    },
  ];

  return (
    <section id="about" className="about-departments">
      <div className="about-container">
        {/* Editorial heading and introduction */}
        <header className="about-header">
          <div className="about-heading-block">
            

            <h2 className="about-heading">
              About our
              <br />
              departments.
            </h2>
          </div>

          <div className="about-introduction">
            <p>
              The Department of Computer Science and Information Systems
              was established following the merger of the departments of
              Computer Sciences and Information Systems and Innovation by
              the Institute’s management in September 2023.
            </p>

            <p>
              The department offers a wide range of undergraduate,
              postgraduate, and diploma programmes, and shares its
              classrooms and computer laboratories with the Department
              of Information Systems and Innovation within the School
              of Technology.
            </p>
          </div>
        </header>

        {/* Related departments */}
        <div className="departments-grid">
          {departments.map((department) => (
            <article
              className={`department-item ${
                department.current ? "department-item-current" : ""
              }`}
              key={department.number}
            >
              <div className="department-topline">
                <span className="department-number">
                  {department.number}
                </span>

                {department.current && (
                  <span className="department-status">
                    <span className="department-status-dot" />
                    
                  </span>
                )}
              </div>

              <h3 className="department-title">
                {department.title}
              </h3>

              <p className="department-description">
                {department.description}
              </p>

              {department.current ? (
                <span className="department-current-link">
                  You are here
                  <span className="department-current-arrow">
                    <ArrowUpRight size={17} strokeWidth={1.8} />
                  </span>
                </span>
              ) : (
                <a
                  href={department.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="department-link"
                >
                  Explore department
                  <span className="department-link-arrow">
                    <ArrowUpRight size={17} strokeWidth={1.8} />
                  </span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .about-departments {
          width: 100%;
          padding: 82px 24px 78px;
          background: #ffffff;
          color: #15191e;
          font-family: Poppins, sans-serif;
        }

        .about-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Header: title on the left, description on the right */

        .about-header {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          align-items: start;
          gap: 80px;
          margin-bottom: 58px;
        }

        .about-eyebrow {
          margin: 0 0 17px;
          color: ${ACCENT};
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.7px;
        }

        .about-heading {
          margin: 0;
          color: #15191e;
          font-size: clamp(38px, 4.5vw, 51px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -1.9px;
        }

        .about-introduction {
          max-width: 530px;
          padding-top: 27px;
        }

        .about-introduction p {
          margin: 0 0 15px;
          color: #626c76;
          font-size: 13px;
          line-height: 1.95;
        }

        .about-introduction p:last-child {
          margin-bottom: 0;
        }

        /* Three open columns instead of boxed cards */

        .departments-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 38px;
          border-top: 1px solid #e5e9ed;
        }

        .department-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          padding: 24px 0 0;
        }

        .department-topline {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-height: 23px;
          margin-bottom: 22px;
        }

        .department-number {
          color: ${ACCENT};
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.5px;
          font-variant-numeric: tabular-nums;
        }

        .department-status {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #74808a;
          font-size: 10px;
          line-height: 1.5;
        }

        .department-status-dot {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: ${ACCENT};
        }

        .department-title {
          max-width: 320px;
          margin: 0 0 15px;
          color: #171b20;
          font-size: 20px;
          font-weight: 650;
          line-height: 1.45;
          letter-spacing: -0.55px;
          transition: color 200ms ease;
        }

        .department-item:hover .department-title {
          color: ${ACCENT};
        }

        .department-description {
          max-width: 330px;
          margin: 0 0 24px;
          color: #68727c;
          font-size: 12px;
          line-height: 1.9;
        }

        /* Links sit at the bottom of each column */

        .department-link,
        .department-current-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          color: ${ACCENT};
          font-size: 11px;
          font-weight: 600;
          line-height: 1.8;
          text-decoration: none;
        }

        .department-link {
          transition: gap 200ms ease;
        }

        .department-link:hover {
          gap: 15px;
        }

        .department-link-arrow,
        .department-current-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          flex-shrink: 0;
          border: 1px solid #e0e8ee;
          border-radius: 50%;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            color 200ms ease,
            transform 200ms ease;
        }

        .department-link:hover .department-link-arrow {
          background: ${ACCENT};
          border-color: ${ACCENT};
          color: #ffffff;
          transform: translate(2px, -2px);
        }

        .department-current-link {
          color: #7a858e;
          cursor: default;
        }

        .department-current-arrow {
          color: ${ACCENT};
          border-color: #e0e8ee;
        }

        /* Tablet */

        @media (max-width: 900px) {
          .about-departments {
            padding: 66px 24px 62px;
          }

          .about-header {
            gap: 40px;
            margin-bottom: 44px;
          }

          .about-heading {
            font-size: 39px;
          }

          .about-introduction {
            padding-top: 19px;
          }

          .departments-grid {
            column-gap: 24px;
          }

          .department-title {
            font-size: 18px;
          }
        }

        /* Mobile */

        @media (max-width: 620px) {
          .about-departments {
            padding: 48px 21px 48px;
          }

          .about-header {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 36px;
          }

          .about-eyebrow {
            margin-bottom: 14px;
            font-size: 10px;
          }

          .about-heading {
            font-size: clamp(36px, 9vw, 44px);
            line-height: 1.16;
            letter-spacing: -1.4px;
          }

          .about-introduction {
            max-width: 500px;
            padding-top: 0;
          }

          .about-introduction p {
            font-size: 12px;
            line-height: 1.9;
          }

          .departments-grid {
            grid-template-columns: 1fr;
            row-gap: 0;
          }

          .department-item {
            padding: 23px 0 25px;
            border-bottom: 1px solid #e5e9ed;
          }

          .department-topline {
            margin-bottom: 14px;
          }

          .department-title {
            max-width: 420px;
            margin-bottom: 10px;
            font-size: 20px;
          }

          .department-description {
            max-width: 450px;
            margin-bottom: 18px;
            font-size: 12px;
          }

          .department-link,
          .department-current-link {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .about-departments {
            padding-right: 17px;
            padding-left: 17px;
          }

          .about-heading {
            font-size: 34px;
          }

          .department-title {
            font-size: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .department-title,
          .department-link,
          .department-link-arrow {
            transition: none;
          }

          .department-link:hover {
            gap: 10px;
          }
        }
      `}</style>
    </section>
  );
}
