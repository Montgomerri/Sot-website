import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={styles.wrapper}>
      
      <div style={styles.card}>
        
        {/* LEFT */}
        <div style={styles.left}>
          <h1 style={styles.title}>
            Department Q&A Platform
          </h1>

          <p style={styles.subtitle}>
            Ask questions, share knowledge, and grow together.
          </p>

          <div style={styles.list}>
            <p>• Ask questions anytime</p>
            <p>• Share answers with others</p>
            <p>• Build your academic profile</p>
          </div>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          {children}
        </div>

      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    display: "flex",
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },

  left: {
    flex: 1,
    backgroundColor: "#111827",
    color: "white",
    padding: "40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  right: {
    flex: 1,
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "14px",
    opacity: 0.8,
    marginBottom: "20px",
  },

  list: {
    fontSize: "14px",
    lineHeight: "1.8",
    opacity: 0.85,
  },
};