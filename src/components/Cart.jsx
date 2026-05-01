import React, { useContext, useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, Home, Star, Bookmark, Zap, Tag } from "lucide-react";
import CartProduct from "./CartProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/CartSlice";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";

/* ─── helpers ─────────────────────────────────────────────── */
const dealTag = (price) => {
  if (price > 200) return { label: "Hot Deal", color: "bg-red-500" };
  if (price > 100) return { label: "WOW Offer", color: "bg-orange-500" };
  return { label: "Best Price", color: "bg-green-600" };
};

const fakeOriginal = (price) => (price * 1.3).toFixed(0);
const fakeDiscount = (price) =>
  Math.round(((fakeOriginal(price) - price) / fakeOriginal(price)) * 100);

/* ─── Mobile Cart Item ─────────────────────────────────────── */
const MobileCartItem = ({ item, isDark }) => {
  const dispatch = useDispatch();
  const { label, color } = dealTag(item.price);
  const orig = fakeOriginal(item.price);
  const disc = fakeDiscount(item.price);

  return (
    <div
      className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
        isDark
          ? "bg-[#0f1410] border-emerald-900/30"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Deal Tag */}
      <div className={`absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full text-[9px] font-black text-white ${color}`}>
        {label}
      </div>

      <div className="flex gap-3 p-3 pt-4">
        {/* Product Image */}
        <div className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center p-2 ${isDark ? "bg-white/5" : "bg-gray-50"}`}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <h3 className={`text-[13px] font-semibold leading-snug line-clamp-2 ${isDark ? "text-white" : "text-gray-900"}`}>
            {item.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-0.5">
            <div className="flex items-center gap-0.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
              <span>{item.rating?.rate ?? "4.2"}</span>
              <Star className="w-2 h-2 fill-white" />
            </div>
            <span className={`text-[9px] ${isDark ? "text-white/40" : "text-gray-400"}`}>
              ({item.rating?.count ?? "120"})
            </span>
          </div>

          {/* Price row */}
          <div className="flex items-baseline gap-2 mt-1 flex-wrap">
            <span className={`text-base font-bold ${isDark ? "text-white" : "text-gray-900"}`}>
              ₹{item.price}
            </span>
            <span className={`text-[11px] line-through ${isDark ? "text-white/30" : "text-gray-400"}`}>
              ₹{orig}
            </span>
            <span className="text-[11px] font-bold text-green-600">
              {disc}% off
            </span>
          </div>

          {/* Qty */}
          <div className={`flex items-center gap-1 text-[10px] mt-0.5 ${isDark ? "text-white/40" : "text-gray-400"}`}>
            <Tag className="w-3 h-3" />
            <span>Qty: {item.quantity}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`mx-3 h-px ${isDark ? "bg-white/5" : "bg-gray-100"}`} />

      {/* Action Buttons */}
      <div className="flex items-center justify-between px-3 py-2.5">
        <div className="flex items-center gap-1">
          {/* Remove */}
          <button
            onClick={() => dispatch(deleteItem(item.id))}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors duration-200 ${
              isDark
                ? "text-red-400 hover:bg-red-500/10"
                : "text-red-500 hover:bg-red-50"
            }`}
          >
            <Trash2 className="w-3 h-3" />
            Remove
          </button>

          <div className={`w-px h-4 ${isDark ? "bg-white/10" : "bg-gray-200"}`} />

          {/* Save for later */}
          <button
            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-colors duration-200 ${
              isDark
                ? "text-blue-400 hover:bg-blue-500/10"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            <Bookmark className="w-3 h-3" />
            Save for later
          </button>
        </div>

        {/* Buy this now */}
        <button
          className="flex items-center gap-1 px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-gray-900 rounded-lg text-[10px] font-black transition-colors duration-200"
        >
          <Zap className="w-3 h-3" />
          Buy now
        </button>
      </div>
    </div>
  );
};

/* ─── Main Cart ────────────────────────────────────────────── */
const Cart = () => {
  const { theme } = useContext(ProductContext);
  const navigate = useNavigate();
  const CartItems = useSelector((store) => store?.cart?.items);
  const [showToast, setShowToast] = useState(false);

  const Total_Price = CartItems.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );
  const TotalOriginal = CartItems.reduce(
    (acc, curr) => acc + parseFloat(fakeOriginal(curr.price)) * curr.quantity,
    0
  );
  const TotalSavings = TotalOriginal - Total_Price;

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  const isDark = theme === "Dark";

  /* ══════════════════════════════════════════════════════════
     MOBILE LAYOUT  (< sm)
  ══════════════════════════════════════════════════════════ */
  const MobileCart = (
    <div
      className={`sm:hidden min-h-screen pt-16 pb-36 transition-colors duration-700 ${
        isDark ? "bg-[#080c0a]" : "bg-gray-50"
      }`}
    >
      {/* ── Top Bar ── */}
      <div className={`sticky top-16 z-30 px-4 py-3 flex items-center justify-between border-b ${
        isDark ? "bg-[#080c0a]/95 border-emerald-900/30 backdrop-blur" : "bg-gray-50/95 border-gray-200 backdrop-blur"
      }`}>
        <div>
          <h1 className={`text-lg font-bold font-syne ${isDark ? "text-white" : "text-gray-900"}`}>
            My Cart
          </h1>
          <p className={`text-[10px] font-medium ${isDark ? "text-emerald-500" : "text-emerald-600"}`}>
            Shopping ({CartItems.length} {CartItems.length === 1 ? "item" : "items"})
          </p>
        </div>
        {CartItems.length > 0 && (
          <button
            onClick={handleClear}
            className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
              isDark
                ? "border-red-900/40 text-red-400 hover:bg-red-500/10"
                : "border-red-200 text-red-500 hover:bg-red-50"
            }`}
          >
            Clear all
          </button>
        )}
      </div>

      {/* ── Content ── */}
      <div className="px-3 pt-3">
        {CartItems.length === 0 ? (
          /* Empty State */
          <div className={`flex flex-col items-center justify-center py-24 mx-2 rounded-3xl border border-dashed mt-8 ${
            isDark ? "border-emerald-900/30" : "border-gray-200"
          }`}>
            <ShoppingBag className={`w-14 h-14 mb-6 opacity-20 ${isDark ? "text-emerald-400" : "text-gray-400"}`} />
            <p className={`text-base font-semibold mb-2 ${isDark ? "text-white/60" : "text-gray-600"}`}>
              Your cart is empty
            </p>
            <p className={`text-xs mb-8 ${isDark ? "text-white/30" : "text-gray-400"}`}>
              Add items to get started
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-gray-900 font-black text-xs rounded-xl tracking-wide uppercase transition-colors duration-200"
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {CartItems.map((item) => (
              <MobileCartItem key={item.id} item={item} isDark={isDark} />
            ))}
          </div>
        )}
      </div>

      {/* ── Fixed Bottom Checkout Bar ── */}
      {CartItems.length > 0 && (
        <div className={`fixed bottom-16 left-0 right-0 z-40 border-t ${
          isDark
            ? "bg-[#0b0f0d]/98 border-emerald-900/30 backdrop-blur-2xl"
            : "bg-white border-gray-200 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]"
        }`}>
          {/* Savings banner */}
          <div className="bg-green-600/10 border-b border-green-600/20 px-4 py-1.5">
            <p className="text-green-600 text-[11px] font-bold text-center">
              🎉 You're saving ₹{TotalSavings.toFixed(2)} on this order!
            </p>
          </div>

          <div className="flex items-center justify-between px-4 py-3 gap-3">
            {/* Price block */}
            <div>
              <p className={`text-[9px] font-bold uppercase tracking-widest mb-0.5 ${isDark ? "text-white/30" : "text-gray-400"}`}>
                Total Price
              </p>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-xl font-bold font-outfit ${isDark ? "text-white" : "text-gray-900"}`}>
                  ₹{Total_Price.toFixed(2)}
                </span>
                <span className={`text-[11px] line-through ${isDark ? "text-white/25" : "text-gray-400"}`}>
                  ₹{TotalOriginal.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Place Order */}
            <button className="flex-shrink-0 bg-amber-400 hover:bg-amber-500 active:scale-95 text-gray-900 font-black text-[13px] px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-amber-400/30 flex items-center gap-2">
              Place Order
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  /* ══════════════════════════════════════════════════════════
     DESKTOP / TABLET LAYOUT  (sm+)  — unchanged
  ══════════════════════════════════════════════════════════ */
  const DesktopCart = (
    <div
      className={`hidden sm:block min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 ${
        isDark ? "bg-[#080c0a]" : "bg-white"
      }`}
    >
      {/* Background Ambience */}
      <div
        className={`fixed top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ${
          isDark ? "bg-emerald-500/10" : "bg-emerald-100/40"
        }`}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-emerald-500 text-[10px] font-black tracking-[6px] uppercase mb-4 opacity-80">
              Your Selection
            </p>
            <h1
              className={`text-4xl md:text-5xl font-syne font-bold tracking-tighter ${
                isDark ? "text-white" : "text-emerald-950"
              }`}
            >
              Private <span className="italic font-light">Inventory</span>
            </h1>
          </div>

          {CartItems.length > 0 && (
            <button
              onClick={handleClear}
              className={`flex items-center gap-2 group transition-all duration-300 ${
                isDark
                  ? "text-emerald-900 hover:text-red-400"
                  : "text-emerald-200 hover:text-red-600"
              }`}
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-[10px] font-black tracking-[3px] uppercase">
                Dissolve Selection
              </span>
            </button>
          )}
        </div>

        {CartItems.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-24 rounded-[3rem] border border-dashed transition-all duration-500 ${
              isDark
                ? "border-emerald-900/30 bg-white/5"
                : "border-emerald-100 bg-emerald-50/20"
            }`}
          >
            <ShoppingBag
              className={`w-16 h-16 mb-8 opacity-20 ${isDark ? "text-emerald-500" : "text-emerald-900"}`}
            />
            <p className={`text-lg font-outfit mb-8 opacity-40 ${isDark ? "text-white" : "text-emerald-950"}`}>
              Your collection is currently empty.
            </p>
            <button
              onClick={() => navigate("/")}
              className={`px-8 py-4 rounded-full flex items-center gap-3 transition-all duration-500 group ${
                isDark
                  ? "bg-emerald-500 text-black hover:scale-105"
                  : "bg-emerald-600 text-white hover:scale-105"
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px] font-black tracking-[3px] uppercase">
                Return to Gallery
              </span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {/* Items List */}
            <div className="flex flex-col gap-4">
              {CartItems.map((item) => (
                <CartProduct {...item} key={item.id} />
              ))}
            </div>

            {/* Summary Panel */}
            <div
              className={`rounded-[2.5rem] border p-8 md:p-12 transition-all duration-700 ${
                isDark
                  ? "bg-[#0b0f0d]/40 border-emerald-900/30 shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                  : "bg-emerald-50/30 border-emerald-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
              }`}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <p className={`text-[10px] font-black tracking-[4px] uppercase mb-2 opacity-40 ${isDark ? "text-white" : "text-emerald-950"}`}>
                    Total Acquisition Value
                  </p>
                  <h2 className={`text-4xl md:text-5xl font-outfit font-bold ${isDark ? "text-white" : "text-emerald-950"}`}>
                    <span className="text-emerald-500 text-2xl mr-2 font-light">₹</span>
                    {Total_Price.toFixed(2)}
                  </h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <button
                    onClick={() => navigate("/")}
                    className={`px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 border ${
                      isDark
                        ? "border-emerald-900/40 text-emerald-400 hover:bg-white/5"
                        : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-[3px] uppercase">
                      Continue Exploring
                    </span>
                  </button>
                  <button
                    className={`px-12 py-5 rounded-2xl flex items-center justify-center gap-4 transition-all duration-500 group active:scale-95 ${
                      isDark
                        ? "bg-emerald-500 text-black"
                        : "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20"
                    }`}
                  >
                    <span className="text-[10px] font-black tracking-[3px] uppercase">
                      Proceed to Checkout
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {MobileCart}
      {DesktopCart}

      {/* Toast — shared */}
      <div
        className={`fixed bottom-24 sm:bottom-12 left-1/2 -translate-x-1/2 px-10 py-4 rounded-2xl glass border-red-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-4">
          <Trash2 className="w-4 h-4 text-red-400" />
          <p className="text-red-400 text-xs font-black tracking-[3px] uppercase">
            Clear Collection
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
