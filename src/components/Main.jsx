import React, { useContext } from "react";
import ProductCard from "./ProductCard";
import { ProductContext } from "../utils/ProductContext";
import Shimmer from "./Shimmer";
import Button from "./Button";
import FilterSection from "./FilterSection";
import FeaturedCarousel from "./FeaturedCarousel";

const Main = () => {
  const { filterProducts, products, theme, sortedProducts, category } =
    useContext(ProductContext);

  if (!products) return null;

  const isDark = theme === "Dark";

  return (
    <div className="relative min-h-screen pt-28 pb-20 px-6 md:px-12 overflow-hidden">
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
        {/* ── Category Navigation ── */}
        <Button />

        {/* ── Featured Carousel Banner (only on default "For You" view) ── */}
        {category === "all" && <FeaturedCarousel />}

        {/* ── Advanced Filters ── */}
        <FilterSection />

        {/* ── "More Products for You" header ── */}
        <div className="flex flex-col mb-8">
          <p className="text-blue-500 text-[10px] font-black tracking-[6px] uppercase mb-3 opacity-80">
            Handpicked For You
          </p>
          <h2
            className={`text-3xl md:text-5xl font-syne font-bold tracking-tighter ${
              isDark ? "text-white" : "text-emerald-950"
            }`}
          >
            More{" "}
            <span className="italic font-light text-blue-500">Products</span>{" "}
            for You
          </h2>
          <div
            className={`mt-4 h-px w-24 rounded-full bg-gradient-to-r from-blue-500 to-transparent`}
          />
        </div>

        {/* ── Product Grid or Shimmer ── */}
        {products.length === 0 ? (
          <Shimmer />
        ) : (
          <div
            className="
              grid
              gap-x-3 gap-y-4
              sm:gap-x-5 sm:gap-y-6
              md:gap-x-7 md:gap-y-10
              grid-cols-2
              lg:grid-cols-4
              justify-items-center
            "
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
