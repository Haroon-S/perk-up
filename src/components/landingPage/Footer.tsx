import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Image src={"/logo-perk.png"} alt="" width={100} height={100} />
        {/* <span
          className="text-xl font-black"
          style={{
            fontFamily: "'Arial Black', sans-serif",
            background: "linear-gradient(135deg, #4F6EFF, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        > */}
        {/* PerkUp
        </span> */}
        <p className="text-white/30 text-sm">
          © 2026 PerkUp. All rights reserved.
        </p>
        <div className="flex gap-6">
          {["Privacy", "Terms"].map((item) => (
            <Link
              key={item}
              href="#"
              className="text-sm text-white/30 hover:text-white/70 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
