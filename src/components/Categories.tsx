"use client";

export default function Categories() {
  const quickLinks = [
    { label: "Student Complaint Form", href: "https://accounts.google.com/v3/signin/confirmidentifier?authuser=1&continue=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F1%2Fd%2Fe%2F1FAIpQLSfnfNINNiW_byDh0lHoQq3bsJTsdkvnfiOrpnSHX_vqVb8tDw%2Fviewform&dsh=S19608468%3A1772107808671237&followup=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F1%2Fd%2Fe%2F1FAIpQLSfnfNINNiW_byDh0lHoQq3bsJTsdkvnfiOrpnSHX_vqVb8tDw%2Fviewform&ifkv=ASfE1-oS2EU4GwfbO3koAU30Vh9ubD6bai8Tn8mO-4C_e7J2FsGXicw9bnDVnMcqZAlsNTURre7HFQ&ltmpl=forms&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin" },
    { label: "ID card request(new students)", href: "https://forms.gle/22wLYP98gLLpcpyy5" },
    { label: "Lecturer Evaluation Portal", href: "https://evaluation.gimpa.edu.gh/" },
    { label: "ID card request(Replacement)", href: "https://forms.gle/94hChbaZtoT1jqeL6" },
    { label: "Library", href: "https://gimpa.edu.gh/library/" },
  ];

  return (
    <section
      style={{
        background: "#F5F7FA",
        padding: "80px 0",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <p
            style={{
              color: "#0A66C2",
              fontWeight: 700,
              fontSize: "14px",
              marginBottom: "10px",
              letterSpacing: "0.5px",
            }}
          >
            Get In Touch
          </p>
          <h2 style={{ fontSize: "36px", fontWeight: 700, color: "#0A2A43" }}>
            Reach Out
          </h2>
        </div>

        {/* Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
            marginBottom: "50px",
          }}
        >
          <div style={cardStyle("#0A66C2")}>
            <div style={accentBar("#0A66C2")} />
            <h3 style={titleStyle}>Open Hours</h3>
            <p style={textStyle}>Mon–Sat : 8:30 – 18:00 GMT</p>
          </div>

          <div style={cardStyle("#084F9E")}>
            <div style={accentBar("#084F9E")} />
            <h3 style={titleStyle}>Phone Number</h3>
            <p style={textStyle}>
              +233-(0) 501620138
              <br />
              +233-(0) 332095432
            </p>
          </div>

          <div style={cardStyle("#0A2A43")}>
            <div style={accentBar("#0A2A43")} />
            <h3 style={titleStyle}>Our Location</h3>
            <p style={textStyle}>GIMPA School of Technology</p>
          </div>

          <div style={cardStyle("#3EBC84")}>
            <div style={accentBar("#3EBC84")} />
            <h3 style={titleStyle}>Our Email</h3>
            <a
              href="mailto:csshead@gimpa.edu.gh"
              style={{
                fontSize: "14px",
                color: "#0A66C2",
                lineHeight: "1.7",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              csshead@gimpa.edu.gh
            </a>
          </div>
        </div>

        {/* Quick Links — gradient panel */}
        <div
          style={{
            position: "relative",
            background:
              "linear-gradient(135deg, #0A2A43 0%, #084F9E 60%, #0A66C2 100%)",
            borderRadius: "24px",
            padding: "48px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "28px",
            overflow: "hidden",
          }}
        >
          {/* Soft radial highlight, top-right */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)",
              pointerEvents: "none",
            }}
          />

          <div style={{ position: "relative" }}>
            <h3
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "white",
                margin: 0,
              }}
            >
              Quick Links
            </h3>
            <div
              style={{
                width: "36px",
                height: "3px",
                background: "#3EBC84",
                borderRadius: "2px",
                marginTop: "10px",
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              position: "relative",
            }}
          >
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  padding: "10px 22px",
                  borderRadius: "50px",
                  fontSize: "13px",
                  fontWeight: 500,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.15)",
                  transition: "background 0.25s, transform 0.2s, border-color 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0A66C2";
                  e.currentTarget.style.borderColor = "#0A66C2";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const cardStyle = (borderColor: string): React.CSSProperties => ({
  background: "#fff",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  transition: "transform 0.25s ease, box-shadow 0.25s ease",
});

const accentBar = (color: string): React.CSSProperties => ({
  width: "32px",
  height: "3px",
  background: color,
  borderRadius: "2px",
  marginBottom: "20px",
});

const titleStyle: React.CSSProperties = {
  fontSize: "15px",
  fontWeight: 700,
  color: "#0A2A43",
  marginBottom: "10px",
};

const textStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#5B6B7C",
  lineHeight: "1.7",
  margin: 0,
};