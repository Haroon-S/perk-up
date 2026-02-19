"use client";
import { Navbar } from "@/src/components/landingPage/Navbar";
import { Hero } from "@/src/components/landingPage/Hero";
import { Partners } from "@/src/components/landingPage/Partners";
import { Services } from "@/src/components/landingPage/Services";
import { Footer } from "@/src/components/landingPage/Footer";

// ─── Utility: simple cn helper (use clsx/cn from shadcn if available) ─────────

// ─── Data ─────────────────────────────────────────────────────────────────────

export interface PartnerType {
  id: number;
  logo: string;
  name: string;
  description: string;
  location: string;
}

export interface ServiceType {
  icon: string;
  title: string;
  desc: string;
}

const partners = [
  {
    id: 1,
    logo: "/logo.png",
    name: "Partner One",
    description: "Partner One",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 2,
    logo: "/logo.png",
    name: "Partner Two",
    description: "Partner Two",
    location: "Times Square, Manhattan, NY, USA",
  },
  {
    id: 3,
    logo: "/logo.png",
    name: "Partner Three",
    description: "Partner Three",
    location: "Times Square, Manhattan, NY, USA",
  },
];

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
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Partners partners={partners} isLandingPage />
      <Services services={services} />
      <Footer />
    </main>
  );
}
