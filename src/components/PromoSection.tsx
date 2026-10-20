// src/components/HeadMessage.tsx
"use client";

export default function HeadMessage() {
  return (
    <section className="head-message-section">
      <div className="head-message-container">
        {/* Department Head */}
        <div className="head-profile">
          <div className="head-photo-wrap">
            <img
              src="/images/head.png"
              alt="Dr. Felicia Engmann"
              className="head-photo"
            />
          </div>

          <h3 className="head-name">Dr. Felicia Engmann</h3>

          <p className="head-role">Head of Department</p>
        </div>

        {/* Message */}
        <div className="head-content">
          <p className="head-eyebrow">HEAD'S MESSAGE</p>

          <h2 className="head-title">
            A Message From Our Department Head
          </h2>

          <p className="head-paragraph">
            Head, Department of Computer Science and Information Systems.
            A warm welcome to the Department of Computer Sciences. This
            department hosts typical computer and other related computational
            sciences programmes within GIMPA. Driven by the needs of Ghana and
            the West African Sub-region, we employ our core values of
            excellence, quality and connectedness to deliver relevant education
            to our students, offer consultancy and training to our
            stakeholders, and conduct cutting-edge research in the computing
            fields.
          </p>

          <p className="head-paragraph">
            We achieve these using state-of-the-art facilities and employing
            faculty with diverse backgrounds in Information Technology and
            Computing. I am proud to welcome you to this portal. I look forward
            to receiving you as a student, researcher, or industry practitioner.
          </p>

          <div className="head-signoff">
            <span className="head-signoff-line" />
            <div>
              <p className="head-signoff-name">Dr. Felicia Engmann</p>
              <p className="head-signoff-role">Head of Department</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .head-message-section {
          width: 100%;
          padding: 70px 24px;
          background: #ffffff;
          font-family: Poppins, sans-serif;
        }

        .head-message-container {
          display: grid;
          grid-template-columns: 220px minmax(0, 1fr);
          align-items: start;
          gap: 60px;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Portrait */

        .head-profile {
          text-align: center;
        }

        .head-photo-wrap {
          width: 150px;
          height: 150px;
          margin: 0 auto 18px;
          overflow: hidden;
          border-radius: 50%;
          background: #f0f5f8;
        }

        .head-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
        }

        .head-name {
          margin: 0;
          color: #172333;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.6;
        }

        .head-role {
          margin: 4px 0 0;
          color: #75808b;
          font-size: 12px;
          line-height: 1.7;
        }

        /* Message */

        .head-content {
          min-width: 0;
        }

        .head-eyebrow {
          margin: 0 0 12px;
          color: #027cb9;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.2px;
        }

        .head-title {
          margin: 0 0 22px;
          color: #111111;
          font-size: clamp(27px, 3vw, 34px);
          font-weight: 700;
          line-height: 1.35;
          letter-spacing: -0.8px;
        }

        .head-paragraph {
          margin: 0 0 16px;
          color: #5b6b7c;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.95;
        }

        /* Simple sign-off */

        .head-signoff {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
        }

        .head-signoff-line {
          width: 3px;
          height: 35px;
          flex-shrink: 0;
          border-radius: 2px;
          background: #027cb9;
        }

        .head-signoff-name {
          margin: 0;
          color: #243746;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.6;
        }

        .head-signoff-role {
          margin: 2px 0 0;
          color: #7a8792;
          font-size: 11px;
          line-height: 1.6;
        }

        /* Tablet */

        @media (max-width: 760px) {
          .head-message-section {
            padding: 55px 22px;
          }

          .head-message-container {
            grid-template-columns: 175px minmax(0, 1fr);
            gap: 32px;
          }

          .head-photo-wrap {
            width: 125px;
            height: 125px;
          }

          .head-title {
            font-size: 27px;
          }
        }

        /* Mobile */

        @media (max-width: 560px) {
          .head-message-section {
            padding: 44px 20px;
          }

          .head-message-container {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .head-profile {
            display: grid;
            grid-template-columns: 90px minmax(0, 1fr);
            grid-template-rows: auto auto;
            align-items: center;
            column-gap: 18px;
            text-align: left;
          }

          .head-photo-wrap {
            grid-column: 1;
            grid-row: 1 / 3;
            width: 90px;
            height: 90px;
            margin: 0;
          }

          .head-name {
            align-self: end;
            font-size: 14px;
          }

          .head-role {
            align-self: start;
            margin-top: 3px;
            font-size: 11px;
          }

          .head-eyebrow {
            margin-bottom: 10px;
            font-size: 10px;
          }

          .head-title {
            margin-bottom: 18px;
            font-size: 29px;
            line-height: 1.3;
          }

          .head-paragraph {
            font-size: 12px;
            line-height: 1.9;
          }

          .head-signoff {
            margin-top: 20px;
          }
        }
      `}</style>
    </section>
  );
}