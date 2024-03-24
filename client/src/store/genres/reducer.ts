import { createReducer } from "@reduxjs/toolkit";
import { fetchGenres } from "@/store/genres/actions.ts";
import { GenresState } from "@/store/genres/types.ts";


const initialState: GenresState  = {
  items: []
};

export const genresReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(fetchGenres.fulfilled, (state: GenresState, {payload}) => {
      state.items = payload;
    })
});