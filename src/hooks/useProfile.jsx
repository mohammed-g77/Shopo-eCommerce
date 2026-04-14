import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateProfile, changeEmail, changePassword } from "../api/profileService";

// ─── GET Profile ──────────────────────────────────────────────────────────────
export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
    staleTime: 5 * 60 * 1000, 
    retry: 1,
  });
};

// ─── UPDATE Profile ───────────────────────────────────────────────────────────
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
};

// ─── CHANGE Email ─────────────────────────────────────────────────────────────
export const useChangeEmail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: changeEmail,
    onSuccess: (result) => {
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      }
    },
  });
};

// ─── CHANGE Password ─────────────────────────────────────────────────────────
export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
  });
};
