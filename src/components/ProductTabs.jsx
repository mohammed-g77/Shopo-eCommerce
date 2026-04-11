import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import styles from './ProductTabs.module.css';

const tabs = [
  { label: 'Featured',    category: 'featured'    },
  { label: 'New Arrival', category: 'new'         },
  { label: 'Best Selling', category: 'bestselling' },
];

// Inline SVG icons — no extra deps
const ExpandIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
const HeartIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const RefreshIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const filtered = products
    .filter((p) => p.category === tabs[activeTab].category)
    .slice(0, 8);

  return (
    <section className={styles.section}>
      <div className="container-x">

        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Popular Sales</h2>
          <div className={styles.tabList}>
            {tabs.map((tab, i) => (
              <button
                key={tab.category}
                className={`${styles.tabBtn} ${i === activeTab ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid — 4 columns */}
        <div className={styles.grid}>
          {filtered.map((product) => (
            <PopularCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* ── Card ───────────────────────────────────────────────────────── */
const PopularCard = ({ product }) => {
  const { title, price, oldPrice, image, badge } = product;

  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        {badge && (
          <span className={`${styles.badge} ${styles[`badge_${badge.toLowerCase().replace(/\s/g, '')}`]}`}>
            {badge}
          </span>
        )}
        <img src={image} alt={title} className={styles.img} />

        {/* Side icon buttons */}
        <div className={styles.sideActions}>
          <button className={styles.iconBtn} title="Quick View"><ExpandIcon /></button>
          <button className={styles.iconBtn} title="Wishlist"><HeartIcon /></button>
          <button className={styles.iconBtn} title="Compare"><RefreshIcon /></button>
        </div>

        {/* Add To Cart hover bar */}
        <div className={styles.addToCartBar}>
          <button className={styles.addToCartBtn}>Add To Cart</button>
        </div>
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{title}</p>
        <div className={styles.prices}>
          <span className={styles.salePrice}>${price.toFixed(2)}</span>
          {oldPrice && <span className={styles.oldPrice}>${oldPrice.toFixed(2)}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
