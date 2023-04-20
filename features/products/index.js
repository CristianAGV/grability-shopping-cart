import { createSlice } from "@reduxjs/toolkit";
import ProductsListData from "../../products.json";

const initialState = {
  products: ProductsListData.products,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updateStock: (state, action) => {
      const indexOfAddedProduct = state.products.findIndex(
        (product) => product.id === action.payload[0]
      );

      if (action.payload[2] === "refill") {
        state.products[indexOfAddedProduct].stock += action.payload[1];
        return;
      }

      state.products[indexOfAddedProduct].stock -= action.payload[1];
    },
  },
});

export const { updateStock } = productsSlice.actions;
export default productsSlice.reducer;
