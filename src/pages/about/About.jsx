import React from 'react';
import { Link } from 'react-router-dom';
import Newsletter from '../../components/Newsletter';
import styles from './About.module.css';

// Import an image for the about section from existing assets
import aboutImage from '../../assets/images/banner-2.2.webp';

const FEATURES = [
  {
    id: 1,
    title: 'Free Shipping',
    desc: 'When ordering over $100',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    )
  },
  {
    id: 2,
    title: 'Free Return',
    desc: 'Get Return within 30 days',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    id: 3,
    title: 'Secure Payment',
    desc: '100% Secure Online Payment',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )
  },
  {
    id: 4,
    title: 'Best Quality',
    desc: 'Original Product Guaranteed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
];

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* ── Breadcrumb Banner ─────────────────────────── */}
      <div className={styles.breadcrumbBanner}>
        <div className="container-x">
          <div className={styles.breadcrumbInner}>
            <h1 className={styles.breadcrumbTitle}>About Us</h1>
            <div className={styles.breadcrumbTrail}>
              <Link to="/home" className={styles.breadcrumbLink}>Home</Link>
              <span className={styles.breadcrumbSep}>›</span>
              <span className={styles.breadcrumbCurrent}>About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Top Section (Image + Info) ────────────────── */}
      <div className={styles.aboutTopSection}>
        <div className="container-x">
          <div className={styles.aboutTopLayout}>
            {/* Image Side */}
            <div className={styles.imageWrapper}>
              <img src={aboutImage} alt="About ShopO" className={styles.aboutImage} />
            </div>

            {/* Content Side */}
            <div className={styles.infoWrapper}>
              <h4 className={styles.subtitle}>Welcome to ShopO</h4>
              <h2 className={styles.title}>
                Best Fashion Online Store for Your Daily Life
              </h2>
              <p className={styles.description}>
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.
              </p>
              
              <p className={styles.highlightText}>
                We provide the best product for you and your family. Your satisfaction is our priority.
              </p>
              
              <p className={styles.description}>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.
              </p>

              <Link to="/home" className={styles.readMoreBtn}>
                Explore Our Shop
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Features Grid ─────────────────────────────── */}
      <div className={styles.featuresSection}>
        <div className="container-x">
          <div className={styles.featuresGrid}>
            {FEATURES.map((feature) => (
              <div key={feature.id} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  {feature.icon}
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDesc}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Newsletter Reused from Components ─────────── */}
      <Newsletter />
    </div>
  );
}
