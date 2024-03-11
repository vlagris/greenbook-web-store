import { createListenerMiddleware } from "@reduxjs/toolkit";
import type { RootState, AppDispatch } from "@/store/store.ts";
import * as userDataSelectors from "@/store/auth/selectors.ts";
import * as LocalStorage from "@/services/localStorage";
import * as cartSelectors from "@/store/cart/selectors.ts";


export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening.withTypes<
  RootState,
  AppDispatch
>();



startAppListening({
  predicate: (_, currentState, previousState) => {
    return userDataSelectors.userId(currentState) !== userDataSelectors.userId(previousState);
  },
  effect: (_, listenerApi) => {
    LocalStorage.userId.set(userDataSelectors.userId(listenerApi.getState()));
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
