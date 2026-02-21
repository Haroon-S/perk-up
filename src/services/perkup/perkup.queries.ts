import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

export interface Partner {
    id: number;
    name: string;
    logo: string | null;
    description: string;
    location: string;
}

export interface Offer {
    id: number;
    partner: Partner;
    title: string;
    discount_type: string;
    discount_value: string;
    description: string;
    premium_only: boolean;
    usage_frequency: string;
}

export const getPartners = async (): Promise<Partner[]> => {
    const { data } = await axiosInstance.get<Partner[]>("partners/");
    return data;
};

export const getOffers = async (): Promise<Offer[]> => {
    const { data } = await axiosInstance.get<Offer[]>("offers/");
    return data;
};

export const getRedemptionStatus = async (redemptionId: string): Promise<{ status: string }> => {
    const { data } = await axiosInstance.get<{ status: string }>(`status/?redemption_id=${redemptionId}`);
    return data;
};

export const useGetPartners = () => {
    return useQuery<Partner[]>({
        queryKey: ["partners"],
        queryFn: getPartners,
    });
};

export const useGetOffers = () => {
    return useQuery<Offer[]>({
        queryKey: ["offers"],
        queryFn: getOffers,
    });
};
