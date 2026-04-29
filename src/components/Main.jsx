import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../utils/ProductContext";
import Shimmer from "./Shimmer";
import Button from "./Button";
import FilterSection from "./FilterSection";

const Main = () => {
  const { filterProducts, products, theme, sortedProducts } =
    useContext(ProductContext);

  if (!products) return null;

  const isDark = theme === "Dark";

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden">
      {/* Cinematic Ambient Glows */}
      <div
        className={`fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
          isDark ? "bg-emerald-500/10" : "bg-emerald-100/40"
        }`}
      />
      <div
        className={`fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] pointer-events-none transition-colors duration-1000 ${
          isDark ? "bg-emerald-600/5" : "bg-emerald-50/60"
        }`}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col mb-12">
          <p className="text-emerald-500 text-[10px] font-black tracking-[6px] uppercase mb-4 opacity-80 text-center md:text-left">
            Curated Selection
          </p>
          <h2
            className={`text-4xl md:text-6xl font-syne font-bold tracking-tighter text-center md:text-left ${
              isDark ? "text-white" : "text-emerald-950"
            }`}
          >
            The <span className="italic font-light text-emerald-500">New</span>{" "}
            Standard.
          </h2>
        </div>

        {/* Category Filter */}
        <Button />

        {/* Advanced Filters */}
        <FilterSection />

        {/* Grid layout or Shimmer */}
        {products.length === 0 ? (
          <Shimmer />
        ) : (
          <div
            className="grid gap-x-8 gap-y-16 
            grid-cols-1 
            sm:grid-cols-2 
            lg:grid-cols-3 
            xl:grid-cols-4 
            justify-items-center"
          >
            {sortedProducts.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        )}

        {products.length > 0 && filterProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className={`text-lg font-outfit opacity-40 ${isDark ? "text-white" : "text-emerald-950"}`}
            >
              No products found in this collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
