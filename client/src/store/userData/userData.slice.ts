import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AsyncThunkConfig, AuthRequest, ErrorType, HttpError, Token, UserDataState} from "@/types";
import * as api from "@/services/api";
import * as LocalStorage from "@/services/localStorage";
import {RootState} from "@/store/store.ts";
import {createCart, getCart, removeCart} from "@/store/cart/cart.slice.ts";


const emptyState: UserDataState  = {
  user: {
    id: "",
    email: ""
  },
  token: {
    value: "",
    loading: false
  }
}
const initialState: UserDataState  = {
  user: {
    id: LocalStorage.userId.get() || "",
    email: ""
  },
  token: {
    value: "",
    loading: false
  }
}


export const register = createAsyncThunk<unknown, AuthRequest, AsyncThunkConfig<HttpError>>(
  `auth/register`,
  async (data, thunkAPI) => {
    try {
      const userData = await api.register(data);
      thunkAPI.dispatch(addUserData(userData));
      thunkAPI.dispatch(createCart());
    } catch (err) {
      return thunkAPI.rejectWithValue(err as HttpError);
    }
});
export const login = createAsyncThunk<unknown, AuthRequest, AsyncThunkConfig<HttpError>>(
  `auth/login`,
  async (data: AuthRequest, thunkAPI) => {
    try {
      const userData = await api.login(data);
      thunkAPI.dispatch(addUserData(userData));
      thunkAPI.dispatch(getCart());
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(err as HttpError);
    }
  }
);
export const logout = createAsyncThunk<void, void, AsyncThunkConfig<string>>(
  `auth/logout`,
  async (_, thunkAPI) => {
    await api.logout().then(() => {
      thunkAPI.dispatch(removeUserData());
      thunkAPI.dispatch(removeCart());
    });
  });
export const refreshToken = createAsyncThunk<Token, void, AsyncThunkConfig<HttpError>>(
  `auth/refreshToken`,
  async (_, thunkAPI) => {
    const userId = thunkAPI.getState().userData.user.id;
    if (!userId) {
      return thunkAPI.rejectWithValue({type: ErrorType.NOT_AUTH});
    }

    try {
      return await api.refreshToken();
    } catch (err) {
      return thunkAPI.rejectWithValue(err as HttpError)
    }
  }
);



const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    addUserData: (state: UserDataState, {payload}: PayloadAction<UserDataState>) => {
      LocalStorage.userId.set(payload.user.id);
      state.user = payload.user;
      state.token = payload.token;
      console.log("addUserData: finish");
    },
    removeUserData: (state: UserDataState) => {
      LocalStorage.userId.remove();
      state.user = emptyState.user;
      state.token = emptyState.token;
    }
  },
  extraReducers: builder => {
    builder.addCase(refreshToken.pending, (state: UserDataState) => {
      state.token.loading = true;
    });
    builder.addCase(refreshToken.fulfilled, (state: UserDataState, {payload}) => {
      state.token.value = payload.value;
      state.token.loading = false;
    });
    builder.addCase(refreshToken.rejected, (state: UserDataState, {payload}) => {
      if (payload?.type === ErrorType.NOT_AUTH) {
        state.user = emptyState.user;
        state.token = emptyState.token;
        LocalStorage.userId.remove();
      } else {
        state.token.value = "";
        state.token.loading = false;
      }
    });
  }
});



const {addUserData, removeUserData} = userDataSlice.actions;
export const selectUserData = (state: RootState) => state.userData
export const selectUser = (state: RootState) => state.userData.user
export const selectToken = (state: RootState) => state.userData.token.value
export default userDataSlice.reducer;


