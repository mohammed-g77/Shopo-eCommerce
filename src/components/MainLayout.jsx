import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import TopBar from './TopBar';
import Header from './Header';
import MainNavbar from './MainNavbar';
import Footer from './Footer';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopBar />
      <Header />
      <MainNavbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default MainLayout;
