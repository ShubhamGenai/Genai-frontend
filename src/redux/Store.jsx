import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./DataSlice";
import cartReducer from "./CartSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    cartData:cartReducer
  },
});
