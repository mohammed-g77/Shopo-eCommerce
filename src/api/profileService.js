import { authClient } from "./apiClient";

// ─── GET /api/Profile ────────────────────────────────────────────────────────
export const getProfile = async () => {
  const res = await authClient.get("/Profile");
  const data = res.data;
  if (data?.response) return data.response;
  if (data?.data) return data.data;
  return data;
};

// ─── PATCH /api/Profile ──────────────────────────────────────────────────────
/**
 * @param {{ firstName: string, lastName: string, phoneNumber?: string }} payload
 */
export const updateProfile = async (payload) => {
  const res = await authClient.patch("/Profile", payload, {
    validateStatus: (s) => s < 500,
  });
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Profile updated successfully." : res.data?.message ?? `Update failed (${res.status})`,
  };
};

// ─── PATCH /api/Profile/change-email ─────────────────────────────────────────
/**
 * @param {{ newEmail: string, password?: string }} payload
 */
export const changeEmail = async (payload) => {
  const res = await authClient.patch("/Profile/change-email", payload, {
    validateStatus: (s) => s < 500,
  });
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Email changed successfully." : res.data?.message ?? `Email change failed (${res.status})`,
  };
};

// ─── PATCH /api/Profile/change-password ──────────────────────────────────────
/**
 * @param {{ currentPassword: string, newPassword: string, confirmPassword?: string }} payload
 */
export const changePassword = async (payload) => {
  const res = await authClient.patch("/Profile/change-password", payload, {
    validateStatus: (s) => s < 500,
  });
  const ok = res.status >= 200 && res.status < 300;
  return {
    success: ok,
    status: res.status,
    message: ok ? "Password changed successfully." : res.data?.message ?? `Password change failed (${res.status})`,
  };
};
