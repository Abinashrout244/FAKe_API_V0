import React, { useContext, useState } from "react";
import { ShoppingCart, Search, Menu, X, Sun, Moon } from "lucide-react";
import { ProductContext } from "../utils/ProductContext";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleSearch, theme, toggleTheme } = useContext(ProductContext);
  
  const handleFilter = () => {
    handleSearch(search);
  };

  const cartItems = useSelector((store) => store?.cart?.items);
  const cartCount = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  const isDark = theme === "Dark";

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500">
      <div className={`backdrop-blur-2xl border-b transition-colors duration-500 ${
        isDark 
          ? "bg-[#0b0f0d]/70 border-emerald-900/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
          : "bg-white/70 border-emerald-100/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)]"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-6 md:px-12">
          {/* Logo */}
          <NavLink
            to="/"
            className={`text-2xl md:text-3xl font-syne font-bold tracking-tighter transition-colors duration-300 ${
              isDark ? "text-emerald-400 text-glow-emerald" : "text-emerald-700"
            }`}
          >
            MY<span className="font-light italic">SHOP</span>
          </NavLink>

          {/* Desktop Search */}
          <div className={`hidden md:flex items-center w-[400px] rounded-2xl overflow-hidden border transition-all duration-300 group ${
            isDark 
              ? "bg-black/40 border-emerald-900/40 focus-within:border-emerald-500/60" 
              : "bg-emerald-50/50 border-emerald-200/50 focus-within:border-emerald-400"
          }`}>
            <input
              value={search}
              type="text"
              placeholder="Curated collections..."
              className={`grow px-6 py-2.5 bg-transparent focus:outline-none text-sm font-outfit ${
                isDark ? "text-emerald-200 placeholder:text-emerald-800" : "text-emerald-900 placeholder:text-emerald-400"
              }`}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleFilter}
              className={`px-5 py-2.5 transition-all duration-300 ${
                isDark ? "text-emerald-400 hover:text-emerald-200" : "text-emerald-600 hover:text-emerald-800"
              }`}
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl border transition-all duration-300 active:scale-90 ${
                isDark 
                  ? "bg-emerald-950/40 border-emerald-900/40 text-emerald-400 hover:border-emerald-500/60" 
                  : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300"
              }`}
            >
              {theme === "Light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Cart */}
            <NavLink to="/cart" className="group relative">
              <div className={`p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-105 ${
                isDark 
                  ? "bg-emerald-950/40 border-emerald-900/40 text-emerald-400 hover:border-emerald-500/60" 
                  : "bg-emerald-50 border-emerald-100 text-emerald-600 hover:border-emerald-300"
              }`}>
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center shadow-lg shadow-emerald-500/40 border-2 border-[#0b0f0d]">
                    {cartCount}
                  </span>
                )}
              </div>
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isDark ? "text-emerald-400" : "text-emerald-700"
              }`}
            >
              {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-64 border-t" : "max-h-0"
        } ${
          isDark ? "bg-[#0b0f0d]/95 border-emerald-900/30" : "bg-white/95 border-emerald-100"
        }`}>
          <div className="p-6 flex flex-col gap-6">
            {/* Mobile Search */}
            <div className={`flex items-center rounded-2xl overflow-hidden border ${
              isDark ? "bg-black/40 border-emerald-900/40" : "bg-emerald-50/50 border-emerald-200/50"
            }`}>
              <input
                value={search}
                type="text"
                placeholder="Search collections..."
                className={`grow px-5 py-3 bg-transparent focus:outline-none text-sm ${
                  isDark ? "text-emerald-200" : "text-emerald-900"
                }`}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => {
                  handleFilter();
                  setMenuOpen(false);
                }}
                className="px-5 text-emerald-500"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex justify-center pb-2">
               <p className={`text-[10px] tracking-[4px] uppercase font-bold ${
                 isDark ? "text-emerald-900" : "text-emerald-200"
               }`}>
                 Premium Shopping Experience
               </p>
            </div>
          </div>
        </div>

        {/* Cinematic progress bar look-alike */}
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent transition-opacity duration-700 ${
          isDark ? "opacity-100" : "opacity-30"
        }`} />
      </div>
    </header>
  );
};

export default Header;

