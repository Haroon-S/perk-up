"use client";

import { cn } from "@/lib/utils";
import { handleScrollToSection } from "@/src/utilities/globalHelpers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "bg-transparent py-5",
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Image src={"/logo-perk.png"} alt="" width={100} height={100} />
        {/* <div className="relative">
          <span
            className="text-2xl font-black tracking-tight"
            style={{
              fontFamily: "'Arial Black', sans-serif",
              background:
                "linear-gradient(135deg, #4F6EFF 0%, #8B5CF6 50%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            PerkUp
          </span>
          <span
            className="absolute -bottom-1 left-0 h-px w-full opacity-60"
            style={{
              background: "linear-gradient(90deg, #4F6EFF, transparent)",
            }}
          />
        </div> */}

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <p
            onClick={() => handleScrollToSection("partners")}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide uppercase cursor-pointer"
          >
            Partners
          </p>
          <p
            onClick={() => handleScrollToSection("services")}
            className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide uppercase cursor-pointer"
          >
            Services
          </p>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login/index.html">
            <button className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2 cursor-pointer">
              Log In
            </button>
          </a>
          <a href="/login/index.html">
            <button
              className="relative text-sm font-semibold px-5 py-2.5 rounded-full overflow-hidden group cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)",
              }}
            >
              <span className="relative z-10 text-white">Join Now</span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, #6B8AFF, #A78BFA)",
                }}
              />
            </button>
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "rotate-45 translate-y-2",
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "w-6 h-0.5 bg-white transition-all duration-300",
              menuOpen && "-rotate-45 -translate-y-2",
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300",
          menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="px-6 py-4 flex flex-col gap-4 bg-black/90 border-t border-white/5">
          {["Partners", "Services"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <a href="/login/index.html" className="text-left text-white/70">Log In</a>
          <a href="/login/index.html">
            <button
              className="w-full text-sm font-semibold py-2.5 rounded-full text-white"
              style={{ background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)" }}
            >
              Join Now — €3.99/mo
            </button>
          </a>
        </div>
      </div>
    </nav>
  );
}
