import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "@/store/cart";
import { authReducer } from "@/store/auth";
import { mainApi } from "@/services/api";
import { listenerMiddleware } from "@/store/listenerMiddleware.ts";



const middleware = [listenerMiddleware.middleware];

export const store = configureStore({
  reducer: {
    [mainApi.reducerPath]: mainApi.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(mainApi.middleware).concat(middleware)
});


// export const setupStore = (preloadedState?: Partial<RootState>) => {
//   return configureStore({
//     reducer: {
//       [serverApi.reducerPath]: serverApi.reducer,
//       auth: authReducer,
//       cart: cartReducer,
//     },
//     middleware: getDefaultMiddleware =>
//       getDefaultMiddleware().concat(serverApi.middleware).concat(middleware),
//     preloadedState,
//   });
// }

// setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>;
// export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = typeof store.dispatch;

