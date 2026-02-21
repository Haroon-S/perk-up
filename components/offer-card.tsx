"use client";

import React from "react";
import { Offer } from "@/src/services/perkup/perkup.queries";
import { Button } from "@/components/ui/button";
import { Percent, MapPin, ShieldCheck, Tag } from "lucide-react";

interface OfferCardProps {
    offer: Offer;
    onRedeem: (offer: Offer) => void;
    isPremiumUser: boolean;
}

export function OfferCard({ offer, onRedeem, isPremiumUser }: OfferCardProps) {
    const isLocked = offer.premium_only && !isPremiumUser;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm border transition-all hover:shadow-md">
            {offer.premium_only && (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-purple-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-sm">
                    <ShieldCheck className="size-3" />
                    PREMIUM
                </div>
            )}

            <div className={`p-4 flex flex-col h-full ${offer.premium_only ? "pt-10" : ""}`}>
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                            {offer.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 mt-0.5">
                            {offer.partner.name}
                        </p>
                    </div>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 border">
                        {offer.partner.logo ? (
                            <img src={offer.partner.logo} alt={offer.partner.name} className="size-8 object-contain" />
                        ) : (
                            <Percent className="size-6 text-primary" />
                        )}
                    </div>
                </div>

                <div className="space-y-2 mb-4 flex-1">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Tag className="size-3 text-primary" />
                        <span className="font-semibold text-primary">
                            {offer.discount_value}{offer.discount_type === "PERCENT" ? "%" : ""} OFF
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2">
                        {offer.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                        <MapPin className="size-3" />
                        <span className="truncate">{offer.partner.location}</span>
                    </div>
                </div>

                <Button
                    onClick={() => onRedeem(offer)}
                    disabled={isLocked}
                    className={`w-full ${isLocked ? "bg-slate-100 text-slate-400" : "bg-primary hover:bg-primary/90"}`}
                >
                    {isLocked ? "Premium Only" : "Redeem Now"}
                </Button>
            </div>
        </div>
    );
}
