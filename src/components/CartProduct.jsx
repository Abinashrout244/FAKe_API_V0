import { Trash2, Plus, Minus } from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem, removeItem } from "../utils/CartSlice";

const CartProduct = ({ title, price, image, id, quantity }) => {
  const dispatch = useDispatch();
  const handleRemove = () => {
    dispatch(removeItem(id));
  };

  const increment = () => {
    dispatch(addItem({ id, title, image, price }));
  };
  const decrement = () => {
    dispatch(removeItem({ id }));
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white shadow-lg rounded-2xl p-4 mb-4 hover:shadow-xl transition">
      {/* Product Image */}
      <div className="flex items-center gap-4">
        <img
          src={image}
          alt={title}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-gray-600">₹{price}</p>
        </div>
      </div>

      {/* Quantity and Remove */}
      <div className="flex items-center gap-4 mt-4 md:mt-0">
        {/* Quantity Selector */}
        <div className="flex flex-col gap-2">
          <div className=" text-center bg-gray-100 rounded-full px-3 py-1.5">
            ₹{price * quantity}
          </div>
          <div className="flex items-center bg-gray-100 rounded-full">
            <button
              onClick={() => {
                decrement();
              }}
              className="px-3 py-1 rounded-l-full hover:bg-gray-200 transition"
            >
              <Minus size={16} />
            </button>
            <span className="px-4 font-medium">{quantity}</span>
            <button
              onClick={() => {
                increment();
              }}
              className="px-3 py-1 rounded-r-full hover:bg-gray-200 transition"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            handleRemove();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
        >
          <Trash2 size={18} />
          <span className="hidden md:inline">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
