import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const Exist = state.items.find((item) => item.id == action.payload.id);
      if (Exist) {
        Exist.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
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
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
