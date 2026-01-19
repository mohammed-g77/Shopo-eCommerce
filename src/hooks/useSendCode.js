import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useSendCode = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/Account/SendCode", data);
      return response.data;
    },
  });
};
