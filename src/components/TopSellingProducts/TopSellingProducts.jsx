import React from "react";
import { Link } from "react-router-dom";
import {
  Box, Container, Typography, Stack, Button, Grid, Skeleton, Alert,
} from "@mui/material";
import { useProducts } from "../../hooks/useProducts";
import adsBanner3 from "../../assets/images/ads-2.3.webp";

// Top sellers = highest price descending (4 items to match the 2-col grid)
const PARAMS = { page: 1, limit: 4, sortBy: "price", ascending: false };

const TopSellingProducts = () => {
  const { data, isLoading, isError } = useProducts(PARAMS);
  const products = data?.items || [];

  return (
    <Box component="section" sx={{ py: 6, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4, pb: 1.5, borderBottom: "1px solid #e5e7eb" }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a", m: 0 }}>
            Top Selling Products
          </Typography>
          <Button
            component={Link}
            to="/shop"
            sx={{
              fontSize: 14,
              fontWeight: 600,
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
            Failed to load top selling products.
          </Alert>
        )}

        {/* 2-column grid of horizontal cards */}
        <Grid container spacing={3}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <HorizontalProductCardSkeleton />
                </Grid>
              ))
            : products.length > 0
            ? products.map((product) => (
                <Grid item xs={12} md={6} key={product.id}>
                  <HorizontalProductCard product={product} />
                </Grid>
              ))
            : !isError && (
                <Grid item xs={12}>
                  <Box sx={{ py: 5, textAlign: "center" }}>
                    <Typography color="text.secondary">No products found.</Typography>
                  </Box>
                </Grid>
              )}
        </Grid>

        {/* Bottom promotional banner */}
        <Box sx={{ mt: 6 }}>
          <Link to="/shop/collection" style={{ display: "block", overflow: "hidden", borderRadius: "4px" }}>
            <Box
              component="img"
              src={adsBanner3}
              alt="Promotion Banner"
              sx={{
                width: "100%",
                display: "block",
                objectFit: "cover",
                transition: "transform 0.4s ease",
                "&:hover": { transform: "scale(1.02)" },
              }}
            />
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

// ─── Horizontal Card ──────────────────────────────────────────────────────────

const HorizontalProductCard = ({ product }) => {
  const { id, name, price, oldPrice, image } = product;

  return (
    <Box
      component={Link}
      to={`/product/${id}`}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 2,
        bgcolor: "#fff",
        border: "1px solid #f0f0f0",
        borderRadius: 1,
        textDecoration: "none",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        cursor: "pointer",
        "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.06)" },
        "&:hover .product-img": { transform: "scale(1.05)" },
      }}
    >
      {/* Image */}
      <Box
        sx={{
          width: { xs: 110, sm: 140 },
          height: { xs: 110, sm: 140 },
          bgcolor: "#f2f6f6",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          overflow: "hidden",
          p: 1.5,
        }}
      >
        <Box
          component="img"
          className="product-img"
          src={image || "/placeholder-product.png"}
          alt={name}
          loading="lazy"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transition: "transform 0.4s ease",
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ ml: { xs: 2, sm: 4 }, flex: 1, overflow: "hidden" }}>
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 600,
            color: "#1a1a1a",
            mb: 1,
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#ef262c" }}>
            ${Number(price).toFixed(2)}
          </Typography>
          {oldPrice != null && (
            <Typography sx={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
              ${Number(oldPrice).toFixed(2)}
            </Typography>
          )}
        </Stack>
        <Button
          onClick={(e) => e.preventDefault()}
          sx={{
            bgcolor: "#2b6b6b",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            textTransform: "none",
            letterSpacing: "0.2px",
            borderRadius: 0.5,
            px: 2.5,
            py: 0.75,
            "&:hover": { bgcolor: "#1e4e4e" },
          }}
        >
          Add To Cart
        </Button>
      </Box>
    </Box>
  );
};

// ─── Horizontal Skeleton ──────────────────────────────────────────────────────

const HorizontalProductCardSkeleton = () => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      p: 2,
      border: "1px solid #f0f0f0",
      borderRadius: 1,
    }}
  >
    <Skeleton variant="rectangular" sx={{ width: 140, height: 140, borderRadius: 1, flexShrink: 0 }} />
    <Box sx={{ ml: 4, flex: 1 }}>
      <Skeleton variant="text" width="70%" sx={{ mb: 1 }} />
      <Skeleton variant="text" width="40%" sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width={100} height={32} sx={{ borderRadius: 0.5 }} />
    </Box>
  </Box>
);

export default TopSellingProducts;
