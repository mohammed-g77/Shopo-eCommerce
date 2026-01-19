import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';

import styles from './MainNavbar.module.css';

const MainNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          'https://knowledgeshop.runasp.net/api/Categories',
          {
            headers: {
              'Accept-Language': 'en',
            },
          }
        );
        setCategories(res.data.response || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Shop', path: '/shop' },
    { name: 'Pages', path: '/pages' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <Box className={styles.navbar}>
      <div className="container-x">
        <Box className={styles.navbarContent}>
          {/* All Categories Button */}
          <Button
            variant="contained"
            className={styles.categoryButton}
            startIcon={<MenuIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={() => setDrawerOpen(true)}
          >
            All Categories
          </Button>

          {/* Navigation Links */}
          <Box className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={styles.navLink}>
                {link.name}
              </Link>
            ))}
          </Box>

          {/* Auth Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
            <Button
              variant="contained"
              className={styles.sellerButton}
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </Box>

          {/* Mobile Menu */}
          <IconButton
            className={styles.mobileMenuButton}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </div>

      {/* Categories Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className={styles.drawer}
      >
        <Box className={styles.drawerContent}>
          <Box className={styles.drawerHeader}>
            <span className={styles.drawerTitle}>All Categories</span>
          </Box>

          <List className={styles.categoryList}>
            {categories.map((category) => (
              <ListItem disablePadding key={category.id}>
                <ListItemButton
                  component={Link}
                  to={`/shop/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, '-')}`}
                  className={styles.categoryItem}
                  onClick={() => setDrawerOpen(false)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MainNavbar;
