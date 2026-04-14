import { useMutation } from "@tanstack/react-query";
import { publicClient } from "../api/apiClient";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await publicClient.patch("/auth/Account/ResetPassword", data);
      return response.data;
    },
  });
};
