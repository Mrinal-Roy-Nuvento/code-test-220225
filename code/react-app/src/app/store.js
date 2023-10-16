import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../features/empSlice';


export const store = configureStore({
    reducer: {
      employee: employeeReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })
