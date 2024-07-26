import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "sepet",
  initialState: {
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.cart.findIndex(
        item => item.id === product.id && item.size === product.size,
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].amount += product.amount;
        state.cart = updatedCart;
      } else {
        state.cart = [...state.cart, { ...product }];
      }
    },
    removeProduct: (state, action) => {
      const product = action.payload;
      const existingProductIndex = state.cart.findIndex(
        item => item.id === product.id && item.size === product.size,
      );
      const updatedCart = [...state.cart];
      const currentAmount = updatedCart[existingProductIndex].amount;
      if (currentAmount === 1) {
        updatedCart.splice(existingProductIndex, 1);
      } else {
        updatedCart[existingProductIndex].amount -= 1;
      }
      state.cart = [...updatedCart];
    },
  },
});

export const { addProduct, removeProduct, deneme } = cart.actions;
export default cart.reducer;
