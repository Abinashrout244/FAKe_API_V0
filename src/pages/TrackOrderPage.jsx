import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";
import { PackageCheck, Home } from "lucide-react";

const TrackOrderPage = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen pt-24 pb-24 px-6 flex items-center justify-center transition-colors duration-500 ${
        isDark ? "bg-[#080c0a]" : "bg-gray-50"
      }`}
    >
      <div
        className={`w-full max-w-xl rounded-[2rem] border p-8 md:p-10 text-center ${
          isDark
            ? "bg-[#0b0f0d] border-emerald-900/30"
            : "bg-white border-emerald-100 shadow-xl shadow-emerald-500/10"
        }`}
      >
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-500/15 flex items-center justify-center">
          <PackageCheck className="w-8 h-8 text-emerald-500" />
        </div>
        <h1
          className={`text-2xl md:text-3xl font-syne font-black mb-3 ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          Track Order
        </h1>
        <p
          className={`text-sm mb-7 ${
            isDark ? "text-white/50" : "text-gray-600"
          }`}
        >
          Order Status: Working Ongoing
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm transition-all duration-200 active:scale-95"
        >
          <Home className="w-4 h-4" />
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default TrackOrderPage;
