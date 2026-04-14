import { authClient } from "./apiClient";

export const createCheckout = async (payload) => {
  const res = await authClient.post("/Checkouts", payload, {
    validateStatus: (s) => s < 500,
  });
  
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Order placed successfully." : res.data?.message ?? `Checkout failed (${res.status})`,
    data: res.data
  };
};
