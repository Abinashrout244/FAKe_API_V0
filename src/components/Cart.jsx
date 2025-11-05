import React, { useContext } from "react";
import { ShoppingBagIcon } from "lucide-react";
import CartProduct from "./CartProduct";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/CartSlice";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../utils/ProductContext";

const Cart = () => {
  const { theme } = useContext(ProductContext);
  const navigate = useNavigate();
  const CartItem = useSelector((store) => store?.cart?.items);
  const Total_Price = CartItem.reduce((acc, curr) => {
    return acc + curr.price * curr.quantity;
  }, 0);
  const dispatch = useDispatch();
  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className={`min-h-screen  flex flex-col items-center pt-32 pb-16 px-4 ${
        theme == "Light"
          ? "bg-linear-to-br from-gray-50 to-green-100"
          : "bg-slate-800 text-gray-400 border-gray-400"
      }`}
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 transition hover:shadow-2xl">
        <div className="flex items-center gap-3 border-b pb-4 mb-6">
          <ShoppingBagIcon className="text-green-600 w-7 h-7" />
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        </div>
        <div className="flex flex-col gap-4">
          {CartItem.map((item) => {
            return <CartProduct {...item} key={item.id} />;
          })}
        </div>
        <div className="flex justify-between items-center mt-8 border-t pt-4">
          <h1 className="text-lg font-semibold text-gray-800">Total:</h1>
          <p className="text-xl font-bold text-green-700">₹{Total_Price}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition"
          >
            Checkout
          </button>
          <button
            onClick={() => {
              handleClear();
            }}
            className="flex-1 py-3 rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
