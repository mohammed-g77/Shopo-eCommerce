import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Stack, Alert } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./shared/ProductCard";
import ProductCardSkeleton from "./shared/ProductCardSkeleton";

const PARAMS = { page: 1, limit: 6, sortBy: "price", ascending: false };

const FeaturedProducts = () => {
  const { data, isLoading, isError } = useProducts(PARAMS);
  const products = data?.items || [];

  return (
    <Box component="section" sx={{ py: 6, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 3, pb: 1.5, borderBottom: "1px solid #e5e7eb" }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a", m: 0 }}>
            Featured Products
          </Typography>
          <Button
            component={Link}
            to="/shop"
            sx={{
              fontSize: 14,
              fontWeight: 500,
              color: "#1a1a1a",
              textTransform: "none",
              "&:hover": { color: "#2b6b6b", bgcolor: "transparent" },
            }}
            disableRipple
          >
            View More &rarr;
          </Button>
        </Stack>

        {/* Error State */}
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to load featured products. Please try again later.
          </Alert>
        )}

        {/* Grid — shows skeletons while loading */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
            gap: "3px",
            bgcolor: "#e5e7eb",
            border: "1px solid #e5e7eb",
          }}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.length > 0
            ? products.map((product) => <ProductCard key={product.id} product={product} />)
            : !isError && (
                <Box sx={{ gridColumn: "1 / -1", py: 6, textAlign: "center" }}>
                  <Typography color="text.secondary">No products found.</Typography>
                </Box>
              )}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProducts;
