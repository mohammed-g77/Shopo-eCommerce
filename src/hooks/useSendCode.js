import { useMutation } from "@tanstack/react-query";
import { publicClient } from "../api/apiClient";

export const useSendCode = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await publicClient.post("/auth/Account/SendCode", data);
      return response.data;
    },
  });
};
