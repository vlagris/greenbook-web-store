import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cart/cart.slice";
import userDataReducer from "@/store/userData/userData.slice";
import GenresReducer from "@/store/genres/genres.slice";

export const store = configureStore({
  reducer: {
    userData: userDataReducer,
    genres: GenresReducer,
    cart: cartReducer,
  },

});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

