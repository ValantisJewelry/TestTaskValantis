import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    List: [],
    filtredList: [],
    loding: false,
  },
  reducers: {
    insertData: (state, action) => {
      state.List = [];
      state.loding = false;
      state.List.push(...action.payload);
    },

    handleLoding: (state) => {
      state.loding = true;
    },
    handleOffLoding: (state) => {
      state.loding = false;
    },
  },
});

export const { insertData, handleLoding, handleOffLoding } =
  productSlice.actions;
export default productSlice.reducer;
