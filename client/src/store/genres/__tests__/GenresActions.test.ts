import { genresReducer } from "@/store/genres/reducer.ts";
import { fetchGenres } from "@/store/genres/actions.ts";
import { getAsyncThunkCalls } from "@/utils/utilsForTests.tsx";
import * as apiGenres from "@/services/api/genres.ts";



export const genre = {
  id: "Q1Q1Q1Q1",
  name: "name",
  pathName: "pathName",
}

export const initialStoreState = {
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [] },
}

describe('cart actions', () => {
  const genresState = { items: [] };

  it('should fetchCart with resolve response', async () => {
    const action = { type: fetchGenres.fulfilled.type, payload: [genre] }
    const result = genresReducer(genresState, action);

    expect(result.items).toEqual([genre]);
  });
});


describe('cart asyncThunk fetchCart', () => {

  it('should fetchCart with resolve response', async () => {
    jest.spyOn(apiGenres, "getGenres").mockReturnValue(Promise.resolve([genre]));
    const calls = await getAsyncThunkCalls(fetchGenres(), initialStoreState);

    expect(calls[1][0].type).toEqual(fetchGenres.fulfilled.type);
    expect(calls[1][0].payload).toEqual([genre]);
  });

  it('should fetchCart with reject response', async () => {
    jest.spyOn(apiGenres, "getGenres").mockReturnValue(Promise.reject({ error: "error" }));
    const calls = await getAsyncThunkCalls(fetchGenres(), initialStoreState);

    expect(calls[1][0].type).toEqual(fetchGenres.rejected.type);
    expect(calls[1][0].payload).toEqual({ error: "error" });
  });
});