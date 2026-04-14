import { authClient } from "./apiClient";

// ─── Types (JSDoc) ────────────────────────────────────────────────────────────
/**
 * @typedef {Object} CartItem
 * @property {number} id
 * @property {number} productId
 * @property {number} quantity
 * @property {string} [productName]
 * @property {number} [price]
 * @property {string} [image]
 */

// ─── GET /api/Carts ───────────────────────────────────────────────────────────
export const getCart = async () => {
  const res = await authClient.get("/Carts");
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.items)) return data.items;
  if (Array.isArray(data?.response)) return data.response;
  return [];
};

// ─── POST /api/Carts ──────────────────────────────────────────────────────────
/**
 * Adds a product to the cart.
 * @param {{ productId: number, quantity: number }} payload
 * @returns {Promise<{ success: boolean, status: number, message: string }>}
 */
export const addToCart = async ({ productId, quantity = 1 }) => {
  if (!productId) return { success: false, status: 0, message: "Product ID is required." };

  const res = await authClient.post(
    "/Carts",
    { productId, quantity },
    { validateStatus: (s) => s < 500 }
  );

  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok
      ? "Product added to cart."
      : res.data?.message ?? `Error ${res.status}`,
  };
};

// ─── PATCH /api/Carts/{id} ────────────────────────────────────────────────────
export const updateCartItem = async (cartItemId, quantity) => {
  const res = await authClient.patch(
    `/Carts/${cartItemId}`,
    { quantity },
    { validateStatus: (s) => s < 500 }
  );
  const ok = res.status >= 200 && res.status < 300;
  return { success: ok, status: res.status, message: ok ? "Cart updated." : `Error ${res.status}` };
};

// ─── DELETE /api/Carts/{id} ───────────────────────────────────────────────────
export const removeCartItem = async (cartItemId) => {
  const res = await authClient.delete(
    `/Carts/${cartItemId}`,
    { validateStatus: (s) => s < 500 }
  );
  const ok = res.status >= 200 && res.status < 300;
  return { success: ok, status: res.status, message: ok ? "Item removed." : `Error ${res.status}` };
};

// ─── DELETE /api/Carts/clear ──────────────────────────────────────────────────
export const clearCart = async () => {
  const res = await authClient.delete(
    "/Carts/clear",
    { validateStatus: (s) => s < 500 }
  );
  const ok = res.status >= 200 && res.status < 300;
  return { success: ok, status: res.status, message: ok ? "Cart cleared." : `Error ${res.status}` };
};
