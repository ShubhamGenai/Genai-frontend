import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./DataSlice";
import cartReducer from "./CartSlice";
import quizReducer from "./QuizSlice";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    cartData:cartReducer,
    Quiz : quizReducer
  },
});
