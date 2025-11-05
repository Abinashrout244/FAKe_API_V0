import React, { useContext } from "react";
import { ProductContext } from "../utils/ProductContext";

const Button = () => {
  const { handleCategory, category } = useContext(ProductContext);

  const categories = [
    "all",
    "men's clothing",
    "jewelery",
    "electronics",
    "women's clothing",
  ];

  return (
    <div className="pt-20 flex flex-wrap gap-5 justify-center">
      {categories.map((cat) => {
        return (
          <button
            onClick={() => handleCategory(cat)}
            key={cat}
            className={` text-lg px-3 py-2 rounded-lg  ${
              category === cat
                ? "bg-blue-500 text-white"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default Button;
