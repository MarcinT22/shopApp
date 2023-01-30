import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/basketSlice";
import userReducer from "./features/userSlice";
export default configureStore({
  reducer: {
    basket: basketReducer,
    user: userReducer,
  },
});
