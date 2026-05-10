import React, { useContext } from "react";
import { ProductContext } from "../../utils/ProductContext";

const Shimmer = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";

  return (
    <div className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center w-full max-w-7xl mx-auto">
      {Array(12)
        .fill("")
        .map((_, index) => {
          return (
            <div
              key={index}
              className={`relative w-full max-w-[280px] h-[500px] rounded-[2rem] overflow-hidden border transition-all duration-500 ${
                isDark ? "bg-[#0b0f0d]/40 border-emerald-900/20" : "bg-emerald-50/20 border-emerald-100"
              }`}
            >
              {/* Shimmer Animation */}
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-emerald-500/5 to-transparent" />
              
              <div className="h-64 w-full bg-emerald-500/[0.03]" />
              <div className="p-7 flex flex-col gap-4">
                <div className={`h-2 w-12 rounded-full ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />
                <div className={`h-6 w-full rounded-xl ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />
                <div className={`h-6 w-2/3 rounded-xl ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />
                <div className="mt-auto flex items-center justify-between">
                   <div className={`h-8 w-24 rounded-xl ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />
                   <div className={`h-12 w-12 rounded-2xl ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />
                </div>
              </div>
            </div>
          );
        })}
        
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}} />
    </div>
  );
};

export default Shimmer;


