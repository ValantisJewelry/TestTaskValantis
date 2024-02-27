import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

export default configureStore({
  reducer: {
    product: productSlice,
  },
});
