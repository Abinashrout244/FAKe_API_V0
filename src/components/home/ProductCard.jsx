import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../utils/ProductContext";
import { Star, Eye } from "lucide-react";

const ProductCard = ({
  title,
  price,
  images,
  rating,
  id,
  category = "Collection",
  brand,
  availabilityStatus,
  discountPercentage,
  stock,
  minimumOrderQuantity,
  warrantyInformation,
  shippingInformation,

  tags,
}) => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";

  return (
    <div className="group relative w-full">
      <Link
        to={`/product/${id}`}
        className={`relative flex flex-col h-full
          rounded-2xl md:rounded-[2rem]
          overflow-hidden border
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
          ${
            isDark
              ? "bg-[#0b0f0d]/40 border-emerald-900/30 shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.65),0_0_40px_rgba(16,185,129,0.08)] hover:border-emerald-500/40"
              : "bg-white border-emerald-100 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1),0_0_30px_rgba(16,185,129,0.05)] hover:border-emerald-200"
          }
          md:hover:-translate-y-2 md:hover:scale-[1.015]
          backdrop-blur-xl`}
      >
        {/* Top shimmer accent line */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent z-10" />

        {/* ───────── IMAGE AREA ───────── */}
        <div className="relative h-36 sm:h-44 md:h-52 overflow-hidden bg-white/5 flex-shrink-0">
          <img
            src={images?.[0]}
            alt={title}
            className="w-full h-full object-contain p-4 sm:p-5 md:p-7
              scale-100 group-hover:scale-108
              transition-transform duration-700 ease-out"
          />

          {/* Bottom fade */}
          <div
            className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
              isDark
                ? "bg-gradient-to-t from-[#0b0f0d]/70 via-transparent to-transparent"
                : "bg-gradient-to-t from-white/30 via-transparent to-transparent"
            }`}
          />

          {/* Brand */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black tracking-[2px] uppercase glass border-emerald-400/20 text-emerald-400 shadow-lg">
            {brand || "Essential"}
          </div>

          {/* Rating */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1 glass px-2 py-0.5 rounded-full border-white/10">
            <Star className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-emerald-400 fill-emerald-400" />

            <span
              className={`text-[9px] sm:text-[10px] font-bold ${
                isDark ? "text-white" : "text-emerald-900"
              }`}
            >
              {rating}
            </span>
          </div>

          {/* Discount */}
          {discountPercentage > 0 && (
            <div className="absolute bottom-2.5 left-2.5 px-2 py-1 rounded-lg glass border-emerald-400/20">
              <span className="text-[8px] sm:text-[9px] font-black text-emerald-400">
                -{discountPercentage.toFixed(0)}%
              </span>
            </div>
          )}

          {/* Quick Preview */}
          <div
            className={`absolute bottom-0 left-0 right-0 z-20
              flex items-center justify-center gap-1.5
              py-2.5 sm:py-3
              translate-y-full group-hover:translate-y-0
              transition-transform duration-400 ease-[cubic-bezier(0.23,1,0.32,1)]
              ${
                isDark
                  ? "bg-emerald-950/85 backdrop-blur-md border-t border-emerald-800/40"
                  : "bg-white/90 backdrop-blur-md border-t border-emerald-100"
              }`}
          >
            <Eye
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                isDark ? "text-emerald-400" : "text-emerald-600"
              }`}
            />

            <span
              className={`text-[8px] sm:text-[9px] font-black tracking-[2px] uppercase ${
                isDark ? "text-emerald-300" : "text-emerald-700"
              }`}
            >
              Quick Preview
            </span>
          </div>
        </div>

        {/* ───────── CONTENT BODY ───────── */}
        <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-grow">
          {/* Category + Availability */}
          <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
            <p className="text-emerald-500 text-[7px] sm:text-[8px] font-black tracking-[3px] sm:tracking-[4px] uppercase opacity-75">
              {category}
            </p>

            <span
              className={`text-[7px] sm:text-[8px] font-bold uppercase tracking-wide ${
                availabilityStatus === "In Stock"
                  ? "text-emerald-500"
                  : "text-red-400"
              }`}
            >
              {availabilityStatus || "Available"}
            </span>
          </div>

          {/* Title */}
          <h3
            className={`text-[12px] sm:text-[13px] md:text-sm font-syne font-semibold leading-snug
              mb-2.5 sm:mb-3 line-clamp-2
              min-h-[2.2rem] sm:min-h-[2.5rem]
              transition-colors duration-300
              ${
                isDark
                  ? "text-white group-hover:text-emerald-300"
                  : "text-emerald-950 group-hover:text-emerald-700"
              }`}
          >
            {title}
          </h3>

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className={`px-2 py-0.5 rounded-full text-[7px] uppercase tracking-wider ${
                    isDark
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div
            className={`h-px w-full mb-3 sm:mb-4
              transition-all duration-500 group-hover:w-3/5
              ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`}
          />

          {/* Product Information */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
            {/* Stock */}
            <div>
              <p
                className={`text-[7px] font-bold tracking-widest uppercase mb-0.5 ${
                  isDark ? "text-emerald-800" : "text-emerald-300"
                }`}
              >
                Stock
              </p>

              <p
                className={`text-[10px] font-semibold ${
                  isDark ? "text-white" : "text-emerald-950"
                }`}
              >
                {stock ?? "N/A"} units
              </p>
            </div>

            {/* Minimum Order */}
            <div>
              <p
                className={`text-[7px] font-bold tracking-widest uppercase mb-0.5 ${
                  isDark ? "text-emerald-800" : "text-emerald-300"
                }`}
              >
                Min Order
              </p>

              <p
                className={`text-[10px] font-semibold ${
                  isDark ? "text-white" : "text-emerald-950"
                }`}
              >
                {minimumOrderQuantity ?? "N/A"}
              </p>
            </div>

            {/* Warranty */}
            <div>
              <p
                className={`text-[7px] font-bold tracking-widest uppercase mb-0.5 ${
                  isDark ? "text-emerald-800" : "text-emerald-300"
                }`}
              >
                Warranty
              </p>

              <p
                className={`text-[9px] font-semibold truncate ${
                  isDark ? "text-white" : "text-emerald-950"
                }`}
              >
                {warrantyInformation || "N/A"}
              </p>
            </div>

            {/* Shipping */}
            <div>
              <p
                className={`text-[7px] font-bold tracking-widest uppercase mb-0.5 ${
                  isDark ? "text-emerald-800" : "text-emerald-300"
                }`}
              >
                Shipping
              </p>

              <p
                className={`text-[9px] font-semibold truncate ${
                  isDark ? "text-white" : "text-emerald-950"
                }`}
              >
                {shippingInformation || "N/A"}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-auto flex items-end justify-between gap-2">
            <div>
              <p
                className={`text-[7px] font-bold tracking-widest uppercase mb-0.5 ${
                  isDark ? "text-emerald-800" : "text-emerald-300"
                }`}
              >
                Price
              </p>

              <p
                className={`text-base sm:text-lg md:text-xl font-outfit font-bold ${
                  isDark ? "text-white" : "text-emerald-950"
                }`}
              >
                <span className="text-emerald-500 text-[10px] sm:text-xs mr-0.5 font-light">
                  ₹
                </span>

                {price}
              </p>
            </div>

            {/* View chip */}
            <div
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[8px] font-black tracking-wide uppercase flex-shrink-0 transition-all duration-300 ${
                isDark
                  ? "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                  : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
              }`}
            >
              <Eye className="w-2.5 h-2.5 sm:w-3 sm:h-3" />

              <span className="hidden sm:inline">View</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
