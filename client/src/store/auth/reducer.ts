import { createReducer } from "@reduxjs/toolkit";
import { authState } from "@/types.ts";
import { setUser, setToken, setLoading, removeAuth } from "@/store/auth/actions.ts";
import * as LocalStorage from "@/services/localStorage";


const emptyState: authState  = {
  user: {
    id: "",
    email: ""
  },
  token: {
    value: "",
  },
  loading: false,
}
const initialState: authState  = {
  user: {
    id: LocalStorage.userId.get() || "",
    email: ""
  },
  token: {
    value: "",
  },
  loading: false,
}



export const authReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(setUser, (state: authState, {payload}) => {
        state.user = payload;
      })
      .addCase(setToken, (state: authState, {payload}) => {
        state.token = payload;
      })
      .addCase(setLoading, (state: authState, {payload}) => {
        state.loading = payload;
      })
      .addCase(removeAuth, (state: authState) => {
        state.user = emptyState.user;
        state.token = emptyState.token;
      })
      // .addCase(fetchToken.rejected, (state: authState, {payload}) => {
      //   if (payload?.type === ErrorType.NOT_AUTH) {
      //     state.user = emptyState.user;
      //     state.token = emptyState.token;
      //   } else {
      //     state.token.value = "";
      //   }
      // })
});

