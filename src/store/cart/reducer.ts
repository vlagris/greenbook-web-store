import { createEntityAdapter, createReducer } from "@reduxjs/toolkit";
import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import type { Book, Cart, CartItem, CartState, UpdateCartItem } from "@/types.ts";
import {
  addCart,
  addCartFromStorage,
  removeCart,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity
} from "@/store/cart/actions.ts";
import { objectLocalStorage } from "@/services/objectLocalStorage";


export const cartItemAdapter = createEntityAdapter<CartItem>();

const initialState: CartState =  {
  items: cartItemAdapter.getInitialState(),
  totalQuantity: 0,
  loading: true
};



export const cartReducer = createReducer(
  initialState,
  (builder: ActionReducerMapBuilder<CartState>) => {
  builder
    .addCase(addCart, (state: CartState, {payload}: PayloadAction<Cart>) => {
      cartItemAdapter.setAll(state.items, payload.items);
      state.totalQuantity = payload.totalQuantity;
      state.loading = false;
    })

    .addCase(addCartFromStorage, (state: CartState) => {
      const cart = objectLocalStorage.cart.get();

      if (cart) {
        state.items = cart.items;
        state.totalQuantity = cart.totalQuantity;
      }
      state.loading = false;
    })

    .addCase(removeCart, (state: CartState) => {
      state.items = initialState.items;
      state.totalQuantity = initialState.totalQuantity;
      state.loading = false;
    })

    .addCase(addCartItem, (state: CartState, {payload}: PayloadAction<Book>) => {
      if (state.items.entities[payload.id]) {
        return;
      }

      cartItemAdapter.upsertOne(state.items, {
        id: payload.id,
        title: payload.title,
        price: payload.price,
        image: payload.image,
        quantity: 1
      });

      state.totalQuantity += 1;
    })

    .addCase(removeCartItem, (state: CartState, {payload}: PayloadAction<string>) => {
      const cartItem = state.items.entities[payload];
      if (!cartItem) {
        return;
      }

      state.totalQuantity -= cartItem.quantity;
      cartItemAdapter.removeOne(state.items, payload);
    })

    .addCase(updateCartItemQuantity, (state: CartState, {payload}: PayloadAction<UpdateCartItem>) => {
      const {id, quantity} = payload;
      const OldQuantity = state.items.entities[id].quantity;

      state.items.entities[id].quantity = quantity;
      state.totalQuantity -= OldQuantity;
      state.totalQuantity += quantity;
    })
});