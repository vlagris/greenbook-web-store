import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/store/cart";
import { authReducer } from "@/store/auth";
import { genresReducer } from "@/store/genres";
import { listenerMiddleware } from "@/store/listenerMiddleware.ts";



const middleware = [listenerMiddleware.middleware];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    genres: genresReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: {
      auth: authReducer,
      genres: genresReducer,
      cart: cartReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(middleware),
    preloadedState,
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;

