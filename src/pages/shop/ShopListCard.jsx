import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box, Typography, Stack, Button, Chip, Snackbar, Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAddToCart } from "../../hooks/useCart";

/**
 * Horizontal list-view card for the Shop page.
 * Mirrors the same data shape as ProductCard.
 */
const ShopListCard = ({ product }) => {
  const { id, name, price, oldPrice, discount, image } = product;
  const { mutateAsync: addToCart, isPending } = useAddToCart();
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSnack({ open: true, message: "Please log in to add items to cart.", severity: "warning" });
      return;
    }
    const result = await addToCart({ productId: id, quantity: 1 });
    setSnack({
      open: true,
      message: result.success ? "Added to cart!" : result.message,
      severity: result.success ? "success" : "error",
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: { xs: 2, sm: 3 },
          p: { xs: 2, sm: 3 },
          bgcolor: "#fff",
          border: "1px solid #f0f0f0",
          borderRadius: 1,
          transition: "box-shadow 0.2s",
          "&:hover": { boxShadow: "0 8px 24px rgba(0,0,0,0.07)" },
          "&:hover .list-img": { transform: "scale(1.04)" },
        }}
      >
        {/* Image */}
        <Box
          component={Link}
          to={`/product/${id}`}
          sx={{
            width: { xs: 120, sm: 160 },
            height: { xs: 120, sm: 160 },
            flexShrink: 0,
            bgcolor: "#f7f8f9",
            borderRadius: 1,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 1.5,
          }}
        >
          <Box
            component="img"
            className="list-img"
            src={image || "/placeholder-product.png"}
            alt={name}
            loading="lazy"
            sx={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              transition: "transform 0.35s ease",
            }}
          />
        </Box>

        {/* Info */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            {/* Discount badge */}
            {discount != null && Number(discount) > 0 && (
              <Chip
                label={`-${discount}%`}
                size="small"
                sx={{ bgcolor: "#ef262c", color: "#fff", fontWeight: 700, fontSize: 11, mb: 1 }}
              />
            )}

            {/* Name */}
            <Typography
              component={Link}
              to={`/product/${id}`}
              sx={{
                display: "block",
                fontSize: { xs: 15, sm: 17 },
                fontWeight: 600,
                color: "#1a1a1a",
                textDecoration: "none",
                mb: 1,
                lineHeight: 1.35,
                "&:hover": { color: "#2b6b6b" },
              }}
            >
              {name}
            </Typography>

            {/* Price */}
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 800, color: "#ef262c" }}>
                ${Number(price).toFixed(2)}
              </Typography>
              {oldPrice != null && (
                <Typography sx={{ fontSize: 14, color: "#9ca3af", textDecoration: "line-through" }}>
                  ${Number(oldPrice).toFixed(2)}
                </Typography>
              )}
            </Stack>
          </Box>

          {/* Actions */}
          <Stack direction="row" spacing={1.5}>
            <Button
              variant="contained"
              disabled={isPending}
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              sx={{
                bgcolor: "#2b6b6b",
                color: "#fff",
                fontWeight: 600,
                fontSize: 13,
                textTransform: "none",
                borderRadius: 0.5,
                px: 2.5,
                py: 1,
                "&:hover": { bgcolor: "#224f4f" },
                "&.Mui-disabled": { bgcolor: "#9ca3af", color: "#fff" },
              }}
            >
              {isPending ? "Adding…" : "Add to Cart"}
            </Button>
            <Button
              component={Link}
              to={`/product/${id}`}
              variant="outlined"
              sx={{
                color: "#2b6b6b",
                borderColor: "#2b6b6b",
                fontWeight: 600,
                fontSize: 13,
                textTransform: "none",
                borderRadius: 0.5,
                px: 2.5,
                py: 1,
                "&:hover": { bgcolor: "#f0f9f9", borderColor: "#2b6b6b" },
              }}
            >
              View Details
            </Button>
          </Stack>
        </Box>
      </Box>

      {/* Toast */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled" sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ShopListCard;
