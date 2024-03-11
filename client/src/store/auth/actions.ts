import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {AsyncThunkConfig, AuthRequest, ErrorType, HttpError, User, Token} from "@/types.ts";
import * as api from "@/services/api";
import {createCart, fetchCart, removeCart} from "@/store/cart";
import * as authSelectors from "@/store/auth/selectors.ts";


export const setUser = createAction<User>("auth/setUser");
export const setToken = createAction<Token>("auth/setToken");
export const setLoading = createAction<boolean>("auth/setLoading");
export const removeAuth = createAction<undefined>("auth/clearAuth");


const createAppAsyncThunk = createAsyncThunk.withTypes<AsyncThunkConfig<HttpError>>()

export const register = createAppAsyncThunk(
  `auth/register`,
  async (data: AuthRequest, {rejectWithValue, dispatch}) => {
    dispatch(setLoading(true));
    try {
      const {user, token} = await api.register(data);
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(createCart());

    } catch (err) {
      return rejectWithValue(err as HttpError);

    } finally {
      dispatch(setLoading(false));
    }
  });


export const login = createAppAsyncThunk(
  `auth/login`,
  async (data: AuthRequest, {rejectWithValue, dispatch}) => {
    dispatch(setLoading(true));
    try {
      const {user, token} = await api.login(data);
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(fetchCart());

    } catch (err) {
      return rejectWithValue(err as HttpError);

    } finally {
      dispatch(setLoading(false));
    }
  });


export const logout = createAppAsyncThunk(
  `auth/logout`,
  async (_, {rejectWithValue, dispatch}) => {
    dispatch(setLoading(true));
    try {
      await api.logout();
      dispatch(removeAuth());
      dispatch(removeCart());

    } catch (err) {
      return rejectWithValue(err as HttpError);

    } finally {
      dispatch(setLoading(false));
    }
  });


export const fetchToken = createAppAsyncThunk(
  `auth/refreshToken`,
  async (_, {getState, rejectWithValue, dispatch}) => {
    if (!authSelectors.userId(getState())) {
      dispatch(removeAuth());
      return rejectWithValue({type: ErrorType.NOT_AUTH});
    }

    dispatch(setLoading(true));
    try {
      const token = await api.getToken();
      dispatch(setToken(token));

    } catch (err) {
      dispatch(setToken({ value: "" }));
      return rejectWithValue(err as HttpError);
    } finally {
      dispatch(setLoading(false));
    }
  });
