import { configureStore } from "@reduxjs/toolkit";
import customerReducers from "@/lib/reduxStore/customers/customerSlice";
import { customersApi } from "./reduxStore/customers/customersApi";


export const store = configureStore({
  reducer: {
    // customers: customerReducers,
    [customersApi.reducerPath]: customersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(customersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;