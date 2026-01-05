import React from 'react';
import { Box } from '@mui/material';
import Hero from '../../components/Hero';
import CategoryStrip from '../../components/CategoryStrip';
import ProductTabs from '../../components/ProductTabs';
import FlashDeals from '../../components/FlashDeals';
import AdsBanners from '../../components/AdsBanners';
import PromoBanners from '../../components/PromoBanners';
import Newsletter from '../../components/Newsletter';

const Home = () => {
  return (
    <Box>
      <Hero />
      <CategoryStrip />
      <ProductTabs />
      <AdsBanners />
      <FlashDeals />
      <PromoBanners />
      <Newsletter />
    </Box>
  );
};

export default Home;
