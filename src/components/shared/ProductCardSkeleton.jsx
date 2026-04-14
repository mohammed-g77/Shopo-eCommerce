import React from "react";
import { Box, Skeleton, Stack } from "@mui/material";

/**
 * Skeleton placeholder that matches the ProductCard layout.
 * Use while products are loading.
 */
const ProductCardSkeleton = () => (
  <Box sx={{ bgcolor: "#f7f8f9", overflow: "hidden" }}>
    {/* Image area */}
    <Skeleton variant="rectangular" sx={{ aspectRatio: "1 / 1", width: "100%" }} />
    {/* Info area */}
    <Box sx={{ p: "14px 16px 18px" }}>
      <Skeleton variant="text" width="80%" sx={{ mx: "auto", mb: 0.75 }} />
      <Stack direction="row" justifyContent="center" spacing={1}>
        <Skeleton variant="text" width={50} />
        <Skeleton variant="text" width={40} />
      </Stack>
    </Box>
  </Box>
);

export default ProductCardSkeleton;
