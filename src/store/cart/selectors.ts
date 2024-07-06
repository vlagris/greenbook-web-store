import { cartItemAdapter } from "@/store/cart/reducer.ts";
import { createSelector } from "@reduxjs/toolkit";
import type { Cart } from "@/types";
import type { RootState } from "@/store/store.ts";

const { selectAll } = cartItemAdapter.getSelectors();

export const state = (state: RootState) => state.cart;
export const totalQuantity = (state: RootState) => state.cart.totalQuantity;
export const cartLoading = (state: RootState) => state.cart.isLoading;
export const cartSuccess = (state: RootState) => state.cart.isSuccess;
export const cart = createSelector(
  [state, totalQuantity],
  (cart, totalQuantity): Cart => {
    return {
      items: selectAll(cart.items),
      totalQuantity: totalQuantity,
    }
  });