import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import App from "@/App.tsx";
// import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
// import * as genresSlice from "@/store/genres";
// import { fetchGenres } from "@/store/genres";
// import * as cartSlice from "@/store/cart";
// import { fetchCart } from "@/store/cart";
// import * as authSlice from "@/store/auth";
// import { fetchToken } from "@/store/auth";


// jest.mock("@/store/genres");
// jest.mock("@/store/cart");
// jest.mock("@/store/auth");
//
//
// const preloadedState = {
//   auth: { user: { id: "", email: "" }, token: { value: "" }, loading: false },
//   cart: { items: { ids: [], entities: {} }, totalQuantity: 0, loading: true },
//   genres: { items: [] }
// }

describe('App component', () => {
  // const dispatch = jest.fn();
  // const mockedFetchGenres = jest.fn();
  // const mockedFetchCart = jest.fn();
  // const mockedFetchToken = jest.fn();


  it('should ', () => {
    // jest.spyOn(genresSlice, "fetchGenres").mockReturnValue(mockedFetchGenres);
    // jest.spyOn(cartSlice, "fetchCart").mockReturnValue(mockedFetchCart);
    // jest.spyOn(authSlice, "fetchToken").mockReturnValue(mockedFetchToken);
    // fetchGenres.mockReturnValue(mockedFetchGenres);
    // fetchCart.mockReturnValue(mockedFetchCart);
    // fetchToken.mockReturnValue(mockedFetchToken);
    // jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(dispatch);

    // const component = renderWithProviders(<App/>, { preloadedState });
    const component = renderWithProviders(<App/>);

    // expect(dispatch).toHaveBeenCalledTimes(3);
    // expect(mockedFetchGenres).toHaveBeenCalledTimes(1);
    // expect(mockedFetchCart).toHaveBeenCalledTimes(1);
    // expect(mockedFetchToken).toHaveBeenCalledTimes(1);
    expect(component).toMatchSnapshot();
  });
});