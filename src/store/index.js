import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const customizedMiddleware = (getDefaultMiddleware) => getDefaultMiddleware({
  serializableCheck: false,
});

export default configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: customizedMiddleware,
});
