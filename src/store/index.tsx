import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./data-slice";
import authSlice from "./auth-slice";
import UISlice from "./ui-slice";

const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
    auth: authSlice.reducer,
    ui: UISlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
