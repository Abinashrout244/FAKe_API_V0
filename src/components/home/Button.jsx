import React, { useContext } from "react";
import { ProductContext } from "../../utils/ProductContext";

const categories = [
  {
    id: "all",
    label: "For You",
    emoji: "✨",
    img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
  },
  {
    id: "men's clothing",
    label: "Fashion",
    emoji: "👗",
    img: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
  },
  {
    id: "electronics",
    label: "Mobiles",
    emoji: "📱",
    img: "https://cdn-icons-png.flaticon.com/512/1041/1041886.png",
  },
  {
    id: "jewelery",
    label: "Jewellery",
    emoji: "💎",
    img: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
  },
  {
    id: "women's clothing",
    label: "Women",
    emoji: "👒",
    img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
  },
];

const Button = () => {
  const { handleCategory, category, theme } = useContext(ProductContext);
  const isDark = theme === "Dark";

  return (
    <div className="mb-6 -mx-6 px-6">
      {/* Horizontal Scroll Track */}
      <div className="flex overflow-x-auto no-scrollbar gap-6 px-5 py-5">
        {categories.map((cat) => {
          const isActive = category === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => handleCategory(cat.id)}
              className="group flex flex-col items-center gap-2.5 flex-shrink-0 relative"
              style={{ minWidth: "64px" }}
            >
              {/* Icon Circle */}
              <div
                className={`relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "bg-blue-500/20 ring-2 ring-blue-400 scale-105 shadow-[0_0_20px_rgba(59,130,246,0.35)]"
                      : "bg-blue-50 ring-2 ring-blue-500 scale-105 shadow-[0_8px_24px_rgba(59,130,246,0.2)]"
                    : isDark
                    ? "bg-white/5 ring-1 ring-white/10 hover:ring-blue-500/30 hover:scale-105"
                    : "bg-white ring-1 ring-emerald-100 hover:ring-blue-200 hover:scale-105 shadow-sm"
                }`}
              >
                {/* Animated glow pulse on active */}
                {isActive && (
                  <div className="absolute inset-0 rounded-full animate-pulse blur-lg bg-blue-400/20 pointer-events-none" />
                )}

                {/* Icon image */}
                <img
                  src={cat.img}
                  alt={cat.label}
                  className={`relative z-10 w-8 h-8 object-contain transition-all duration-500 ${
                    isActive
                      ? "scale-110 brightness-110 opacity-100"
                      : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                  }`}
                />

                {/* Bottom indicator dot */}
                <div
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-blue-500 transition-all duration-400 ${
                    isActive
                      ? "scale-100 opacity-100 shadow-[0_0_8px_rgba(59,130,246,1)]"
                      : "scale-0 opacity-0"
                  }`}
                />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] font-bold tracking-wide text-center leading-tight transition-all duration-300 ${
                  isActive
                    ? isDark
                      ? "text-blue-400"
                      : "text-blue-600"
                    : isDark
                    ? "text-white/35 group-hover:text-blue-400/70"
                    : "text-emerald-900/40 group-hover:text-blue-600/70"
                }`}
              >
                {cat.label}
              </span>

              {/* Active underline bar */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Subtle separator */}
      <div
        className={`mt-3 h-px w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent`}
      />
    </div>
  );
};

export default Button;
