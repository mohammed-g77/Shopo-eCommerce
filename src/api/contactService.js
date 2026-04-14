/**
 * TODO: WAITING FOR CONTACT API
 *
 * No contact form endpoint has been provided yet.
 * When a real endpoint is available, replace the mock below with:
 *
 *   import axiosInstance from "./axiosInstance";
 *   export const submitContactForm = async (payload) => {
 *     const res = await axiosInstance.post("/Contact", payload, {
 *       validateStatus: (s) => s < 500,
 *     });
 *     const ok = res.status >= 200 && res.status < 300;
 *     return { success: ok, message: ok ? "Message sent!" : res.data?.message ?? `Error ${res.status}` };
 *   };
 *
 * For now, this simulates a successful submission after a 1.5s delay.
 */

/**
 * @typedef {Object} ContactPayload
 * @property {string} name
 * @property {string} email
 * @property {string} subject
 * @property {string} message
 */

/**
 * Mock contact form submission.
 * @param {ContactPayload} payload
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const submitContactForm = async (payload) => {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Basic server-side-style check (would be real validation server-side)
  if (!payload.email.includes("@")) {
    return { success: false, message: "Invalid email address." };
  }

  // TODO: WAITING FOR CONTACT API — replace this mock with real API call
  console.info("[ContactService] Mock submit — payload:", payload);

  return {
    success: true,
    message: "Your message has been sent successfully. We'll get back to you soon!",
  };
};
