import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "@/store/auth";
import { cartReducer } from "@/store/cart";
import { genresReducer } from "@/store/genres";
import { listenerMiddleware } from "@/store/listenerMiddleware.ts";



const initialMiddleware = [listenerMiddleware.middleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    genres: genresReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(initialMiddleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

