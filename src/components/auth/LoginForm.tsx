"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

/* ============================================================
   ORBIT ARTWORK (right panel)
   Drawn on one 460 x 420 board and scaled by the SVG viewBox,
   so spacing stays identical at every screen size.
============================================================ */

const CX = 220;
const CY = 210;

const RINGS = [
  { r: 204, opacity: 0.08 },
  { r: 168, opacity: 0.15 },
  { r: 116, opacity: 0.2 },
  { r: 66, opacity: 0.26 },
];

type Person = {
  id: number;
  x: number;
  y: number;
  size: number;
  bg: string;
  skin: string;
  hair: string;
  shirt: string;
};

const PEOPLE: Person[] = [
  { id: 1, x: 116, y: 78, size: 56, bg: "#efe6f7", skin: "#e0b08c", hair: "#6b4a3a", shirt: "#ffffff" },
  { id: 2, x: 306, y: 131, size: 46, bg: "#f6ecd2", skin: "#8b5a3c", hair: "#241a16", shirt: "#2f3133" },
  { id: 3, x: 173, y: 163, size: 42, bg: "#dff0e0", skin: "#a96c46", hair: "#3b2a22", shirt: "#f0ad18" },
  { id: 4, x: 109, y: 250, size: 52, bg: "#e7e9ec", skin: "#a76b4a", hair: "#382d28", shirt: "#294a70" },
  { id: 5, x: 282, y: 233, size: 44, bg: "#dcecf7", skin: "#805337", hair: "#161616", shirt: "#ffffff" },
  { id: 6, x: 210, y: 326, size: 50, bg: "#f2e7dc", skin: "#b87751", hair: "#52382d", shirt: "#354d73" },
  { id: 7, x: 286, y: 305, size: 48, bg: "#f5e3d3", skin: "#c48b69", hair: "#6d4b3a", shirt: "#c4572f" },
];

type OrbitTag = {
  label: string;
  x: number;
  y: number;
  w: number;
  tone: "white" | "green";
};

const TAGS: OrbitTag[] = [
  { label: "Website Design", x: 299, y: 62, w: 137, tone: "white" },
  { label: "Crypto", x: 380, y: 158, w: 75, tone: "green" },
  { label: "E-Commerce", x: 380, y: 262, w: 104, tone: "white" },
  { label: "Automotive", x: 309, y: 353, w: 100, tone: "green" },
  { label: "Ruby", x: 197, y: 376, w: 60, tone: "white" },
  { label: "Golang", x: 108, y: 335, w: 76, tone: "green" },
  { label: "Blockchain", x: 54, y: 187, w: 106, tone: "white" },
];

function Avatar({ p }: { p: Person }) {
  const r = p.size / 2;
  const clipId = `orbit-avatar-${p.id}`;

  return (
    <g transform={`translate(${p.x - r} ${p.y - r})`}>
      <clipPath id={clipId}>
        <circle cx={r} cy={r} r={r} />
      </clipPath>

      <g clipPath={`url(#${clipId})`} transform={`scale(${p.size / 48})`}>
        <rect width="48" height="48" fill={p.bg} />
        {/* shoulders */}
        <path d="M8 48c1-9 7-14 16-14s15 5 16 14Z" fill={p.shirt} />
        {/* neck */}
        <rect x="20" y="25" width="8" height="11" rx="3" fill={p.skin} />
        {/* head */}
        <circle cx="24" cy="18" r="8.5" fill={p.skin} />
        {/* hair */}
        <path d="M15 18c1-9 17-11 18 0-2-3.5-5-5.5-9-5.5s-7 2-9 5.5Z" fill={p.hair} />
      </g>

      <circle
        cx={r}
        cy={r}
        r={r - 0.75}
        fill="none"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1.5"
      />
    </g>
  );
}

function OrbitArt() {
  return (
    <svg
      viewBox="-10 0 460 420"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient
          id="orbit-glow"
          cx={CX}
          cy={CY}
          r="92"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#3fbf80" stopOpacity="0.22" />
          <stop offset="1" stopColor="#3fbf80" stopOpacity="0" />
        </radialGradient>

        <filter
          id="orbit-shadow"
          x="-25%"
          y="-50%"
          width="150%"
          height="220%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="5"
            floodColor="#000000"
            floodOpacity="0.2"
          />
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r="92" fill="url(#orbit-glow)" />

      {RINGS.map((ring) => (
        <circle
          key={ring.r}
          cx={CX}
          cy={CY}
          r={ring.r}
          fill="none"
          stroke="#8fd6b3"
          strokeOpacity={ring.opacity}
          strokeWidth="1"
        />
      ))}

      {PEOPLE.map((p) => (
        <Avatar key={p.id} p={p} />
      ))}

      {TAGS.map((t) => (
        <g
          key={t.label}
          transform={`translate(${t.x} ${t.y})`}
          filter="url(#orbit-shadow)"
        >
          <rect
            x={-t.w / 2}
            y={-16}
            width={t.w}
            height={32}
            rx={8}
            fill={t.tone === "green" ? "#329756" : "#ffffff"}
          />
          <text
            className="orbit-tag-text"
            textAnchor="middle"
            dominantBaseline="central"
            y={0.5}
            fill={t.tone === "green" ? "#ffffff" : "#121212"}
          >
            {t.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

/* ============================================================
   LOGIN FORM
============================================================ */

// Set to false to hide the green panel on phones/tablets (form only, no scrolling).
const SHOW_ART_ON_MOBILE = true;

export default function LoginForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    await supabase.auth.getSession();

    router.push("/dashboard");
    router.refresh();
  };

  const handleInput =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <style>{`
        .signup-page,
        .signup-page * {
          box-sizing: border-box;
        }

        /* Desktop: the document itself never scrolls */
        @media (min-width: 901px) {
          html:has(.signup-page),
          body:has(.signup-page) {
            overflow: hidden;
          }
        }

        /* =========================================
           PAGE: pinned to the screen, split layout
        ========================================= */

        .signup-page {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          z-index: 50;
          background: #ffffff;
          display: grid;
          grid-template-columns: minmax(0, 1fr) clamp(380px, 38vw, 620px);
          grid-template-rows: minmax(0, 1fr);
          font-family: "Inter", "DM Sans", Arial, sans-serif;
          color: #161616;
        }

        /* =========================================
           LEFT SIDE (everything scales with screen height)
        ========================================= */

        .signup-left {
          min-width: 0;
          min-height: 0;
          height: 100%;
          overflow-y: auto; /* only kicks in on extremely short windows */
          scrollbar-width: thin;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .signup-header {
          flex: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: clamp(12px, 2.6vh, 24px) clamp(24px, 3.2vw, 48px) 6px;
        }

        .signup-logo {
          color: #293749;
          font-size: clamp(20px, 3.2vh, 24px);
          font-weight: 700;
          letter-spacing: -1.2px;
          line-height: 1;
          white-space: nowrap;
        }

        .signup-logo span {
          display: inline-block;
          transform: skewX(-14deg);
        }

        .header-login {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #555b62;
          font-size: 13px;
          white-space: nowrap;
        }

        .header-login-link {
          color: #20684a;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        .header-login-link:hover {
          color: #134d35;
        }

        .signup-content {
          flex: none;
          width: min(440px, calc(100% - 48px));
          margin: auto;
          padding: 8px 0 clamp(12px, 3vh, 32px);
        }

        .signup-heading {
          margin: 0;
          text-align: center;
          font-size: clamp(20px, 3.5vh, 30px);
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: -0.8px;
          color: #111111;
        }

        .signup-subheading {
          margin: clamp(2px, 0.7vh, 6px) 0 clamp(8px, 2.2vh, 20px);
          text-align: center;
          color: #868b92;
          font-size: clamp(12px, 1.9vh, 14px);
          line-height: 1.5;
        }

        /* =========================================
           SOCIAL BUTTONS
        ========================================= */

        .social-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .social-button {
          height: clamp(34px, 5.2vh, 42px);
          width: 100%;
          border: 1px solid #e3e5e8;
          background: #ffffff;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 10px;
          color: #181818;
          font-size: clamp(12px, 1.8vh, 13px);
          font-weight: 500;
          font-family: inherit;
          white-space: nowrap;
          cursor: pointer;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .social-button:hover {
          border-color: #cfd3d7;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.04);
        }

        .social-icon {
          width: 16px;
          height: 16px;
          flex: 0 0 16px;
        }

        /* =========================================
           OR DIVIDER
        ========================================= */

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: clamp(8px, 1.9vh, 16px) 0 clamp(8px, 2.1vh, 18px);
          color: #a0a4a8;
          font-size: 11px;
          text-transform: uppercase;
        }

        .divider::before,
        .divider::after {
          content: "";
          flex: 1;
          height: 1px;
          background: #ebedef;
        }

        /* =========================================
           FORM
        ========================================= */

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 1.8vh, 14px);
        }

        .name-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .field {
          min-width: 0;
        }

        .field-label {
          display: block;
          margin-bottom: clamp(2px, 0.6vh, 5px);
          color: #141414;
          font-size: clamp(11.5px, 1.75vh, 13px);
          font-weight: 500;
          line-height: 1.4;
        }

        .field-required {
          color: #2d9660;
          margin-left: 2px;
        }

        .field-input {
          width: 100%;
          height: clamp(34px, 5.2vh, 42px);
          padding: 0 12px;
          border: 1px solid #e1e4e7;
          border-radius: 8px;
          background: #ffffff;
          color: #151515;
          font-size: clamp(13px, 1.9vh, 14px);
          font-family: inherit;
          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .field-input::placeholder {
          color: #a0a5aa;
        }

        .field-input:focus {
          border-color: #6fae8b;
          box-shadow: 0 0 0 3px rgba(45, 150, 96, 0.12);
        }

        .field-input:disabled {
          background: #f7f7f7;
          cursor: not-allowed;
        }

        .terms-text {
          margin: 0;
          color: #6c7278;
          font-size: clamp(10px, 1.5vh, 11.5px);
          line-height: 1.5;
        }

        /* =========================================
           ALERTS
        ========================================= */

        .form-alert {
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12px;
          line-height: 1.45;
        }

        .form-alert.error {
          border: 1px solid #f0cccc;
          background: #fff6f6;
          color: #a33131;
        }

        .form-alert.success {
          border: 1px solid #c5e5d2;
          background: #f0faf4;
          color: #247147;
        }

        /* =========================================
           MAIN BUTTON
        ========================================= */

        .signup-button {
          width: 100%;
          height: clamp(36px, 5.6vh, 44px);
          border: none;
          border-radius: 8px;
          background: #379b59;
          color: #ffffff;
          font-size: clamp(13px, 1.9vh, 14px);
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .signup-button:hover:not(:disabled) {
          background: #2f8e50;
        }

        .signup-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .signup-button:focus-visible,
        .social-button:focus-visible {
          outline: 2px solid #379b59;
          outline-offset: 2px;
        }

        .login-bottom {
          margin: clamp(8px, 1.9vh, 16px) 0 0;
          text-align: center;
          color: #555b62;
          font-size: clamp(11.5px, 1.75vh, 13px);
        }

        .login-bottom a {
          color: #28784f;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }

        /* =========================================
           RIGHT SIDE
        ========================================= */

        .signup-right {
          position: relative;
          height: 100%;
          min-width: 0;
          background: #062d1b;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding:
            clamp(20px, 5vh, 56px)
            clamp(24px, 3vw, 48px)
            clamp(24px, 6.5vh, 72px);
        }

        .network-art {
          position: relative;
          flex: 1 1 0;
          min-height: 0;
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
        }

        .network-art svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }

        .orbit-tag-text {
          font-family: "Inter", "DM Sans", Arial, sans-serif;
          font-size: 14px;
          font-weight: 600;
        }

        .right-copy {
          flex: none;
          max-width: 380px;
          margin: clamp(10px, 2.6vh, 36px) auto 0;
          text-align: center;
        }

        .right-copy h2 {
          margin: 0;
          font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
          font-size: clamp(22px, min(2.7vw, 4.6vh), 40px);
          line-height: 1.1;
          font-weight: 400;
          letter-spacing: -1px;
          text-wrap: balance;
        }

        .right-copy p {
          margin: clamp(8px, 2vh, 20px) 0 0;
          color: rgba(255, 255, 255, 0.82);
          font-size: clamp(12.5px, min(1.15vw, 2.1vh), 16px);
          line-height: 1.55;
        }

        /* =========================================
           TABLET / MOBILE: stacked, page scrolls normally
        ========================================= */

        @media (max-width: 900px) {
          .signup-page {
            position: static;
            height: auto;
            min-height: 100vh;
            min-height: 100dvh;
            overflow: visible;
            z-index: auto;
            grid-template-columns: 1fr;
            grid-template-rows: auto;
          }

          .signup-left {
            height: auto;
            overflow: visible;
          }

          .signup-content {
            padding: 24px 0 48px;
          }

          .signup-right {
            height: auto;
            padding: 44px 20px 56px;
          }

          .signup-right.hide-art-mobile {
            display: none;
          }

          .network-art {
            flex: none;
            max-width: 440px;
            aspect-ratio: 460 / 420;
          }

          .right-copy {
            margin-top: 28px;
          }
        }

        @media (max-width: 600px) {
          .signup-header {
            padding: 18px 18px 8px;
          }

          .signup-logo {
            font-size: 21px;
          }

          .header-login {
            font-size: 12px;
            gap: 5px;
          }

          .signup-content {
            width: calc(100% - 36px);
          }

          .social-row,
          .name-row {
            grid-template-columns: 1fr;
          }

          .social-button {
            height: 44px;
          }

          .field-input {
            height: 46px;
            font-size: 16px; /* stops iOS zooming into inputs */
          }

          .signup-button {
            height: 46px;
          }

          .signup-right {
            padding: 36px 16px 48px;
          }
        }

        @media (max-width: 380px) {
          .header-login span {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .signup-page * {
            transition: none !important;
          }
        }
      `}</style>

      <main className="signup-page">
        {/* =====================================================
            LEFT / FORM SIDE
        ===================================================== */}
        <section className="signup-left">
          <header className="signup-header">
            <div className="signup-logo">
              <span>ASKNET</span>
            </div>

            <div className="header-login">
              <span>New to Asknet?</span>

              <Link href="/signup" className="header-login-link">
                Sign up
              </Link>
            </div>
          </header>

          <div className="signup-content">
            <h1 className="signup-heading">Welcome back</h1>

            <p className="signup-subheading">Log in to continue</p>

            {/* Social buttons */}
            <div className="social-row">
              <button
                type="button"
                className="social-button"
                aria-label="Continue with Microsoft"
              >
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="9" height="9" fill="#f25022" />
                  <rect x="13" y="2" width="9" height="9" fill="#7fba00" />
                  <rect x="2" y="13" width="9" height="9" fill="#00a4ef" />
                  <rect x="13" y="13" width="9" height="9" fill="#ffb900" />
                </svg>

                <span>Continue with Microsoft</span>
              </button>

              <button
                type="button"
                className="social-button"
                aria-label="Continue with Google"
              >
                <svg
                  className="social-icon"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h6.45a5.51 5.51 0 0 1-2.39 3.62v3h3.87c2.27-2.09 3.56-5.17 3.56-8.65Z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.15-4.06 1.15-3.12 0-5.77-2.11-6.72-4.95H1.28v3.09A12 12 0 0 0 12 24Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.29A7.19 7.19 0 0 1 4.9 12c0-.79.14-1.57.38-2.29V6.62H1.28A12 12 0 0 0 0 12c0 1.94.46 3.78 1.28 5.38l4-3.09Z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.76c1.76 0 3.34.61 4.58 1.81l3.43-3.43C17.94 1.07 15.24 0 12 0A12 12 0 0 0 1.28 6.62l4 3.09C6.23 6.87 8.88 4.76 12 4.76Z"
                  />
                </svg>

                <span>Continue with Google</span>
              </button>
            </div>

            <div className="divider">
              <span>OR</span>
            </div>

            <form onSubmit={handleLogin} className="signup-form">
              {/* Errors */}
              {error && (
                <div className="form-alert error" role="alert">
                  {error}
                </div>
              )}

              {/* Email */}
              <div className="field">
                <label htmlFor="email" className="field-label">
                  Email address
                  <span className="field-required">*</span>
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleInput(setEmail)}
                  required
                  disabled={loading}
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="field-input"
                />
              </div>

              {/* Password */}
              <div className="field">
                <label htmlFor="password" className="field-label">
                  Password
                  <span className="field-required">*</span>
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInput(setPassword)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="field-input"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="signup-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <p className="login-bottom">
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </p>
          </div>
        </section>

        {/* =====================================================
            RIGHT / VISUAL SIDE
        ===================================================== */}
        <aside
          className={`signup-right${
            SHOW_ART_ON_MOBILE ? "" : " hide-art-mobile"
          }`}
        >
          <div className="network-art">
            <OrbitArt />
          </div>

          <div className="right-copy">
            <h2>Welcome back to the Asknet community</h2>

            <p>
              Pick up where you left off and keep connecting,
              collaborating, learning, and growing together.
            </p>
          </div>
        </aside>
      </main>
    </>
  );
}