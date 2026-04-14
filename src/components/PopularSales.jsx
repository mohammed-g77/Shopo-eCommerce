import React from "react";
import { Link } from "react-router-dom";
import {
  Box, Container, Typography, Grid, Stack, Button, Skeleton, Alert,
} from "@mui/material";
import { useProducts } from "../hooks/useProducts";

// 12 products to fill the 3-column × 4-row horizontal list layout
const PARAMS = { page: 1, limit: 12, sortBy: "id", ascending: false };

const PopularSales = () => {
  const { data, isLoading, isError } = useProducts(PARAMS);
  const products = data?.items || [];

  // Split into 3 columns of 4
  const col1 = products.slice(0, 4);
  const col2 = products.slice(4, 8);
  const col3 = products.slice(8, 12);

  const skeletonCols = [0, 1, 2]; // used when loading

  return (
    <Box component="section" sx={{ py: 6, bgcolor: "#f7f8f9" }}>
      <Container maxWidth="lg">
        {/* Section Header */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 4 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a", m: 0 }}>
            Popular Sales
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
            Failed to load popular sales products.
          </Alert>
        )}

        {/* 3-column horizontal list grid */}
        <Grid container spacing={3}>
          {isLoading
            ? skeletonCols.map((col) => (
                <Grid item xs={12} md={4} key={col}>
                  <ColumnBox products={[]} loading />
                </Grid>
              ))
            : [col1, col2, col3].map((colProducts, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <ColumnBox products={colProducts} />
                </Grid>
              ))}
        </Grid>
      </Container>
    </Box>
  );
};

// ─── Column of 4 horizontal items ────────────────────────────────────────────

const ColumnBox = ({ products, loading = false }) => (
  <Box sx={{ bgcolor: "#fff", display: "flex", flexDirection: "column" }}>
    {loading
      ? Array.from({ length: 4 }).map((_, i) => <HorizontalItemSkeleton key={i} isLast={i === 3} />)
      : products.map((p, i) => (
          <HorizontalListItem key={p.id} product={p} isLast={i === products.length - 1} />
        ))}
  </Box>
);

// ─── Single horizontal mini-item ─────────────────────────────────────────────

const HorizontalListItem = ({ product, isLast }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    component={Link}
    to={`/product/${product.id}`}
    sx={{
      p: 2,
      borderBottom: isLast ? "none" : "1px solid #f0f0f0",
      textDecoration: "none",
      transition: "background-color 0.2s",
      "&:hover": { bgcolor: "#fbfbfb" },
      "&:hover .title": { color: "#2b6b6b" },
      "&:hover .img-img": { transform: "scale(1.1)" },
    }}
  >
    {/* Thumbnail */}
    <Box
      sx={{
        width: 76,
        height: 76,
        bgcolor: "#f7f8f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 1.5,
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      <Box
        component="img"
        className="img-img"
        src={product.image || "/placeholder-product.png"}
        alt={product.name}
        loading="lazy"
        sx={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          transition: "transform 0.3s ease",
        }}
      />
    </Box>

    {/* Details */}
    <Box sx={{ overflow: "hidden" }}>
      <Typography
        className="title"
        sx={{
          fontSize: 14,
          fontWeight: 600,
          color: "#1a1a1a",
          mb: 0.5,
          transition: "color 0.2s",
          lineHeight: 1.3,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {product.name}
      </Typography>
      <Stack direction="row" spacing={1} alignItems="center">
        {product.oldPrice != null && (
          <Typography sx={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
            ${Number(product.oldPrice).toFixed(2)}
          </Typography>
        )}
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#ef262c" }}>
          ${Number(product.price).toFixed(2)}
        </Typography>
      </Stack>
    </Box>
  </Stack>
);

// ─── Skeleton for a single horizontal item ────────────────────────────────────

const HorizontalItemSkeleton = ({ isLast }) => (
  <Stack
    direction="row"
    spacing={2}
    alignItems="center"
    sx={{ p: 2, borderBottom: isLast ? "none" : "1px solid #f0f0f0" }}
  >
    <Skeleton variant="rectangular" width={76} height={76} sx={{ flexShrink: 0 }} />
    <Box sx={{ flex: 1 }}>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="50%" />
    </Box>
  </Stack>
);

export default PopularSales;
