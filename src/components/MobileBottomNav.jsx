import React, { useContext, useState, useRef, useEffect } from "react";
import { Home, Search, ShoppingCart, X } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ProductContext } from "../utils/ProductContext";

const MobileBottomNav = () => {
  const { theme, handleSearch, products } = useContext(ProductContext);
  const isDark = theme === "Dark";
  const navigate = useNavigate();
  const location = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);

  const cartItems = useSelector((store) => store?.cart?.items);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  const normalizedSearch = search.trim().toLowerCase();
  const filteredSuggestions = normalizedSearch
    ? products
        .filter((p) => p.title.toLowerCase().includes(normalizedSearch))
        .slice(0, 6)
    : [];

  /* Auto-focus search input */
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearch("");
    handleSearch("");
    setShowSuggestions(false);
  };

  const isHome = location.pathname === "/" || location.pathname === "";
  const isCart = location.pathname === "/cart";

  return (
    <>
      {/* ── Search Overlay (slides up when open) ── */}
      <div
        className={`fixed inset-x-0 bottom-16 z-[60] md:hidden transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          searchOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="mx-3">
          <div
            className={`rounded-2xl border shadow-2xl overflow-hidden ${
              isDark
                ? "bg-[#0b0f0d]/95 border-emerald-900/40 backdrop-blur-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.6)]"
                : "bg-white/95 border-emerald-100 backdrop-blur-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.1)]"
            }`}
          >
            {/* Search Input Row */}
            <div className="flex items-center px-4 py-3 gap-3">
              <Search className={`w-4 h-4 flex-shrink-0 ${isDark ? "text-emerald-500" : "text-emerald-600"}`} />
              <input
                ref={inputRef}
                value={search}
                type="text"
                placeholder="Search products..."
                className={`flex-1 bg-transparent focus:outline-none text-sm font-outfit ${
                  isDark
                    ? "text-emerald-200 placeholder:text-emerald-700"
                    : "text-emerald-900 placeholder:text-emerald-400"
                }`}
                onChange={(e) => {
                  const val = e.target.value;
                  setSearch(val);
                  handleSearch(val);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") closeSearch();
                  if (e.key === "Escape") closeSearch();
                }}
              />
              {search ? (
                <button onClick={() => { setSearch(""); handleSearch(""); setShowSuggestions(false); }}>
                  <X className={`w-4 h-4 ${isDark ? "text-emerald-600" : "text-emerald-400"}`} />
                </button>
              ) : null}
            </div>

            {/* Divider */}
            <div className={`h-px mx-4 ${isDark ? "bg-emerald-900/40" : "bg-emerald-100"}`} />

            {/* Suggestions */}
            {showSuggestions && normalizedSearch && (
              <div className="max-h-64 overflow-y-auto no-scrollbar">
                <p className={`px-4 pt-3 pb-1 text-[8px] font-black tracking-[3px] uppercase opacity-40 ${isDark ? "text-emerald-500" : "text-emerald-700"}`}>
                  Suggested
                </p>
                {filteredSuggestions.length > 0 ? (
                  filteredSuggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/product/${item.id}`);
                        closeSearch();
                      }}
                      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors duration-200 ${
                        isDark ? "hover:bg-emerald-500/10" : "hover:bg-emerald-50"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-1 flex-shrink-0">
                        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className={`text-[12px] font-medium truncate ${isDark ? "text-white" : "text-emerald-950"}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-500">₹{item.price}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className={`px-4 py-3 text-sm ${isDark ? "text-emerald-300/70" : "text-emerald-700/70"}`}>
                    No products found.
                  </p>
                )}
                <div className="pb-2" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Bottom Navigation Bar ── */}
      <nav
        className={`fixed bottom-0 inset-x-0 z-50 md:hidden border-t transition-colors duration-500 ${
          isDark
            ? "bg-[#0b0f0d]/90 border-emerald-900/30 backdrop-blur-2xl"
            : "bg-white/90 border-emerald-100 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div className="flex items-center justify-around h-16 px-4">

          {/* Home */}
          <NavLink
            to="/"
            onClick={closeSearch}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
              isHome && !searchOpen
                ? isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                : isDark ? "text-white/30" : "text-emerald-900/30"
            }`}>
              <Home className="w-5 h-5" />
            </div>
            <span className={`text-[9px] font-black tracking-wide uppercase transition-colors duration-300 ${
              isHome && !searchOpen
                ? isDark ? "text-emerald-400" : "text-emerald-600"
                : isDark ? "text-white/25" : "text-emerald-900/30"
            }`}>
              Home
            </span>
          </NavLink>

          {/* Search */}
          <button
            onClick={() => setSearchOpen((p) => !p)}
            className="flex flex-col items-center gap-1"
          >
            <div className={`p-1.5 rounded-xl transition-all duration-300 ${
              searchOpen
                ? isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                : isDark ? "text-white/30" : "text-emerald-900/30"
            }`}>
              {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </div>
            <span className={`text-[9px] font-black tracking-wide uppercase transition-colors duration-300 ${
              searchOpen
                ? isDark ? "text-emerald-400" : "text-emerald-600"
                : isDark ? "text-white/25" : "text-emerald-900/30"
            }`}>
              Search
            </span>
          </button>

          {/* Cart */}
          <NavLink
            to="/cart"
            onClick={closeSearch}
            className="flex flex-col items-center gap-1 group relative"
          >
            <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${
              isCart
                ? isDark ? "bg-emerald-500/20 text-emerald-400" : "bg-emerald-50 text-emerald-600"
                : isDark ? "text-white/30" : "text-emerald-900/30"
            }`}>
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-500 text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-[9px] font-black tracking-wide uppercase transition-colors duration-300 ${
              isCart
                ? isDark ? "text-emerald-400" : "text-emerald-600"
                : isDark ? "text-white/25" : "text-emerald-900/30"
            }`}>
              Cart
            </span>
          </NavLink>
        </div>

        {/* Safe area padding for phones with home indicator */}
        <div className="h-safe-area-inset-bottom" />
      </nav>
    </>
  );
};

export default MobileBottomNav;
