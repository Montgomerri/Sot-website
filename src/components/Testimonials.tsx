"use client";

import { ArrowDownRight, ArrowUpRight, Clock3, CalendarDays } from "lucide-react";

type Programme = {
  level: string;
  index: string;
  courses: string[];
  duration: string;
  mode: string;
  enrollLink: string;
};

export default function Testimonials() {
  const programmes: Programme[] = [
    {
      index: "01",
      level: "Undergraduate",
      courses: [
        "BSc Computer Science",
        "BSc ICT",
        "BSc MIS",
      ],
      duration: "4 Years",
      mode: "Day & Evening",
      enrollLink: "https://apply.gimpa.edu.gh/start",
    },
    {
      index: "02",
      level: "Postgraduate",
      courses: [
        "MSc/MPhil ICT",
        "MSc IT & Law",
        "MSc MIS",
        "MSc Digital Forensics & Cybersecurity",
        "MSc Industrial Analytics",
      ],
      duration: "2 Years",
      mode: "Evening & Weekend",
      enrollLink: "https://apply.gimpa.edu.gh/start",
    },
    {
      index: "03",
      level: "Postgraduate Diploma",
      courses: [
        "PGD ICT",
        "PGD MIS",
      ],
      duration: "1 Year",
      mode: "Weekend",
      enrollLink: "https://apply.gimpa.edu.gh/start",
    },
  ];

  return (
    <section id="programmes" className="programmes-section">
      <div className="programmes-container">
        {/* Section heading */}
        <header className="programmes-header">
          <div className="programmes-heading-content">
            

            <h2 className="programmes-heading">
              Find your path
              <br />
              in technology.
            </h2>
          </div>

          <div className="programmes-intro">
            <p>
              From your first degree to advanced specialisation,
              explore the programmes designed to help you build
              your knowledge and shape your future.
            </p>

            <a
              href="https://gimpa.edu.gh/dept-computer-science-and-information-systems/#bsmsprogrammes"
              target="_blank"
              rel="noopener noreferrer"
              className="programmes-explore-link"
            >
              Explore all programmes
              <ArrowUpRight size={17} strokeWidth={1.8} />
            </a>
          </div>
        </header>

        {/* Programme directory */}
        <div className="programmes-list">
          {programmes.map((programme) => (
            <article
              className="programme-row"
              key={programme.index}
            >
              {/* Programme number and level */}
              <div className="programme-category">
                <span className="programme-index">
                  {programme.index}
                </span>

                <span className="programme-level">
                  {programme.level}
                </span>
              </div>

              {/* Programme details */}
              <div className="programme-details">
                <h3 className="programme-title">
                  {programme.index === "01" &&
                    "Bachelor's Degrees"}

                  {programme.index === "02" &&
                    "Master's & MPhil Programmes"}

                  {programme.index === "03" &&
                    "Postgraduate Diplomas"}
                </h3>

                <div className="programme-courses">
                  {programme.courses.map((course) => (
                    <span
                      className="programme-course"
                      key={course}
                    >
                      {course}
                    </span>
                  ))}
                </div>

                <div className="programme-meta">
                  <span className="programme-meta-item">
                    <Clock3 size={15} strokeWidth={1.7} />
                    {programme.duration}
                  </span>

                  <span className="programme-meta-divider" />

                  <span className="programme-meta-item">
                    <CalendarDays size={15} strokeWidth={1.7} />
                    {programme.mode}
                  </span>
                </div>
              </div>

              {/* Enrolment link */}
              <a
                href={programme.enrollLink}
                target="_blank"
                rel="noopener noreferrer"
                className="programme-apply"
                aria-label={`Apply for ${programme.level} programmes`}
              >
                <span>Enroll Now</span>

                <span className="programme-apply-icon">
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                  />
                </span>
              </a>
            </article>
          ))}
        </div>

        {/* Closing note */}
        <div className="programmes-bottom">
          <p>
            
          </p>

          <a
            href="https://apply.gimpa.edu.gh/start"
            target="_blank"
            rel="noopener noreferrer"
            className="programmes-bottom-link"
          >
            Start your application
            <ArrowDownRight size={17} strokeWidth={1.8} />
          </a>
        </div>
      </div>

      <style>{`
        .programmes-section {
          background: #ffffff;
          padding: 86px 24px 80px;
          color: #111111;
          font-family: Poppins, sans-serif;
          overflow: hidden;
        }

        .programmes-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Header */

        .programmes-header {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(250px, 0.7fr);
          align-items: end;
          gap: 50px;
          margin-bottom: 55px;
        }

        .programmes-eyebrow {
          margin: 0 0 18px;
          color: #027cb9;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.7px;
        }

        .programmes-heading {
          margin: 0;
          color: #15191e;
          font-size: clamp(38px, 4.6vw, 54px);
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -2px;
        }

        .programmes-intro {
          max-width: 400px;
          justify-self: end;
          padding-bottom: 5px;
        }

        .programmes-intro > p {
          margin: 0 0 18px;
          color: #646d76;
          font-size: 13px;
          line-height: 1.9;
        }

        .programmes-explore-link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #027cb9;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 200ms ease;
        }

        .programmes-explore-link:hover {
          gap: 12px;
        }

        .programmes-explore-link svg {
          transition: transform 200ms ease;
        }

        .programmes-explore-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* Open programme rows */

        .programmes-list {
          border-top: 1px solid #e6e9ec;
        }

        .programme-row {
          display: grid;
          grid-template-columns: 155px minmax(0, 1fr) 130px;
          align-items: center;
          gap: 30px;
          padding: 34px 0;
          border-bottom: 1px solid #e6e9ec;
          transition:
            padding-left 250ms ease,
            background-color 250ms ease;
        }

        .programme-row:hover {
          padding-left: 8px;
        }

        /* Category */

        .programme-category {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          align-self: stretch;
          justify-content: center;
        }

        .programme-index {
          color: #027cb9;
          font-size: 13px;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.5px;
        }

        .programme-level {
          color: #7a848c;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.7;
        }

        /* Programme information */

        .programme-details {
          min-width: 0;
        }

        .programme-title {
          margin: 0 0 15px;
          color: #161a1f;
          font-size: 22px;
          font-weight: 650;
          line-height: 1.45;
          letter-spacing: -0.65px;
          transition: color 200ms ease;
        }

        .programme-row:hover .programme-title {
          color: #027cb9;
        }

        .programme-courses {
          display: flex;
          flex-wrap: wrap;
          gap: 8px 10px;
          margin-bottom: 19px;
        }

        .programme-course {
          display: inline-flex;
          align-items: center;
          padding: 5px 10px;
          border: 1px solid #e6eaee;
          border-radius: 4px;
          background: #ffffff;
          color: #59636d;
          font-size: 10px;
          font-weight: 500;
          line-height: 1.6;
          transition:
            border-color 200ms ease,
            color 200ms ease,
            background-color 200ms ease;
        }

        .programme-row:hover .programme-course {
          border-color: #d8e8f1;
        }

        .programme-meta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 13px;
        }

        .programme-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #707a84;
          font-size: 11px;
          line-height: 1.7;
        }

        .programme-meta-item svg {
          flex-shrink: 0;
          color: #027cb9;
        }

        .programme-meta-divider {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #b7bec5;
        }

        /* Apply link */

        .programme-apply {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 9px;
          justify-self: end;
          color: #202a34;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }

        .programme-apply-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border: 1px solid #dce3e8;
          border-radius: 50%;
          color: #027cb9;
          transition:
            background-color 220ms ease,
            border-color 220ms ease,
            color 220ms ease,
            transform 220ms ease;
        }

        .programme-apply:hover .programme-apply-icon {
          background: #027cb9;
          border-color: #027cb9;
          color: #ffffff;
          transform: translate(2px, -2px);
        }

        /* Footer */

        .programmes-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          padding-top: 27px;
        }

        .programmes-bottom > p {
          margin: 0;
          color: #69737d;
          font-size: 12px;
          line-height: 1.8;
        }

        .programmes-bottom-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #027cb9;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: gap 200ms ease;
        }

        .programmes-bottom-link:hover {
          gap: 13px;
        }

        /* Tablet */

        @media (max-width: 900px) {
          .programmes-section {
            padding: 68px 24px 62px;
          }

          .programmes-header {
            grid-template-columns: minmax(0, 1fr) minmax(220px, 0.8fr);
            gap: 30px;
            margin-bottom: 42px;
          }

          .programme-row {
            grid-template-columns: 115px minmax(0, 1fr) 115px;
            gap: 20px;
            padding: 29px 0;
          }

          .programme-title {
            font-size: 20px;
          }

          .programme-apply {
            gap: 6px;
            font-size: 11px;
          }

          .programme-apply-icon {
            width: 31px;
            height: 31px;
          }
        }

        /* Mobile */

        @media (max-width: 620px) {
          .programmes-section {
            padding: 49px 21px 46px;
          }

          .programmes-header {
            grid-template-columns: 1fr;
            gap: 19px;
            margin-bottom: 35px;
          }

          .programmes-eyebrow {
            margin-bottom: 15px;
            font-size: 10px;
          }

          .programmes-heading {
            font-size: clamp(36px, 9vw, 44px);
            letter-spacing: -1.5px;
          }

          .programmes-intro {
            justify-self: start;
          }

          .programmes-intro > p {
            margin-bottom: 12px;
            font-size: 12px;
          }

          .programme-row {
            grid-template-columns: 1fr auto;
            align-items: start;
            gap: 12px 16px;
            padding: 25px 0;
          }

          .programme-category {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: center;
            gap: 11px;
          }

          .programme-index {
            font-size: 12px;
          }

          .programme-level {
            font-size: 10px;
          }

          .programme-details {
            grid-column: 1;
            min-width: 0;
          }

          .programme-title {
            margin-bottom: 12px;
            font-size: 19px;
            letter-spacing: -0.4px;
          }

          .programme-courses {
            gap: 7px;
            margin-bottom: 14px;
          }

          .programme-course {
            padding: 4px 8px;
            font-size: 10px;
          }

          .programme-meta {
            gap: 8px;
          }

          .programme-meta-item {
            gap: 5px;
            font-size: 10px;
          }

          .programme-meta-item svg {
            width: 13px;
            height: 13px;
          }

          .programme-apply {
            grid-column: 2;
            grid-row: 2;
            align-self: end;
            gap: 0;
            padding-top: 1px;
            font-size: 0;
          }

          .programme-apply-icon {
            width: 34px;
            height: 34px;
          }

          .programmes-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 11px;
          }
        }

        @media (max-width: 380px) {
          .programmes-section {
            padding-right: 17px;
            padding-left: 17px;
          }

          .programme-row {
            column-gap: 10px;
          }

          .programme-title {
            font-size: 17px;
          }

          .programme-course {
            font-size: 9px;
          }

          .programme-meta {
            gap: 7px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .programme-row,
          .programme-title,
          .programme-course,
          .programme-apply-icon,
          .programmes-explore-link,
          .programmes-explore-link svg,
          .programmes-bottom-link {
            transition: none;
          }

          .programme-row:hover {
            padding-left: 0;
          }
        }
      `}</style>
    </section>
  );
}