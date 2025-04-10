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
    setLikes: (state, action) => {
      state.likes = action.payload;
    },

    setCart: (state, action) => {
      const newItem = action.payload;
      if (Array.isArray(state.cart)) {
        state.cart = [...state.cart, newItem];
      } else {
        state.cart = [newItem];
      }
    },
  },
});
export const { setProducts, setLikes, setCart } = productSlice.actions;
export default productSlice.reducer;
