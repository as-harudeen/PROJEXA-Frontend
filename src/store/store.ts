import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./slice/loadingSlice";
import sideBarReducer from "./slice/sideBarSlice";

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    isSideBarOpen: sideBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
