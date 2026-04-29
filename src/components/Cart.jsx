import React, { useContext, useState } from "react";
import { ShoppingBag, ArrowRight, Trash2, Home } from "lucide-react";
import CartProduct from "./CartProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/CartSlice";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";

const Cart = () => {
  const { theme } = useContext(ProductContext);
  const navigate = useNavigate();
  const CartItems = useSelector((store) => store?.cart?.items);
  const [showToast, setShowToast] = useState(false);
  const Total_Price = CartItems.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const isDark = theme === "Dark";

  return (
    <>
      <div
        className={`min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden transition-colors duration-700 ${
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
              <p
                className={`text-lg font-outfit mb-8 opacity-40 ${isDark ? "text-white" : "text-emerald-950"}`}
              >
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
                    <p
                      className={`text-[10px] font-black tracking-[4px] uppercase mb-2 opacity-40 ${isDark ? "text-white" : "text-emerald-950"}`}
                    >
                      Total Acquisition Value
                    </p>
                    <h2
                      className={`text-4xl md:text-5xl font-outfit font-bold ${isDark ? "text-white" : "text-emerald-950"}`}
                    >
                      <span className="text-emerald-500 text-2xl mr-2 font-light">
                        ₹
                      </span>
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
      <div
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 px-10 py-4 rounded-2xl glass border-red-500/50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          showToast
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-4">
          {/* Same dot → replaced with trash icon */}
          <Trash2 className="w-4 h-4 text-red-400" />

          {/* Same text style */}
          <p className="text-red-400 text-xs font-black tracking-[3px] uppercase">
            Clear Collection
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
