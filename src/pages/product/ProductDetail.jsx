import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box, Container, Typography, Button, Stack, Grid,
  Skeleton, Alert, Chip, Divider,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useProductById } from "../../hooks/useProducts";
import { useAddToCart } from "../../hooks/useCart";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useProductById(id);
  const { mutate: addToCart, isPending: isAdding } = useAddToCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart({ productId: product.id, quantity: 1 });
    }
  };

  if (isError) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Alert
            severity="error"
            action={
              <Button component={Link} to="/home" size="small">
                Go Home
              </Button>
            }
          >
            Failed to load product. Please try again or go back home.
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box component="main" sx={{ py: 6, bgcolor: "#fff" }}>
      <Container maxWidth="lg">

        {/* Breadcrumb */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/home"
            startIcon={<ArrowBackIcon />}
            sx={{ color: "#6b7280", textTransform: "none", fontWeight: 500 }}
          >
            Home
          </Button>
          <Typography color="text.secondary">/</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            {isLoading ? <Skeleton width={120} /> : product?.name ?? "Product"}
          </Typography>
        </Stack>

        <Grid container spacing={6}>
          {/* ── Product Image ── */}
          <Grid item xs={12} md={5}>
            {isLoading ? (
              <Skeleton variant="rectangular" sx={{ width: "100%", aspectRatio: "1/1", borderRadius: 2 }} />
            ) : (
              <Box
                sx={{
                  bgcolor: "#f7f8f9",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 4,
                  aspectRatio: "1 / 1",
                }}
              >
                <Box
                  component="img"
                  src={product?.image || "/placeholder-product.png"}
                  alt={product?.name}
                  sx={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </Box>
            )}
          </Grid>

          {/* ── Product Info ── */}
          <Grid item xs={12} md={7}>
            {isLoading ? (
              <Box>
                <Skeleton variant="text" width="70%" height={40} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="30%" height={32} sx={{ mb: 2 }} />
                <Skeleton variant="rectangular" height={80} sx={{ mb: 3 }} />
                <Skeleton variant="rectangular" width={180} height={48} />
              </Box>
            ) : (
              <>
                {/* Name */}
                <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a1a1a", mb: 1, lineHeight: 1.3 }}>
                  {product?.name}
                </Typography>

                {/* Price Row */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: 800, color: "#ef262c" }}>
                    ${Number(product?.price ?? 0).toFixed(2)}
                  </Typography>
                  {product?.oldPrice != null && (
                    <Typography sx={{ fontSize: 16, color: "#9ca3af", textDecoration: "line-through" }}>
                      ${Number(product.oldPrice).toFixed(2)}
                    </Typography>
                  )}
                  {product?.discount != null && product.discount > 0 && (
                    <Chip
                      label={`-${product.discount}%`}
                      size="small"
                      sx={{ bgcolor: "#ef262c", color: "#fff", fontWeight: 700, fontSize: 12 }}
                    />
                  )}
                </Stack>

                <Divider sx={{ mb: 3 }} />

                {/* Availability */}
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
                  <Typography sx={{ fontWeight: 600, color: "#374151" }}>Availability:</Typography>
                  <Chip
                    label={product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                    size="small"
                    sx={{
                      bgcolor: product?.quantity > 0 ? "#dcfce7" : "#fee2e2",
                      color: product?.quantity > 0 ? "#16a34a" : "#dc2626",
                      fontWeight: 600,
                    }}
                  />
                </Stack>

                {/* Add to Cart */}
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCartIcon />}
                  disabled={product?.quantity === 0 || isAdding}
                  onClick={handleAddToCart}
                  sx={{
                    bgcolor: "#2b6b6b",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 15,
                    px: 4,
                    py: 1.5,
                    textTransform: "none",
                    borderRadius: 1,
                    "&:hover": { bgcolor: "#224f4f" },
                    "&.Mui-disabled": { bgcolor: "#d1d5db", color: "#6b7280" },
                  }}
                >
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;
