import { configureStore } from "@reduxjs/toolkit";
import esgReducer from './slices/esgSlice';
import authReducer from './slices/authSlice';
import portalEsgDataReducer from "./slices/portalEsgDataSlice";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      esg: esgReducer,
      portalEsgDataSlice: portalEsgDataReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
