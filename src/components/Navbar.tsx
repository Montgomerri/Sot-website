"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "News and events", id: "news-and-events" },
  { label: "Programs", id: "programmes" },
  { label: "Student services", id: "student-services" },
];

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("Home");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Update the active navigation item as the visitor scrolls.
  useEffect(() => {
    const updateActiveLink = () => {
      const scrollPosition = 110;
      let currentSection = NAV_LINKS[0].label;

      for (const link of NAV_LINKS) {
        const section = document.getElementById(link.id);

        if (
          section &&
          section.getBoundingClientRect().top <= scrollPosition
        ) {
          currentSection = link.label;
        }
      }

      // Ensure the final section can become active at the bottom of the page.
      const atPageBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      if (atPageBottom) {
        const lastExistingSection = [...NAV_LINKS]
          .reverse()
          .find((link) => document.getElementById(link.id));

        if (lastExistingSection) {
          currentSection = lastExistingSection.label;
        }
      }

      setActiveLink(currentSection);
    };

    updateActiveLink();

    window.addEventListener("scroll", updateActiveLink, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveLink);

    return () => {
      window.removeEventListener("scroll", updateActiveLink);
      window.removeEventListener("resize", updateActiveLink);
    };
  }, []);

  const handleNavClick = (label: string) => {
    setActiveLink(label);
    setMobileOpen(false);
  };

  return (
    <>
      <style>{`
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 82px;
        }

        .navbar {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: #ffffff;
          border-bottom: 1px solid #e1eaf3;
          font-family: "Poppins", "Segoe UI", sans-serif;
        }

        .navbar-inner {
          width: 90%;
          max-width: 1200px;
          height: 70px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        /* Logo */

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          text-decoration: none;
        }

        .navbar-logo-image {
          width: 36px;
          height: 36px;
          object-fit: contain;
        }

        .navbar-logo-text {
          color: #0a2a43;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          text-transform: uppercase;
        }

        .navbar-logo-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-left: -6px;
          margin-bottom: 12px;
          border-radius: 50%;
          background: #027cb9;
        }

        /* Desktop navigation */

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 5px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-links li a {
          position: relative;
          display: inline-flex;
          align-items: center;
          padding: 9px 12px;
          border-radius: 6px;
          color: #3a4a5a;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          white-space: nowrap;
          transition:
            color 200ms ease,
            background 200ms ease;
        }

        .navbar-links li a:hover {
          color: #027cb9;
          background: #f0f8fc;
        }

        .navbar-links li a.active {
          color: #027cb9;
          font-weight: 700;
        }

        .navbar-links li a.active::after {
          content: "";
          position: absolute;
          bottom: 2px;
          left: 12px;
          right: 12px;
          height: 2px;
          border-radius: 2px;
          background: #027cb9;
        }

        /* Asknet button */

        .navbar-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 10px 24px;
          border: 1px solid #027cb9;
          border-radius: 50px;
          background: #027cb9;
          color: #ffffff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition:
            background 200ms ease,
            transform 200ms ease;
        }

        .navbar-cta:hover {
          background: #015f8d;
          transform: translateY(-1px);
        }

        /* Mobile menu button */

        .navbar-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 40px;
          height: 40px;
          padding: 8px;
          border: none;
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
        }

        .navbar-hamburger:hover {
          background: #f0f8fc;
        }

        .navbar-hamburger span {
          display: block;
          width: 23px;
          height: 2px;
          border-radius: 2px;
          background: #0a2a43;
          transition:
            transform 200ms ease,
            opacity 200ms ease;
        }

        .navbar-hamburger.open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }

        .navbar-hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .navbar-hamburger.open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        .navbar-hamburger:focus-visible,
        .navbar a:focus-visible {
          outline: 2px solid #027cb9;
          outline-offset: 4px;
        }

        /* Mobile dropdown */

        .navbar-mobile {
          display: none;
          padding: 10px 5% 20px;
          border-top: 1px solid #e1eaf3;
          background: #ffffff;
        }

        .navbar-mobile.open {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .navbar-mobile a {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 7px;
          color: #3a4a5a;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .navbar-mobile a:hover {
          color: #027cb9;
          background: #f0f8fc;
        }

        .navbar-mobile a.active {
          color: #027cb9;
          background: #f0f8fc;
          font-weight: 700;
        }

        .navbar-mobile .navbar-cta-mobile {
          justify-content: center;
          margin-top: 8px;
          padding: 12px 16px;
          border-radius: 50px;
          background: #027cb9;
          color: #ffffff;
          font-weight: 600;
        }

        .navbar-mobile .navbar-cta-mobile:hover {
          background: #015f8d;
          color: #ffffff;
        }

        /* Tablet and mobile */

        @media (max-width: 900px) {
          .navbar-inner {
            width: 92%;
            gap: 12px;
          }

          .navbar-links {
            gap: 0;
          }

          .navbar-links li a {
            padding: 9px 8px;
            font-size: 11px;
          }

          .navbar-cta {
            padding: 9px 17px;
            font-size: 12px;
          }
        }

        @media (max-width: 768px) {
          .navbar-inner {
            height: 66px;
          }

          .navbar-links,
          .navbar-inner > .navbar-cta {
            display: none;
          }

          .navbar-hamburger {
            display: flex;
          }

          .navbar-logo-image {
            width: 34px;
            height: 34px;
          }

          .navbar-logo-text {
            font-size: 21px;
          }

          .navbar-mobile .navbar-cta-mobile {
            display: flex;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          .navbar *,
          .navbar *::before,
          .navbar *::after {
            transition: none !important;
          }
        }
      `}</style>

      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link
            href="/#home"
            className="navbar-logo"
            onClick={() => handleNavClick("Home")}
          >
            <Image
              src="/images/logo.jpg"
              alt="SOTSS Logo"
              width={36}
              height={36}
              className="navbar-logo-image"
            />

            <span className="navbar-logo-text">SOTSS</span>
            <span className="navbar-logo-dot" />
          </Link>

          {/* Desktop links */}
          <ul className="navbar-links">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={
                    activeLink === link.label ? "active" : ""
                  }
                  aria-current={
                    activeLink === link.label ? "location" : undefined
                  }
                  onClick={() => handleNavClick(link.label)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Asknet */}
          <Link href="/signup" className="navbar-cta">
            Asknet
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`navbar-hamburger ${
              mobileOpen ? "open" : ""
            }`}
            onClick={() => setMobileOpen((previous) => !previous)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        {/* Mobile links */}
        <div
          id="mobile-menu"
          className={`navbar-mobile ${mobileOpen ? "open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              tabIndex={mobileOpen ? 0 : -1}
              className={
                activeLink === link.label ? "active" : ""
              }
              aria-current={
                activeLink === link.label ? "location" : undefined
              }
              onClick={() => handleNavClick(link.label)}
            >
              {link.label}
            </a>
          ))}

          <Link
            href="/signup"
            tabIndex={mobileOpen ? 0 : -1}
            className="navbar-cta-mobile"
            onClick={() => setMobileOpen(false)}
          >
            Join Us
          </Link>
        </div>
      </nav>
    </>
  );
}