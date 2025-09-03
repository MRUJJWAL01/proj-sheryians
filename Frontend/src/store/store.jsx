import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/validationSlice"

export const store = configureStore({
  reducer: {
    auth:authReducer
  },
});