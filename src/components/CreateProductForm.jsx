import React, { useState } from 'react';
import { createProduct } from '../api/productService';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Stack, Paper } from '@mui/material';

const CreateProductForm = () => {
  // Setup state for form submission statuses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Initial form payload
  const initialFormState = {
    translations: [
      { language: 'en', name: 'product two', description: 'product one description' },
      { language: 'ar', name: 'المنتج الثاني', description: 'وصف المنتج الاول' },
    ],
    price: 300,
    discount: 0,
    quantity: 200,
    categoryId: 3,
    mainImage: null, // this will hold the File object
  };

  const [formData, setFormData] = useState(initialFormState);

  // Handle file input changes separately
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, mainImage: file }));
  };

  // Typical form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous feedback
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      // In a real app, retrieve the token from context, redux, or local storage.
      const token = 'YOUR_ACCESS_TOKEN_HERE'; 

      // Call the reusable service function
      const result = await createProduct(formData, token);

      if (result.success) {
        setSuccessMessage(result.message);
        // Optionally reset the form here
        // setFormData(initialFormState);
      } else {
        setError(result.message);
      }
    } catch (err) {
      // Ensure any unexpected exceptions are caught
      setError('An unexpected error occurred while creating the product.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" mb={3} fontWeight={700}>
        Create New Product
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Stack spacing={3}>
        {/* Placeholder fields to represent complex state like translations/prices */}
        <TextField
          label="English Name"
          value={formData.translations[0].name}
          onChange={(e) => {
            const newTranslations = [...formData.translations];
            newTranslations[0].name = e.target.value;
            setFormData({ ...formData, translations: newTranslations });
          }}
          disabled={loading}
          fullWidth
        />

        <TextField
          label="Arabic Name"
          value={formData.translations[1].name}
          onChange={(e) => {
            const newTranslations = [...formData.translations];
            newTranslations[1].name = e.target.value;
            setFormData({ ...formData, translations: newTranslations });
          }}
          disabled={loading}
          fullWidth
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            disabled={loading}
            fullWidth
          />
          <TextField
            label="Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            disabled={loading}
            fullWidth
          />
        </Stack>

        <Box>
          <Typography variant="subtitle2" mb={1} color="text.secondary">
            Main Image
          </Typography>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{ py: 1.5 }}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
        >
          {loading ? 'Submitting...' : 'Create Product'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default CreateProductForm;
