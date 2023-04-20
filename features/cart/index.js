import { createSlice } from "@reduxjs/toolkit";
import ProductsListData from "../../products.json";

const initialState = {
  products: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const indexOfAddedProduct = state.products.findIndex(
        (product) => product.id === action.payload[0]
      );
      if (indexOfAddedProduct === -1) {
        const productFound = ProductsListData.products.find(
          (product) => product.id === action.payload[0]
        );
        state.products.push({ ...productFound, cantidad: action.payload[1] });
        return;
      }

      state.products[indexOfAddedProduct].cantidad += action.payload[1];
    },
    getTotal: (state, action) => {
      let totalPrice = 0;
      state.products.forEach((product) => {
        totalPrice = totalPrice + product.unidad_precio * product.cantidad;
      });

      state.total = totalPrice;
    },

    removeItem: (state, action) => {
      const filteredProducts = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = filteredProducts;
    },
  },
});

export const { addItem, getTotal, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
