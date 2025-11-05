import React, { useContext } from "react";
import { ProductContext } from "../utils/ProductContext";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/CartSlice";

const ProductCard = ({ title, price, image, rating, id }) => {
  const { theme } = useContext(ProductContext);
  const dispatch = useDispatch();
  const addItems = () => {
    dispatch(addItem({ title, price, image, rating, id }));
  };
  return (
    <div
      className={`w-64  rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100 ${
        theme == "Light"
          ? "bg-white"
          : "bg-slate-700 text-gray-400 border-gray-400"
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
      />

      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">{title}</h3>

        <div className="flex items-center justify-between">
          <p className="text-blue-600 font-bold text-lg">₹{price}</p>
          <div className="flex items-center gap-1 text-yellow-500">
            ⭐<span className="text-sm text-gray-600">{rating?.rate}</span>
          </div>
        </div>

        <p className="text-sm text-gray-500">({rating?.count} reviews)</p>

        {/* Button */}
        <button
          onClick={() => {
            addItems();
          }}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
