// src/components/Hero.tsx
"use client";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          background: #0A66C2;
          position: relative;
          padding: 60px 0;
        }

        .hero-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 40px;
          min-height: 500px;
        }

        .hero-text {
          max-width: 540px;
          flex: 1;
        }

        .hero-eyebrow {
          color: #ffffff;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.5px;
          margin-bottom: 14px;
          opacity: 0.9;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 700;
          line-height: 1.2;
          color: #ffffff;
          margin: 0;
        }

        .hero-title-accent {
          color: #3EBC84;
        }

        .hero-subtitle {
          margin-top: 20px;
          color: #ffffff;
          line-height: 1.7;
          opacity: 0.95;
          font-size: 16px;
        }

        .hero-actions {
          margin-top: 30px;
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .hero-btn-primary {
          background: #00FF00;
          color: #0A2A43;
          padding: 12px 28px;
          border-radius: 50px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          font-family: "Poppins", sans-serif;
          white-space: nowrap;
        }

        .hero-btn-secondary {
          background: transparent;
          color: #ffffff;
          padding: 12px 28px;
          border-radius: 50px;
          border: 2px solid #ffffff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          font-family: "Poppins", sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          white-space: nowrap;
        }

        .hero-image-wrap {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
        }

        .hero-image {
          width: 100%;
          max-width: 500px;
          object-fit: contain;
        }

        /* ===== Mobile ===== */
        @media (max-width: 768px) {
          .hero-section {
            padding: 40px 0 50px;
          }

          .hero-inner {
            flex-direction: column-reverse;
            min-height: auto;
            gap: 28px;
            text-align: center;
          }

          .hero-text {
            max-width: 100%;
            width: 100%;
          }

          .hero-eyebrow {
            font-size: 12px;
            margin-bottom: 10px;
          }

          .hero-title {
            font-size: 30px;
            line-height: 1.25;
          }

          .hero-subtitle {
            font-size: 14px;
            margin-top: 16px;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-top: 24px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
          }

          .hero-image-wrap {
            justify-content: center;
            align-items: center;
          }

          .hero-image {
            max-width: 280px;
          }
        }
      `}</style>

      <section className="hero-section">
        <div className="container hero-inner">
          {/* Left Text */}
          <div className="hero-text">
            <p className="hero-eyebrow">GIMPA · School of Technology</p>

            <h1 className="hero-title">
              Shaping Africa’s next generation of{" "}
              <span className="hero-title-accent">tech leaders</span>
            </h1>

            <p className="hero-subtitle">
              The Department of Computer Science &amp; Information Systems
              equips students with cutting-edge skills in technology, research,
              and innovation — preparing them for global impact.
            </p>

            <div className="hero-actions">
              <button className="hero-btn-primary">
                Join our Asknet community
              </button>
              <button className="hero-btn-secondary">
                ▶ How it Works
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hero-image-wrap">
            <img
              src="/images/hero-person.png"
              alt="Hero"
              className="hero-image"
            />
          </div>
        </div>
      </section>
    </>
  );
}