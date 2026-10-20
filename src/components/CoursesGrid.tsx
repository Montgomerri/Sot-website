"use client";

type Offer = {
  title: string;
  points: string[];
  visual: "assess" | "pilot" | "solution";
};

export default function CoursesGrid() {
  const offers: Offer[] = [
    {
      title: "Recognized GIMPA Degrees & Diplomas",
      points: [
        "Qualifications that support further studies and career advancement.",
        "Build a foundation for leadership opportunities in Ghana and globally.",
      ],
      visual: "assess",
    },
    {
      title: "Industry Partnerships & Career Support",
      points: [
        "Access internships, career guidance, and industry connections.",
        "Prepare for opportunities across Africa and the global job market.",
      ],
      visual: "pilot",
    },
    {
      title: "Computer Labs & Digital Resources",
      points: [
        "Learn with computer labs, high-speed internet, and digital tools.",
        "Access resources that support learning, research, and innovation.",
      ],
      visual: "solution",
    },
    {
      title: "World-Class Lecturers & Researchers",
      points: [
        "Learn from faculty with teaching, research, and industry experience.",
        "Connect academic knowledge with practical, real-world insights.",
      ],
      visual: "pilot",
    },
    {
      title: "Live Q&A Support",
      points: [
        "Get answers to questions through AI-powered support around the clock.",
        "Receive additional academic guidance from faculty and mentors.",
      ],
      visual: "solution",
    },
    {
      title: "Blended Learning & Flexible Study Modes",
      points: [
        "Combine structured in-person lectures with online learning.",
        "Revisit recorded sessions and study with greater flexibility.",
      ],
      visual: "assess",
    },
  ];

  return (
    <section className="offers-section">
      <div className="offers-container">
        {/* Editorial heading */}
        <header className="offers-header">
          

          <h2 className="offers-heading">
            What we offer goes beyond the classroom.
          </h2>

          <p className="offers-intro">
            The tools, knowledge, and opportunities to help you build your
            future in technology.
          </p>
        </header>

        {/* Offerings */}
        <div className="offers-grid">
          {offers.map((offer, index) => (
            <article
              className="offer-item"
              key={offer.title}
              style={{ animationDelay: `${index * 90}ms` }}
            >
              {/* Decorative geometric illustration */}
              <div
                className={`offer-visual offer-visual--${offer.visual}`}
                aria-hidden="true"
              >
                <span className="offer-orbit offer-orbit--one" />
                <span className="offer-orbit offer-orbit--two" />
                <span className="offer-orbit offer-orbit--three" />
                <span className="offer-orbit offer-orbit--four" />
                <span className="offer-orbit offer-orbit--five" />
              </div>

              <h3 className="offer-title">{offer.title}</h3>

              <ul className="offer-points">
                {offer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Closing statement */}
        <p className="offers-footer">
          Build your knowledge, explore new possibilities, and prepare to make
          a meaningful contribution to the world of technology.
        </p>
      </div>

      <style>{`
        .offers-section {
          background: #ffffff;
          padding: 86px 24px 76px;
          color: #111111;
          font-family: Poppins, sans-serif;
          overflow: hidden;
        }

        .offers-container {
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
        }

        /* Heading */

        .offers-header {
          max-width: 720px;
          margin-bottom: 66px;
        }

        .offers-eyebrow {
          margin: 0 0 20px;
          color: #027cb9;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.8px;
        }

        .offers-heading {
          max-width: 680px;
          margin: 0;
          color: #111111;
          font-size: clamp(36px, 4.5vw, 48px);
          line-height: 1.16;
          font-weight: 700;
          letter-spacing: -1.9px;
        }

        .offers-intro {
          max-width: 570px;
          margin: 19px 0 0;
          color: #646464;
          font-size: 14px;
          line-height: 1.9;
        }

        /* Open three-column layout: no cards, borders, or shadows */

        .offers-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          column-gap: 54px;
          row-gap: 64px;
        }

        .offer-item {
          min-width: 0;
          animation: offerFadeIn 650ms ease-out both;
        }

        /* Geometric illustrations */

        .offer-visual {
          position: relative;
          width: 120px;
          height: 126px;
          margin-bottom: 21px;
          isolation: isolate;
        }

        .offer-orbit {
          position: absolute;
          display: block;
          border: 1.4px solid #161616;
          border-radius: 50%;
          background: transparent;
          transition:
            transform 480ms cubic-bezier(0.2, 0.7, 0.2, 1),
            border-color 300ms ease,
            opacity 300ms ease;
        }

        /* Illustration 1: concentric circles */

        .offer-visual--assess .offer-orbit--one {
          width: 95px;
          height: 95px;
          left: 1px;
          top: 17px;
        }

        .offer-visual--assess .offer-orbit--two {
          width: 47px;
          height: 47px;
          left: 25px;
          top: 41px;
          border-color: #027cb9;
        }

        .offer-visual--assess .offer-orbit--three {
          width: 18px;
          height: 18px;
          left: 71px;
          top: 18px;
          border-color: #027cb9;
        }

        .offer-visual--assess .offer-orbit--four,
        .offer-visual--assess .offer-orbit--five {
          display: none;
        }

        /* Illustration 2: overlapping, offset circles */

        .offer-visual--pilot .offer-orbit {
          width: 81px;
          height: 81px;
        }

        .offer-visual--pilot .offer-orbit--one {
          left: 3px;
          top: 40px;
          border-color: #d2d2d2;
        }

        .offer-visual--pilot .offer-orbit--two {
          left: 11px;
          top: 32px;
          border-color: #c4c4c4;
        }

        .offer-visual--pilot .offer-orbit--three {
          left: 19px;
          top: 24px;
          border-color: #aaaaaa;
        }

        .offer-visual--pilot .offer-orbit--four {
          left: 27px;
          top: 16px;
          border-color: #777777;
          opacity: 0.75;
        }

        .offer-visual--pilot .offer-orbit--five {
          left: 35px;
          top: 8px;
          border-color: #027cb9;
        }

        /* Illustration 3: two intersecting circles */

        .offer-visual--solution .offer-orbit--one,
        .offer-visual--solution .offer-orbit--two {
          width: 96px;
          height: 96px;
          left: 2px;
        }

        .offer-visual--solution .offer-orbit--one {
          top: 22px;
          border-color: #151515;
        }

        .offer-visual--solution .offer-orbit--two {
          top: 0;
          border-color: #315b99;
        }

        .offer-visual--solution .offer-orbit--three,
        .offer-visual--solution .offer-orbit--four,
        .offer-visual--solution .offer-orbit--five {
          display: none;
        }

        /* Motion responds to hovering over each offering */

        .offer-item:hover .offer-visual--assess .offer-orbit--one {
          transform: scale(1.04);
        }

        .offer-item:hover .offer-visual--assess .offer-orbit--two {
          transform: scale(1.12);
        }

        .offer-item:hover .offer-visual--assess .offer-orbit--three {
          transform: translate(7px, -4px);
        }

        .offer-item:hover .offer-visual--pilot .offer-orbit--one {
          transform: translate(-7px, 5px);
        }

        .offer-item:hover .offer-visual--pilot .offer-orbit--two {
          transform: translate(-4px, 3px);
        }

        .offer-item:hover .offer-visual--pilot .offer-orbit--three {
          transform: translate(-1px, 1px);
        }

        .offer-item:hover .offer-visual--pilot .offer-orbit--four {
          transform: translate(3px, -2px);
        }

        .offer-item:hover .offer-visual--pilot .offer-orbit--five {
          transform: translate(7px, -5px);
        }

        .offer-item:hover .offer-visual--solution .offer-orbit--one {
          transform: translateY(5px);
        }

        .offer-item:hover .offer-visual--solution .offer-orbit--two {
          transform: translateY(-5px);
        }

        /* Offering text */

        .offer-title {
          max-width: 310px;
          margin: 0 0 20px;
          color: #111111;
          font-size: 21px;
          line-height: 1.4;
          font-weight: 650;
          letter-spacing: -0.55px;
          transition: color 250ms ease;
        }

        .offer-item:hover .offer-title {
          color: #027cb9;
        }

        .offer-points {
          display: grid;
          gap: 10px;
          margin: 0;
          padding: 0 0 0 17px;
          color: #454545;
          font-size: 12px;
          line-height: 1.75;
          list-style: disc;
        }

        .offer-points li {
          padding-left: 2px;
        }

        .offer-points li::marker {
          color: #027cb9;
          font-size: 9px;
        }

        /* Closing text, similar to the reference's understated footer */

        .offers-footer {
          max-width: 690px;
          margin: 64px 0 0;
          color: #555555;
          font-size: 12px;
          line-height: 1.85;
        }

        @keyframes offerFadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Tablet */

        @media (max-width: 900px) {
          .offers-section {
            padding: 68px 24px 60px;
          }

          .offers-header {
            margin-bottom: 52px;
          }

          .offers-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 40px;
            row-gap: 52px;
          }

          .offer-title {
            font-size: 20px;
          }

          .offers-footer {
            margin-top: 52px;
          }
        }

        /* Mobile */

        @media (max-width: 560px) {
          .offers-section {
            padding: 48px 22px 46px;
          }

          .offers-header {
            margin-bottom: 42px;
          }

          .offers-eyebrow {
            margin-bottom: 15px;
            font-size: 10px;
          }

          .offers-heading {
            font-size: clamp(32px, 8vw, 39px);
            line-height: 1.18;
            letter-spacing: -1.3px;
          }

          .offers-intro {
            margin-top: 15px;
            font-size: 13px;
            line-height: 1.8;
          }

          .offers-grid {
            grid-template-columns: 1fr;
            row-gap: 44px;
          }

          .offer-visual {
            margin-bottom: 17px;
            transform-origin: left center;
          }

          .offer-title {
            max-width: 340px;
            margin-bottom: 14px;
            font-size: 21px;
          }

          .offer-points {
            max-width: 410px;
            font-size: 12px;
            line-height: 1.8;
          }

          .offers-footer {
            margin-top: 46px;
            padding-top: 20px;
            border-top: 1px solid #eeeeee;
            font-size: 12px;
          }
        }

        /* Respect the visitor's motion preferences */

        @media (prefers-reduced-motion: reduce) {
          .offer-item {
            animation: none;
          }

          .offer-orbit,
          .offer-title {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}