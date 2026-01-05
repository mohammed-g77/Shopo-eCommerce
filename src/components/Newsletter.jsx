import React from 'react';
import { Box, Typography, TextField, Button, Grid } from '@mui/material';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <Box className={styles.newsletterSection}>
      <div className="container-x">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box className={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=400&fit=crop"
                alt="Newsletter"
                className={styles.newsletterImage}
              />
            </Box>
          </Grid>
          
          <Grid size={{ xs: 12, md: 7 }}>
            <Box className={styles.contentWrapper}>
              <Typography variant="h3" className={styles.title}>
                Get 20% Off Your First Order
              </Typography>
              <Typography className={styles.subtitle}>
                Subscribe to our newsletter and get exclusive access to new arrivals, promotions, and insider-only discounts!
              </Typography>
              
              <Box className={styles.subscribeForm}>
                <TextField
                  placeholder="Enter your email address"
                  variant="outlined"
                  size="medium"
                  className={styles.emailInput}
                />
                <Button variant="contained" className={styles.subscribeButton}>
                  Get the Coupon
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Newsletter;
