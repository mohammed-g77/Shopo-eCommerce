import React from 'react';
import { Box } from '@mui/material';
import Hero from '../../components/Hero';
import Categories from '../../components/categories/Categories';
import ProductTabs from '../../components/ProductTabs';
import FlashDeals from '../../components/FlashDeals';
import FeaturedProducts from '../../components/FeaturedProducts';
import PopularSales from '../../components/PopularSales';
import PromoBanners from '../../components/PromoBanners';
import TopSellingProducts from '../../components/TopSellingProducts/TopSellingProducts';
import Newsletter from '../../components/Newsletter';
import NewArrivals from '../../components/NewArrivals';

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
      <NewArrivals />
      <PopularSales />
      <Newsletter />
    </Box>
  );
};

export default Home;
