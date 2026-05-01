import React, { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { ProductContext } from "../utils/ProductContext";

const banners = [
  {
    id: 1,
    tag: "🔥 Best Deals",
    title: "Upgrade Your Style",
    subtitle: "Min 65% Off on Fashion",
    cta: "Shop Now",
    gradient: "from-blue-100 via-sky-50 to-indigo-100",
    darkGradient: "from-blue-950/60 via-sky-950/40 to-indigo-950/60",
    accent: "bg-blue-500",
    accentText: "text-blue-600",
    accentDark: "text-blue-300",
    ring: "ring-blue-400/60",
    image:
      "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    badge: "Min 65% Off",
    badgeBg: "bg-blue-600",
  },
  {
    id: 2,
    tag: "⚡ Flash Sale",
    title: "Tech at Your Fingertips",
    subtitle: "Up to 40% Off on Electronics",
    cta: "Explore Tech",
    gradient: "from-sky-100 via-cyan-50 to-blue-100",
    darkGradient: "from-sky-950/60 via-cyan-950/40 to-blue-950/60",
    accent: "bg-cyan-500",
    accentText: "text-cyan-700",
    accentDark: "text-cyan-300",
    ring: "ring-cyan-400/60",
    image:
      "https://cdn-icons-png.flaticon.com/512/1041/1041886.png",
    badge: "Up to 40% Off",
    badgeBg: "bg-cyan-600",
  },
  {
    id: 3,
    tag: "💎 Premium Picks",
    title: "Jewellery & More",
    subtitle: "Up to 25% Off on Fine Jewellery",
    cta: "View Collection",
    gradient: "from-indigo-100 via-purple-50 to-blue-100",
    darkGradient: "from-indigo-950/60 via-purple-950/40 to-blue-950/60",
    accent: "bg-indigo-500",
    accentText: "text-indigo-700",
    accentDark: "text-indigo-300",
    ring: "ring-indigo-400/60",
    image:
      "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    badge: "Up to 25% Off",
    badgeBg: "bg-indigo-600",
  },
];

const FeaturedCarousel = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";
  const [active, setActive] = useState(0);

  const next = useCallback(
    () => setActive((p) => (p + 1) % banners.length),
    []
  );

  /* Auto-advance every 4s */
  useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  const banner = banners[active];

  return (
    <div className="mb-10">
      {/* Banner Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border transition-all duration-700 ${
          isDark
            ? `bg-gradient-to-br ${banner.darkGradient} border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]`
            : `bg-gradient-to-br ${banner.gradient} border-blue-100/80 shadow-[0_16px_48px_rgba(59,130,246,0.12)]`
        }`}
        style={{ minHeight: "200px" }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-indigo-400/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between p-7 md:p-10 gap-6">
          {/* Left Text Content */}
          <div className="flex-1 min-w-0">
            {/* Tag pill */}
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-[2px] uppercase mb-4 ${
                isDark
                  ? "bg-white/10 text-white/70 backdrop-blur"
                  : "bg-white/60 text-blue-700 backdrop-blur-sm"
              }`}
            >
              {banner.tag}
            </div>

            <h2
              className={`text-2xl md:text-4xl font-bold leading-tight mb-2 font-syne ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {banner.title}
            </h2>
            <p
              className={`text-sm md:text-base font-medium mb-6 ${
                isDark ? banner.accentDark : banner.accentText
              }`}
            >
              {banner.subtitle}
            </p>

            {/* CTA Button */}
            <button
              className={`px-6 py-2.5 rounded-2xl text-sm font-bold text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${banner.accent}`}
            >
              {banner.cta} →
            </button>
          </div>

          {/* Right Image + Badge */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            {/* Discount Badge */}
            <div
              className={`absolute -top-3 -right-2 z-10 px-2.5 py-1 rounded-xl text-[10px] font-black text-white shadow-lg ${banner.badgeBg}`}
            >
              {banner.badge}
            </div>

            {/* Image circle */}
            <div
              className={`w-28 h-28 md:w-40 md:h-40 rounded-3xl flex items-center justify-center ring-4 ${banner.ring} ${
                isDark ? "bg-white/10 backdrop-blur-sm" : "bg-white/70"
              } shadow-2xl`}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-xl transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`rounded-full transition-all duration-500 ${
              i === active
                ? "w-6 h-2 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                : isDark
                ? "w-2 h-2 bg-white/20 hover:bg-white/40"
                : "w-2 h-2 bg-blue-200 hover:bg-blue-300"
            }`}
            aria-label={`Go to banner ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCarousel;
