import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";
import { addItem } from "../utils/CartSlice";
import { useDispatch } from "react-redux";
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCcw,
} from "lucide-react";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, theme } = useContext(ProductContext);
  const Prod = products[id - 1];
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const handleAdd = () => {
    const { id: prodId, image, title, rating, price } = Prod;
    dispatch(addItem({ id: prodId, image, title, rating, price }));
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const isDark = theme === "Dark";

  if (!Prod)
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#080c0a]" : "bg-white"}`}
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-emerald-500 text-[10px] tracking-[6px] uppercase font-black animate-pulse">
            Sourcing Excellence
          </p>
        </div>
      </div>
    );

  const { title, category, description, rating, image, price } = Prod;

  return (
    <>
      <div
        className={`min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 ${
          isDark ? "bg-[#080c0a]" : "bg-white"
        }`}
      >
        {/* Background Ambience */}
        <div
          className={`fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none ${
            isDark ? "bg-emerald-500/10" : "bg-emerald-50/50"
          }`}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-3 mb-12 group transition-all duration-300 ${
              isDark
                ? "text-emerald-800 hover:text-emerald-400"
                : "text-emerald-200 hover:text-emerald-600"
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="text-[10px] font-black tracking-[4px] uppercase">
              Back to Collection
            </span>
          </button>

          <div className="flex flex-col lg:flex-row gap-16 xl:gap-24">
            {/* ── Left: Visual Presentation ── */}
            <div className="w-full lg:w-1/2">
              <div
                className={`relative aspect-square rounded-[3rem] overflow-hidden border p-12 md:p-20 flex items-center justify-center transition-all duration-700 ${
                  isDark
                    ? "bg-[#0b0f0d]/40 border-emerald-900/30 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                    : "bg-emerald-50/30 border-emerald-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-transparent opacity-60" />

                <img
                  src={image}
                  alt={title}
                  className="relative w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-1000"
                />

                {/* Category Floating Badge */}
                <div className="absolute top-10 left-10 glass border-emerald-500/30 px-6 py-2 rounded-full text-emerald-500 text-[9px] font-black tracking-[4px] uppercase">
                  {category}
                </div>
              </div>
            </div>

            {/* ── Right: Specification & Action ── */}
            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 glass border-emerald-500/20 px-4 py-1.5 rounded-full">
                    <Star className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
                    <span
                      className={`text-sm font-bold ${isDark ? "text-white" : "text-emerald-900"}`}
                    >
                      {rating?.rate}
                    </span>
                  </div>
                  <p
                    className={`text-xs font-medium opacity-40 uppercase tracking-widest ${isDark ? "text-white" : "text-black"}`}
                  >
                    Based on {rating?.count} Curated Reviews
                  </p>
                </div>

                <h1
                  className={`text-4xl md:text-5xl xl:text-6xl font-syne font-bold leading-[1.1] mb-8 tracking-tighter ${
                    isDark ? "text-white" : "text-emerald-950"
                  }`}
                >
                  {title}
                </h1>

                <div className="flex items-baseline gap-4 mb-10">
                  <p
                    className={`text-4xl md:text-5xl font-outfit font-bold ${isDark ? "text-white" : "text-emerald-950"}`}
                  >
                    <span className="text-emerald-500 text-2xl mr-1 font-light">
                      ₹
                    </span>
                    {price}
                  </p>
                  <div className="h-10 w-[1px] bg-emerald-500/20 mx-2" />
                  <p className="text-emerald-500 text-[10px] font-black tracking-[3px] uppercase">
                    Insured Shipping included
                  </p>
                </div>

                <p
                  className={`text-lg leading-relaxed mb-12 font-outfit font-light opacity-60 ${
                    isDark ? "text-emerald-100" : "text-emerald-900"
                  }`}
                >
                  {description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                  <div
                    className={`p-5 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-emerald-50/50 border-emerald-100"}`}
                  >
                    <ShieldCheck className="w-6 h-6 text-emerald-500 mb-3" />
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-emerald-950"}`}
                    >
                      Lifetime Guarantee
                    </p>
                  </div>
                  <div
                    className={`p-5 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-emerald-50/50 border-emerald-100"}`}
                  >
                    <Truck className="w-6 h-6 text-emerald-500 mb-3" />
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-emerald-950"}`}
                    >
                      Global Concierge
                    </p>
                  </div>
                  <div
                    className={`p-5 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-emerald-50/50 border-emerald-100"}`}
                  >
                    <RefreshCcw className="w-6 h-6 text-emerald-500 mb-3" />
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-white" : "text-emerald-950"}`}
                    >
                      Seamless Returns
                    </p>
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col sm:flex-row gap-6 mt-auto">
                  <button
                    onClick={handleAdd}
                    className={`flex-1 py-6 rounded-[1.5rem] flex items-center justify-center gap-4 transition-all duration-500 group active:scale-95 ${
                      isDark
                        ? "bg-emerald-500 text-black font-black uppercase tracking-[4px] text-xs hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
                        : "bg-emerald-600 text-white font-black uppercase tracking-[4px] text-xs hover:bg-emerald-700 hover:shadow-[0_0_50px_rgba(5,150,105,0.3)]"
                    }`}
                  >
                    <ShoppingBag className="w-5 h-5 group-hover:scale-125 transition-transform duration-300" />
                    Acquire Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ProductPage;
