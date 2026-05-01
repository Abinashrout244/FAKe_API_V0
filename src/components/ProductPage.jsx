import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";
import { addItem } from "../utils/CartSlice";
import { useDispatch } from "react-redux";
import {
  Star,
  ShoppingCart,
  Zap,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RefreshCcw,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

/* ─── Fake gallery variants from single image ──────────────── */
const buildGallery = (img) => [
  img,
  img + "?v=2",
  img + "?v=3",
  img + "?v=4",
];

/* ─── Fake sizes ────────────────────────────────────────────── */
const SIZES = ["XS", "S", "M", "L", "XL"];

/* ─── Fake discount helper ──────────────────────────────────── */
const origPrice = (p) => (p * 1.35).toFixed(0);
const discPct = (p) =>
  Math.round(((origPrice(p) - p) / origPrice(p)) * 100);

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, theme } = useContext(ProductContext);
  const Prod = products[id - 1];
  const dispatch = useDispatch();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const isDark = theme === "Dark";

  if (!Prod)
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-[#080c0a]" : "bg-white"}`}>
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-emerald-500 text-[10px] tracking-[6px] uppercase font-black animate-pulse">
            Loading Product
          </p>
        </div>
      </div>
    );

  const { title, category, description, rating, image, price } = Prod;
  const gallery = buildGallery(image);
  const orig = origPrice(price);
  const disc = discPct(price);

  const handleAddToCart = () => {
    const { id: prodId, image: img, title: t, rating: r, price: p } = Prod;
    dispatch(addItem({ id: prodId, image: img, title: t, rating: r, price: p }));
    setToastMsg("Added to Cart!");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate("/cart"), 400);
  };

  /* ── Shared: Image Gallery Block ── */
  const ImageGallery = ({ mobile = false }) => (
    <div className={mobile ? "w-full" : "w-full lg:w-[75%] flex-shrink-0"}>
      {/* Main Image */}
      <div
        className={`relative overflow-hidden flex items-center justify-center
          ${mobile ? "w-full h-72 rounded-none" : "w-full min-h-[70vh] lg:min-h-[calc(100vh-9rem)] rounded-3xl border"}
          ${!mobile && (isDark
            ? "bg-[#0b0f0d]/40 border-emerald-900/30 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            : "bg-emerald-50/40 border-emerald-100 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          )}
          ${mobile && (isDark ? "bg-[#0b0f0d]" : "bg-gray-50")}
        `}
      >
        <img
          key={activeImg}
          src={gallery[activeImg]}
          alt={title}
          className={`object-contain transition-all duration-500
            ${mobile ? "w-full h-full p-6" : "w-full h-full p-6 hover:scale-105 duration-700"}
          `}
        />

        {/* Category badge */}
        <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-black tracking-[2px] uppercase
          ${isDark ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                   : "bg-white text-emerald-700 border border-emerald-200 shadow"}`}>
          {category}
        </div>

        {/* Discount badge */}
        <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-xl shadow">
          {disc}% OFF
        </div>
      </div>

      {/* Thumbnail Gallery */}
      <div className={`flex gap-2.5 mt-3 ${mobile ? "px-3 pb-2" : "px-1"}`}>
        {gallery.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveImg(i)}
            className={`flex-1 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300
              ${activeImg === i
                ? isDark
                  ? "border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)] scale-105"
                  : "border-emerald-500 shadow-[0_4px_12px_rgba(16,185,129,0.25)] scale-105"
                : isDark
                ? "border-white/10 hover:border-white/30"
                : "border-gray-200 hover:border-emerald-300"
              }
              ${isDark ? "bg-white/5" : "bg-gray-50"}`}
          >
            <img
              src={img}
              alt={`view-${i + 1}`}
              className="w-full h-full object-contain p-1.5"
            />
          </button>
        ))}
      </div>
    </div>
  );

  /* ── Shared: Product Info Block ── */
  const ProductInfo = ({ mobile = false }) => (
    <div className={`flex flex-col ${mobile ? "px-3 pt-2 pb-32" : "flex-1 min-w-0"}`}>
      {/* Rating row */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="flex items-center gap-1 bg-green-600 text-white text-[11px] font-bold px-2 py-0.5 rounded">
          <span>{rating?.rate}</span>
          <Star className="w-2.5 h-2.5 fill-white" />
        </div>
        <span className={`text-xs ${isDark ? "text-white/40" : "text-gray-400"}`}>
          {rating?.count} ratings
        </span>
        <span className={`text-[10px] font-bold text-blue-500 hover:underline cursor-pointer`}>
          {rating?.count} reviews
        </span>
      </div>

      {/* Title */}
      <h1 className={`text-lg md:text-2xl lg:text-3xl font-syne font-bold leading-snug mb-3
        ${isDark ? "text-white" : "text-gray-900"}`}>
        {title}
      </h1>

      {/* Price row */}
      <div className="flex items-baseline gap-3 mb-1 flex-wrap">
        <span className={`text-2xl md:text-3xl font-bold font-outfit ${isDark ? "text-white" : "text-gray-900"}`}>
          ₹{price}
        </span>
        <span className={`text-base line-through ${isDark ? "text-white/30" : "text-gray-400"}`}>
          ₹{orig}
        </span>
        <span className="text-base font-bold text-green-600">{disc}% off</span>
      </div>
      <p className="text-green-600 text-[11px] font-medium mb-4">
        Bank offer: 5% off on selected cards. <span className="text-blue-500 cursor-pointer">See all offers</span>
      </p>

      {/* Divider */}
      <div className={`h-px w-full mb-4 ${isDark ? "bg-white/5" : "bg-gray-100"}`} />

      {/* Size selector */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className={`text-xs font-bold uppercase tracking-widest ${isDark ? "text-white/60" : "text-gray-500"}`}>
            Select Size
          </p>
          <button className="text-[11px] font-bold text-blue-500 flex items-center gap-1 hover:underline">
            Size Guide <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`w-10 h-10 rounded-full text-xs font-bold border-2 transition-all duration-300
                ${selectedSize === s
                  ? isDark
                    ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                    : "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
                  : isDark
                  ? "border-white/10 text-white/50 hover:border-white/30"
                  : "border-gray-200 text-gray-500 hover:border-emerald-300"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className={`h-px w-full mb-4 ${isDark ? "bg-white/5" : "bg-gray-100"}`} />

      {/* Features */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: ShieldCheck, label: "Guarantee" },
          { icon: Truck, label: "Free Ship" },
          { icon: RefreshCcw, label: "30D Return" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-center
              ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}
          >
            <Icon className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
            <span className={`text-[9px] font-bold uppercase tracking-wide ${isDark ? "text-white/60" : "text-gray-500"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/40" : "text-gray-500"}`}>
        {description}
      </p>

      {/* Desktop action buttons (hidden on mobile) */}
      {!mobile && (
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-300 active:scale-95 border-2
              ${isDark
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
                : "border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100"}`}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-amber-400 hover:bg-amber-500 active:scale-95 text-gray-900 font-black text-sm transition-all duration-300 shadow-lg shadow-amber-400/30"
          >
            <Zap className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      )}

      {/* In-stock note */}
      <div className="flex items-center gap-1.5 mt-4">
        <CheckCircle2 className="w-4 h-4 text-green-500" />
        <span className={`text-[11px] font-medium ${isDark ? "text-green-400" : "text-green-600"}`}>
          In Stock — Usually ships in 2-3 days
        </span>
      </div>
    </div>
  );

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          MOBILE LAYOUT  (< md)
      ══════════════════════════════════════════════════════ */}
      <div className={`md:hidden min-h-screen pt-16 transition-colors duration-700 ${isDark ? "bg-[#080c0a]" : "bg-white"}`}>
        {/* Back bar */}
        <div className={`sticky top-16 z-30 flex items-center gap-3 px-4 py-2.5 border-b ${
          isDark ? "bg-[#080c0a]/95 border-emerald-900/30 backdrop-blur" : "bg-white/95 border-gray-100 backdrop-blur"
        }`}>
          <button
            onClick={() => navigate(-1)}
            className={`p-1.5 rounded-xl transition-colors ${isDark ? "text-emerald-400 hover:bg-white/5" : "text-gray-600 hover:bg-gray-50"}`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className={`text-sm font-semibold truncate ${isDark ? "text-white/70" : "text-gray-700"}`}>
            {title}
          </span>
        </div>

        {/* Image */}
        <ImageGallery mobile />

        {/* Info */}
        <ProductInfo mobile />

        {/* ── Sticky Bottom Action Bar ── */}
        <div className={`fixed bottom-16 left-0 right-0 z-40 flex gap-0 border-t ${
          isDark
            ? "bg-[#0b0f0d]/98 border-emerald-900/30 backdrop-blur-2xl"
            : "bg-white border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        }`}>
          <button
            onClick={handleAddToCart}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-[13px] transition-all duration-300 active:scale-95
              ${isDark
                ? "bg-emerald-500/20 text-emerald-300"
                : "bg-white text-emerald-700"}`}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>

          {/* Divider */}
          <div className={`w-px self-stretch ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-amber-400 hover:bg-amber-500 active:scale-95 text-gray-900 font-black text-[13px] transition-all duration-300"
          >
            <Zap className="w-5 h-5" />
            Buy Now
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          DESKTOP / TABLET LAYOUT  (md+)
      ══════════════════════════════════════════════════════ */}
      <div className={`hidden md:block min-h-screen pt-28 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#080c0a]" : "bg-white"
      }`}>
        {/* Ambient glow */}
        <div className={`fixed top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none ${
          isDark ? "bg-emerald-500/10" : "bg-emerald-50/50"
        }`} />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center gap-3 mb-10 group transition-all duration-300 ${
              isDark ? "text-emerald-800 hover:text-emerald-400" : "text-emerald-200 hover:text-emerald-600"
            }`}
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="text-[10px] font-black tracking-[4px] uppercase">
              Back to Collection
            </span>
          </button>

          {/* Side-by-side layout */}
          <div className="flex flex-col lg:flex-row gap-12 xl:gap-20 items-start">
            {/* Left: sticky image gallery */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-28">
              <ImageGallery />
            </div>

            {/* Right: product info + actions */}
            <div className="w-full lg:w-[55%]">
              <ProductInfo />
            </div>
          </div>
        </div>
      </div>

      {/* ── Toast ── */}
      <div
        className={`fixed bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 px-8 py-3.5 rounded-2xl glass border-emerald-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] whitespace-nowrap ${
          showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,1)]" />
          <p className="text-emerald-400 text-xs font-black tracking-[3px] uppercase">
            {toastMsg}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
