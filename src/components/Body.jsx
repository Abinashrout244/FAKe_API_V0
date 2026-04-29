import React, { useContext } from "react";
import Main from "./Main";
import { ProductContext } from "../utils/ProductContext";

const Body = () => {
  const { theme } = useContext(ProductContext);
  const isDark = theme === "Dark";
  
  return (
    <div className={`min-h-screen transition-colors duration-700 ${
      isDark ? "bg-[#080c0a]" : "bg-white"
    }`}>
      <Main />
    </div>
  );
};

export default Body;

