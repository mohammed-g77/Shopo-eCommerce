import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthReady, loading } = useAuth();
  const location = useLocation();

  if (!isAuthReady || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Redirect to login but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Role not authorized, redirect to home or unauthorized page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
