import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AsyncThunkConfig, Genre, HttpError} from "@/types";
import * as api from "@/services/api";
import {RootState} from "@/store/store.ts";




type GenresState = {
  items: Genre[],
}

const initialState: GenresState  = {
  items: []
};

export const getGenres = createAsyncThunk<Genre[], void, AsyncThunkConfig<HttpError>>(
  `cart/getGenres`,
  async (_ , thunkAPI) => {
    try {
      return await api.getGenres();
    } catch (err) {
      return thunkAPI.rejectWithValue(err as HttpError);
    }
  });

const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getGenres.fulfilled, (state: GenresState, {payload}) => {
      state.items = payload;
    });
  }
});


export const selectGenres = (state: RootState) => state.genres.items
export default genresSlice.reducer;

