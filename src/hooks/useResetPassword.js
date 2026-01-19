import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch("/auth/Account/ResetPassword", data);
      return response.data;
    },
  });
};
