import { configureStore } from "@reduxjs/toolkit";
import customerReducers from "@/lib/reduxStore/customers/customerSlice";


export const store = configureStore({
      reducer: {
            customers: customerReducers,    
      }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;