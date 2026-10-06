// src/components/Footer.tsx
"use client";

export default function Footer() {
  const companyLinks = ["About Us", "Careers", "Press", "Blog", "Contact Us", "Privacy Policy"];

  const linkStyle = {
    display: "block",
    fontSize: "13px",
    color: "#9FB0C2",
    textDecoration: "none",
    marginBottom: "10px",
  };

  const socialStyle = {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "#ffffff20",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: "white",
    textDecoration: "none",
  };

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
            <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "16px" }}>
              SOTSS<span style={{ color: "#0A66C2" }}>.</span>
            </h3>
            <p style={{ fontSize: "13px", color: "#9FB0C2", lineHeight: "1.8" }}>
              We are passionate about empowering learners worldwide with high-quality, accessible &
              engaging education.
            </p>

            <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
              <a href="#" style={socialStyle as React.CSSProperties}>
                f
              </a>
              <a href="#" style={socialStyle as React.CSSProperties}>
                in
              </a>
              <a href="#" style={socialStyle as React.CSSProperties}>
                tw
              </a>
              <a href="#" style={socialStyle as React.CSSProperties}>
                yt
              </a>
            </div>
          </div>

          {/* Company Info */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 700, marginBottom: "16px" }}>
              Company Info
            </h4>
            {companyLinks.map((item) => (
              <a key={item} href="#" style={linkStyle as React.CSSProperties}>
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
          <p style={{ fontSize: "12px", color: "#7A8A9A" }}>
            © 2026 . All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "16px" }}>
            <a href="#" style={{ fontSize: "12px", color: "#7A8A9A", textDecoration: "none" }}>
              Privacy Policy
            </a>
            <a href="#" style={{ fontSize: "12px", color: "#7A8A9A", textDecoration: "none" }}>
              Terms of Service
            </a>
            <a href="#" style={{ fontSize: "12px", color: "#7A8A9A", textDecoration: "none" }}>
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}