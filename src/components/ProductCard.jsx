import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";
import { Star, ShoppingBag, Eye } from "lucide-react";

const ProductCard = ({
  title,
  price,
  image,
  rating,
  id,
  category = "Collection",
}) => {
  const { theme } = useContext(ProductContext);
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();
  const isDark = theme === "Dark";

  const addItems = () => {
    dispatch(addItem({ title, price, image, rating, id }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <>
      <div className="group relative w-full max-w-[280px] perspective-1000">
        <Link
          to={`/product/${id}`}
          className={`relative flex flex-col h-full rounded-[2rem] overflow-hidden border transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            isDark 
              ? "bg-[#0b0f0d]/40 border-emerald-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_50px_rgba(16,185,129,0.1)] hover:border-emerald-500/50" 
              : "bg-white border-emerald-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1),0_0_50px_rgba(16,185,129,0.05)] hover:border-emerald-300"
          } hover:-translate-y-3 hover:scale-[1.02] backdrop-blur-xl`}
        >
          {/* Top Shimmer Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent z-10" />

          {/* Image Container */}
          <div className="relative h-48 md:h-64 overflow-hidden bg-white/5">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-8 scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out"
            />
            
            {/* Image Overlays */}
            <div className={`absolute inset-0 transition-opacity duration-500 ${
              isDark ? "bg-gradient-to-t from-[#0b0f0d] via-transparent to-transparent opacity-60" : "bg-gradient-to-t from-emerald-50/20 via-transparent to-transparent opacity-30"
            }`} />
            
            <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-colors duration-500" />

            {/* Badge */}
            <div className="absolute top-3 left-3 md:top-5 md:left-5 px-2 py-0.5 md:px-3 md:py-1 rounded-full text-[7px] md:text-[8px] font-black tracking-[3px] uppercase glass border-emerald-400/30 text-emerald-400 shadow-xl">
              Essential
            </div>

            {/* Floating Info */}
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
               <div className="flex items-center gap-1 glass px-2.5 py-1 rounded-full border-white/10">
                  <Star className="w-2.5 h-2.5 text-emerald-400 fill-emerald-400" />
                  <span className={`text-[10px] font-bold ${isDark ? "text-white" : "text-emerald-900"}`}>
                    {rating?.rate}
                  </span>
               </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-4 md:p-7 flex flex-col flex-grow">
            <p className="text-emerald-500 text-[9px] font-black tracking-[4px] uppercase mb-3 opacity-80">
              {category}
            </p>

            <h3 className={`text-sm md:text-lg font-syne font-semibold leading-tight mb-3 md:mb-4 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem] transition-colors duration-300 ${
              isDark ? "text-white group-hover:text-emerald-300" : "text-emerald-950 group-hover:text-emerald-600"
            }`}>
              {title}
            </h3>

            {/* Divider */}
            <div className={`h-px w-full mb-4 md:mb-6 transition-all duration-500 group-hover:w-1/2 ${
              isDark ? "bg-emerald-900/40" : "bg-emerald-100"
            }`} />

            <div className="mt-auto flex items-end justify-between">
              <div>
                <p className={`text-[8px] md:text-[9px] font-bold tracking-widest uppercase mb-1 ${isDark ? "text-emerald-800" : "text-emerald-300"}`}>
                  Investment
                </p>
                <p className={`text-lg md:text-2xl font-outfit font-bold ${isDark ? "text-white" : "text-emerald-950"}`}>
                  <span className="text-emerald-500 text-xs md:text-sm mr-1 font-light">₹</span>
                  {price}
                </p>
              </div>

              {/* Add Button - Circle Style */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addItems();
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border transition-all duration-500 active:scale-90 ${
                  isDark 
                    ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-110" 
                    : "bg-emerald-600 text-white border-emerald-500 shadow-lg hover:bg-emerald-700 hover:scale-110"
                }`}
              >
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </Link>

        {/* Quick View Hover Button */}
        <Link 
          to={`/product/${id}`}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto"
        >
           <div className="glass px-5 py-2.5 rounded-full flex items-center gap-2 border-emerald-500/50 text-emerald-400 text-[10px] font-bold tracking-[2px] uppercase shadow-2xl">
              <Eye className="w-3.5 h-3.5" />
              Quick View
           </div>
        </Link>
      </div>

      {/* Premium Toast */}
      <div
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-4 rounded-2xl glass border-emerald-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center gap-4">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
           <p className="text-emerald-400 text-xs font-black tracking-[3px] uppercase">
             Added to Collection
           </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;

