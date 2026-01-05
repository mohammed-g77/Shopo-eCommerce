import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import { categories } from '../data/categories';
import styles from './CategoryStrip.module.css';

const CategoryStrip = () => {
  return (
    <Box className={styles.categorySection}>
      <div className="container-x">
        <Box className={styles.sectionHeader}>
          <Typography variant="h4" className={styles.sectionTitle}>
            My Market Category
          </Typography>
          <Link to="/shop" className={styles.viewMoreLink}>
            View More →
          </Link>
        </Box>

        <Grid container spacing={2} className={styles.categoryGrid}>
          {categories.map((category) => (
            <Grid size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }} key={category.id}>
              <Link to={`/shop/${category.name.toLowerCase()}`} className={styles.categoryCard}>
                <Box className={styles.iconWrapper}>
                  <img src={category.image} alt={category.name} className={styles.categoryImg} />
                </Box>
                <Typography className={styles.categoryName}>
                  {category.name}
                </Typography>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Box>
  );
};

export default CategoryStrip;
