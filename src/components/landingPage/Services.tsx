"use client";

import { ServiceType } from "@/app/page";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { usePlanPricing } from "@/src/services/payments/payments.queries";

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
  const { price, currencySymbol } = usePlanPricing();

  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="max-w-5xl mx-auto">
        {/* Section title */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-[#4F6EFF] mb-3 font-semibold">
            What You Get
          </p>
          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            One Membership.
            <br />
            Endless Perks.
          </h2>
        </div>

        {/* Pricing banner */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-12 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(79,110,255,0.15) 0%, rgba(139,92,246,0.15) 100%)",
            border: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white mb-4">
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
                  {currencySymbol}
                </span>
                {price.toFixed(2)}
              </div>
              <div className="text-white/40 text-sm mb-6">per month</div>
              <a href="/register/">
                <button
                  className="px-8 py-4 rounded-full font-bold text-white text-base whitespace-nowrap cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)",
                    boxShadow: "0 0 30px rgba(79,110,255,0.4)",
                  }}
                >
                  Join Now
                </button>
              </a>
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
