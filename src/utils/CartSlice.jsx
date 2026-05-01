import { createSlice } from "@reduxjs/toolkit";
const storedCart = localStorage.getItem("cartItems");

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: storedCart ? JSON.parse(storedCart) : [],
  },
  reducers: {
    addItem: (state, action) => {
      const Exist = state.items.find((item) => item.id == action.payload.id);
      if (Exist) {
        Exist.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeItem: (state, action) => {
      const Exist = state.items.find((item) => item.id === action.payload.id);
      if (Exist) {
        if (Exist.quantity > 1) {
          Exist.quantity -= 1;
        }
      } else {
        state.items = state.items.filter((item) => item.id != action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, deleteItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
