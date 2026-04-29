import React, { useState, useContext } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { ProductContext } from "../utils/ProductContext";

const FilterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setFilterName, filterName } = useContext(ProductContext);
  const isDark = theme === "Dark";

  const filterGroups = [
    {
      name: "Sort By",
      options: [
        "Newest",
        "A-Z",
        "Z-A",
        "Price: Low to High",
        "Price: High to Low",
        "Rating",
      ],
    },
  ];

  return (
    <div className="mb-12 relative">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all duration-500 group ${
            isDark
              ? "bg-[#0b0f0d]/40 border-emerald-900/30 text-emerald-400 hover:border-emerald-500/60"
              : "bg-white border-emerald-100 text-emerald-700 hover:border-emerald-300 shadow-sm"
          }`}
        >
          <SlidersHorizontal
            className={`w-4 h-4 transition-transform duration-500 ${
              isOpen ? "rotate-180 text-emerald-500" : ""
            }`}
          />
          <span className="text-[10px] font-black tracking-[4px] uppercase">
            {filterName}
          </span>

          <div
            className={`w-1.5 h-1.5 rounded-full bg-emerald-500 transition-all duration-500 ${
              isOpen
                ? "scale-100 opacity-100 shadow-[0_0_8px_rgba(16,185,129,1)]"
                : "scale-0 opacity-0"
            }`}
          />
        </button>

        <div
          className={`hidden md:flex items-center gap-8 ${
            isDark ? "text-white/20" : "text-emerald-900/20"
          }`}
        >
          <p className="text-[9px] font-black tracking-[3px] uppercase">
            {isOpen ? "Close Filters" : "Filter & Sort"}
          </p>
          <div
            className={`h-px w-24 ${
              isDark ? "bg-emerald-900/30" : "bg-emerald-100"
            }`}
          />
        </div>
      </div>

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-full w-max min-w-[260px] z-50 mt-4">
          <div
            className={`p-8 md:p-12 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl ${
              isDark
                ? "bg-[#0b0f0d]/80 border-emerald-900/30 shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
                : "bg-white/90 border-emerald-100 shadow-[0_40px_80px_rgba(0,0,0,0.08)]"
            }`}
          >
            <div className="grid grid-cols-1 gap-8">
              {filterGroups.map((group) => (
                <div key={group.name} className="flex flex-col">
                  <h4
                    className={`text-[10px] font-black tracking-[4px] uppercase mb-6 ${
                      isDark ? "text-emerald-500" : "text-emerald-700"
                    }`}
                  >
                    {group.name}
                  </h4>

                  <div className="flex flex-col gap-4">
                    {group.options.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setFilterName(option);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <span
                          className={`text-sm transition-all duration-300 ${
                            isDark
                              ? "text-white/60 hover:text-white"
                              : "text-emerald-900/60 hover:text-emerald-950"
                          }`}
                        >
                          {option}
                        </span>

                        {option === filterName && (
                          <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/50 flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-emerald-400" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
