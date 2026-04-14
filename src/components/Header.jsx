import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Badge,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import logoImg from '../assets/images/logo-2.svg';
import styles from './Header.module.css';

const Header = () => {
  const { data: cartItems } = useCart();
  const cartTotal = cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <Box className={styles.header}>
      <div className="container-x">
        <Box className={styles.headerContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="Shopo" className={styles.logoImage} />
          </Link>

          {/* Search Bar */}
          <Box className={styles.searchContainer}>
            <Select
              defaultValue="all"
              variant="outlined"
              className={styles.categorySelect}
              size="small"
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="fashion">Fashion</MenuItem>
              <MenuItem value="home">Home & Garden</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </Select>
            
            <TextField
              placeholder="Search Product..."
              variant="outlined"
              size="small"
              className={styles.searchInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className={styles.searchButton}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Right Icons */}
          <Box className={styles.iconContainer}>
            <IconButton 
              className={styles.iconButton} 
              title="Compare (TODO: WAITING FOR API SUPPORT)" 
              disabled
              sx={{ opacity: 0.5 }}
            >
              <CompareArrowsIcon />
            </IconButton>
            
            <IconButton 
              className={styles.iconButton} 
              title="Wishlist (TODO: WAITING FOR API SUPPORT)" 
              disabled
              sx={{ opacity: 0.5 }}
            >
              <FavoriteBorderIcon />
            </IconButton>
            
            <Link to="/cart" className={styles.cartLink}>
              <IconButton className={styles.iconButton}>
                <Badge badgeContent={cartTotal} color="error">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Link>
            
            <Link to="/profile" className={styles.profileLink}>
              <IconButton className={styles.iconButton}>
                <PersonOutlineIcon />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Header;
