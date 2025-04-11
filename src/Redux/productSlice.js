import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    likes: 0,
    cart: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    // productSlice.js
    setCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cart.find((item) => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
      } else {
        state.cart.push({ ...newItem, quantity: newItem.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.cart = [];
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    toggleLike: (state, action) => {
      const productId = action.payload;
      if (!state.likes) state.likes = [];
      if (state.likes.includes(productId)) {
        state.likes = state.likes.filter((id) => id !== productId);
      } else {
        state.likes.push(productId);
      }
    },
  },
});
export const {
  setProducts,
  setLikes,
  setCart,
  removeFromCart,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
  toggleLike,
} = productSlice.actions;
export default productSlice.reducer;
