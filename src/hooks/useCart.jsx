import React from 'react'
import { useQuery } from '@tanstack/react-query'
import authAxiosInstance from '../api/authAxiosInstance'
export default function useCart() {

 return useQuery({
    queryKey: ["carts"],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const res = await authAxiosInstance.get("/Carts", {
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

  

}
