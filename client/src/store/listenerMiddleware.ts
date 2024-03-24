import { createListenerMiddleware } from "@reduxjs/toolkit";
import { cartSelectors } from "@/store/cart";
import { authSelectors } from "@/store/auth";
import * as LocalStorage from "@/services/localStorage";
import type { RootState, AppDispatch } from "@/store/store.ts";


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
    LocalStorage.userId.set(authSelectors.userId(listenerApi.getState()));
  }
});


startAppListening({
  predicate: (_, currentState, previousState) => {
    return JSON.stringify(cartSelectors.state(currentState)) !== JSON.stringify(cartSelectors.state(previousState));
  },
  effect: (_, listenerApi) => {
    LocalStorage.cart.set(cartSelectors.state(listenerApi.getState()));
  }
});
