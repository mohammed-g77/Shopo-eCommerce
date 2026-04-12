import React from 'react';
import useProducts from '../../hooks/useProducts';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function Products() {
  const { data, isLoading, isError, error } = useProducts();
  console.log(data);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <Typography color="error">Error loading products</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {data?.map((item) => (
        <Box key={item.id} sx={{ mb: 2 }}>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body2">{item.price}</Typography>
        </Box>
      ))}
    </Box>
  );
}
