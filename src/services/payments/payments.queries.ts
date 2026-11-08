import { useQuery } from "@tanstack/react-query";
import { getPayPalConfig, getMembershipSubscription, PayPalConfig } from "./payments.service";

export const usePayPalConfig = (enabled: boolean = true) => {
  return useQuery<PayPalConfig>({
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

export const usePlanPricing = () => {
  const { data: config, isLoading } = usePayPalConfig();

  const priceNumber = config?.price ? Number(config.price) : 3.99;
  const currencySymbol =
    config?.currency_symbol ||
    (config?.currency === "USD" ? "$" : config?.currency === "GBP" ? "£" : "€");
  const priceFormatted = `${currencySymbol}${priceNumber.toFixed(2)}`;

  return {
    price: priceNumber,
    currency: config?.currency || "EUR",
    currencySymbol,
    priceFormatted,
    priceMonthlyText: `${priceFormatted}/mo`,
    pricePerMonthSentence: `${priceFormatted} a month`,
    isLoading,
  };
};
