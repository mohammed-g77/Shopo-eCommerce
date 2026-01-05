import React from 'react';
import { Box, Typography, IconButton, Rating } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { title, price, oldPrice, rating, image, badge } = product;

  return (
    <Box className={styles.productCard}>
      {/* Product Image */}
      <Box className={styles.imageWrapper}>
        {badge && (
          <span className={`${styles.badge} ${styles[badge.toLowerCase().replace(' ', '')]}`}>
            {badge}
          </span>
        )}
        <img src={image} alt={title} className={styles.productImage} />
        
        {/* Hover Actions */}
        <Box className={styles.actionButtons}>
          <IconButton className={styles.actionBtn} title="Add to Wishlist">
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton className={styles.actionBtn} title="Add to Cart">
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton className={styles.actionBtn} title="Quick View">
            <VisibilityOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Product Info */}
      <Box className={styles.productInfo}>
        <Rating
          value={rating}
          precision={0.5}
          size="small"
          readOnly
          className={styles.rating}
        />
        <Typography className={styles.productTitle}>
          {title}
        </Typography>
        <Box className={styles.priceWrapper}>
          <Typography className={styles.currentPrice}>
            ${price.toFixed(2)}
          </Typography>
          {oldPrice && (
            <Typography className={styles.oldPrice}>
              ${oldPrice.toFixed(2)}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductCard;
