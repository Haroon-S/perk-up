import { useQuery } from "@tanstack/react-query";
import { getPayPalConfig, getMembershipSubscription } from "./payments.service";

export const usePayPalConfig = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["paypalConfig"],
    queryFn: getPayPalConfig,
    enabled,
    staleTime: 1000 * 60 * 60, // 1 hour
  });
};

export const useMembershipSubscription = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["membershipSubscription"],
    queryFn: getMembershipSubscription,
    enabled,
  });
};
