import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, IconButton, Button, Snackbar, Alert } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAddToCart } from "../../hooks/useCart";

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────
const QuickViewIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const WishlistIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const CompareIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

const ACTION_ICONS = [<QuickViewIcon />, <WishlistIcon />, <CompareIcon />];
const ACTION_TITLES = ["Quick View", "Wishlist", "Compare"];

// ─── ProductCard ──────────────────────────────────────────────────────────────
/**
 * Reusable product card used across all homepage sections and the Shop page.
 *
 * Props:
 *  - product: { id, name, price, oldPrice, discount, image }
 */
const ProductCard = ({ product }) => {
  const { id, name, price, oldPrice, discount, image } = product;
  const { mutateAsync: addToCart, isPending } = useAddToCart();
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const handleAddToCart = async (e) => {
    e.preventDefault();
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
        component={Link}
        to={`/product/${id}`}
        sx={{
          display: "block",
          textDecoration: "none",
          bgcolor: "#f7f8f9",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
          transition: "background-color 0.2s, box-shadow 0.2s",
          "&:hover": { bgcolor: "#fff", boxShadow: "0 8px 24px rgba(0,0,0,0.07)" },
          "&:hover .product-img": { transform: "scale(1.05)" },
          "&:hover .side-actions": { transform: "translateY(-50%) translateX(0)", opacity: 1 },
          "&:hover .add-to-cart-bar": { bottom: 0 },
        }}
      >
        {/* Discount Badge */}
        {discount != null && Number(discount) > 0 && (
          <Box sx={{
            position: "absolute", top: 10, left: 10, zIndex: 2,
            bgcolor: "#ef262c", color: "#fff", fontSize: 11, fontWeight: 700,
            px: 1, py: 0.25, borderRadius: "2px",
          }}>
            -{discount}%
          </Box>
        )}

        {/* Image Area */}
        <Box sx={{
          position: "relative", aspectRatio: "1 / 1", overflow: "hidden",
          bgcolor: "#f7f8f9", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Box
            component="img"
            className="product-img"
            src={image || "/placeholder-product.png"}
            alt={name}
            loading="lazy"
            sx={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.35s ease" }}
          />

          {/* Side quick-action buttons */}
          <Stack
            className="side-actions"
            direction="column"
            spacing={1}
            sx={{
              position: "absolute", right: 12, top: "50%",
              transform: "translateY(-50%) translateX(60px)",
              opacity: 0, transition: "transform 0.3s ease, opacity 0.3s ease", zIndex: 3,
            }}
          >
            {ACTION_TITLES.map((title, i) => (
              <IconButton
                key={title}
                title={`${title} (TODO: WAITING FOR API SUPPORT)`}
                disabled
                sx={{
                  width: 36, height: 36, bgcolor: "#fff", color: "#444",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                  opacity: 0.5, cursor: "not-allowed",
                }}
              >
                {ACTION_ICONS[i]}
              </IconButton>
            ))}
          </Stack>

          {/* Add to Cart slide-up bar */}
          <Box
            className="add-to-cart-bar"
            sx={{
              position: "absolute", bottom: -48, left: 0, right: 0,
              zIndex: 3, transition: "bottom 0.3s ease",
            }}
          >
            <Button
              fullWidth
              disabled={isPending}
              onClick={handleAddToCart}
              startIcon={<ShoppingCartIcon sx={{ fontSize: "16px !important" }} />}
              sx={{
                py: 1.5, bgcolor: "#2b6b6b", color: "#fff", fontSize: 13,
                fontWeight: 600, letterSpacing: "0.3px", borderRadius: 0,
                textTransform: "none",
                "&:hover": { bgcolor: "#224f4f" },
                "&.Mui-disabled": { bgcolor: "#9ca3af", color: "#fff" },
              }}
            >
              {isPending ? "Adding…" : "Add To Cart"}
            </Button>
          </Box>
        </Box>

        {/* Product Info */}
        <Box sx={{ p: "14px 16px 18px", textAlign: "center" }}>
          <Typography sx={{
            fontSize: 14, fontWeight: 500, color: "#1a1a1a",
            mb: 0.75, lineHeight: 1.4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {name}
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#ef262c" }}>
              ${Number(price).toFixed(2)}
            </Typography>
            {oldPrice != null && (
              <Typography sx={{ fontSize: 13, color: "#9ca3af", textDecoration: "line-through" }}>
                ${Number(oldPrice).toFixed(2)}
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>

      {/* Toast Notification */}
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

export default ProductCard;
