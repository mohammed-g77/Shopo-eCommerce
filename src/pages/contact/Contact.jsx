import React, { useState } from "react";
import { Link } from "react-router-dom";
import Newsletter from "../../components/Newsletter";
import { submitContactForm } from "../../api/contactService";
import styles from "./Contact.module.css";

// ─── Static contact info ──────────────────────────────────────────────────────
const CONTACT_CARDS = [
  {
    id: "address",
    title: "Our Address",
    lines: ["123 Commerce Street,", "Jenin, Palestine"],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    id: "phone",
    title: "Phone Number",
    lines: ["+1 (800) 123-4567", "+1 (800) 987-6543"],
    href: "tel:+18001234567",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42C1.61 2.22 2.4 1.23 3.59 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: "email",
    title: "Email Address",
    lines: ["support@shopo.com", "sales@shopo.com"],
    href: "mailto:support@shopo.com",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

// ─── Form validation ──────────────────────────────────────────────────────────
const SUBJECTS = [
  "General Inquiry",
  "Order Support",
  "Return / Refund",
  "Product Question",
  "Technical Issue",
  "Partnership",
  "Other",
];

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const validate = ({ name, email, subject, message }) => {
  const errors = {};
  if (!name.trim())                         errors.name    = "Full name is required.";
  else if (name.trim().length < 2)          errors.name    = "Name must be at least 2 characters.";
  if (!email.trim())                        errors.email   = "Email address is required.";
  else if (!/\S+@\S+\.\S+/.test(email))    errors.email   = "Enter a valid email address.";
  if (!subject)                             errors.subject = "Please select a subject.";
  if (!message.trim())                      errors.message = "Message is required.";
  else if (message.trim().length < 10)     errors.message = "Message must be at least 10 characters.";
  return errors;
};

// ─── Contact Page ─────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]       = useState(INITIAL_FORM);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [apiMsg, setApiMsg]   = useState("");

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error as user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    const fieldErrors = validate(form);
    setErrors((prev) => ({ ...prev, [e.target.name]: fieldErrors[e.target.name] || "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(Object.keys(INITIAL_FORM).map((k) => [k, true]));
    setTouched(allTouched);
    const fieldErrors = validate(form);
    setErrors(fieldErrors);
    if (Object.values(fieldErrors).some(Boolean)) return;

    setStatus("loading");
    setApiMsg("");

    try {
      // TODO: WAITING FOR CONTACT API — currently uses mock handler in contactService.js
      const result = await submitContactForm(form);
      if (result.success) {
        setStatus("success");
        setApiMsg(result.message);
        setForm(INITIAL_FORM);
        setTouched({});
        setErrors({});
      } else {
        setStatus("error");
        setApiMsg(result.message);
      }
    } catch {
      setStatus("error");
      setApiMsg("Something went wrong. Please try again later.");
    }
  };

  const isLoading = status === "loading";

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={styles.contactPage}>

      {/* ── Breadcrumb Banner ──────────────────────────────────────────── */}
      <div className={styles.breadcrumbBanner}>
        <div className="container-x">
          <div className={styles.breadcrumbInner}>
            <h1 className={styles.breadcrumbTitle}>Contact Us</h1>
            <div className={styles.breadcrumbTrail}>
              <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Info Cards ─────────────────────────────────────────────────── */}
      <div className={styles.infoSection}>
        <div className="container-x">
          <div className={styles.infoGrid}>
            {CONTACT_CARDS.map((card) => (
              <div key={card.id} className={styles.infoCard}>
                <div className={styles.infoIconWrap}>{card.icon}</div>
                <h3 className={styles.infoCardTitle}>{card.title}</h3>
                {card.lines.map((line, i) =>
                  card.href && i === 0 ? (
                    <p key={i} className={styles.infoCardText}>
                      <a href={card.href} className={styles.infoCardLink}>{line}</a>
                    </p>
                  ) : (
                    <p key={i} className={styles.infoCardText}>{line}</p>
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main: Get In Touch + Form ───────────────────────────────────── */}
      <div className={styles.mainSection}>
        <div className="container-x">
          <div className={styles.mainGrid}>

            {/* ── Left Info Side ─────────────────────────────────────── */}
            <div className={styles.getInTouchSide}>
              <p className={styles.sectionLabel}>Get In Touch</p>
              <h2 className={styles.sectionTitle}>We'd Love to Hear From You</h2>
              <p className={styles.sectionDesc}>
                Have a question, suggestion, or just want to say hello? Our friendly support team is ready to help. Fill out the form and we'll get back to you as soon as possible.
              </p>

              {/* Address */}
              <div className={styles.detailRow}>
                <div className={styles.detailIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.detailLabel}>Address</p>
                  <p className={styles.detailValue}>123 Commerce Street, Jenin, Palestine</p>
                </div>
              </div>

              {/* Phone */}
              <div className={styles.detailRow}>
                <div className={styles.detailIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42C1.61 2.22 2.4 1.23 3.59 1h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.detailLabel}>Phone</p>
                  <p className={styles.detailValue}><a href="tel:+18001234567" className={styles.infoCardLink}>+1 (800) 123-4567</a></p>
                </div>
              </div>

              {/* Email */}
              <div className={styles.detailRow}>
                <div className={styles.detailIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.detailLabel}>Email</p>
                  <p className={styles.detailValue}><a href="mailto:support@shopo.com" className={styles.infoCardLink}>support@shopo.com</a></p>
                </div>
              </div>

              {/* Hours */}
              <div className={styles.detailRow}>
                <div className={styles.detailIconBox}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.detailLabel}>Working Hours</p>
                  <p className={styles.detailValue}>Mon – Fri: 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              {/* Social */}
              <div className={styles.socialRow}>
                {/* Facebook */}
                <a href="#" className={styles.socialBtn} aria-label="Facebook" onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                </a>
                {/* Twitter / X */}
                <a href="#" className={styles.socialBtn} aria-label="Twitter" onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                </a>
                {/* Instagram */}
                <a href="#" className={styles.socialBtn} aria-label="Instagram" onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" className={styles.socialBtn} aria-label="LinkedIn" onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                </a>
              </div>
            </div>

            {/* ── Right: Contact Form ─────────────────────────────────── */}
            <div className={styles.formCard}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              <p className={styles.formSubtitle}>
                {/* TODO: WAITING FOR CONTACT API — form currently uses a mock submit */}
                Fields marked with <span style={{ color: "#ef262c" }}>*</span> are required.
              </p>

              {/* Success Banner */}
              {status === "success" && (
                <div className={styles.successBanner}>
                  <span className={styles.successBannerIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <p className={styles.successBannerText}>{apiMsg}</p>
                </div>
              )}

              {/* Error Banner */}
              {status === "error" && (
                <div className={styles.errorBanner}>
                  <span className={styles.errorBannerIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                  </span>
                  <p className={styles.errorBannerText}>{apiMsg}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                {/* Name + Email Row */}
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-name">
                      Full Name <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      className={`${styles.fieldInput} ${touched.name && errors.name ? styles.hasError : ""}`}
                    />
                    {touched.name && errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel} htmlFor="contact-email">
                      Email Address <span className={styles.fieldRequired}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isLoading}
                      className={`${styles.fieldInput} ${touched.email && errors.email ? styles.hasError : ""}`}
                    />
                    {touched.email && errors.email && <p className={styles.fieldError}>{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-subject">
                    Subject <span className={styles.fieldRequired}>*</span>
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className={`${styles.fieldSelect} ${touched.subject && errors.subject ? styles.hasError : ""}`}
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {touched.subject && errors.subject && <p className={styles.fieldError}>{errors.subject}</p>}
                </div>

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} htmlFor="contact-message">
                    Message <span className={styles.fieldRequired}>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message here…"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isLoading}
                    className={`${styles.fieldTextarea} ${touched.message && errors.message ? styles.hasError : ""}`}
                  />
                  {touched.message && errors.message && <p className={styles.fieldError}>{errors.message}</p>}
                </div>

                {/* Submit */}
                <button type="submit" disabled={isLoading} className={styles.submitBtn}>
                  {isLoading ? (
                    <>
                      <span className={styles.spinner} />
                      Sending…
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* ── Map Section ────────────────────────────────────────────────── */}
      <div className={styles.mapSection}>
        <div className="container-x">
          <div className={styles.mapWrapper}>
            <iframe
              title="ShopO Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291858!2d-73.98784492426615!3d40.748817033797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1712000000000!5m2!1sen!2sus"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className={styles.mapOverlay}>
              <span className={styles.mapPinDot} />
              ShopO Headquarters
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter ──────────────────────────────────────────────────── */}
      <Newsletter />
    </div>
  );
}
