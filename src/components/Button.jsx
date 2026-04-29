import React, { useContext } from "react";
import { ProductContext } from "../utils/ProductContext";

const Button = () => {
  const { handleCategory, category, theme } = useContext(ProductContext);
  const isDark = theme === "Dark";

  const categories = [
    {
      id: "all",
      label: "All",
      img: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
    },
    {
      id: "men's clothing",
      label: "Men",
      img: "https://cdn-icons-png.flaticon.com/512/892/892458.png",
    },
    {
      id: "jewelery",
      label: "Jewelry",
      img: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
    },
    {
      id: "electronics",
      label: "Tech",
      img: "https://cdn-icons-png.flaticon.com/512/1041/1041886.png",
    },
    {
      id: "women's clothing",
      label: "Women",
      img: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
    },
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar gap-8 px-6 py-2 md:justify-center -mx-6 mb-8">
      {categories.map((cat) => {
        const isActive = category === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => handleCategory(cat.id)}
            className={`group flex flex-col items-center justify-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex-shrink-0 relative`}
          >
            {/* Main Circle Container */}
            <div
              className={`relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-700 ${
                isActive
                  ? isDark
                    ? "bg-emerald-500/20 border-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-110"
                    : "bg-emerald-50 border-emerald-500 shadow-[0_20px_40px_rgba(16,185,129,0.15)] scale-110"
                  : isDark
                  ? "bg-white/5 border-white/5 hover:border-emerald-500/30 hover:scale-105"
                  : "bg-white border-emerald-50 hover:border-emerald-200 hover:scale-105 shadow-sm"
              }`}
            >
              {/* Animated Glow Backdrop (Active Only) */}
              {isActive && (
                <div className="absolute inset-0 rounded-full animate-pulse blur-xl bg-emerald-500/20" />
              )}

              {/* Icon Holder */}
              <div
                className={`relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-110 ${
                  isActive 
                    ? isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                    : isDark ? "bg-white/5" : "bg-emerald-50/50"
                }`}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  className={`w-7 h-7 md:w-8 md:h-8 object-contain transition-all duration-700 ${
                    isActive ? "scale-110 brightness-110" : "opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Indicator Dot */}
              <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-500 ${
                isActive ? "scale-100 opacity-100 shadow-[0_0_10px_rgba(16,185,129,1)]" : "scale-0 opacity-0"
              }`} />
            </div>

            {/* Label Text */}
            <span
              className={`text-[9px] md:text-[10px] font-black tracking-[3px] uppercase transition-all duration-500 ${
                isActive
                  ? isDark
                    ? "text-emerald-400"
                    : "text-emerald-800"
                  : isDark
                  ? "text-white/30 group-hover:text-emerald-400/60"
                  : "text-emerald-900/30 group-hover:text-emerald-600"
              }`}
            >
              {cat.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default Button;