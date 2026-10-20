
// src/components/Footer.tsx
"use client";

import { Facebook, Linkedin, Youtube } from "lucide-react";
import { useState } from "react";
import type { CSSProperties } from "react";

export default function Footer() {
  const companyLinks = [
    "About Us",
    "",
    "",
    "",
    "Contact Us",
    ,
  ];

  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const linkStyle: CSSProperties = {
    display: "block",
    fontSize: "13px",
    color: "#9FB0C2",
    textDecoration: "none",
    marginBottom: "10px",
  };

  const socialStyle = (name: string): CSSProperties => ({
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: hoveredSocial === name ? "#0A66C2" : "#ffffff12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    textDecoration: "none",
    transition: "background 0.2s ease",
  });

  const socials = [
    {
      name: "Facebook",
      href: "#",
      Icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: "#",
      Icon: Linkedin,
    },
    {
      name: "X",
      href: "#",
      Icon: () => (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.45L5.53 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.97L18.9 2Zm-1.1 17.9h1.73L7.27 4H5.4l12.4 15.9Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      Icon: Youtube,
    },
  ];

  return (
    <footer
      style={{
        background: "#0A2A43",
        color: "white",
        padding: "60px 0 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 800,
                marginBottom: "16px",
              }}
            >
              SOTSS<span style={{ color: "#0A66C2" }}>.</span>
            </h3>

            <p
              style={{
                fontSize: "13px",
                color: "#9FB0C2",
                lineHeight: "1.8",
              }}
            >
              We are passionate about empowering learners worldwide with
              high-quality, accessible & engaging education.
            </p>

            {/* Social Icons */}
            <div
              style={{
                display: "flex",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              {socials.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  title={name}
                  style={socialStyle(name)}
                  onMouseEnter={() => setHoveredSocial(name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4
              style={{
                fontSize: "15px",
                fontWeight: 700,
                marginBottom: "16px",
              }}
            >
              Company Info
            </h4>

            {companyLinks.map((item) => (
              <a key={item} href="#" style={linkStyle}>
                {item}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid #ffffff1A",
            paddingTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#7A8A9A",
            }}
          >
            © 2026 SOTSS. All rights reserved.
          </p>

          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <a
              href="#"
              style={{
                fontSize: "12px",
                color: "#7A8A9A",
                textDecoration: "none",
              }}
            >
             
            </a>

            <a
              href="#"
              style={{
                fontSize: "12px",
                color: "#7A8A9A",
                textDecoration: "none",
              }}
            >
              
            </a>

            <a
              href="#"
              style={{
                fontSize: "12px",
                color: "#7A8A9A",
                textDecoration: "none",
              }}
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
