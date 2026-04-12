"use client";

import React from "react";
import { 
  PayPalScriptProvider, 
  PayPalButtons, 
  usePayPalScriptReducer 
} from "@paypal/react-paypal-js";
import { Loader2, AlertCircle } from "lucide-react";
import { useActivateSubscriptionMutation } from "@/src/services/payments/payments.mutations";
import { toast } from "sonner";

interface PayPalButtonProps {
  clientId: string;
  planId: string;
}

const ButtonWrapper = ({ clientId, planId }: PayPalButtonProps) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const activateSubscription = useActivateSubscriptionMutation();

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="size-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <PayPalButtons
      style={{
        label: "subscribe",
        shape: "pill",
        color: "blue",
        layout: "vertical",
      }}
      createSubscription={(data, actions) => {
        return actions.subscription.create({
          plan_id: planId,
        });
      }}
      onApprove={async (data) => {
        const subscriptionId = data.subscriptionID;
        if (!subscriptionId) {
          toast.error("No subscription ID received from PayPal.");
          return;
        }

        try {
          await activateSubscription.mutateAsync(subscriptionId);
          toast.success("Membership activated! Welcome to Premium.");
        } catch (error: any) {
          console.error("Activation error:", error);
          toast.error(error.response?.data?.error || "Failed to activate your membership. Please contact support.");
        }
      }}
      onCancel={() => {
        toast.info("Subscription checkout was cancelled.");
      }}
      onError={(err) => {
        console.error("PayPal Error:", err);
        toast.error("A PayPal connection error occurred. Please try again.");
      }}
    />
  );
};

export const PayPalSubscriptionButton = ({ clientId, planId }: PayPalButtonProps) => {
  if (!clientId || !planId) {
    return (
      <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
        <AlertCircle className="size-5 text-red-500 mt-0.5" />
        <div className="text-sm">
          <p className="font-bold text-red-700">Checkout Unavailable</p>
          <p className="text-red-600">The membership system is missing required configuration. Please contact site admins.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[300px] mx-auto">
      <PayPalScriptProvider
        options={{
          clientId: clientId,
          components: "buttons",
          intent: "subscription",
          vault: true,
        }}
      >
        <ButtonWrapper clientId={clientId} planId={planId} />
      </PayPalScriptProvider>
    </div>
  );
};
