"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { StatRow } from "./StatRow";
import { handleScrollToSection } from "@/src/utilities/globalHelpers";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{
            background: "radial-gradient(circle, #4F6EFF 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            animationDuration: "4s",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
            bottom: "0%",
            right: "-5%",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse 5s ease-in-out infinite 1s",
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(79,110,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79,110,255,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase mb-8 border transition-all duration-700",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
          )}
          style={{
            borderColor: "rgba(79,110,255,0.4)",
            background: "rgba(79,110,255,0.1)",
            color: "#8BA4FF",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#4F6EFF] animate-pulse" />
          Now live across the island
        </div>

        {/* Headline */}
        <h1
          className={cn(
            "text-6xl md:text-8xl font-black leading-none tracking-tight mb-6 transition-all duration-700 delay-100",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          <span className="text-white">Save More,</span>
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #4F6EFF 0%, #8B5CF6 60%, #C084FC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Live Better.
          </span>
        </h1>

        {/* Sub */}
        <p
          className={cn(
            "text-lg md:text-xl text-white/50 max-w-xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          PerkUp is an innovative platform where members pay a small
          subscription of just{" "}
          <span className="text-white font-semibold">€3.99 a month.</span>. In
          return, they gain access to a variety of exclusive discounts that help
          them save money while supporting businesses !!
        </p>

        {/* CTAs */}
        <div
          className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-700 delay-300",
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <button
            className="relative group px-8 py-4 rounded-full font-bold text-white text-base overflow-hidden shadow-lg"
            style={{
              background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)",
              boxShadow: "0 0 40px rgba(79,110,255,0.4)",
            }}
          >
            <span className="relative z-10">Start Saving — €3.99/mo</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #6B8AFF, #A78BFA)",
              }}
            />
          </button>
          <button
            onClick={() => handleScrollToSection("partners")}
            className="px-8 py-4 rounded-full font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-300 text-base"
          >
            View Partners →
          </button>
        </div>

        {/* Stats */}
        <StatRow />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-white tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent animate-bounce" />
      </div>
    </section>
  );
}
