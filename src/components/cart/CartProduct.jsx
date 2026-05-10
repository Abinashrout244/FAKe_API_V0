import React, { useContext, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../../utils/CartSlice";
import { ProductContext } from "../../utils/ProductContext";

const CartProduct = ({ title, price, image, id, quantity }) => {
  const { theme } = useContext(ProductContext);
  const dispatch = useDispatch();
  const isDark = theme === "Dark";
  const [showToast, setShowToast] = useState(false);

  const handleRemove = () => {
    dispatch(removeItem(id));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2200);
  };

  const increment = () => {
    dispatch(addItem({ id, title, image, price }));
  };

  const decrement = () => {
    dispatch(removeItem({ id }));
  };

  return (
    <>
      <div
        className={`group flex flex-col sm:flex-row items-center gap-8 p-6 md:p-8 rounded-[2rem] border transition-all duration-500 hover:scale-[1.01] ${
          isDark
            ? "bg-white/[0.03] border-white/5 hover:border-emerald-500/30"
            : "bg-emerald-50/20 border-emerald-100 hover:border-emerald-300"
        }`}
      >
        {/* Product Image */}
        <div
          className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden p-4 flex items-center justify-center transition-all duration-500 ${
            isDark ? "bg-white/5" : "bg-white shadow-inner"
          }`}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col text-center sm:text-left">
          <p className="text-emerald-500 text-[8px] font-black tracking-[4px] uppercase mb-2 opacity-60">
            Selected Item
          </p>
          <h2
            className={`text-xl font-syne font-bold mb-3 transition-colors duration-300 ${
              isDark
                ? "text-white group-hover:text-emerald-300"
                : "text-emerald-950 group-hover:text-emerald-600"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-2xl font-outfit font-light ${isDark ? "text-emerald-400" : "text-emerald-700"}`}
          >
            <span className="text-sm mr-1">₹</span>
            {price}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center sm:items-end gap-6">
          {/* Quantity Controls */}
          <div className="flex items-center gap-6 glass border-white/5 px-2 py-2 rounded-2xl">
            <button
              onClick={decrement}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              <Minus size={18} />
            </button>
            <span
              className={`text-lg font-outfit font-bold w-6 text-center ${isDark ? "text-white" : "text-emerald-950"}`}
            >
              {quantity}
            </span>
            <button
              onClick={increment}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isDark
                  ? "text-white hover:bg-white/10"
                  : "text-emerald-900 hover:bg-emerald-50"
              }`}
            >
              <Plus size={18} />
            </button>
          </div>

          {/* Total & Remove */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p
                className={`text-[8px] font-bold uppercase tracking-widest opacity-40 mb-1 ${isDark ? "text-white" : "text-emerald-950"}`}
              >
                Line Total
              </p>
              <p
                className={`text-lg font-outfit font-bold ${isDark ? "text-white" : "text-emerald-950"}`}
              >
                ₹{(price * quantity).toFixed(2)}
              </p>
            </div>

            <button
              onClick={handleRemove}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                isDark
                  ? "border-white/5 text-white/20 hover:text-red-400 hover:border-red-400/30 hover:bg-red-400/5"
                  : "border-emerald-100 text-emerald-200 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
              }`}
            >
              <Trash2 size={20} />
            </button>
          </div>
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
            Item Removed
          </p>
        </div>
      </div>
    </>
  );
};

export default CartProduct;

