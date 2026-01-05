import React from 'react';
import { Box, Typography, Select, MenuItem, Link } from '@mui/material';
import styles from './TopBar.module.css';

const TopBar = () => {
  return (
    <Box className={styles.topBar}>
      <div className="container-x">
        <Box className={styles.topBarContent}>
          {/* Left Links */}
          <Box className={styles.leftLinks}>
            <Link href="#" className={styles.link}>Account</Link>
            <Link href="#" className={styles.link}>Track Order</Link>
            <Link href="#" className={styles.link}>Support</Link>
          </Box>

          {/* Right Dropdowns */}
          <Box className={styles.rightDropdowns}>
            <Select
              defaultValue="us"
              variant="standard"
              className={styles.select}
              disableUnderline
            >
              <MenuItem value="us">🇺🇸 United States</MenuItem>
              <MenuItem value="ae">🇦🇪 UAE</MenuItem>
              <MenuItem value="uk">🇬🇧 United Kingdom</MenuItem>
            </Select>

            <Select
              defaultValue="usd"
              variant="standard"
              className={styles.select}
              disableUnderline
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
              <MenuItem value="gbp">GBP</MenuItem>
            </Select>

            <Select
              defaultValue="en"
              variant="standard"
              className={styles.select}
              disableUnderline
            >
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="ar">العربية</MenuItem>
              <MenuItem value="bn">বাংলা</MenuItem>
            </Select>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default TopBar;
