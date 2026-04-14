import axios from "axios";

const BASE_URL = "https://knowledgeshop.runasp.net/api/";

// ─── Public Client ─────────────────────────────────────────────────────────────
export const publicClient = axios.create({
  baseURL: BASE_URL,
});

publicClient.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = "en";
  return config;
});

// ─── Protected Client ──────────────────────────────────────────────────────────
export const authClient = axios.create({
  baseURL: BASE_URL,
});

authClient.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = "en";
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  
  // Auto JSON/Form-data handling natively supported by axios, but we explicitly
  // check for instances of FormData to override Content-Type if necessary.
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

// ─── Global API Handler ────────────────────────────────────────────────────────
/**
 * A reusable wrapper for API requests.
 * Normalizes all responses into: { success, status, data, message }
 * Handles both Axios errors and clean validation errors uniformly.
 */
export const handleRequest = async (requestPromise) => {
  try {
    const res = await requestPromise;
    // Assume any 2xx status is success directly handled by interceptors if not thrown
    const isSuccess = res.status >= 200 && res.status < 300;
    
    // Normalization trick for data shapes seen in this API
    let payload = res.data;
    if (payload && payload.response !== undefined) payload = payload.response;
    else if (payload && payload.items !== undefined) payload = payload.items;
    
    return {
      success: isSuccess,
      status: res.status,
      data: isSuccess ? payload : null,
      message: isSuccess 
        ? "Success" 
        : (res.data?.message || `API Error ${res.status}`)
    };
  } catch (error) {
    // Return graceful structured error instead of throwing to callers
    return {
      success: false,
      status: error.response?.status || 0,
      data: null,
      message: error.response?.data?.message || error.message || "Network request failed",
    };
  }
};
