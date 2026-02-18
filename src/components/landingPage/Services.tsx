"use client";

import { ServiceType } from "@/app/page";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

function ServiceCard({
  service,
  delay,
}: {
  service: ServiceType;
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
        "group rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <div className="text-4xl mb-5">{service.icon}</div>
      <h3 className="text-white font-bold text-xl mb-2">{service.title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{service.desc}</p>
    </div>
  );
}

export function Services({ services }: { services: ServiceType[] }) {
  return (
    <section
      id="services"
      className="relative py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #000000 0%, #080818 100%)",
      }}
    >
      {/* Decorative line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(79,110,255,0.6))",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[#4F6EFF] mb-4">
            What We Offer
          </p>
          <h2
            className="text-5xl md:text-6xl font-black text-white"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            Services
          </h2>
          <div
            className="w-24 h-1 mx-auto mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, #4F6EFF, #8B5CF6)" }}
          />
        </div>

        {/* Highlighted membership card */}
        <div
          className="relative rounded-3xl p-10 md:p-16 mb-8 overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(79,110,255,0.15) 0%, rgba(139,92,246,0.1) 100%)",
            border: "1px solid rgba(79,110,255,0.25)",
          }}
        >
          <div
            className="absolute top-0 right-0 w-96 h-96 opacity-20 rounded-full"
            style={{
              background:
                "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
                style={{
                  background: "rgba(79,110,255,0.2)",
                  color: "#8BA4FF",
                  border: "1px solid rgba(79,110,255,0.3)",
                }}
              >
                ⭐ Most Popular
              </div>
              <h3
                className="text-3xl md:text-4xl font-black text-white mb-3"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                PerkUp Premium
              </h3>
              <p className="text-white/50 max-w-md text-lg">
                Unlimited access to exclusive discounts at partner businesses —
                one simple monthly subscription.
              </p>
            </div>
            <div className="flex-shrink-0 text-center">
              <div
                className="text-6xl font-black text-white"
                style={{ fontFamily: "'Arial Black', sans-serif" }}
              >
                <span className="text-2xl text-white/50 align-top mt-3 inline-block">
                  €
                </span>
                3.99
              </div>
              <div className="text-white/40 text-sm mb-6">per month</div>
              <button
                className="px-8 py-4 rounded-full font-bold text-white text-base whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)",
                  boxShadow: "0 0 30px rgba(79,110,255,0.4)",
                }}
              >
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
