"use client";

import {
  ArrowUpRight,
  Clock3,
  Phone,
  MapPin,
  Mail,
} from "lucide-react";

export default function Categories() {
  const quickLinks = [
    {
      label: "Student Complaint Form",
      href: "https://accounts.google.com/v3/signin/confirmidentifier?authuser=1&continue=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F1%2Fd%2Fe%2F1FAIpQLSfnfNINNiW_byDh0lHoQq3bsJTsdkvnfiOrpnSHX_vqVb8tDw%2Fviewform&dsh=S19608468%3A1772107808671237&followup=https%3A%2F%2Fdocs.google.com%2Fforms%2Fu%2F1%2Fd%2Fe%2F1FAIpQLSfnfNINNiW_byDh0lHoQq3bsJTsdkvnfiOrpnSHX_vqVb8tDw%2Fviewform&ifkv=ASfE1-oS2EU4GwfbO3koAU30Vh9ubD6bai8Tn8mO-4C_e7J2FsGXicw9bnDVnMcqZAlsNTURre7HFQ&ltmpl=forms&osid=1&passive=1209600&service=wise&flowName=GlifWebSignIn&flowEntry=ServiceLogin",
    },
    {
      label: "ID Card Request (New Students)",
      href: "https://forms.gle/22wLYP98gLLpcpyy5",
    },
    {
      label: "Lecturer Evaluation Portal",
      href: "https://evaluation.gimpa.edu.gh/",
    },
    {
      label: "ID Card Request (Replacement)",
      href: "https://forms.gle/94hChbaZtoT1jqeL6",
    },
    {
      label: "Library",
      href: "https://gimpa.edu.gh/library/",
    },
  ];

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Main content: introduction left, contact details right */}
        <div className="contact-layout">
          <div className="contact-intro">
            

            <h2 className="contact-heading">
              Send Us A Message.
            </h2>

            <p className="contact-description">
              Have a question or need assistance? Get in touch with
              the Department of Technology.
            </p>

            <p className="contact-manual">
              Or just reach out manually to
              <a href="mailto:csshead@gimpa.edu.gh">
                csshead@gimpa.edu.gh
                <ArrowUpRight size={15} />
              </a>
            </p>
          </div>

          {/* Contact information */}
          <div className="contact-grid">
            <article className="contact-item">
              <div className="contact-icon">
                <Clock3 size={21} strokeWidth={1.7} />
              </div>

              <h3>Open Hours</h3>

              <p>Visit or contact us during our working hours.</p>

              <span className="contact-value">
                Mon–Sat · 8:30 AM–6:00 PM GMT
              </span>
            </article>

            <article className="contact-item">
              <div className="contact-icon">
                <Phone size={21} strokeWidth={1.7} />
              </div>

              <h3>Phone Number</h3>

              <p>Speak directly with our department.</p>

              <div className="contact-value contact-phone-list">
                <a href="tel:+233501620138">
                  +233 (0) 501 620 138
                </a>
                <a href="tel:+233332095432">
                  +233 (0) 332 095 432
                </a>
              </div>
            </article>

            <article className="contact-item">
              <div className="contact-icon">
                <MapPin size={21} strokeWidth={1.7} />
              </div>

              <h3>Our Location</h3>

              <p>Find us at the Ghana Institute of Management and Public Administration.</p>

              <span className="contact-value">
                GIMPA School of Technology
              </span>
            </article>

            <article className="contact-item">
              <div className="contact-icon">
                <Mail size={21} strokeWidth={1.7} />
              </div>

              <h3>Our Email</h3>

              <p>Send enquiries directly to our department.</p>

              <a
                className="contact-value contact-email"
                href="mailto:csshead@gimpa.edu.gh"
              >
                csshead@gimpa.edu.gh
                <ArrowUpRight size={14} />
              </a>
            </article>
          </div>
        </div>

        {/* Quick Links: integrated into the section */}
        <div id="student-services" className="quick-links-section">
          <div className="quick-links-intro">
            <span className="quick-links-eyebrow">
              
            </span>

            <h3>Quick Links</h3>

            <p>
              Access student services, academic portals, and resources.
            </p>
          </div>

          <div className="quick-links-list">
            {quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="quick-link"
              >
                <span>{link.label}</span>
                <ArrowUpRight size={15} strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          width: 100%;
          padding: 76px 24px 70px;
          background: #ffffff;
          color: #202a3b;
          font-family: Poppins, sans-serif;
        }

        .contact-container {
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
        }

        /* Main layout */

        .contact-layout {
          display: grid;
          grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.3fr);
          align-items: center;
          gap: 64px;
        }

        .contact-intro {
          min-width: 0;
          max-width: 390px;
        }

        .contact-eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 5px 11px;
          border: 1px solid #dfe5eb;
          border-radius: 50px;
          color: #566171;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.5;
        }

        .contact-heading {
          margin: 24px 0 19px;
          color: #202a3b;
          font-size: clamp(32px, 3.5vw, 43px);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -1.5px;
        }

        .contact-description {
          max-width: 340px;
          margin: 0;
          color: #667180;
          font-size: 14px;
          line-height: 1.85;
        }

        .contact-manual {
          margin: 17px 0 0;
          color: #667180;
          font-size: 13px;
          line-height: 1.9;
        }

        .contact-manual a {
          display: flex;
          align-items: center;
          gap: 4px;
          width: fit-content;
          max-width: 100%;
          margin-top: 3px;
          color: #027cb9;
          font-weight: 500;
          text-decoration: none;
          overflow-wrap: anywhere;
          transition: color 180ms ease;
        }

        .contact-manual a:hover {
          color: #015b89;
        }

        /* Contact options: two columns, no enclosing panel */

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px 20px;
          min-width: 0;
        }

        .contact-item {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          min-height: 192px;
          padding: 22px 21px;
          border: 1px solid transparent;
          border-radius: 15px;
          background: #f7f9fb;
          transition:
            background 220ms ease,
            border-color 220ms ease,
            transform 220ms ease;
        }

        .contact-item:hover {
          background: #ffffff;
          border-color: #d8e8f2;
          transform: translateY(-3px);
        }

        .contact-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          margin-bottom: 13px;
          color: #027cb9;
          transition: transform 220ms ease;
        }

        .contact-item:hover .contact-icon {
          transform: translateY(-2px);
        }

        .contact-item h3 {
          margin: 0 0 8px;
          color: #202a3b;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.5;
          letter-spacing: -0.3px;
        }

        .contact-item p {
          margin: 0 0 13px;
          color: #5f6978;
          font-size: 12px;
          line-height: 1.8;
        }

        .contact-value {
          display: block;
          margin-top: auto;
          color: #027cb9;
          font-size: 11px;
          font-weight: 600;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .contact-phone-list {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
        }

        .contact-phone-list a,
        .contact-email {
          color: #027cb9;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .contact-phone-list a:hover,
        .contact-email:hover {
          color: #015b89;
        }

        .contact-email {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          max-width: 100%;
        }

        .contact-email svg {
          flex-shrink: 0;
        }

        /* Quick Links: simple, horizontal continuation */

        .quick-links-section {
          display: grid;
          grid-template-columns: minmax(200px, 0.72fr) minmax(0, 1.8fr);
          align-items: start;
          gap: 38px;
          margin-top: 53px;
          padding-top: 28px;
          border-top: 1px solid #e8edf1;
        }

        .quick-links-intro {
          min-width: 0;
        }

        .quick-links-eyebrow {
          color: #027cb9;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.3px;
        }

        .quick-links-intro h3 {
          margin: 7px 0 6px;
          color: #202a3b;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .quick-links-intro p {
          margin: 0;
          color: #737e8b;
          font-size: 12px;
          line-height: 1.8;
        }

        .quick-links-list {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-start;
          gap: 8px 20px;
        }

        .quick-link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
          max-width: 100%;
          padding: 8px 0;
          color: #566171;
          font-size: 11px;
          font-weight: 500;
          line-height: 1.7;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .quick-link svg {
          flex-shrink: 0;
          color: #027cb9;
          transition: transform 180ms ease;
        }

        .quick-link:hover {
          color: #027cb9;
        }

        .quick-link:hover svg {
          transform: translate(2px, -2px);
        }

        /* Tablet */

        @media (max-width: 900px) {
          .contact-section {
            padding: 62px 24px 58px;
          }

          .contact-layout {
            grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
            gap: 32px;
          }

          .contact-heading {
            font-size: 35px;
          }

          .contact-grid {
            gap: 12px;
          }

          .contact-item {
            min-height: 195px;
            padding: 18px 15px;
          }

          .contact-item h3 {
            font-size: 14px;
          }

          .quick-links-section {
            grid-template-columns: 1fr;
            gap: 13px;
          }
        }

        /* Mobile */

        @media (max-width: 620px) {
          .contact-section {
            padding: 46px 20px 44px;
          }

          .contact-layout {
            grid-template-columns: 1fr;
            gap: 31px;
          }

          .contact-intro {
            max-width: 480px;
          }

          .contact-heading {
            margin: 20px 0 15px;
            font-size: clamp(34px, 8.5vw, 42px);
            letter-spacing: -1.3px;
          }

          .contact-description {
            font-size: 13px;
          }

          .contact-manual {
            font-size: 12px;
          }

          .contact-grid {
            gap: 12px;
          }

          .contact-item {
            min-height: 184px;
            padding: 16px 13px;
            border-radius: 13px;
          }

          .contact-icon {
            margin-bottom: 10px;
          }

          .contact-item h3 {
            font-size: 13px;
          }

          .contact-item p {
            font-size: 11px;
          }

          .contact-value {
            font-size: 10px;
          }

          .quick-links-section {
            gap: 15px;
            margin-top: 37px;
            padding-top: 24px;
          }

          .quick-links-intro h3 {
            font-size: 19px;
          }

          .quick-links-list {
            gap: 4px 17px;
          }
        }

        @media (max-width: 390px) {
          .contact-section {
            padding-right: 15px;
            padding-left: 15px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .contact-item {
            min-height: 155px;
            padding: 19px;
          }

          .contact-item h3 {
            font-size: 14px;
          }

          .contact-item p {
            font-size: 12px;
          }

          .contact-value {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-item,
          .contact-icon,
          .contact-manual a,
          .contact-phone-list a,
          .contact-email,
          .quick-link,
          .quick-link svg {
            transition: none;
          }

          .contact-item:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}