import { useQuery } from "@tanstack/react-query";
import { publicClient } from "../api/apiClient";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await publicClient.get("/Categories");
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
