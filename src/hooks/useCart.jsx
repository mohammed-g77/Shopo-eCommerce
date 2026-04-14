import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "../api/cartService";

// ─── GET cart items ───────────────────────────────────────────────────────────
export function useCart() {
  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    staleTime: 2 * 60 * 1000,
  });
}

// ─── POST /api/Carts — add item ───────────────────────────────────────────────
export function useAddToCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity = 1 }) => addToCart({ productId, quantity }),
    onSuccess: () => {
      // Invalidate cart so the cart icon / cart page auto-refreshes
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

// ─── PATCH /api/Carts/{id} — update quantity ─────────────────────────────────
export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ cartItemId, quantity }) => updateCartItem(cartItemId, quantity),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

// ─── DELETE /api/Carts/{id} — remove item ────────────────────────────────────
export function useRemoveCartItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartItemId) => removeCartItem(cartItemId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

// ─── DELETE /api/Carts/clear — empty cart ────────────────────────────────────
export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}

// Default export for backwards compat
export default useCart;
