"use client";

import {
  ArrowRight,
  GraduationCap,
  Handshake,
  Laptop,
  MessageCircle,
  Monitor,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Course = {
  title: string;
  category: string;
  color: string;
  Icon: LucideIcon;
};

export default function CoursesGrid() {
  const courses: Course[] = [
    {
      title:
        "Graduate with internationally recognized GIMPA degrees and diplomas that validate your skills and open doors to further studies, career advancement, and leadership opportunities globally.",
      category: "Recognized GIMPA Degrees & Diplomas",
      color: "#0A66C2",
      Icon: GraduationCap,
    },
    {
      title:
        "Through partnerships with leading tech companies, startups, and organizations, GIMPA provides students with internships, career guidance, and direct job opportunities, preparing them to thrive in Africa’s and the global job market.",
      category: "Industry Partnerships & Career Support",
      color: "#084F9E",
      Icon: Handshake,
    },
    {
      title:
        "Students benefit from state-of-the-art computer labs, high-speed internet, and digital resources that remain accessible around the clock to support learning, research, and innovation.",
      category: "Computer Labs & Digital Resources",
      color: "#0A2A43",
      Icon: Monitor,
    },
    {
      title:
        "Our faculty combines years of teaching, research, and real-world industry practice, ensuring students gain both theoretical knowledge and practical insights from world-class lecturers and researchers.",
      category: "World-Class Lecturers & Researchers",
      color: "#3EBC84",
      Icon: Users,
    },
    {
      title:
        "Get academic support when you need it. Our AI-powered chatbot provides instant answers to your questions 24/7, while dedicated faculty and mentors are available for in-depth guidance.",
      category: "Live Q&A Support",
      color: "#0A66C2",
      Icon: MessageCircle,
    },
    {
      title:
        "GIMPA’s blended learning model offers the best of both worlds — structured in-person lectures and convenient online access to recorded sessions, giving students the flexibility to study at their own pace without compromising academic quality.",
      category: "Blended Learning &Flexible Study Modes",
      color: "#084F9E",
      Icon: Laptop,
    },
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
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#0A2A43" }}>
            What We Offer
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {courses.map(({ title, category, color, Icon }, index) => (
            <div
              key={index}
              style={{
                background: "#fff",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                padding: "28px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(10,102,194,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)";
              }}
            >
              {/* Icon Tile */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: `${color}1A`,
                  color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon size={22} strokeWidth={2} />
              </div>

              {/* Category Badge */}
              <span
                style={{
                  background: color,
                  color: "white",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: "50px",
                  display: "inline-block",
                  marginBottom: "14px",
                  letterSpacing: "0.3px",
                }}
              >
                {category}
              </span>

              {/* Title */}
              <h3
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#0A2A43",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {title}
              </h3>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button
            style={{
              background: "transparent",
              color: "#0A66C2",
              border: "2px solid #0A66C2",
              padding: "12px 32px",
              borderRadius: "50px",
              fontWeight: 600,
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0A66C2";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#0A66C2";
            }}
          >
            View All Courses
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}