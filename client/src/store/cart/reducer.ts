import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Cart, CartItem, CartState } from "@/types";
import { objectLocalStorage } from "@/services/objectLocalStorage";
import { cartEndpoints } from "@/services/api";



function setCartFulfilledMatcher(state: CartState, {payload}: PayloadAction<Cart>) {
  cartItemAdapter.setAll(state.items, payload.items);
  state.totalQuantity = payload.totalQuantity;
  state.isLoading = false
  state.isSuccess = true
}

function setCartPendingMatcher(state: CartState) {
  state.isLoading = true
}

function setCartRejectedMatcher(state: CartState) {
  state.isSuccess = true
}



export const cartItemAdapter = createEntityAdapter<CartItem>();

const emptyState: CartState =  {
  items: cartItemAdapter.getInitialState(),
  totalQuantity: 0,
  isLoading: false,
  isSuccess: true
};

const initialState: CartState = {
  items: objectLocalStorage.cart.get()?.items ?? emptyState.items,
  totalQuantity: objectLocalStorage.cart.get()?.totalQuantity ?? emptyState.totalQuantity,
  isLoading: false,
  isSuccess: !objectLocalStorage.userId.get()

}


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeCart: (state: CartState) => {
      state.items = emptyState.items;
      state.totalQuantity = emptyState.totalQuantity;
      state.isLoading = emptyState.isLoading;
      state.isSuccess = emptyState.isSuccess;
    },

    addCartItem: (state: CartState, {payload}) => {
      const newCartItem = {
        id: payload.id,
        title: payload.title,
        price: payload.price,
        image: payload.image,
        quantity: state.items.entities[payload.id]?.quantity ?? 0
      }
      newCartItem.quantity += 1;
      state.totalQuantity += 1;
      cartItemAdapter.upsertOne(state.items, newCartItem);
    },

    updateCartItem: (state: CartState, {payload}) => {
      const {id, quantity} = payload;
      const OldQuantity = state.items.entities[id].quantity;
      state.items.entities[id].quantity = quantity;
      state.totalQuantity -= OldQuantity;
      state.totalQuantity += quantity;
    },

    removeCartItem: (state: CartState, {payload}) => {
      const cartItem = state.items.entities[payload];
      if (cartItem) {
        state.totalQuantity -= cartItem.quantity;
        cartItemAdapter.removeOne(state.items, payload);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(cartEndpoints.getCart?.matchPending, setCartPendingMatcher)
      .addMatcher(cartEndpoints.getCart?.matchFulfilled, setCartFulfilledMatcher)
      .addMatcher(cartEndpoints.getCart?.matchRejected, setCartRejectedMatcher)

      .addMatcher(cartEndpoints.addToCart?.matchPending, setCartPendingMatcher)
      .addMatcher(cartEndpoints.addToCart?.matchFulfilled, setCartFulfilledMatcher)
      .addMatcher(cartEndpoints.addToCart?.matchRejected, setCartRejectedMatcher)
  }
  });



export const cartReducer = cartSlice.reducer;
export const {
  removeCart,
  addCartItem,
  updateCartItem,
  removeCartItem
} = cartSlice.actions;
