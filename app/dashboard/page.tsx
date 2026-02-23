"use client";
import { ChartNoAxesColumn, Percent, Users, Loader2, Sparkles, AlertCircle, Search } from "lucide-react";
import React, { useState, useMemo } from "react";
import { useGetPartners, useGetOffers } from "@/src/services/perkup/perkup.queries";
import { useGetUserProfile } from "@/src/services/auth/auth.queries";
import { useCreateRedemptionMutation } from "@/src/services/perkup/perkup.mutations";
import { OfferCard } from "@/components/offer-card";
import { RedemptionModal } from "@/components/redemption-modal";
import { useAuthStore } from "@/src/store/authStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const { data: partners, isLoading: partnersLoading } = useGetPartners();
  const { data: offers, isLoading: offersLoading } = useGetOffers();
  const { data: profileData, isLoading: profileLoading, isFetched: profileFetched } = useGetUserProfile(!!useAuthStore.getState().accessToken);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [redemptionData, setRedemptionData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const createRedemption = useCreateRedemptionMutation();

  // Use profileData as priority, fall back to store user
  const currentUser = profileData || user;
  const isPremium = currentUser?.member_profile?.membership_type?.toUpperCase() === "PREMIUM";
  const isProfileReady = profileFetched || !!user;

  const handleRedeem = async (offer: any) => {
    try {
      const data = await createRedemption.mutateAsync({ offer_id: offer.id });
      setRedemptionData(data);
      setSelectedOffer(offer);
      setIsModalOpen(true);
    } catch (error: any) {
      const message = error.response?.data?.detail || "Failed to create redemption";
      toast.error(message);
    }
  };

  const filteredOffers = useMemo(() => {
    if (!offers) return [];
    return offers.filter((offer) =>
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.partner.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [offers, searchQuery]);

  const stats = [
    {
      label: "Active Partners",
      value: partnersLoading ? <Loader2 className="animate-spin size-4" /> : partners?.length || 0,
      icon: Users,
      color: "bg-green-500",
      description: "Businesses offering perks",
    },
    {
      label: "Available Discounts",
      value: currentUser?.member_profile?.total_offers || 0,
      icon: Percent,
      color: "bg-orange-500",
      description: "Exclusive deals for you",
    },
    {
      label: "Redeemed Discounts",
      value: currentUser?.member_profile?.redemption_count || 0,
      icon: Sparkles,
      color: "bg-purple-500",
      description: "Perks you've enjoyed",
    },
    {
      label: "Membership Status",
      value: currentUser?.member_profile?.is_active ? "Active" : "Inactive",
      icon: AlertCircle,
      color: currentUser?.member_profile?.is_active ? "bg-blue-500" : "bg-red-500",
      description: currentUser?.member_profile?.membership_expiry ? `Expires: ${currentUser.member_profile.membership_expiry}` : "No expiry set",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-8 p-4 pt-0">
      {/* Membership Status Banner */}
      {!isProfileReady ? (
        <div className="relative overflow-hidden h-32 rounded-2xl bg-slate-100 flex items-center px-8 border border-slate-200/50">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-3">
              <div className="h-7 w-56 bg-slate-200 rounded-lg animate-pulse" />
              <div className="h-4 w-40 bg-slate-200/80 rounded-lg animate-pulse" />
            </div>
            <div className="h-10 w-36 bg-slate-200 rounded-full animate-pulse hidden md:block" />
          </div>
          <div className="absolute right-0 top-0 -mr-8 -mt-8 size-48 rounded-full bg-slate-200/30 blur-3xl animate-pulse" />
        </div>
      ) : (
        <div className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg ${isPremium ? "bg-gradient-to-r from-purple-600 to-indigo-600" : "bg-gradient-to-r from-slate-700 to-slate-900"}`}>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                Hello, {currentUser?.username || "Member"}!
                {isPremium && <Sparkles className="size-6 text-yellow-300 fill-yellow-300" />}
              </h2>
              <p className="text-white/80 mt-1">
                Your membership level: <span className="font-bold text-white uppercase">{currentUser?.member_profile?.membership_type || "FREE"}</span>
              </p>
            </div>
            {!isPremium && (
              <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-100 transition-colors">
                Upgrade to Premium
              </button>
            )}
          </div>
          <div className="absolute right-0 top-0 -mr-8 -mt-8 size-48 rounded-full bg-white/10 blur-3xl" />
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        {!isProfileReady || partnersLoading ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="relative overflow-hidden min-h-36 bg-white rounded-xl shadow-sm border p-6 flex items-center gap-3">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              <div className="size-12 rounded-lg bg-slate-100 animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-6 w-12 bg-slate-100 rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          stats.map((stat, index) => (
            <div
              key={index}
              className="min-h-36 bg-white rounded-xl text-card-foreground shadow-sm border p-6 flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg ${stat.color} text-white`}>
                <stat.icon className="size-8" />
              </div>
              <div>
                <p className="tracking-tight text-sm font-normal text-slate-500">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-slate-900">{stat.value}</p>
                {stat.description && (
                  <p className="text-[10px] text-muted-foreground mt-1">{stat.description}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Search & Filtering */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search partners or deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 rounded-xl bg-white border-slate-200"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium text-slate-900">{filteredOffers.length}</span>
          <span>results found</span>
        </div>
      </div>

      {/* Available Offers Grid */}
      <div className="space-y-4">
        {offersLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="relative overflow-hidden h-72 rounded-xl bg-white border shadow-sm p-4">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-50/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-2 flex-1">
                    <div className="h-5 w-3/4 bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                  </div>
                  <div className="size-12 rounded-lg bg-slate-100 animate-pulse" />
                </div>
                <div className="space-y-3 mb-6">
                  <div className="h-4 w-1/3 bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
                </div>
                <div className="h-10 w-full bg-slate-100 rounded-lg animate-pulse mt-auto" />
              </div>
            ))}
          </div>
        ) : filteredOffers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredOffers.map((offer) => (
              <OfferCard
                key={offer.id}
                offer={offer}
                onRedeem={handleRedeem}
                isPremiumUser={isPremium}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <div className="p-4 rounded-full bg-slate-100 mb-4">
              <Search className="size-8 text-slate-300" />
            </div>
            <h4 className="text-lg font-semibold text-slate-900">No offers found</h4>
            <p className="text-slate-500 max-w-xs mx-auto mt-1">
              {searchQuery ? `We couldn't find anything matching "${searchQuery}".` : "There are no perks available for your current membership level."}
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mt-4 text-sm font-bold text-primary hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      <RedemptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offer={selectedOffer}
        redemption={redemptionData}
      />
    </div>
  );
}

export default DashboardPage;
