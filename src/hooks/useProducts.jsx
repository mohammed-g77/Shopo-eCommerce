import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "../api/productService";

/**
 * Fetches a list of products from GET /api/Products.
 *
 * @param {{ page?: number, limit?: number, sortBy?: string, ascending?: boolean }} params
 * @param {Object} [queryOptions]  - any extra react-query options
 */
export function useProducts(params = {}, queryOptions = {}) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
}

/**
 * Fetches a single product by ID from GET /api/Products/{id}.
 *
 * @param {number|string} id
 * @param {Object} [queryOptions]
 */
export function useProductById(id, queryOptions = {}) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    ...queryOptions,
  });
}

// Default export kept for backwards compatibility
export default useProducts;
