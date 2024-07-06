import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, Auth, User } from "@/types";
import { storage } from "@/services/storage";
import { authEndpoints, userEndpoints } from "@/services/api";



function setAuthPendingMatcher(state: AuthState) {
  state.isLoading = true
}

function setAuthRejectedMatcher(state: AuthState) {
  state.isLoading = false
}

function setAuthFulfilledMatcher(state: AuthState, {payload}: PayloadAction<Auth>) {
  state.user = payload.user;
  state.token = payload.token;
  state.isLoading = false;
  state.isSuccess = true;
}

function setLogoutFulfilledMatcher(state: AuthState) {
  state.user = emptyState.user;
  state.token = emptyState.token;
  state.isLoading = false;
  state.isSuccess = false;
}

function setUserFulfilledMatcher(state: AuthState, {payload}: PayloadAction<User>) {
  state.user = payload;
}





const emptyState: AuthState  = {
  user: {
    id: "",
    firstName: null,
    lastName: null,
    avatar: null,
    email: ""
  },
  token: {
    value: "",
  },
  isLoading: false,
  isSuccess: false,
}
const initialState: AuthState  = {
  user: {
    id: storage.local.userId.get() || "",
    firstName: null,
    lastName: null,
    avatar: null,
    email: ""
  },
  token: {
    value: "",
  },
  isLoading: false,
  isSuccess: false,
}


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: AuthState, {payload}) => {
      state.user = payload;
    },
    setToken: (state: AuthState, {payload}) => {
      state.token = payload;
      state.isSuccess = true;
    },
    setTokenLoading: (state: AuthState, {payload}) => {
      state.isLoading = payload;
    },
    removeAuth: (state: AuthState) => {
      state.user = emptyState.user;
      state.token = emptyState.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authEndpoints.register?.matchPending, setAuthPendingMatcher)
      .addMatcher(authEndpoints.register?.matchFulfilled, setAuthFulfilledMatcher)
      .addMatcher(authEndpoints.register?.matchRejected, setAuthRejectedMatcher)

      .addMatcher(authEndpoints.login?.matchPending, setAuthPendingMatcher)
      .addMatcher(authEndpoints.login?.matchFulfilled, setAuthFulfilledMatcher)
      .addMatcher(authEndpoints.login?.matchRejected, setAuthRejectedMatcher)

      .addMatcher(authEndpoints.logout?.matchPending, setAuthPendingMatcher)
      .addMatcher(authEndpoints.logout?.matchFulfilled, setLogoutFulfilledMatcher)
      .addMatcher(authEndpoints.logout?.matchRejected, setAuthRejectedMatcher)

      .addMatcher(userEndpoints.getUser?.matchFulfilled, setUserFulfilledMatcher)

      .addMatcher(userEndpoints.updateUser?.matchFulfilled, setUserFulfilledMatcher)

      .addMatcher(userEndpoints.updateEmail?.matchFulfilled, setUserFulfilledMatcher)
  }
});

export const {
  setUser,
  setToken,
  setTokenLoading,
  removeAuth
} = authSlice.actions;
export const authReducer =  authSlice.reducer;
