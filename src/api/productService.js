import { publicClient, authClient, handleRequest } from "./apiClient";

// ─── Shared helper ────────────────────────────────────────────────────────────

/**
 * Extracts the products array from various API response shapes.
 * @param {*} rawData
 * @returns {Array}
 */
export const extractProductsArray = (rawData) => {
  if (Array.isArray(rawData)) return rawData;
  if (Array.isArray(rawData?.items)) return rawData.items;
  if (Array.isArray(rawData?.data)) return rawData.data;
  if (Array.isArray(rawData?.products)) return rawData.products;
  if (Array.isArray(rawData?.response)) return rawData.response;
  if (Array.isArray(rawData?.response?.data)) return rawData.response.data;
  return [];
};

/**
 * Normalises a raw product object into a consistent shape for the UI.
 * @param {Object} p  - raw product from API
 * @param {number} i  - index (used as fallback id)
 * @returns {Object}
 */
export const normaliseProduct = (p, i = 0) => ({
  id: p.id ?? i,
  name: p.name ?? p.title ?? "Product",
  price: Number(p.price ?? p.salePrice ?? 0),
  oldPrice: p.oldPrice != null ? Number(p.oldPrice) : p.originalPrice != null ? Number(p.originalPrice) : null,
  discount: p.discount ?? null,
  image: p.mainImage ?? p.imageUrl ?? p.image ?? null,
  quantity: p.quantity ?? null,
  categoryId: p.categoryId ?? null,
});

// ─── PUBLIC endpoints ─────────────────────────────────────────────────────────

/**
 * GET /api/Products
 * @param {{ page?: number, limit?: number, sortBy?: string, ascending?: boolean }} params
 * @returns {Promise<Object[]>} normalised product array
 */
export const getProducts = async (params = {}) => {
  const res = await publicClient.get("/Products", { params });
  const rawData = res.data;
  
  // Defensive extraction of pagination data if present
  let totalPages = rawData?.totalPages ?? rawData?.meta?.totalPages ?? rawData?.response?.totalPages ?? null;
  const totalCount = rawData?.totalCount ?? rawData?.meta?.totalCount ?? rawData?.response?.totalCount ?? null;

  if (!totalPages && totalCount) {
     totalPages = Math.ceil(totalCount / (params.limit || 12));
  }

  return {
    items: extractProductsArray(rawData).map(normaliseProduct),
    totalPages,
    totalCount,
    _missingPagination: totalPages === null
  };
};

/**
 * GET /api/Products/{id}
 * @param {number|string} id
 * @returns {Promise<Object>} normalised product
 */
export const getProductById = async (id) => {
  const res = await publicClient.get(`/Products/${id}`);
  return normaliseProduct(res.data);
};

// ─── ADMIN endpoints ──────────────────────────────────────────────────────────

/**
 * POST /api/admin/Products  (multipart/form-data)
 */
export const createProduct = async (payload) => {
  const validationError = validateProductPayload(payload);
  if (validationError) return { success: false, status: 0, message: validationError };

  const formData = buildFormData(payload);
  const res = await authClient.post("/admin/Products", formData, {
    validateStatus: (s) => s < 500,
  });

  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Product created successfully." : res.data?.message ?? `Error ${res.status}`,
  };
};

/**
 * GET /api/admin/Products
 */
export const getAdminProducts = async () => {
  const res = await authClient.get("/admin/Products");
  return extractProductsArray(res.data);
};

// ─── Internal helpers ─────────────────────────────────────────────────────────

const validateProductPayload = ({ translations, price, quantity, categoryId, mainImage }) => {
  if (!Array.isArray(translations) || translations.length < 2)
    return "At least two translations (en, ar) are required.";
  for (const t of translations) {
    if (!t.language?.trim())    return "Each translation must have a language.";
    if (!t.name?.trim())        return `Translation name is required for "${t.language}".`;
    if (!t.description?.trim()) return `Translation description is required for "${t.language}".`;
  }
  if (price === undefined || price === null || price === "") return "Price is required.";
  if (Number(price) < 0) return "Price must be a non-negative number.";
  if (quantity === undefined || quantity === null || quantity === "") return "Quantity is required.";
  if (!categoryId) return "CategoryId is required.";
  if (!(mainImage instanceof File)) return "MainImage must be a File object.";
  return null;
};

const buildFormData = ({ translations, price, discount = 0, quantity, categoryId, mainImage }) => {
  const form = new FormData();
  translations.forEach((t, i) => {
    form.append(`Translations[${i}].language`,    t.language);
    form.append(`Translations[${i}].name`,        t.name);
    form.append(`Translations[${i}].Description`, t.description);
  });
  form.append("Price",      String(price));
  form.append("Discount",   String(discount));
  form.append("Quantity",   String(quantity));
  form.append("CategoryId", String(categoryId));
  form.append("MainImage",  mainImage);
  return form;
};
