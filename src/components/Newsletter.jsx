import React from 'react';
import { Box, Container, Typography, InputBase, Button } from '@mui/material';
import bgImage from '../assets/images/discount-banner-2.webp';

const Newsletter = () => {
  return (
    <Box 
      component="section" 
      sx={{ 
        py: { xs: 8, md: 10 }, 
        bgcolor: '#2b6b6b', // Fallback color
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        
        {/* Title */}
        <Typography 
          variant="h3" 
          sx={{ 
            fontSize: { xs: 24, md: 36 }, 
            fontWeight: 700, 
            color: '#1a1a1a', 
            mb: 1.5,
            letterSpacing: '-0.5px'
          }}
        >
          Get <Box component="span" sx={{ color: '#ffb321' }}>20%</Box> Off Discount Coupon
        </Typography>

        {/* Subtitle */}
        <Typography 
          sx={{ 
            fontSize: { xs: 15, md: 17 }, 
            color: '#1a1a1a', 
            fontWeight: 500, 
            mb: 5 
          }}
        >
          by Subscribe our Newsletter
        </Typography>

        {/* Form Container */}
        <Box 
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fff',
            borderRadius: 0,
            maxWidth: 650,
            mx: 'auto',
            height: 60,
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
            transition: 'box-shadow 0.3s ease',
            '&:hover, &:focus-within': {
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
            }
          }}
        >
          {/* Email Icon SVG */}
          <Box sx={{ display: 'flex', pl: 3, pr: 1.5, color: '#888' }}>
            <svg 
              viewBox="0 0 24 24" 
              width="22" 
              height="22" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </Box>

          {/* Email Input */}
          <InputBase
            placeholder="EMAIL ADDRESS"
            sx={{ 
              flex: 1, 
              fontSize: 14, 
              color: '#333',
              fontWeight: 500,
              '& input::placeholder': {
                color: '#8e969a',
                opacity: 1,
                fontSize: 12,
                letterSpacing: '0.5px'
              }
            }}
          />

          {/* Submit Button */}
          <Button 
            type="submit"
            disableElevation
            sx={{
              height: '100%',
              px: { xs: 3, md: 5 },
              bgcolor: '#ffb321', // Yellow Button
              color: '#1a1a1a',
              fontSize: 14,
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 0,
              whiteSpace: 'nowrap',
              transition: 'background-color 0.2s',
              '&:hover': {
                bgcolor: '#e69f1a', // Darker yellow on hover
              }
            }}
          >
            Get the Coupon
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Newsletter;
