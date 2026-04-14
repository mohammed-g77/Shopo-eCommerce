import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Container, Typography, Button, Stack, Alert, Tabs, Tab } from "@mui/material";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./shared/ProductCard";
import ProductCardSkeleton from "./shared/ProductCardSkeleton";

const TABS_CONFIG = [
  { label: "Featured",     sortBy: "price", ascending: false },
  { label: "New Arrival",  sortBy: "id",    ascending: false },
  { label: "Best Selling", sortBy: "price", ascending: true  },
];

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const config = TABS_CONFIG[activeTab];

  const { data, isLoading, isError } = useProducts(
    { page: 1, limit: 8, sortBy: config.sortBy, ascending: config.ascending },
    // Re-fetch when tab changes — queryKey includes params so this works automatically
  );

  const products = data?.items || [];

  return (
    <Box component="section" sx={{ py: 6, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          gap={2}
          sx={{ mb: 4 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
            Popular Sales
          </Typography>

          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{
              style: { backgroundColor: "#2b6b6b", height: "3px", borderRadius: "2px" },
            }}
            sx={{
              minHeight: "40px",
              "& .MuiTab-root": {
                fontWeight: 600,
                fontSize: 15,
                color: "#6b7280",
                textTransform: "none",
                minHeight: "40px",
                px: 2,
                transition: "all 0.2s",
              },
              "& .Mui-selected": { color: "#2b6b6b !important" },
            }}
          >
            {TABS_CONFIG.map((tab) => (
              <Tab key={tab.label} label={tab.label} />
            ))}
          </Tabs>

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
            Failed to load products. Please try again later.
          </Alert>
        )}

        {/* Card Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 3,
          }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.length > 0
            ? products.map((product) => <ProductCard key={product.id} product={product} />)
            : !isError && (
                <Box sx={{ gridColumn: "1 / -1", py: 8, textAlign: "center" }}>
                  <Typography color="text.secondary">No products found.</Typography>
                </Box>
              )}
        </Box>
      </Container>
    </Box>
  );
};

export default ProductTabs;
