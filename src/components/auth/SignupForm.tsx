"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

/* ============================================================
   SIGNUP FORM
============================================================ */

// Set to false to hide the image panel on phones and tablets.
const SHOW_IMAGE_ON_MOBILE = true;

export default function SignupForm() {
  const supabase = createClient();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Create user in Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      // Send welcome email
      try {
        const response = await fetch("/api/welcome", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name: fullName,
          }),
        });

        const result = await response.json();

        console.log("Welcome email response:", result);
      } catch (emailError) {
        console.error("Welcome email failed:", emailError);
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
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
           LEFT SIDE
        ========================================= */

        .signup-left {
          min-width: 0;
          min-height: 0;
          height: 100%;
          overflow-y: auto;
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
          border-radius: ;
          background: #017CB8;
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
           RIGHT SIDE: CAMPUS PHOTO
        ========================================= */

        .signup-right {
          position: relative;
          height: 100%;
          min-width: 0;
          background-color: #09284a;
          background-image:
            linear-gradient(
              180deg,
              rgba(5, 24, 43, 0.08) 0%,
              rgba(5, 24, 43, 0.18) 30%,
              rgba(5, 24, 43, 0.88) 100%
            ),
            linear-gradient(
              90deg,
              rgba(5, 24, 43, 0.12) 0%,
              rgba(5, 24, 43, 0.12) 100%
            ),
            url("/images/campus-aerial.png");
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding:
            clamp(20px, 5vh, 56px)
            clamp(24px, 3vw, 48px)
            clamp(24px, 6.5vh, 72px);
        }

        /* Flexible area exposes the campus photo above the text. */
        .signup-image-spacer {
          flex: 1 1 auto;
          min-height: 0;
          width: 100%;
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
           TABLET / MOBILE
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
            min-height: 460px;
            padding: 36px 20px 44px;
            background-position: center center;
          }

          .signup-right.hide-image-mobile {
            display: none;
          }

          .signup-image-spacer {
            flex: none;
            min-height: clamp(190px, 30vh, 300px);
          }

          .right-copy {
            margin-top: 16px;
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
            font-size: 16px;
          }

          .signup-button {
            height: 46px;
          }

          .signup-right {
            min-height: 420px;
            padding: 30px 16px 38px;
            background-position: 56% center;
          }

          .signup-image-spacer {
            min-height: clamp(170px, 27vh, 250px);
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
        {/* LEFT / FORM SIDE */}
        <section className="signup-left">
          <header className="signup-header">
            <div className="signup-logo"></div>

            <div className="header-login">
              <span>Already part of Asknet?</span>

              <Link href="/login" className="header-login-link">
                Log in
              </Link>
            </div>
          </header>

          <div className="signup-content">
            <h1 className="signup-heading">
              Sign up to join our community
            </h1>

            <p className="signup-subheading">
              
            </p>

            <form onSubmit={handleSignup} className="signup-form">
              {/* Errors */}
              {error && (
                <div className="form-alert error" role="alert">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="form-alert success" role="status">
                  {success}
                </div>
              )}

              {/* Name + password */}
              <div className="name-row">
                <div className="field">
                  <label htmlFor="full-name" className="field-label">
                    Full name
                    <span className="field-required">*</span>
                  </label>

                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    value={fullName}
                    onChange={handleInput(setFullName)}
                    required
                    disabled={loading}
                    autoComplete="name"
                    placeholder="e.g. Adam Johnson"
                    className="field-input"
                  />
                </div>

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
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="field-input"
                  />
                </div>
              </div>

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

              {/* Terms */}
              <p className="terms-text">
                By completing signup, you agree to our Terms of
                Service and Privacy Policy, and confirm that the
                information you provide is accurate.
              </p>

              {/* Submit */}
              <button
                type="submit"
                className="signup-button"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign up with email"}
              </button>
            </form>

            <p className="login-bottom">
              Already have an account? <Link href="/login">Log in</Link>
            </p>
          </div>
        </section>

        {/* RIGHT / CAMPUS IMAGE SIDE */}
        <aside
          className={`signup-right${
            SHOW_IMAGE_ON_MOBILE ? "" : " hide-image-mobile"
          }`}
        >
          <div className="signup-image-spacer" aria-hidden="true" />

          <div className="right-copy">
            <h2>Welcome home to the Asknet community</h2>

            <p>
              Join our student technology community and connect,
              collaborate, learn, and grow together.
            </p>
          </div>
        </aside>
      </main>
    </>
  );
}