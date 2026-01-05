import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { promoBanners } from '../data/banners';
import styles from './PromoBanners.module.css';

const PromoBanners = () => {
  return (
    <Box className={styles.promoSection}>
      <div className="container-x">
        <Grid container spacing={3}>
          {promoBanners.map((banner) => (
            <Grid size={{ xs: 12, md: 6 }} key={banner.id}>
              <Box
                className={styles.promoBanner}
                sx={{ backgroundColor: banner.bgColor }}
              >
                <Box className={styles.promoContent}>
                  <Typography className={styles.promoSubtitle}>
                    {banner.subtitle}
                  </Typography>
                  <Typography variant="h4" className={styles.promoTitle}>
                    {banner.title}
                  </Typography>
                  <Typography className={styles.promoDescription}>
                    {banner.description}
                  </Typography>
                  <Link to={banner.link} className={styles.promoLink}>
                    Shop Now <ArrowForwardIcon className={styles.arrowIcon} />
                  </Link>
                </Box>
                <Box className={styles.promoImage}>
                  <img src={banner.image} alt={banner.title} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default PromoBanners;
