import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Grid, Container, Alert } from "@mui/material";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import DevicesIcon from "@mui/icons-material/Devices";
import HailIcon from "@mui/icons-material/Hail";
import WatchIcon from "@mui/icons-material/Watch";
import KitchenIcon from "@mui/icons-material/Kitchen";
import SpaIcon from "@mui/icons-material/Spa";
import CategoryIcon from "@mui/icons-material/Category";
import { getPublicCategories } from "../../api/categoryService";

/**
 * Maps a category name string to a relevant MUI icon.
 */
const getCategoryIcon = (name = "") => {
  const key = name.toLowerCase();
  if (key.includes("mobile") || key.includes("phone"))  return <SmartphoneIcon />;
  if (key.includes("cloth") || key.includes("fashion")) return <CheckroomIcon />;
  if (key.includes("electron") || key.includes("tech")) return <DevicesIcon />;
  if (key.includes("shoe") || key.includes("footwear")) return <HailIcon />;
  if (key.includes("access") || key.includes("watch"))  return <WatchIcon />;
  if (key.includes("home") || key.includes("kitchen"))  return <KitchenIcon />;
  if (key.includes("beauty") || key.includes("care"))   return <SpaIcon />;
  return <CategoryIcon />;
};

// ─── Skeleton placeholder for a single category item ─────────────────────────
const CategorySkeleton = () => (
  <Box sx={{ textAlign: "center" }}>
    <Box
      sx={{
        width: 90, height: 90, borderRadius: "50%",
        bgcolor: "#e9eef0", mx: "auto", mb: 1.5,
        animation: "pulse 1.5s ease-in-out infinite",
        "@keyframes pulse": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      }}
    />
    <Box sx={{ height: 14, width: 70, bgcolor: "#e9eef0", borderRadius: 1, mx: "auto" }} />
  </Box>
);

// ─── Categories Section ───────────────────────────────────────────────────────

/**
 * TODO: WAITING FOR PUBLIC CATEGORY API
 * Currently uses GET /api/Categories — this endpoint is NOT listed in the
 * official public docs. Only GET /api/admin/Categories (auth-required) is
 * documented. Replace `getPublicCategories()` with a confirmed public
 * endpoint once the backend exposes one.
 */
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let active = true;
    const fetch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data = await getPublicCategories();
        if (active) setCategories(data);
      } catch {
        if (active) setIsError(true);
      } finally {
        if (active) setIsLoading(false);
      }
    };
    fetch();
    return () => { active = false; };
  }, []);

  return (
    <Box sx={{ py: 5, textAlign: "center" }}>
      <Container>
        {/* Header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            My Market Category
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#000",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            View More →
          </Typography>
        </Box>

        {/* Error */}
        {isError && (
          <Alert severity="warning" sx={{ mb: 3, textAlign: "left" }}>
            Could not load categories. The public category endpoint may not be available yet.
          </Alert>
        )}

        {/* Loading Skeletons */}
        {isLoading && (
          <Grid container spacing={4} justifyContent="center">
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid item key={i} xs={6} sm={4} md={3} lg={2}>
                <CategorySkeleton />
              </Grid>
            ))}
          </Grid>
        )}

        {/* Empty State */}
        {!isLoading && !isError && categories.length === 0 && (
          <Typography color="text.secondary" sx={{ py: 4 }}>
            No categories available.
          </Typography>
        )}

        {/* Category Icons Grid */}
        {!isLoading && categories.length > 0 && (
          <Grid container spacing={4} justifyContent="center">
            {categories.map((cat) => (
              <Grid item key={cat.id} xs={6} sm={4} md={3} lg={2}>
                <Box sx={{ textAlign: "center", cursor: "pointer" }}>
                  <Box
                    sx={{
                      width: 90, height: 90, mx: "auto",
                      borderRadius: "50%", bgcolor: "#f2f6f6",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#2b6b6b",
                      transition: "all 0.3s ease",
                      "&:hover": { bgcolor: "#2b6b6b", color: "#fff", transform: "translateY(-4px)" },
                    }}
                  >
                    {getCategoryIcon(cat.name)}
                  </Box>
                  <Typography sx={{ mt: 1.5, fontWeight: 500 }}>
                    {cat.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
