// src/components/auth/LoginForm.tsx
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

const SHOW_IMAGE_ON_MOBILE = true;

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

    try {
      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) {
        setError(loginError.message);
        return;
      }

      await supabase.auth.getSession();

      router.push("/dashboard");
      router.refresh();
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInput =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <>
      <style>{`
        /* =========================================
           BASE
        ========================================= */

        .login-page,
        .login-page * {
          box-sizing: border-box;
        }

        @media (min-width: 901px) {
          html:has(.login-page),
          body:has(.login-page) {
            overflow: hidden;
          }
        }

        /* =========================================
           PAGE LAYOUT
        ========================================= */

        .login-page {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100vh;
          height: 100dvh;
          overflow: hidden;
          z-index: 50;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            clamp(380px, 38vw, 620px);
          grid-template-rows: minmax(0, 1fr);

          background: #ffffff;
          color: #161616;
          font-family: "Inter", "DM Sans", Arial, sans-serif;
        }

        /* =========================================
           LEFT SIDE / LOGIN FORM
        ========================================= */

        .login-left {
          display: flex;
          flex-direction: column;

          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;

          overflow-y: auto;
          scrollbar-width: thin;

          background: #ffffff;
        }

        /* Header */

        .login-header {
          flex: none;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;

          padding:
            clamp(12px, 2.6vh, 24px)
            clamp(24px, 3.2vw, 48px)
            6px;
        }

        .login-logo {
          color: #293749;
          font-size: clamp(20px, 3.2vh, 24px);
          font-weight: 700;
          letter-spacing: -1.2px;
          line-height: 1;
          white-space: nowrap;
        }

        .login-logo span {
          display: inline-block;
          transform: skewX(-14deg);
        }

        .login-header-link {
          display: flex;
          align-items: center;
          gap: 8px;

          color: #555b62;
          font-size: 13px;
          white-space: nowrap;
        }

        .login-header-link a {
          color: #20684a;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .login-header-link a:hover {
          color: #134d35;
        }

        /* Form content */

        .login-content {
          flex: none;
          width: min(440px, calc(100% - 48px));
          margin: auto;
          padding: 8px 0 clamp(12px, 3vh, 32px);
        }

        .login-heading {
          margin: 0;
          color: #111111;

          text-align: center;
          font-size: clamp(24px, 3.5vh, 32px);
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.8px;
        }

        .login-subheading {
          margin:
            clamp(4px, 0.8vh, 8px)
            0
            clamp(22px, 3vh, 32px);

          color: #868b92;
          text-align: center;
          font-size: clamp(13px, 1.9vh, 14px);
          line-height: 1.6;
        }

        /* =========================================
           FORM FIELDS
        ========================================= */

        .login-form {
          display: flex;
          flex-direction: column;
          gap: clamp(16px, 2.2vh, 22px);
        }

        .login-field {
          min-width: 0;
        }

        .login-field-label {
          display: block;
          margin-bottom: 6px;

          color: #141414;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }

        .login-field-required {
          margin-left: 2px;
          color: #2d9660;
        }

        .login-field-input {
          display: block;
          width: 100%;
          height: 44px;
          padding: 0 13px;

          border: 1px solid #e1e4e7;
          border-radius: 8px;

          background: #ffffff;
          color: #151515;

          font-family: inherit;
          font-size: 14px;

          outline: none;

          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease;
        }

        .login-field-input::placeholder {
          color: #a0a5aa;
        }

        .login-field-input:focus {
          border-color: #6fae8b;
          box-shadow: 0 0 0 3px rgba(45, 150, 96, 0.12);
        }

        .login-field-input:disabled {
          background: #f7f7f7;
          cursor: not-allowed;
        }

        /* =========================================
           ERROR MESSAGE
        ========================================= */

        .login-alert {
          padding: 11px 13px;
          border: 1px solid #f0cccc;
          border-radius: 8px;

          background: #fff6f6;
          color: #a33131;

          font-size: 13px;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        /* =========================================
           FORGOT PASSWORD
        ========================================= */

        .login-forgot {
          display: flex;
          justify-content: flex-end;
          margin-top: -8px;
        }

        .login-forgot a {
          color: #28784f;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
        }

        .login-forgot a:hover {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        /* =========================================
           LOGIN BUTTON
        ========================================= */

        .login-button {
          width: 100%;
          min-height: 46px;
          padding: 12px 18px;

          border: none;
          border-radius: ;

          background: #017CB8;
          color: #ffffff;

          font-family: inherit;
          font-size: 14px;
          font-weight: 600;

          cursor: pointer;

          transition:
            background 0.15s ease,
            opacity 0.15s ease;
        }

        .login-button:hover:not(:disabled) {
          background: #2f8e50;
        }

        .login-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .login-button:focus-visible {
          outline: 2px solid #379b59;
          outline-offset: 3px;
        }

        /* Bottom sign-up link */

        .login-bottom {
          margin: 22px 0 0;
          color: #555b62;
          text-align: center;
          font-size: 13px;
          line-height: 1.6;
        }

        .login-bottom a {
          color: #28784f;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* =========================================
           RIGHT SIDE / CAMPUS IMAGE
        ========================================= */

        .login-right {
          position: relative;
          isolation: isolate;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          width: 100%;
          height: 100%;
          min-width: 0;
          min-height: 0;

          overflow: hidden;
          padding:
            clamp(24px, 5vh, 56px)
            clamp(24px, 3vw, 48px)
            clamp(32px, 6.5vh, 72px);

          background-color: #09284a;

          background-image:
            linear-gradient(
              180deg,
              rgba(5, 24, 43, 0.04) 0%,
              rgba(5, 24, 43, 0.12) 35%,
              rgba(5, 24, 43, 0.88) 100%
            ),
            linear-gradient(
              90deg,
              rgba(5, 24, 43, 0.12) 0%,
              rgba(5, 24, 43, 0.08) 100%
            ),
            url("/images/campus-aerial.png");

          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;

          color: #ffffff;
        }

        .login-right.hide-image-mobile {
          display: flex;
        }

        /* Text over the photograph */

        .login-right-copy {
          position: relative;
          z-index: 1;

          width: 100%;
          max-width: 400px;
          margin: 0 auto;

          text-align: center;
          text-wrap: balance;
        }

        .login-right-copy h2 {
          margin: 0;

          color: #ffffff;
          font-family:
            "Source Serif 4",
            Georgia,
            "Times New Roman",
            serif;

          font-size: clamp(26px, min(2.7vw, 4.6vh), 42px);
          font-weight: 400;
          line-height: 1.14;
          letter-spacing: -0.8px;
        }

        .login-right-copy p {
          margin: 14px 0 0;

          color: rgba(255, 255, 255, 0.88);
          font-size: clamp(13px, min(1.15vw, 2.1vh), 16px);
          line-height: 1.7;
        }

        /* =========================================
           TABLETS
        ========================================= */

        @media (max-width: 1024px) {
          .login-page {
            grid-template-columns:
              minmax(0, 1fr)
              minmax(350px, 42vw);
          }

          .login-header {
            padding-right: 28px;
            padding-left: 28px;
          }

          .login-content {
            width: min(440px, calc(100% - 56px));
          }

          .login-right {
            background-position: center center;
          }

          .login-right-copy h2 {
            font-size: clamp(26px, 3vw, 36px);
          }
        }

        /* =========================================
           MOBILE AND TABLET STACKED LAYOUT
        ========================================= */

        @media (max-width: 900px) {
          .login-page {
            position: static;

            display: flex;
            flex-direction: column;

            width: 100%;
            height: auto;
            min-height: 100vh;
            min-height: 100dvh;

            overflow: visible;
            z-index: auto;
          }

          .login-left {
            flex: none;
            width: 100%;
            height: auto;
            min-height: 0;
            overflow: visible;
          }

          .login-content {
            width: min(440px, calc(100% - 48px));
            margin: auto;
            padding: 42px 0 48px;
          }

          .login-right {
            flex: none;
            width: 100%;
            height: auto;
            min-height: 440px;

            padding: 40px 28px 44px;

            background-position: center 55%;
          }

          .login-right.hide-image-mobile {
            display: none;
          }

          .login-right-copy {
            max-width: 440px;
          }

          .login-right-copy h2 {
            font-size: clamp(28px, 4vw, 38px);
          }

          .login-right-copy p {
            font-size: 15px;
          }
        }

        /* =========================================
           SMALL PHONES
        ========================================= */

        @media (max-width: 600px) {
          .login-header {
            gap: 12px;
            padding: 20px 18px 8px;
          }

          .login-logo {
            font-size: 21px;
          }

          .login-header-link {
            gap: 5px;
            font-size: 12px;
          }

          .login-content {
            width: calc(100% - 40px);
            padding: 46px 0 42px;
          }

          .login-heading {
            font-size: 28px;
            letter-spacing: -0.7px;
          }

          .login-subheading {
            margin-top: 8px;
            margin-bottom: 28px;
            font-size: 14px;
          }

          .login-form {
            gap: 19px;
          }

          .login-field-label {
            margin-bottom: 7px;
            font-size: 13px;
          }

          .login-field-input {
            height: 48px;
            padding: 0 13px;
            font-size: 16px;
          }

          .login-button {
            min-height: 48px;
            font-size: 14px;
          }

          .login-forgot {
            margin-top: -7px;
          }

          .login-bottom {
            margin-top: 22px;
            font-size: 12px;
          }

          .login-right {
            min-height: 390px;
            padding: 36px 22px 38px;

            background-position: 56% center;

            background-image:
              linear-gradient(
                180deg,
                rgba(5, 24, 43, 0.12) 0%,
                rgba(5, 24, 43, 0.3) 35%,
                rgba(5, 24, 43, 0.9) 100%
              ),
              url("/images/campus-aerial.png");
          }

          .login-right-copy h2 {
            font-size: 30px;
            line-height: 1.18;
          }

          .login-right-copy p {
            margin-top: 12px;
            font-size: 14px;
            line-height: 1.7;
          }
        }

        /* =========================================
           EXTRA-SMALL PHONES
        ========================================= */

        @media (max-width: 380px) {
          .login-header {
            padding-right: 14px;
            padding-left: 14px;
          }

          .login-header-link {
            font-size: 11px;
          }

          .login-content {
            width: calc(100% - 32px);
            padding-top: 38px;
          }

          .login-heading {
            font-size: 26px;
          }

          .login-right {
            min-height: 350px;
            padding: 30px 18px 32px;
          }

          .login-right-copy h2 {
            font-size: 27px;
          }

          .login-right-copy p {
            font-size: 13px;
          }
        }

        /* =========================================
           SHORT SCREENS
        ========================================= */

        @media (min-width: 901px) and (max-height: 650px) {
          .login-content {
            padding-top: 8px;
            padding-bottom: 12px;
          }

          .login-subheading {
            margin-bottom: 18px;
          }

          .login-form {
            gap: 12px;
          }

          .login-bottom {
            margin-top: 12px;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .login-page * {
            transition: none !important;
          }
        }
      `}</style>

      <main className="login-page">
        {/* LEFT SIDE / LOGIN FORM */}

        <section className="login-left">
          <header className="login-header">
            <div className="login-logo"></div>

            <div className="login-header-link">
              <span>New to Asknet?</span>

              <Link href="/signup">
                Sign up
              </Link>
            </div>
          </header>

          <div className="login-content">
            <h1 className="login-heading">
              Welcome back
            </h1>

            <p className="login-subheading">
              Log in to continue
            </p>

            <form
              onSubmit={handleLogin}
              className="login-form"
            >
              {/* Error message */}

              {error && (
                <div
                  className="login-alert"
                  role="alert"
                >
                  {error}
                </div>
              )}

              {/* Email address */}

              <div className="login-field">
                <label
                  htmlFor="login-email"
                  className="login-field-label"
                >
                  Email address
                  <span className="login-field-required">
                    *
                  </span>
                </label>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleInput(setEmail)}
                  required
                  disabled={loading}
                  autoComplete="email"
                  placeholder="Enter email address"
                  className="login-field-input"
                />
              </div>

              {/* Password */}

              <div className="login-field">
                <label
                  htmlFor="login-password"
                  className="login-field-label"
                >
                  Password
                  <span className="login-field-required">
                    *
                  </span>
                </label>

                <input
                  id="login-password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInput(setPassword)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="login-field-input"
                />
              </div>

              {/* Forgot password */}

              <div className="login-forgot">
                <Link href="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log in"}
              </button>
            </form>

            <p className="login-bottom">
              Don&apos;t have an account?{" "}
              <Link href="/signup">
                Sign up
              </Link>
            </p>
          </div>
        </section>

        {/* RIGHT SIDE / CAMPUS IMAGE */}

        <aside
          className={`login-right${
            SHOW_IMAGE_ON_MOBILE
              ? ""
              : " hide-image-mobile"
          }`}
          aria-label="Asknet community"
        >
          <div className="login-right-copy">
            <h2>
              Welcome back to the Asknet community
            </h2>

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