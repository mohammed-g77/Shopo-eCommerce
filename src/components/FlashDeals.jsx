import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { flashDealData } from '../data/banners';
import styles from './FlashDeals.module.css';

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(flashDealData.endDate) - new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <Box className={styles.flashSection} sx={{ backgroundColor: flashDealData.bgColor }}>
      <div className="container-x">
        <Grid container spacing={4} alignItems="center">
          {/* Left Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className={styles.contentWrapper}>
              <Typography variant="h3" className={styles.flashTitle}>
                {flashDealData.title}
              </Typography>
              <Typography className={styles.flashSubtitle}>
                {flashDealData.subtitle}
              </Typography>
              
              {/* Countdown Timer */}
              <Box className={styles.countdownWrapper}>
                {timeBlocks.map((block) => (
                  <Box key={block.label} className={styles.timeBlock}>
                    <Typography className={styles.timeValue}>
                      {String(block.value).padStart(2, '0')}
                    </Typography>
                    <Typography className={styles.timeLabel}>
                      {block.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
              
              <Button variant="contained" className={styles.shopButton}>
                Shop Now
              </Button>
            </Box>
          </Grid>
          
          {/* Right Image */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box className={styles.imageWrapper}>
              <img 
                src={flashDealData.image} 
                alt="Flash Sale" 
                className={styles.campaignImage}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default FlashDeals;
