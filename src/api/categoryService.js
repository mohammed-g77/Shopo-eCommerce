import { publicClient, authClient } from "./apiClient";

// ─── PUBLIC (no auth) ─────────────────────────────────────────────────────────

/**
 * TODO: WAITING FOR PUBLIC CATEGORY API
 * No public category listing endpoint is currently documented.
 * The admin endpoint (GET /api/admin/Categories) requires auth.
 *
 * This function attempts GET /api/Categories — if/when the backend
 * exposes a public equivalent, update this function accordingly.
 *
 * @returns {Promise<Object[]>}
 */
export const getPublicCategories = async () => {
  const res = await publicClient.get("/Categories");
  const data = res.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.response)) return data.response;
  if (Array.isArray(data?.response?.data)) return data.response.data;
  if (Array.isArray(data?.items)) return data.items;
  return [];
};

// ─── ADMIN (auth required) ───────────────────────────────────────────────────

/**
 * GET /api/admin/Categories
 */
export const getAllAdminCategories = async () => {
  const res = await authClient.get("/admin/Categories", {
    validateStatus: (s) => s < 500,
  });
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    data: ok ? res.data : null,
    message: ok
      ? "Categories fetched successfully."
      : `Failed to fetch categories. Status ${res.status}.`,
  };
};

/**
 * DELETE /api/admin/Categories/{id}
 */
export const deleteCategory = async (categoryId) => {
  if (!categoryId) return { success: false, status: 0, message: "Category ID is required." };
  const res = await authClient.delete(`/admin/Categories/${categoryId}`, {
    validateStatus: (s) => s < 500,
  });
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Category deleted successfully." : `Error ${res.status}.`,
  };
};

/**
 * PATCH /api/admin/Categories/{id}
 */
export const updateCategory = async (categoryId, translations) => {
  if (!categoryId) return { success: false, status: 0, message: "Category ID is required." };
  if (!Array.isArray(translations) || translations.length === 0)
    return { success: false, status: 0, message: "At least one translation is required." };

  const res = await authClient.patch(
    `/admin/Categories/${categoryId}`,
    { translations },
    { validateStatus: (s) => s < 500 }
  );
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Category updated successfully." : `Error ${res.status}.`,
  };
};

/**
 * PATCH /api/admin/Categories/toggle-status/{id}
 */
export const toggleCategoryStatus = async (categoryId) => {
  if (!categoryId) return { success: false, status: 0, message: "Category ID is required." };
  const res = await authClient.patch(
    `/admin/Categories/toggle-status/${categoryId}`,
    {},
    { validateStatus: (s) => s < 500 }
  );
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Category status toggled." : `Error ${res.status}.`,
  };
};
