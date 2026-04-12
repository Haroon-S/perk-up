"use client";

import React from "react";
import { 
  Check, 
  Crown, 
  ShieldCheck, 
  AlertCircle,
  Loader2,
  Calendar,
  CreditCard
} from "lucide-react";
import { 
  usePayPalConfig, 
  useMembershipSubscription 
} from "@/src/services/payments/payments.queries";
import { PayPalSubscriptionButton } from "@/components/paypal/PayPalSubscriptionButton";
import { useAuthStore } from "@/src/store/authStore";

export default function MembershipPage() {
  const { data: config, isLoading: configLoading } = usePayPalConfig();
  const { data: subscription, isLoading: subLoading, isError } = useMembershipSubscription();
  const user = useAuthStore((state) => state.user);

  const isLoading = configLoading || subLoading;
  
  // Logic to determine if user can subscribe
  const isActive = subscription?.access_status === "enabled" || subscription?.access_status === "admin_enabled";
  const isCancelled = subscription?.status === "cancelled";
  
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-slate-500 font-medium">Loading membership details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Membership & Billing</h1>
        <p className="text-slate-500 text-lg">Manage your subscription and explore premium perks.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        
        {/* Left: Current Status Card */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" />
              Current Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500">Plan Level</span>
                <span className="font-bold uppercase text-slate-900">
                  {subscription?.plan?.name || user?.member_profile?.membership_type || "Free Member"}
                </span>
              </div>
              
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-500">Status</span>
                <div className="flex items-center gap-2">
                  <div className={`size-2 rounded-full ${isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
                  <span className={`font-bold uppercase ${isActive ? 'text-green-600' : 'text-slate-500'}`}>
                    {subscription?.status || "Inactive"}
                  </span>
                </div>
              </div>

              {isActive && subscription?.paypal_subscription_id && (
                <div className="flex justify-between items-center py-3 border-b border-slate-50">
                  <span className="text-slate-500">Billing ID</span>
                  <span className="font-mono text-xs text-slate-400">{subscription.paypal_subscription_id}</span>
                </div>
              )}
            </div>

            {isActive ? (
              <div className="bg-blue-50 p-4 rounded-xl flex items-start gap-3">
                <Calendar className="size-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-700">
                  <p className="font-bold">You are a Premium Member!</p>
                  <p>Enjoy all active perks and exclusive discounts across the platform.</p>
                </div>
              </div>
            ) : isCancelled ? (
              <div className="bg-orange-50 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="size-5 text-orange-600 mt-0.5" />
                <div className="text-sm text-orange-700">
                  <p className="font-bold">Subscription Cancelled</p>
                  <p>Your access has ended. Resubscribe to regain premium benefits.</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center italic">
                Subscribe to Premium to unlock full access.
              </p>
            )}
          </div>
        </div>

        {/* Right: Pricing Card */}
        <div className={`relative bg-white rounded-3xl border-2 shadow-xl overflow-hidden transition-all ${!isActive ? 'border-primary ring-4 ring-primary/5 scale-105' : 'border-slate-100 opacity-60'}`}>
          {/* Badge */}
          {!isActive && (
            <div className="absolute top-4 right-4 animate-bounce">
              <span className="bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                Best Value
              </span>
            </div>
          )}

          <div className="p-8 space-y-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary">
                <Crown className="size-5 fill-primary" />
                <span className="font-bold uppercase tracking-wider text-xs">Premium Monthly</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900">€3.99</span>
                <span className="text-slate-500 font-medium">/month</span>
              </div>
            </div>

            {/* Benefits */}
            <ul className="space-y-4">
              {[
                "Unlimited Perk Redemptions",
                "Exclusive Premium-only Offers",
                "Early Access to Member Events",
                "Priority Partner Support",
                "No Hidden Commitments"
              ].map((benefit, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 rounded-full p-0.5">
                    <Check className="size-3 text-green-600 stroke-[4]" />
                  </div>
                  <span className="text-slate-600 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Action Section */}
            <div className="pt-6">
              {!isActive ? (
                <div className="space-y-4">
                  <PayPalSubscriptionButton 
                    clientId={config?.client_id || ""} 
                    planId={config?.plan_id || ""} 
                  />
                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                    <CreditCard className="size-3" />
                    Secure payment via PayPal
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 bg-slate-50 rounded-xl border border-dashed text-slate-400 font-medium text-sm">
                  Subscription Already Active
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Footer support text */}
      <p className="text-center text-xs text-slate-400 pt-8">
        Subscription payments are handled securely by PayPal. You can manage or cancel your subscription at any time directly from your PayPal account or by contacting us.
      </p>
    </div>
  );
}
