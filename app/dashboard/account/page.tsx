"use client";

import React from "react";
import { useAuthStore } from "@/src/store/authStore";

export default function AccountPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Account Details</h1>
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <p className="text-lg">{user?.username || "N/A"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-lg">{user?.email || "N/A"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Membership Type</label>
                        <p className="text-lg uppercase">{user?.member_profile?.membership_type || "FREE"}</p>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Membership ID</label>
                        <p className="text-lg font-mono">{user?.member_profile?.membership_id || "N/A"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
