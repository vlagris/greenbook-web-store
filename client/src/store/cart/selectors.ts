import { cartItemAdapter } from "@/store/cart/reducer.ts";
import { createSelector } from "@reduxjs/toolkit";
import type { Cart } from "@/types.ts";
import type { RootState } from "@/store/store.ts";

const { selectAll } = cartItemAdapter.getSelectors();

export const state = (state: RootState) => state.cart;
export const totalQuantity = (state: RootState) => state.cart.totalQuantity;
export const loading = (state: RootState) => state.cart.loading;
export const cart = createSelector(
  [state, totalQuantity],
  (cart, totalQuantity): Cart => {
    return {
      items: selectAll(cart.items),
      totalQuantity: totalQuantity,
    }
  });