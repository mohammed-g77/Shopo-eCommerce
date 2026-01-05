import React, { useState } from 'react';
import { Box, Typography, Tabs, Tab, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import styles from './ProductTabs.module.css';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: 'Featured', category: 'featured' },
    { label: 'New Arrival', category: 'new' },
    { label: 'Best Selling', category: 'bestselling' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const filteredProducts = products.filter(
    (product) => product.category === tabs[activeTab].category
  );

  return (
    <Box className={styles.productSection}>
      <div className="container-x">
        <Box className={styles.sectionHeader}>
          <Typography variant="h4" className={styles.sectionTitle}>
            Popular Products
          </Typography>
          
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            className={styles.tabs}
            TabIndicatorProps={{ className: styles.tabIndicator }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={tab.category}
                label={tab.label}
                className={styles.tab}
              />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default ProductTabs;
