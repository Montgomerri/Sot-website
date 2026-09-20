import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: props.disabled ? "#9ca3af" : "#111827",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        cursor: props.disabled ? "not-allowed" : "pointer",
        fontSize: "14px",
        fontWeight: 600,
        marginTop: "10px",
        transition: "0.2s",
        ...style,
      }}
    >
      {children}
    </button>
  );
}