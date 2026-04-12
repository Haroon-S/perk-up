import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activateSubscription } from "./payments.service";

export const useActivateSubscriptionMutation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (subscriptionId: string) => activateSubscription(subscriptionId),
    onSuccess: () => {
      // Invalidate both membership status and the general user profile
      queryClient.invalidateQueries({ queryKey: ["membershipSubscription"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
