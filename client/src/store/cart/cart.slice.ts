import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  current,
  PayloadAction
} from "@reduxjs/toolkit";
import {RootState} from "@/store/store.ts";
import {AsyncThunkConfig, Book, Cart, CartItem, CartState, UpdateCartItem} from "@/types";
import * as LocalStorage from "@/services/localStorage";
import * as api from "@/services/api";


export const getCart = createAsyncThunk<void, void, AsyncThunkConfig<string>>(
  `cart/getCart`,
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().userData.user.id;

    if (!userId) {
      thunkAPI.dispatch(addCartFromStorage());
      return;
    }

    try {
      const responseData = await api.getCart();
      thunkAPI.dispatch(addCart(responseData));
    } catch (err) {
      thunkAPI.dispatch(addCartFromStorage());
    }
  });

export const createCart = createAsyncThunk<void, void, AsyncThunkConfig<string>>(
  `cart/createCart`,
  async (_, thunkAPI) => {
    const cart = selectCart(thunkAPI.getState());

    await api.createCart(cart.items).then(responseData => {
      thunkAPI.dispatch(addCart(responseData));
    });
  });

export const addItemToCart = createAsyncThunk<void, Book, AsyncThunkConfig<string>>(
  `cart/addItemToCart`,
  async (book, thunkAPI) => {
    const userId = thunkAPI.getState().userData.user.id;
    const cartItem = thunkAPI.getState().cart.items.entities[book.id];

    if (!userId) {
      thunkAPI.dispatch(addCartItem(book))
      return;
    }

    if (cartItem) {
       thunkAPI.dispatch(updateItemInCart({
        id: cartItem.id,
        quantity: cartItem.quantity + 1
      }));
    } else {
      thunkAPI.dispatch(addCartItem(book))
      await api.addCartItem(book.id);
    }
  });
export const removeItemFromCart = createAsyncThunk<void, string, AsyncThunkConfig<string>>(
  `cart/removeItemFromCart`,
  async (cartItemId, thunkAPI) => {
    const userId = thunkAPI.getState().userData.user.id;
    thunkAPI.dispatch(removeCartItem(cartItemId));

    if (userId) {
      await api.removeCartItem(cartItemId);
    }
  });

export const updateItemInCart = createAsyncThunk<void, UpdateCartItem, AsyncThunkConfig<string>>(
  `cart/updateCartItem`,
  async (data , thunkAPI) => {
    const userId = thunkAPI.getState().userData.user.id;
    thunkAPI.dispatch(updateCartItemQuantity(data));

    if (userId) {
      await api.updateCartItem(data);
    }
  });



const cartItemAdapter = createEntityAdapter<CartItem>();

const initialState: CartState =  {
  items: cartItemAdapter.getInitialState(),
  totalQuantity: 0,
  loading: true
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state: CartState, {payload}: PayloadAction<Cart>) => {
      console.log("addCart");

      cartItemAdapter.setAll(state.items, payload.items);
      state.totalQuantity = payload.totalQuantity;
      state.loading = false;
      LocalStorage.cart.set(current(state));
    },
    addCartFromStorage: (state: CartState) => {
      const cart = LocalStorage.cart.get();

      if (cart) {
        state.items = cart.items;
        state.totalQuantity = cart.totalQuantity;
      }
      state.loading = false;
    },
    removeCart: (state: CartState) => {
      state.items = initialState.items;
      state.totalQuantity = initialState.totalQuantity;
      LocalStorage.cart.set(initialState);
    },
    addCartItem: (state: CartState, {payload}: PayloadAction<Book>) => {
      if (state.items.entities[payload.id]) {
        return;
      }

      const cartItem: CartItem = {
        id: payload.id,
        title: payload.title,
        price: payload.price,
        image: payload.image,
        quantity: 1
      }

      cartItemAdapter.upsertOne(state.items, cartItem);
      state.totalQuantity += 1;
      LocalStorage.cart.set(current(state));
    },
    removeCartItem: (state: CartState, {payload}: PayloadAction<string>) => {
      const cartItem = state.items.entities[payload];
      if (!cartItem) {
        return;
      }

      state.totalQuantity -= cartItem.quantity;
      cartItemAdapter.removeOne(state.items, payload);
      LocalStorage.cart.set(current(state));
    },
    updateCartItemQuantity: (state: CartState, {payload}: PayloadAction<UpdateCartItem>) => {
      const {id, quantity} = payload;
      const cartItemOldQuantity = state.items.entities[id].quantity;

      state.items.entities[id].quantity = quantity;
      state.totalQuantity -= cartItemOldQuantity;
      state.totalQuantity += quantity;
      LocalStorage.cart.set(current(state));
    }
  }
});



const {
  addCart,
  addCartFromStorage,
  removeCart,
  addCartItem,
  removeCartItem,
  updateCartItemQuantity
} = cartSlice.actions;

export {removeCart};

const { selectAll } = cartItemAdapter.getSelectors();
const selectCartState = (state: RootState) => state.cart
export const selectCart = createSelector(
  [selectCartState], (cart): Cart => {
  return {
    items: selectAll(cart.items),
    totalQuantity: cart.totalQuantity
  }
});
export const selectCartTotalQuantity = (state: RootState) => state.cart.totalQuantity
export const selectCartLoading = (state: RootState) => state.cart.loading


export default cartSlice.reducer;

