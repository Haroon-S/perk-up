import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { UserProfile } from "@/src/store/authStore";

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get<UserProfile>("user/profile/");
  return data;
};

export const useGetUserProfile = (enabled: boolean) => {
  return useQuery<UserProfile>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 1;
    },
    enabled,
  });
};
