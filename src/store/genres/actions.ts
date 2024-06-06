import {createAsyncThunk} from "@reduxjs/toolkit";
import {AsyncThunkConfig, Genre, HttpError} from "@/types.ts";
import * as api from "@/services/api";


export const fetchGenres = createAsyncThunk<Genre[], void, AsyncThunkConfig<HttpError>>(
  `cart/fetchGenres`,
  async (_ , thunkAPI) => {
    try {
      return await api.getGenres();
    } catch (err) {
      return thunkAPI.rejectWithValue(err as HttpError);
    }
  });
