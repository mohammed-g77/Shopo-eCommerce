import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logoImg from '../assets/images/logo-2.svg';
import paymentImg from '../assets/images/payment-getways.webp';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <Box component="footer" className={styles.footer}>
      <div className="container-x">
        <Grid container spacing={4} className={styles.footerGrid}>
          {/* Logo & Social */}
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <img src={logoImg} alt="Shopo" className={styles.footerLogo} />
            
            <Box className={styles.socialLinks}>
              <Link href="#" className={styles.socialIcon}>
                <InstagramIcon />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <FacebookIcon />
              </Link>
              <Link href="#" className={styles.socialIcon}>
                <YouTubeIcon />
              </Link>
            </Box>
            
            <Box className={styles.quickLinks}>
              <Link href="#" className={styles.footerLink}>Track Order</Link>
              <Link href="#" className={styles.footerLink}>Delivery & Returns</Link>
              <Link href="#" className={styles.footerLink}>Warranty</Link>
            </Box>
          </Grid>

          {/* About Us */}
          <Grid size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography className={styles.columnTitle}>About us</Typography>
            <Box className={styles.linkList}>
              <Link href="#" className={styles.footerLink}>Rave's Story</Link>
              <Link href="#" className={styles.footerLink}>Work With Us</Link>
              <Link href="#" className={styles.footerLink}>Corporate News</Link>
              <Link href="#" className={styles.footerLink}>Investors</Link>
            </Box>
          </Grid>

          {/* Online Shop */}
          <Grid size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography className={styles.columnTitle}>Online Shop</Typography>
            <Box className={styles.linkList}>
              <Link href="#" className={styles.footerLink}>Furniture</Link>
              <Link href="#" className={styles.footerLink}>Decoration</Link>
              <Link href="#" className={styles.footerLink}>Kitchen</Link>
              <Link href="#" className={styles.footerLink}>Interior</Link>
            </Box>
          </Grid>

          {/* Useful Links */}
          <Grid size={{ xs: 6, sm: 6, md: 2 }}>
            <Typography className={styles.columnTitle}>Useful Links</Typography>
            <Box className={styles.linkList}>
              <Link href="#" className={styles.footerLink}>Secure Payment</Link>
              <Link href="#" className={styles.footerLink}>Privacy Policy</Link>
              <Link href="#" className={styles.footerLink}>Terms of Use</Link>
              <Link href="#" className={styles.footerLink}>Archived Products</Link>
            </Box>
          </Grid>

          {/* Contact */}
          <Grid size={{ xs: 6, sm: 6, md: 3 }}>
            <Typography className={styles.columnTitle}>Contact</Typography>
            <Box className={styles.linkList}>
              <Typography className={styles.contactInfo}>
                📍 123 Main Street, City
              </Typography>
              <Typography className={styles.contactInfo}>
                📞 +1 (555) 123-4567
              </Typography>
              <Typography className={styles.contactInfo}>
                ✉️ support@shopo.com
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box className={styles.bottomBar}>
          <Typography className={styles.copyright}>
            ©2024 <strong>Shopo</strong> All rights reserved
          </Typography>
          
          <Box className={styles.paymentIcons}>
            <img src={paymentImg} alt="Payment Methods" className={styles.paymentImage} />
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default Footer;
