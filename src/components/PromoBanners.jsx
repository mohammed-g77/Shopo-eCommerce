import React from 'react';
import { Link } from 'react-router-dom';
import { promoBanners } from '../data/banners';
import styles from './PromoBanners.module.css';

const PromoBanners = () => {
  return (
    <section className={styles.promoSection}>
      <div className="container-x">
        <div className={styles.grid}>
          {promoBanners.map((banner) => (
            <Link 
              to={banner.link} 
              key={banner.id} 
              className={styles.bannerLink}
            >
              <img 
                src={banner.image} 
                alt={banner.title ? banner.title.replace('\n', ' ') : 'Promo Banner'} 
                className={styles.bgImage} 
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
