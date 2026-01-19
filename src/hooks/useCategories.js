import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await axiosInstance.get("/Categories", {
        headers: { "Accept-Language": "en" },
      });
      return res.data;
    },
    select: (data) => {
       if (Array.isArray(data)) return data;
      if (Array.isArray(data?.response)) return data.response;
      if (Array.isArray(data?.response?.data)) return data.response.data;
      return [];
    },
  });
};
