"use client";

import React from "react";
import { useAuthStore } from "@/src/store/authStore";
import { useGetUserProfile } from "@/src/services/auth/auth.queries";
import { User, Mail, Shield, Hash, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function AccountPage() {
    const user = useAuthStore((state) => state.user);
    const { data: profileData, isLoading, isFetched } = useGetUserProfile(!!useAuthStore.getState().accessToken);

    const currentUser = profileData || user;
    const isProfileReady = isFetched || !!user;

    const sections = [
        { label: "Username", value: currentUser?.username, icon: User },
        { label: "Email", value: currentUser?.email, icon: Mail },
        { label: "Membership", value: currentUser?.member_profile?.membership_type, icon: Shield, isUpper: true },
        { label: "Membership ID", value: currentUser?.member_profile?.membership_id, icon: Hash, isMono: true },
        { label: "Status", value: currentUser?.member_profile?.is_active ? "Active" : "Inactive", icon: currentUser?.member_profile?.is_active ? CheckCircle2 : AlertCircle, color: currentUser?.member_profile?.is_active ? "text-green-500" : "text-red-500" },
        { label: "Expires On", value: currentUser?.member_profile?.membership_expiry || "No expiry", icon: Calendar },
    ];

    return (
        <div className="flex flex-1 flex-col gap-6 p-6 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Account Settings</h1>
                <p className="text-slate-500 mt-1">View your profile and membership details.</p>
            </div>

            <div className="grid gap-6">
                {!isProfileReady ? (
                    <div className="relative overflow-hidden rounded-2xl border bg-white p-8 shadow-sm space-y-8">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="size-10 rounded-full bg-slate-100 animate-pulse" />
                                <div className="space-y-2 flex-1">
                                    <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                                    <div className="h-5 w-48 bg-slate-100 rounded animate-pulse" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border bg-white p-8 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                            {sections.map((section, idx) => (
                                <div key={idx} className="flex items-start gap-4 group">
                                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <section.icon className="size-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            {section.label}
                                        </label>
                                        <p className={`text-base font-medium text-slate-900 ${section.isUpper ? "uppercase" : ""} ${section.isMono ? "font-mono text-sm" : ""} ${section.color || ""}`}>
                                            {section.value || "Loading..."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
