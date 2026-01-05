import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { adsData } from '../data/banners';
import styles from './AdsBanners.module.css';

const AdsBanners = () => {
  return (
    <Box className={styles.adsSection}>
      <div className="container-x">
        <Grid container spacing={3}>
          {adsData.map((ad) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={ad.id}>
              <Link to={ad.link} className={styles.adCard}>
                <img src={ad.image} alt={ad.alt} className={styles.adImage} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default AdsBanners;
