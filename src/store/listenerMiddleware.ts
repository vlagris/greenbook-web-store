import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "@/store/store.ts";
import { storage } from "@/services/storage";
import { cartSelectors } from "@/store/cart";
import { authSelectors } from "@/store/auth";


export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();



startAppListening({
  predicate: (_, currentState, previousState) => {
    return authSelectors.userId(currentState) !== authSelectors.userId(previousState);
  },
  effect: (_, listenerApi) => {
    storage.local.userId.set(authSelectors.userId(listenerApi.getState()));
  }
});


startAppListening({
  predicate: (_, currentState, previousState) => {
    return JSON.stringify(cartSelectors.state(currentState)) !== JSON.stringify(cartSelectors.state(previousState));
  },
  effect: (_, listenerApi) => {
    storage.local.cart.set(cartSelectors.state(listenerApi.getState()));
  }
});