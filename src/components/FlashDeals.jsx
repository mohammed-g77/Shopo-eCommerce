import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { flashDealData } from '../data/banners';

const countdownColors = ['#ef262c', '#2b6b6b', '#2b9640', '#f97316'];
const countdownLabels = ['Days', 'Hours', 'Minutes', 'Seconds'];

const FlashDeals = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(flashDealData.endDate) - new Date();
      if (diff > 0) {
        setTimeLeft({
          days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeValues = [
    timeLeft.days,
    timeLeft.hours,
    timeLeft.minutes,
    timeLeft.seconds,
  ];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: '#b5dff7',
        
        overflow: 'hidden',
        my: 5,
        mx:21,
        px:5

      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={3}
          sx={{ py: { xs: 4, md: 5 } }}
        >
          {/* ── Left: countdown + text ── */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', md: '50%' } }}
   
          >
            {/* Circular countdown */}
            <Stack direction="row" gap={2} mb={3} flexWrap="wrap">
              {countdownLabels.map((label, i) => (
                <Box
                  key={label}
                  sx={{
                    width:  { xs: 64, sm: 80 },
                    height: { xs: 64, sm: 80 },
                    borderRadius: '50%',
                    bgcolor: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: 20, sm: 26 },
                      fontWeight: 800,
                      lineHeight: 1,
                      color: countdownColors[i],
                    }}
                  >
                    {String(timeValues[i]).padStart(2, '0')}
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 11,
                      fontWeight: 500,
                      color: '#555',
                      mt: '2px',
                    }}
                  >
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>

            {/* Title */}
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: 24, sm: 28, md: 36 },
                fontWeight: 800,
                color: '#1a1a1a',
                lineHeight: 1.2,
                mb: 1.25,
              }}
            >
              {flashDealData.title}
            </Typography>

            {/* Subtitle */}
            <Typography
              sx={{
                fontSize: 14,
                color: '#4a4a4a',
                lineHeight: 1.6,
                maxWidth: 380,
                mb: 3,
              }}
            >
              {flashDealData.subtitle}
            </Typography>

            {/* CTA Button */}
            <Button
              component={Link}
              to="/shop"
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#ffbb38',
                color: '#1a1a1a',
                fontSize: 14,
                fontWeight: 700,
                textTransform: 'none',
                letterSpacing: '0.2px',
                borderRadius: 1,
                px: 3.5,
                py: 1.375,
                transition: 'background 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  bgcolor: '#e6a830',
                  transform: 'translateX(3px)',
                },
              }}
            >
              Shop Now &nbsp;›
            </Button>
          </Box>

          {/* ── Right: product image ── */}
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: '48%' },
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: { xs: 'center', md: 'flex-end' },
            }}
          >
            <Box
              component="img"
              src={flashDealData.image}
              alt="Flash Sale"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default FlashDeals;
