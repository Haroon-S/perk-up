"use client";

import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Timer, AlertCircle, CheckCircle2, Tag, X } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetClose
} from "@/components/ui/sheet";
import { Offer } from "@/src/services/perkup/perkup.queries";
import { RedemptionResponse } from "@/src/services/perkup/perkup.mutations";

import { getRedemptionStatus } from "@/src/services/perkup/perkup.queries";

interface RedemptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    offer: Offer | null;
    redemption: RedemptionResponse | null;
}

export function RedemptionModal({ isOpen, onClose, offer, redemption }: RedemptionModalProps) {
    const [timeLeft, setTimeLeft] = useState(120);
    const [status, setStatus] = useState<string>("PENDING");

    // Timer Logic
    useEffect(() => {
        if (!isOpen || !redemption) {
            setTimeLeft(120);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [isOpen, redemption]);

    // Polling Logic
    useEffect(() => {
        if (!isOpen || !redemption || status === "CONFIRMED") return;

        const pollInterval = setInterval(async () => {
            try {
                const data = await getRedemptionStatus(redemption.redemption_id);
                if (data.status === "CONFIRMED") {
                    setStatus("CONFIRMED");
                    clearInterval(pollInterval);
                }
            } catch (error) {
                console.error("Error polling redemption status:", error);
            }
        }, 3000);

        return () => clearInterval(pollInterval);
    }, [isOpen, redemption, status]);

    // Reset status when modal closes
    useEffect(() => {
        if (!isOpen) {
            setStatus("PENDING");
        }
    }, [isOpen]);

    if (!offer || !redemption) return null;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const isConfirmed = status === "CONFIRMED";

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent side="bottom" className="h-[90vh] sm:h-[650px] rounded-t-3xl border-none p-6 outline-none overflow-y-auto">
                <SheetClose className="absolute right-6 top-6 rounded-full p-2 bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors z-50">
                    <X className="size-5" />
                </SheetClose>

                <SheetHeader className="items-center text-center mb-6">
                    <div className={`p-3 rounded-full mb-2 ${isConfirmed ? "bg-green-100" : "bg-primary/10"}`}>
                        {isConfirmed ? (
                            <CheckCircle2 className="size-8 text-green-600 animate-bounce" />
                        ) : (
                            <Tag className="size-8 text-primary" />
                        )}
                    </div>
                    <SheetTitle className="text-2xl font-bold">
                        {isConfirmed ? "Success!" : "Ready to Redeem!"}
                    </SheetTitle>
                    <SheetDescription className="text-base text-slate-500">
                        {isConfirmed
                            ? `Your discount from ${offer.partner.name} has been confirmed.`
                            : `Show this QR code to ${offer.partner.name} to claim your perk.`}
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col items-center justify-center gap-6">
                    {!isConfirmed ? (
                        <>
                            <div className="relative p-6 bg-white rounded-2xl shadow-xl border-4 border-slate-50">
                                <QRCodeSVG value={redemption.token} size={200} level="H" />
                                {timeLeft === 0 && (
                                    <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl p-4 text-center">
                                        <AlertCircle className="size-12 text-destructive mb-2" />
                                        <p className="font-bold text-destructive">Token Expired</p>
                                        <p className="text-xs text-slate-500">Please try again</p>
                                    </div>
                                )}
                            </div>

                            <div className={`flex items-center gap-2 px-6 py-2 rounded-full font-mono text-lg font-bold ${timeLeft < 20 ? "bg-red-50 text-red-600 animate-pulse" : "bg-slate-100 text-slate-700"}`}>
                                <Timer className="size-4" />
                                {minutes}:{seconds.toString().padStart(2, "0")}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center gap-4 py-8 text-center">
                            <div className="size-24 rounded-full bg-green-50 flex items-center justify-center">
                                <CheckCircle2 className="size-16 text-green-500" />
                            </div>
                            <p className="text-slate-600 font-medium">Enjoy your reward!</p>
                        </div>
                    )}

                    <div className="w-full max-w-sm space-y-3 pt-2">
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500 font-medium">Business</span>
                            <span className="font-bold text-slate-900">{offer.partner.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                            <span className="text-slate-500 font-medium">Discount</span>
                            <span className="font-bold text-primary">{offer.title}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs border-b border-slate-100 pb-2 text-slate-400">
                            <span>Reference</span>
                            <span className="font-mono">{redemption.redemption_id.split("-")[0].toUpperCase()}</span>
                        </div>
                    </div>

                    <div className="w-full max-w-sm pt-4 flex gap-3">
                        {isConfirmed ? (
                            <button
                                onClick={onClose}
                                className="w-full bg-slate-900 text-white font-bold h-12 rounded-xl hover:bg-slate-800 transition-colors"
                            >
                                Done
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={onClose}
                                    className="flex-1 bg-slate-100 text-slate-600 font-bold h-12 rounded-xl hover:bg-slate-200 transition-colors"
                                >
                                    Go Back
                                </button>
                                <button
                                    disabled
                                    className="flex-[2] bg-slate-50 text-slate-400 font-medium h-12 rounded-xl text-xs cursor-not-allowed border-2 border-dashed"
                                >
                                    Awaiting Scan...
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
