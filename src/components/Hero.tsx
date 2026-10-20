
// src/components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          box-sizing: border-box;
          width: 100%;
          min-height: 640px;
          padding: 80px 0;
          display: flex;
          align-items: center;
          background-color: #09284a;
          background-image:
            linear-gradient(
              90deg,
              rgba(5, 24, 43, 0.78) 0%,
              rgba(5, 27, 47, 0.66) 38%,
              rgba(5, 27, 47, 0.36) 67%,
              rgba(5, 27, 47, 0.16) 100%
            ),
            linear-gradient(
              0deg,
              rgba(5, 24, 43, 0.22) 0%,
              transparent 60%
            ),
            url("/images/campus-aerial.png");
          background-size: cover;
          background-position: center 55%;
          background-repeat: no-repeat;
        }

        .hero-section *,
        .hero-section *::before,
        .hero-section *::after {
          box-sizing: border-box;
        }

        /* Main Container */
        .hero-inner {
          width: min(1200px, calc(100% - 64px));
          margin-inline: auto;
          display: flex;
          align-items: center;
          min-height: 460px;
        }

        .hero-text {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 740px;
          min-width: 0;
        }

        /* Heading */
        .hero-title {
          max-width: 740px;
          margin: 0;
          color: #ffffff;
          font-size: clamp(42px, 5.1vw, 68px);
          font-weight: 750;
          line-height: 1.1;
          letter-spacing: -2px;
          overflow-wrap: break-word;
          text-wrap: balance;
        }

        .hero-title-accent {
          color: #027CB9;
        }

        /* Description */
        .hero-subtitle {
          max-width: 620px;
          margin: 24px 0 0;
          color: rgba(255, 255, 255, 0.94);
          font-size: 17px;
          font-weight: 400;
          line-height: 1.85;
          overflow-wrap: break-word;
        }

        /* Buttons */
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 15px;
          margin-top: 34px;
        }

        .hero-btn-primary,
        .hero-btn-secondary {
          min-height: 52px;
          padding: 14px 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border-radius: 999px;
          font-family: inherit;
          font-size: 14px;
          font-weight: 650;
          line-height: 1.5;
          text-decoration: none;
          text-align: center;
          white-space: nowrap;
          cursor: pointer;
          transition:
            background-color 0.2s ease,
            border-color 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .hero-btn-primary {
          border: 1px solid #027CB9;
          background: #027CB9;
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.16);
        }

        .hero-btn-primary:hover {
          background: #0396D9;
          border-color: #0396D9;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
        }

        .hero-btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.75);
          background: rgba(255, 255, 255, 0.10);
          color: #ffffff;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .hero-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.20);
          border-color: #ffffff;
          transform: translateY(-2px);
        }

        .hero-play-icon {
          display: inline-flex;
          flex: 0 0 23px;
          align-items: center;
          justify-content: center;
          width: 23px;
          height: 23px;
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 50%;
          font-size: 10px;
          line-height: 1;
        }

        .hero-btn-primary:focus-visible,
        .hero-btn-secondary:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: 4px;
        }

        /* Tablets and Small Laptops */
        @media (max-width: 1024px) {
          .hero-section {
            min-height: 590px;
            padding: 70px 0;
            background-position: center center;
          }

          .hero-inner {
            min-height: 430px;
            width: calc(100% - 48px);
          }

          .hero-text {
            max-width: 680px;
          }

          .hero-title {
            font-size: clamp(42px, 6vw, 60px);
            letter-spacing: -1.5px;
          }

          .hero-subtitle {
            max-width: 570px;
            font-size: 16px;
          }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hero-section {
            min-height: auto;
            padding: 72px 0 76px;
            background-position: 56% center;
            background-image:
              linear-gradient(
                90deg,
                rgba(5, 24, 43, 0.70) 0%,
                rgba(5, 24, 43, 0.62) 100%
              ),
              linear-gradient(
                0deg,
                rgba(5, 24, 43, 0.18) 0%,
                transparent 100%
              ),
              url("/images/campus-aerial.png");
          }

          .hero-inner {
            width: calc(100% - 40px);
            min-height: auto;
          }

          .hero-text {
            width: 100%;
            max-width: 580px;
            margin-inline: auto;
          }

          .hero-title {
            max-width: 100%;
            font-size: clamp(36px, 7.5vw, 52px);
            line-height: 1.14;
            letter-spacing: -1.2px;
            text-wrap: balance;
          }

          .hero-subtitle {
            max-width: 100%;
            margin-top: 20px;
            font-size: 15px;
            line-height: 1.8;
          }

          .hero-actions {
            width: 100%;
            align-items: stretch;
            flex-direction: column;
            gap: 12px;
            margin-top: 28px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            min-height: 52px;
            padding: 14px 18px;
            white-space: normal;
            font-size: 14px;
          }

          .hero-btn-primary {
            gap: 8px;
          }

          .hero-btn-primary:hover,
          .hero-btn-secondary:hover {
            transform: none;
          }
        }

        /* Small Phones */
        @media (max-width: 480px) {
          .hero-section {
            padding: 60px 0 66px;
            background-position: 56% center;
          }

          .hero-inner {
            width: calc(100% - 36px);
          }

          .hero-title {
            font-size: clamp(34px, 9vw, 42px);
            line-height: 1.16;
            letter-spacing: -0.9px;
          }

          .hero-subtitle {
            margin-top: 18px;
            font-size: 14px;
            line-height: 1.8;
          }

          .hero-actions {
            margin-top: 24px;
            gap: 11px;
          }

          .hero-btn-primary,
          .hero-btn-secondary {
            min-height: 50px;
            padding: 13px 14px;
            font-size: 13px;
          }
        }

        /* Extra-Small Phones */
        @media (max-width: 360px) {
          .hero-section {
            padding: 52px 0 58px;
          }

          .hero-inner {
            width: calc(100% - 28px);
          }

          .hero-title {
            font-size: 32px;
            letter-spacing: -0.7px;
          }

          .hero-subtitle {
            font-size: 14px;
          }
        }

        /* Reduced Motion Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .hero-btn-primary,
          .hero-btn-secondary {
            transition: none;
          }

          .hero-btn-primary:hover,
          .hero-btn-secondary:hover {
            transform: none;
          }
        }
      `}</style>

      <section
        className="hero-section"
        aria-labelledby="hero-title"
      >
        <div className="hero-inner">
          <div className="hero-text">
            <h1
              className="hero-title"
              id="hero-title"
            >
              Shaping Africa’s next generation of{" "}
              <span className="hero-title-accent">
                technology leaders.
              </span>
            </h1>

            <p className="hero-subtitle">
              At the Department of Computer Science &amp; Information
              Systems, we bring technology, research, and innovation
              together to prepare students to solve real-world
              challenges and shape Africa’s digital future.
            </p>

            <div className="hero-actions">
              <Link
                href="/signup"
                className="hero-btn-primary"
              >
                Join the Asknet Community
                <span aria-hidden="true">→</span>
              </Link>

              <button
                className="hero-btn-secondary"
                type="button"
              >
                <span
                  className="hero-play-icon"
                  aria-hidden="true"
                >
                  
                </span>
                How It Works
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
