import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { heroBanners } from '../data/banners';
import styles from './Hero.module.css';

const Hero = () => {
  const leftBanner = heroBanners[0];
  const rightBanner = heroBanners[1];

  return (
    <Box className={styles.heroSection}>
      <div className="container-x">
        <Grid container spacing={3}>
          {/* Left Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              className={styles.bannerCard}
              sx={{ backgroundColor: '#eef6f6' }}
            >
              
              <Box className={styles.bannerImage}>
                <img src={leftBanner.image} alt="Pouf Ottomans cloth" />
              </Box>
            </Box>
          </Grid>

          {/* Right Banner */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              className={styles.bannerCard}
              sx={{ backgroundColor: '#f9f4ea' }}
            >
               
              <Box className={styles.bannerImage}>
                <img src={rightBanner.image} alt="Motozed Reclein Sofa" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Hero;
