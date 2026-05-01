import React, { useContext, useState, useRef, useEffect } from "react";
import { ShoppingCart, Search, X, Sun, Moon } from "lucide-react";
import { ProductContext } from "../utils/ProductContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { handleSearch, theme, toggleTheme, products } =
    useContext(ProductContext);
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  /* Close suggestions on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Auto-focus when search bar expands */
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  const handleFilter = () => {
    handleSearch(search);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleFilter();
    if (e.key === "Escape") {
      setSearchOpen(false);
      setShowSuggestions(false);
    }
  };

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

  const isDark = theme === "Dark";

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500">
      <div
        className={`backdrop-blur-2xl border-b transition-colors duration-500 ${
          isDark
            ? "bg-[#0b0f0d]/70 border-emerald-900/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            : "bg-white/70 border-emerald-100/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-12">
          {/* ── Logo ── */}
          <NavLink
            to="/"
            className={`text-2xl md:text-3xl font-syne font-bold tracking-tighter transition-colors duration-300 flex-shrink-0 ${
              isDark ? "text-emerald-400" : "text-emerald-700"
            }`}
          >
            MY<span className="font-light italic">SHOP</span>
          </NavLink>

          {/* ── Right Side Actions ── */}
          <div className="flex items-center gap-3 md:gap-5">

            {/* ══ Desktop/Tablet Search (md+) ══ */}
            <div
              ref={searchRef}
              className="hidden md:flex items-center relative"
            >
              {/* Sliding search input */}
              <div
                className={`flex items-center overflow-hidden rounded-2xl border transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  searchOpen ? "w-72 lg:w-96 opacity-100" : "w-0 opacity-0 border-transparent"
                } ${
                  isDark
                    ? "bg-black/40 border-emerald-900/40 focus-within:border-emerald-500/60"
                    : "bg-emerald-50/60 border-emerald-200/60 focus-within:border-emerald-400"
                }`}
              >
                <input
                  ref={inputRef}
                  value={search}
                  type="text"
                  placeholder="Search products..."
                  className={`grow px-4 py-2.5 bg-transparent focus:outline-none text-sm font-outfit ${
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
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={handleKeyDown}
                />
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      handleSearch("");
                      setShowSuggestions(false);
                    }}
                    className={`pr-3 ${isDark ? "text-emerald-600 hover:text-emerald-400" : "text-emerald-400 hover:text-emerald-600"}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Search Icon Toggle Button */}
              <button
                onClick={() => {
                  setSearchOpen((prev) => !prev);
                  if (searchOpen) {
                    setSearch("");
                    handleSearch("");
                    setShowSuggestions(false);
                  }
                }}
                className={`ml-2 p-2.5 rounded-xl border transition-all duration-300 active:scale-90 flex-shrink-0 ${
                  searchOpen
                    ? isDark
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                      : "bg-emerald-100 border-emerald-300 text-emerald-700"
                    : isDark
                    ? "bg-emerald-950/40 border-emerald-900/40 text-emerald-400 hover:border-emerald-500/60"
                    : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300"
                }`}
              >
                {searchOpen ? (
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                ) : (
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                )}
              </button>

              {/* Suggestions Dropdown */}
              {showSuggestions && normalizedSearch && (
                <div
                  className={`absolute top-14 right-0 w-80 lg:w-96 rounded-[1.5rem] border backdrop-blur-3xl shadow-2xl overflow-hidden z-[60] animate-in fade-in slide-in-from-top-4 duration-300 ${
                    isDark
                      ? "bg-[#0b0f0d]/90 border-emerald-900/30 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                      : "bg-white/95 border-emerald-100 shadow-[0_30px_60px_rgba(0,0,0,0.1)]"
                  }`}
                >
                  <div className="p-2">
                    <p className={`px-4 py-2 text-[8px] font-black tracking-[3px] uppercase opacity-40 mb-1 ${isDark ? "text-emerald-500" : "text-emerald-700"}`}>
                      Suggested
                    </p>
                    {filteredSuggestions.length > 0 ? (
                      filteredSuggestions.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/product/${item.id}`);
                            setSearch("");
                            setShowSuggestions(false);
                            setSearchOpen(false);
                          }}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 group ${
                            isDark ? "hover:bg-emerald-500/10" : "hover:bg-emerald-50"
                          }`}
                        >
                          <div className="w-9 h-9 rounded-lg overflow-hidden bg-white p-1 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`text-[12px] font-medium truncate ${isDark ? "text-white group-hover:text-emerald-300" : "text-emerald-950 group-hover:text-emerald-600"}`}>
                              {item.title}
                            </span>
                            <span className="text-[10px] font-bold text-emerald-500">₹{item.price}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={`px-4 py-3 text-sm ${isDark ? "text-emerald-300/70" : "text-emerald-700/70"}`}>
                        No matching products found.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 md:p-2.5 rounded-xl border transition-all duration-300 active:scale-90 ${
                isDark
                  ? "bg-emerald-950/40 border-emerald-900/40 text-emerald-400 hover:border-emerald-500/60"
                  : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300"
              }`}
            >
              {theme === "Light" ? <Moon className="w-4 h-4 md:w-5 md:h-5" /> : <Sun className="w-4 h-4 md:w-5 md:h-5" />}
            </button>

            {/* Cart — desktop only in header */}
            <NavLink to="/cart" className="group relative hidden md:block">
              <div
                className={`p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
                  isDark
                    ? "bg-emerald-950/40 border-emerald-900/40 text-emerald-400 hover:border-emerald-500/60"
                    : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-emerald-500/40">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className={`h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent transition-opacity duration-700 ${
            isDark ? "opacity-100" : "opacity-30"
          }`}
        />
      </div>
    </header>
  );
};

export default Header;
