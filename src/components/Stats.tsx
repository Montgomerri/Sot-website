"use client";

import { useState } from "react";

export default function Stats() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [pinnedStat, setPinnedStat] = useState<number | null>(null);

  const stats: {
    number: string;
    label: string;
    sublabel?: string;
  }[] = [
    {
      number: "15+",
      label: "Experienced Faculty",
    },
    {
      number: "3,000+",
      label: "Students Enrolled",
    },
    {
      number: "1,200+",
      label: "Ratings & Reviews",
    },
  ];

  const activeStat = hoveredStat ?? pinnedStat;

  return (
    <section
      className="stats-section"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setHoveredStat(null);
          setPinnedStat(null);
        }
      }}
    >
      <div className="stats-container">
        {/* Department introduction */}
        <p className="stats-description">
          The Department of Technology at Ghana Institute of Management and
          Public Administration <strong>(GIMPA)</strong> empowers students
          with cutting-edge digital skills, practical experience, and
          innovative thinking. We prepare graduates to thrive in a rapidly
          evolving technological world and contribute meaningfully to national
          and global development.
        </p>

        {/* Statistics */}
        <div className="stats-grid">
          {stats.map((stat) => (
            <div className="stats-item" key={stat.label}>
              <h2 className="stats-number">{stat.number}</h2>
              <p className="stats-label">{stat.label}</p>
              <p className="stats-sublabel">{stat.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Interactive funnel */}
        <div className="stats-funnel">
          <svg
            className="stats-funnel-svg"
            viewBox="0 0 1000 260"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="funnelOuter"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#027cb9" stopOpacity="0.04" />
                <stop offset="55%" stopColor="#027cb9" stopOpacity="0.13" />
                <stop offset="100%" stopColor="#027cb9" stopOpacity="0.25" />
              </linearGradient>

              <linearGradient
                id="funnelMiddle"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#027cb9" stopOpacity="0.13" />
                <stop offset="55%" stopColor="#027cb9" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#027cb9" stopOpacity="0.58" />
              </linearGradient>

              <linearGradient
                id="funnelInner"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#027cb9" stopOpacity="0.24" />
                <stop offset="55%" stopColor="#027cb9" stopOpacity="0.63" />
                <stop offset="100%" stopColor="#027cb9" stopOpacity="0.86" />
              </linearGradient>

              <linearGradient
                id="funnelCore"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#8bd7f2" />
                <stop offset="52%" stopColor="#35aad8" />
                <stop offset="100%" stopColor="#027cb9" />
              </linearGradient>
            </defs>

            {/* Outer flowing band */}
            <path
              d="
                M0 104
                C100 104 130 104 190 84
                C255 62 295 43 370 43
                L510 43
                C610 43 655 22 720 12
                C785 2 835 2 890 2
                L1000 2
                L1000 258
                L890 258
                C835 258 785 258 720 248
                C655 238 610 217 510 217
                L370 217
                C295 217 255 198 190 176
                C130 156 100 156 0 156 Z
              "
              fill="url(#funnelOuter)"
            />

            {/* Second band */}
            <path
              d="
                M0 111
                C100 111 130 111 195 97
                C260 82 300 68 370 68
                L510 68
                C610 68 655 47 720 35
                C785 23 835 24 890 24
                L1000 24
                L1000 236
                L890 236
                C835 236 785 237 720 225
                C655 213 610 192 510 192
                L370 192
                C300 192 260 178 195 163
                C130 149 100 149 0 149 Z
              "
              fill="url(#funnelMiddle)"
            />

            {/* Third band */}
            <path
              d="
                M0 117
                C100 117 130 117 200 108
                C265 99 300 91 375 91
                L510 91
                C610 91 655 72 720 61
                C785 50 835 51 890 51
                L1000 51
                L1000 209
                L890 209
                C835 209 785 210 720 199
                C655 188 610 169 510 169
                L375 169
                C300 169 265 161 200 152
                C130 143 100 143 0 143 Z
              "
              fill="url(#funnelInner)"
            />

            {/* Central ribbon */}
            <path
              d="
                M0 123
                C100 123 135 123 200 119
                C265 115 305 112 375 112
                L510 112
                C610 112 655 101 720 94
                C785 87 835 89 890 89
                L1000 89
                L1000 171
                L890 171
                C835 171 785 173 720 166
                C655 159 610 148 510 148
                L375 148
                C305 148 265 145 200 141
                C135 137 100 137 0 137 Z
              "
              fill="url(#funnelCore)"
            />

            {/* Animated highlight travelling through the funnel */}
            <path
              className="stats-flow-highlight"
              d="
                M0 130
                C140 130 240 130 370 130
                S600 130 720 130
                S900 130 1000 130
              "
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeOpacity="0.8"
              strokeLinecap="round"
              strokeDasharray="65 1050"
            />

            {/* Vertical guide lines */}
            <g stroke="#ffffff" strokeWidth="2" strokeOpacity="0.9">
              <line x1="200" y1="85" x2="200" y2="175" />
              <line x1="510" y1="68" x2="510" y2="192" />
              <line x1="820" y1="30" x2="820" y2="230" />
            </g>
          </svg>

          {/* Interactive points */}
          {stats.map((stat, index) => {
            const isActive = activeStat === index;

            return (
              <div
                key={stat.label}
                className={[
                  "stats-hotspot",
                  `stats-hotspot-${index + 1}`,
                  isActive ? "is-active" : "",
                ].join(" ")}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <button
                  type="button"
                  className="stats-hotspot-button"
                  aria-label={`${stat.number} ${stat.label}. Show details`}
                  aria-expanded={isActive}
                  aria-describedby={
                    isActive ? `stats-tooltip-${index}` : undefined
                  }
                  onFocus={() => setHoveredStat(index)}
                  onBlur={() => setHoveredStat(null)}
                  onClick={() => {
                    setPinnedStat((previous) =>
                      previous === index ? null : index
                    );
                  }}
                />

                <div
                  id={`stats-tooltip-${index}`}
                  className="stats-tooltip"
                  role="tooltip"
                  aria-hidden={!isActive}
                >
                  <span className="stats-tooltip-number">
                    {stat.number}
                  </span>

                  <span className="stats-tooltip-label">
                    {stat.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .stats-section {
          position: relative;
          background: #ffffff;
          padding: 64px 24px 60px;
          overflow: hidden;
        }

        .stats-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        .stats-description {
          max-width: 790px;
          margin: 0 auto 46px;
          color: #606b75;
          font-family: Poppins, sans-serif;
          font-size: 15px;
          line-height: 1.9;
          text-align: center;
        }

        .stats-description strong {
          color: #243746;
          font-weight: 700;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
        }

        .stats-item {
          min-width: 0;
          text-align: center;
          animation: statsRise 650ms ease-out both;
        }

        .stats-item:nth-child(2) {
          animation-delay: 100ms;
        }

        .stats-item:nth-child(3) {
          animation-delay: 200ms;
        }

        .stats-number {
          margin: 0 0 8px;
          color: #000000;
          font-family: Poppins, sans-serif;
          font-size: clamp(34px, 4vw, 48px);
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .stats-label {
          margin: 0 0 5px;
          color: #253746;
          font-family: Poppins, sans-serif;
          font-size: 14px;
          line-height: 1.6;
          font-weight: 700;
        }

        .stats-sublabel {
          margin: 0;
          color: #89939c;
          font-family: Poppins, sans-serif;
          font-size: 12px;
          line-height: 1.7;
        }

        /* The funnel sits directly on the section background. */

        .stats-funnel {
          position: relative;
          width: 100%;
          height: 225px;
          margin-top: 22px;
        }

        .stats-funnel-svg {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .stats-flow-highlight {
          animation: statsFlow 7s linear infinite;
        }

        /* Invisible interaction area, aligned with each white guide. */

        .stats-hotspot {
          position: absolute;
          top: 50%;
          width: 48px;
          height: 48px;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .stats-hotspot-1 {
          left: 20%;
        }

        .stats-hotspot-2 {
          left: 51%;
        }

        .stats-hotspot-3 {
          left: 82%;
        }

        .stats-hotspot-button {
          position: absolute;
          inset: 0;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          padding: 0;
          border: none;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* White marker */

        .stats-hotspot-button::before {
          content: "";
          position: absolute;
          width: 13px;
          height: 13px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          background: #ffffff;
          box-shadow:
            0 0 0 2px rgba(2, 124, 185, 0.35),
            0 2px 8px rgba(0, 66, 105, 0.15);
          transition:
            transform 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .stats-hotspot-button::after {
          content: "";
          position: absolute;
          width: 24px;
          height: 24px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.6);
          pointer-events: none;
        }

        .stats-hotspot.is-active .stats-hotspot-button::before,
        .stats-hotspot-button:focus-visible::before {
          transform: scale(1.25);
          background: #027cb9;
          box-shadow:
            0 0 0 4px rgba(2, 124, 185, 0.2),
            0 0 22px rgba(2, 124, 185, 0.6);
        }

        .stats-hotspot.is-active .stats-hotspot-button::after {
          animation: statsMarkerPulse 1.5s ease-out infinite;
        }

        .stats-hotspot-button:focus-visible {
          outline: 2px solid #027cb9;
          outline-offset: 3px;
        }

        /* Information displayed when a point is active. */

        .stats-tooltip {
          position: absolute;
          z-index: 5;
          left: 50%;
          bottom: calc(100% + 8px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 225px;
          padding: 17px 19px;
          border: 1px solid rgba(2, 124, 185, 0.12);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.98);
          box-shadow:
            0 8px 25px rgba(24, 49, 66, 0.12),
            0 2px 5px rgba(24, 49, 66, 0.04);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transform: translate(-50%, 8px);
          transition:
            opacity 180ms ease,
            visibility 180ms ease,
            transform 180ms ease;
        }

        .stats-hotspot.is-active .stats-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translate(-50%, 0);
        }

        .stats-tooltip-overline {
          margin-bottom: 7px;
          color: #7c8d99;
          font-family: Poppins, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .stats-tooltip-number {
          color: #027cb9;
          font-family: Poppins, sans-serif;
          font-size: 29px;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.8px;
        }

        .stats-tooltip-label {
          margin-top: 5px;
          color: #203746;
          font-family: Poppins, sans-serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.5;
        }

        .stats-tooltip-description {
          margin-top: 4px;
          color: #7d8992;
          font-family: Poppins, sans-serif;
          font-size: 11px;
          line-height: 1.6;
        }

        @keyframes statsFlow {
          from {
            stroke-dashoffset: 1115;
          }

          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes statsMarkerPulse {
          0% {
            opacity: 0.9;
            transform: scale(0.7);
          }

          100% {
            opacity: 0;
            transform: scale(1.8);
          }
        }

        @keyframes statsRise {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (min-width: 1400px) {
          .stats-funnel {
            height: 245px;
          }
        }

        @media (max-width: 768px) {
          .stats-section {
            padding: 48px 20px 45px;
          }

          .stats-description {
            margin-bottom: 38px;
            font-size: 14px;
          }

          .stats-grid {
            gap: 18px;
          }

          .stats-number {
            font-size: clamp(28px, 5vw, 38px);
          }

          .stats-label {
            font-size: 12px;
          }

          .stats-sublabel {
            font-size: 10px;
          }

          .stats-funnel {
            height: 175px;
            margin-top: 24px;
          }

          .stats-tooltip {
            width: 200px;
            padding: 14px 15px;
          }

          .stats-tooltip-number {
            font-size: 26px;
          }
        }

        @media (max-width: 520px) {
          .stats-section {
            padding: 40px 18px 35px;
          }

          .stats-description {
            margin-bottom: 32px;
            font-size: 13px;
            line-height: 1.85;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 23px;
          }

          .stats-number {
            margin-bottom: 5px;
            font-size: 34px;
          }

          .stats-label {
            font-size: 13px;
          }

          .stats-sublabel {
            font-size: 11px;
          }

          .stats-funnel {
            width: calc(100% + 36px);
            height: 135px;
            margin-top: 22px;
            margin-left: -18px;
          }

          .stats-hotspot {
            width: 44px;
            height: 44px;
          }

          .stats-tooltip {
            width: 190px;
            bottom: calc(100% + 5px);
          }

          /* Keep the first tooltip inside the left edge. */

          .stats-hotspot-1 .stats-tooltip {
            left: 0;
            transform: translate(0, 8px);
          }

          .stats-hotspot-1.is-active .stats-tooltip {
            transform: translate(0, 0);
          }

          /* Keep the third tooltip inside the right edge. */

          .stats-hotspot-3 .stats-tooltip {
            right: 0;
            left: auto;
            transform: translate(0, 8px);
          }

          .stats-hotspot-3.is-active .stats-tooltip {
            transform: translate(0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stats-flow-highlight,
          .stats-item,
          .stats-hotspot.is-active .stats-hotspot-button::after {
            animation: none !important;
          }

          .stats-tooltip,
          .stats-hotspot-button::before {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}