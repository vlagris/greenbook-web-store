import * as genresSelectors from "@/store/genres/selectors.ts";


const genre = {
  id: "s1s1s1s1s1",
  name: "name",
  pathName: "pathName",
}

const storeState = {
  auth: { loading: false, user: { id: "", email: "" }, token: { value: "" } },
  cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: false },
  genres: { items: [genre] }
}

describe('genres selectors', () => {
  it('should select genres from state object', () => {
    const result = genresSelectors.genres(storeState);

    expect(result).toEqual([genre]);
  });
});