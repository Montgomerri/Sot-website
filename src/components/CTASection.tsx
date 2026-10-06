// src/components/CTASection.tsx
"use client";

const NAVY = "#0A2A43";
const BLUE = "#0A66C2";
const MUTED = "#5B6B7C";
const BORDER = "#E1EAF3";

export default function CTASection() {
  return (
    <section
      id="about"
      style={{
        background: "#ffffff",
        padding: "100px 0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p
            style={{
              color: BLUE,
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            About Us
          </p>
          <h2
            style={{
              fontSize: "34px",
              fontWeight: 700,
              color: NAVY,
              marginBottom: "24px",
            }}
          >
            About Our Departments
          </h2>
          <p
            style={{
              color: MUTED,
              fontSize: "14px",
              lineHeight: "1.8",
              maxWidth: "720px",
              marginInline: "auto",
            }}
          >
            The Department of Computer Science and Information Systems was
            established following the merger of the departments of Computer
            Sciences and Information Systems and Innovation by the Institute’s
            management in September 2023. The department offers a wide range of
            undergraduate, postgraduate, and diploma programmes, and shares its
            classrooms and computer laboratories with the Department of
            Information Systems and Innovation within the School of Technology.
          </p>
        </div>

        {/* Three Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Card 1 */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: `1px solid ${BORDER}`,
              borderTop: `4px solid ${BLUE}`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(10,102,194,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: NAVY,
                margin: 0,
              }}
            >
              Economics &amp; Applied Mathematics
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Quantitative foundations for computing, analytics, and
              data-driven decision making.
            </p>
            <a
              href="https://gimpa.edu.gh/dept-economics-and-applied-mathematics/"
              style={{
                marginTop: "auto",
                paddingTop: "12px",
                color: BLUE,
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Explore →
            </a>
          </div>

          {/* Card 2 */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: `1px solid ${BORDER}`,
              borderTop: `4px solid ${BLUE}`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(10,102,194,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: NAVY,
                margin: 0,
              }}
            >
              Liberal Arts &amp; Hospitality Studies
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Humanities, communication, and hospitality programmes within the
              School of Technology.
            </p>
            <a
              href="https://gimpa.edu.gh/dept-liberal-arts-hospitality-studies/"
              style={{
                marginTop: "auto",
                paddingTop: "12px",
                color: BLUE,
                fontWeight: 600,
                fontSize: "13px",
                textDecoration: "none",
                alignSelf: "flex-start",
              }}
            >
              Explore →
            </a>
          </div>

          {/* Card 3 */}
          <div
            style={{
              background: "#fff",
              borderRadius: "14px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              border: `1px solid ${BORDER}`,
              borderTop: `4px solid ${BLUE}`,
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow =
                "0 12px 28px rgba(10,102,194,0.10)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: NAVY,
                margin: 0,
              }}
            >
              Computer Science &amp; Information Systems
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: MUTED,
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              You are currently viewing this department’s portal programmes,
              news, and student services.
            </p>
            <span
              style={{
                marginTop: "auto",
                paddingTop: "12px",
                color: "#9FB0C2",
                fontWeight: 600,
                fontSize: "13px",
                alignSelf: "flex-start",
              }}
            >
              Current page
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
