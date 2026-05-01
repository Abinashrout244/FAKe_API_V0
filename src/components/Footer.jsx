import React, { useContext } from "react";
import { ProductContext } from "../utils/ProductContext";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Truck,
  RefreshCcw,
  Shield,
  Instagram,
  Twitter,
  Github,
  Heart,
} from "lucide-react";

const Footer = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";

  const features = [
    { icon: Truck, label: "Free Shipping", sub: "On orders above ₹999" },
    { icon: RefreshCcw, label: "Easy Returns", sub: "30-day return policy" },
    { icon: Shield, label: "Secure Pay", sub: "100% safe checkout" },
  ];

  const links = [
    { label: "Home", to: "/" },
    { label: "Cart", to: "/cart" },
  ];

  return (
    <footer
      className={`w-full border-t transition-colors duration-500 mb-16 md:mb-0 ${
        isDark
          ? "bg-[#0b0f0d] border-emerald-900/30"
          : "bg-white border-emerald-100"
      }`}
    >
      {/* Feature Strips */}
      <div
        className={`border-b ${
          isDark ? "border-emerald-900/20" : "border-emerald-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 grid grid-cols-3 gap-4 md:gap-8">
          {features.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1 ${
                  isDark ? "bg-emerald-500/10" : "bg-emerald-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
              </div>
              <p className={`text-[10px] md:text-xs font-black tracking-wide uppercase ${isDark ? "text-white" : "text-emerald-950"}`}>
                {label}
              </p>
              <p className={`text-[9px] md:text-[10px] hidden sm:block ${isDark ? "text-white/30" : "text-emerald-700/50"}`}>
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <NavLink
              to="/"
              className={`text-2xl font-syne font-bold tracking-tighter ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              MY<span className="font-light italic">SHOP</span>
            </NavLink>
            <p className={`text-[11px] text-center md:text-left max-w-[200px] leading-relaxed ${isDark ? "text-white/30" : "text-emerald-700/50"}`}>
              Curated collections. Premium quality. Delivered to you.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className={`text-[9px] font-black tracking-[3px] uppercase mb-1 ${isDark ? "text-emerald-600" : "text-emerald-400"}`}>
              Quick Links
            </p>
            {links.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                className={`text-sm transition-colors duration-200 ${
                  isDark
                    ? "text-white/40 hover:text-emerald-400"
                    : "text-emerald-900/50 hover:text-emerald-700"
                }`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className={`text-[9px] font-black tracking-[3px] uppercase mb-1 ${isDark ? "text-emerald-600" : "text-emerald-400"}`}>
              Follow Us
            </p>
            <div className="flex items-center gap-3">
              {[Instagram, Twitter, Github].map((Icon, i) => (
                <button
                  key={i}
                  className={`p-2 rounded-xl border transition-all duration-300 hover:scale-110 active:scale-95 ${
                    isDark
                      ? "border-emerald-900/40 text-white/30 hover:border-emerald-500/50 hover:text-emerald-400"
                      : "border-emerald-100 text-emerald-900/30 hover:border-emerald-300 hover:text-emerald-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`my-8 h-px w-full bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent`}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className={`text-[10px] font-outfit ${isDark ? "text-white/20" : "text-emerald-900/30"}`}>
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
          <div className={`flex items-center gap-1.5 text-[10px] ${isDark ? "text-white/20" : "text-emerald-900/30"}`}>
            <span>Made with</span>
            <Heart className="w-3 h-3 text-emerald-500 fill-emerald-500" />
            <span>using React &amp; Tailwind</span>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
    </footer>
  );
};

export default Footer;
