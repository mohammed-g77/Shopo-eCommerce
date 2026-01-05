import React, { useState } from 'react';
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
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { menuCategories } from '../data/categories';
import styles from './MainNavbar.module.css';

const MainNavbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

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

          {/* Become a Seller Button */}
          <Button
            variant="contained"
            className={styles.sellerButton}
            component={Link}
            to="/register"
          >
            Become a Seller
          </Button>

          {/* Mobile Menu Button */}
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
            {menuCategories.map((category) => (
              <React.Fragment key={category.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleCategoryClick(category.id)}
                    className={styles.categoryItem}
                  >
                    <ListItemText primary={category.name} />
                    {expandedCategory === category.id ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                
                <Collapse in={expandedCategory === category.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {category.subcategories.map((sub, index) => (
                      <ListItemButton
                        key={index}
                        className={styles.subcategoryItem}
                        component={Link}
                        to={`/shop/${category.name.toLowerCase()}/${sub.toLowerCase()}`}
                        onClick={() => setDrawerOpen(false)}
                      >
                        <ListItemText primary={sub} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default MainNavbar;
