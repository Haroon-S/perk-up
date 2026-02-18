"use client";

import { PartnerType } from "@/app/page";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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
  }, [delay]);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative rounded-2xl p-8 cursor-pointer transition-all duration-500 overflow-hidden",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at center, rgba(79,110,255,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ border: "1px solid rgba(79,110,255,0.3)" }}
      />

      {/* Logo placeholder */}
      <div
        className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center text-2xl"
        style={{
          background: "rgba(79,110,255,0.1)",
          border: "1px solid rgba(79,110,255,0.2)",
        }}
      >
        <Image src={partner.logo} alt="logo" width={36} height={36} />
      </div>
      <p className="text-xs text-[#4F6EFF] tracking-widest uppercase mb-1">
        {partner.location}
      </p>
      <h3 className="text-white font-bold">{partner.name}</h3>
      <p className="text-sm text-white mt-1">{partner.description}</p>
    </div>
  );
}

export function Partners({
  partners,
  isLandingPage = false,
}: {
  partners: PartnerType[];
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {partners.map((partner, i) => (
            <PartnerCard key={partner.id} partner={partner} delay={i * 80} />
          ))}
        </div>

        {isLandingPage && (
          <div className="text-center">
            <Link href="/all-partners">
              <button
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full border font-medium text-sm transition-all duration-300 hover:border-[#4F6EFF]/60"
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
      </div>
    </section>
  );
}
