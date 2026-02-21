import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

interface CreateRedemptionPayload {
    offer_id: number;
}

export interface RedemptionResponse {
    token: string;
    expires_at: string;
    redemption_id: string;
}

export const createRedemption = async (payload: CreateRedemptionPayload): Promise<RedemptionResponse> => {
    const { data } = await axiosInstance.post<RedemptionResponse>("redeem/create/", payload);
    return data;
};

export const useCreateRedemptionMutation = () => {
    return useMutation({
        mutationFn: createRedemption,
    });
};
