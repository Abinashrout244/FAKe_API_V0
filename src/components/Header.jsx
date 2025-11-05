import React, { useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
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
  return (
    <header
      className={`fixed top-0 w-full h-16 shadow-md z-20 flex items-center justify-between px-6 md:px-16 transition-colors duration-300 ${
        theme === "Light"
          ? "bg-white text-gray-800"
          : "bg-slate-700 text-gray-300"
      }`}
    >
      <div className="flex items-center gap-2">
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600 cursor-pointer"
        >
          MyShop
        </NavLink>
      </div>

      <div className="hidden md:flex items-center bg-gray-100 border border-gray-300 rounded-full overflow-hidden w-[350px] lg:w-[400px]">
        <input
          value={search}
          type="text"
          placeholder="Search products..."
          className="grow px-4 py-2 bg-transparent focus:outline-none text-gray-700"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition"
        >
          🔍
        </button>
      </div>

      <div className="flex  items-center gap-4">
        <NavLink to="/cart">
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-xs font-bold text-white rounded-full px-1.5">
              {cartItems?.length}
            </span>
          </div>
        </NavLink>

        <button
          onClick={toggleTheme}
          className="hidden sm:block px-3 py-1 rounded-lg border border-cyan-500 font-semibold hover:bg-cyan-500 hover:text-white transition"
        >
          {theme === "Light" ? "🌙" : "☀️"}
        </button>

        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "❌" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div
          className={`absolute top-16 left-0 w-full flex flex-col items-center gap-4 py-4 transition-all duration-300 ${
            theme === "Light" ? "bg-white" : "bg-slate-800"
          }`}
        >
          <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full overflow-hidden w-[90%]">
            <input
              value={search}
              type="text"
              placeholder="Search products..."
              className="grow px-4 py-2 bg-transparent focus:outline-none text-gray-700"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleFilter}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 transition"
            >
              🔍
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="px-4 py-1 rounded-lg border border-cyan-500 font-semibold hover:bg-cyan-500 hover:text-white transition"
          >
            {theme === "Light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
