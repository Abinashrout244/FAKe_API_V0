import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";
import { addItem } from "../utils/CartSlice";
import { useDispatch } from "react-redux";

const ProductPage = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const Prod = products[id - 1];
  const { theme } = useContext(ProductContext);
  // const Prod = products[id - 1];
  //const Prod = products.find((item) => item.id === Number(id));
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(addItem({ id, image, title, rating, price }));
  };

  if (!Prod) return <div className="text-center pt-60 text-xl">Loading...</div>;
  const { title, category, description, rating, image, price } = Prod;

  return (
    <div
      className={`pt-28 flex justify-center items-center min-h-screen  ${
        theme == "Light" ? "bg-gray-50" : "bg-slate-900"
      }`}
    >
      <div
        className={`flex flex-col md:flex-row gap-10 shadow-lg rounded-2xl p-8 w-[90%] md:w-[70%] lg:w-[60%]${
          theme == "Light"
            ? "bg-white"
            : " bg-slate-700 border-2 border-gray-200"
        } `}
      >
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={image}
            alt={title}
            className="w-60 h-60 md:w-72 md:h-72 object-contain rounded-lg border border-gray-200 shadow-sm hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="flex flex-col justify-center w-full md:w-1/2 ">
          <h2
            className={`text-2xl font-bold mb-2 ${
              theme == "Light" ? "text-slate-800" : "text-slate-200"
            }`}
          >
            {title}
          </h2>
          <p
            className={`text-lg font-semibold text-gray-500 mb-4 ${
              theme == "Light" ? "text-slate-800" : "text-slate-200"
            }`}
          >
            ₹{price}
          </p>
          <p className="text-sm text-gray-500 mb-3 capitalize">
            Category: <span className="font-semibold">{category}</span>
          </p>
          <p
            className={`text-base text-gray-500 mb-4 ${
              theme == "Light" ? "text-slate-800" : "text-slate-200"
            }`}
          >
            {description}
          </p>
          <p className="text-lg font-semibold mb-2">⭐ {rating?.rate} stars</p>
          <p className="text-sm text-gray-500 mb-5">
            👁 {rating?.count} reviews
          </p>

          <button
            onClick={() => {
              handleAdd();
            }}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
