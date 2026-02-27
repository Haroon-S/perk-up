"use client";

import { PartnerType } from "@/app/page";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import SectionLoader from "../shared/SectionLoader";

export function PartnerCard({
  partner,
  delay,
}: {
  partner: PartnerType;
  delay: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay, partner]);

  const initial = partner.name?.charAt(0) || "P";

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl p-6 cursor-pointer transition-all duration-500 overflow-hidden flex flex-col h-full",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Dynamic Background Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(79,110,255,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-6">
          {/* Logo or Fallback Avatar */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 transition-transform duration-500 group-hover:scale-110 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,110,255,0.2), rgba(79,110,255,0.05))",
              border: "1px solid rgba(79,110,255,0.3)",
              color: "#4F6EFF",
              boxShadow: "0 8px 16px -4px rgba(0,0,0,0.5)",
            }}
          >
            {partner.logo ? (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="drop-shadow-[0_2px_4px_rgba(79,110,255,0.5)]">
                {initial}
              </span>
            )}
          </div>

          {/* Location Badge */}
          <div className="bg-[#4F6EFF]/10 border border-[#4F6EFF]/20 px-3 py-1 rounded-full">
            <p className="text-[10px] text-[#4F6EFF] tracking-widest uppercase font-bold">
              {partner.location?.split(",")[0] || "Featured"}
            </p>
          </div>
        </div>

        <h3 className="text-white text-xl font-bold group-hover:text-[#4F6EFF] transition-colors">
          {partner.name}
        </h3>
        <p className="text-sm text-white/50 mt-2 line-clamp-2 min-h-10 leading-relaxed">
          {partner.description}
        </p>

        {/* Dynamic Discounts Section */}
        <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
            Active Benefits
          </p>
          {partner.offers && partner.offers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {partner.offers.slice(0, 2).map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 group/offer"
                >
                  <span className="text-sm font-bold text-white group-hover/offer:text-[#4F6EFF]">
                    {offer.discount_type === "PERCENT"
                      ? `${parseFloat(offer.discount_value)}%`
                      : `$${offer.discount_value}`}
                  </span>
                  <span className="text-[10px] text-white/40 border-l border-white/10 pl-2">
                    {offer.title}
                  </span>
                </div>
              ))}
              {partner.offers.length > 2 && (
                <div className="text-[10px] text-white/40 flex items-center px-1">
                  +{partner.offers.length - 2} more
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-white/20 italic">
              No active offers available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Partners({
  partners,
  isLoading,
  isLandingPage = false,
}: {
  partners: PartnerType[];
  isLoading?: boolean;
  isLandingPage?: boolean;
}) {
  return (
    <section id="partners" className="relative py-32 bg-black overflow-hidden">
      {/* Top border glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #4F6EFF, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4F6EFF] mb-4">
            Our Network
          </p>
          <h2
            className="text-5xl md:text-6xl font-black text-white mb-4"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            — Partners —
          </h2>
          <p className="text-white/40 max-w-md mx-auto">
            Discover the businesses where your PerkUp membership saves you money
            every day.
          </p>
        </div>

        {isLoading ? (
          <div className=" w-full h-52">
            <SectionLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {partners.map((partner, i) => (
              <PartnerCard key={partner.id} partner={partner} delay={i * 80} />
            ))}
          </div>
        )}

        {isLandingPage && (
          <div className="text-center">
            <Link href="/all-partners">
              <button
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border font-medium text-sm transition-all duration-300 hover:border-[#4F6EFF]/60 cursor-pointer"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                View All Partners
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
            </Link>
          </div>
        )}
        {/* {isLandingPage && (
          <div className="text-center">
            <Link href="/login">
              <button
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border font-medium text-sm transition-all duration-300 hover:border-[#4F6EFF]/60"
                style={{
                  borderColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                Join Now to Get Benefits
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </button>
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}
