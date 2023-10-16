import { configureStore } from "@reduxjs/toolkit";
import portalEsgDataReducer from "./slices/portalEsgDataSlice";

export const store = configureStore({
    reducer: {
      portalEsgDataSlice: portalEsgDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
