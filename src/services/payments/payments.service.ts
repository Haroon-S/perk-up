import axiosInstance from "@/lib/axios";

export interface PayPalConfig {
  client_id: string;
  currency: string;
  plan_id: string | null;
}

export interface MembershipSubscription {
  paypal_subscription_id: string;
  status: string;
  access_status: string;
  plan: {
    name: string;
    price: string;
    currency: string;
  };
}

export const getPayPalConfig = async (): Promise<PayPalConfig> => {
  const { data } = await axiosInstance.get<PayPalConfig>("payments/paypal/config/");
  return data;
};

export const activateSubscription = async (subscriptionId: string): Promise<MembershipSubscription> => {
  const { data } = await axiosInstance.post<MembershipSubscription>("payments/paypal/subscriptions/activate/", {
    subscription_id: subscriptionId,
  });
  return data;
};

export const getMembershipSubscription = async (): Promise<MembershipSubscription | null> => {
  try {
    const { data } = await axiosInstance.get<MembershipSubscription>("payments/membership/subscription/");
    // The backend returns a specific object or 200 with inactive status
    return data;
  } catch (error) {
    return null;
  }
};
