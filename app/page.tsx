"use client";
import { Navbar } from "@/src/components/landingPage/Navbar";
import { Hero } from "@/src/components/landingPage/Hero";
import { Partners } from "@/src/components/landingPage/Partners";
import { Services } from "@/src/components/landingPage/Services";
import { Footer } from "@/src/components/landingPage/Footer";
import { useGetPartners } from "@/src/services/perkup/perkup.queries";

// ─── Utility: simple cn helper (use clsx/cn from shadcn if available) ─────────

// ─── Data ─────────────────────────────────────────────────────────────────────

export interface PartnerType {
  id: number;
  logo: string | null;
  name: string;
  description: string;
  location: string;
  offers?: Array<{
    id: number;
    title: string;
    discount_type: string;
    discount_value: string;
  }>;
}

export interface ServiceType {
  icon: string;
  title: string;
  desc: string;
}

const services = [
  {
    icon: "💳",
    title: "Premium Membership",
    desc: "One subscription, unlimited access to exclusive deals across the island.",
  },
  {
    icon: "🏷️",
    title: "Exclusive Discounts",
    desc: "Partner discounts curated for members only — unavailable to the public.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  const { data: realPartners } = useGetPartners();

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Partners partners={realPartners || []} isLandingPage />
      <Services services={services} />
      <Footer />
    </main>
  );
}
