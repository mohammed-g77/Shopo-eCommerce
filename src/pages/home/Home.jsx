import React from 'react';
import { Box } from '@mui/material';
import Hero from '../../components/Hero';
import Categories from '../../components/categories/Categories';
import ProductTabs from '../../components/ProductTabs';
import FlashDeals from '../../components/FlashDeals';
import FeaturedProducts from '../../components/FeaturedProducts';
import AdsBanners from '../../components/AdsBanners';
import PromoBanners from '../../components/PromoBanners';
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts';
import Newsletter from '../../components/Newsletter';

const Home = () => {
  return (
    <Box>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FlashDeals />
      <PromoBanners />
      <ProductTabs />
      <TopSellingProducts />
      <AdsBanners />
      <Newsletter />
    </Box>
  );
};

export default Home;
