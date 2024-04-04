import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as reactRouterDom from "react-router-dom";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as genresActions from "@/store/genres/actions.ts";
import * as authActions from "@/store/auth/actions.ts";
import * as cartActions from "@/store/cart/actions.ts";
import App from "@/App.tsx";


describe('App component', () => {
  const dispatch = jest.fn();

  it('should return App component', async () => {
    jest.spyOn(reactRouterDom, "RouterProvider").mockReturnValue(<div/>);
    jest.spyOn(cartActions, "fetchCart").mockReturnValue(jest.fn());
    jest.spyOn(genresActions, "fetchGenres").mockReturnValue(jest.fn());
    jest.spyOn(authActions, "fetchToken").mockReturnValue(jest.fn());
    jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(dispatch);

    const component = renderWithProviders(<App/>);

    expect(component).toMatchSnapshot();
    expect(genresActions.fetchGenres).toHaveBeenCalledTimes(1);
    expect(authActions.fetchToken).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(2);

    await new Promise((r) => setTimeout(r, 100));
    expect(cartActions.fetchCart).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(3);
  });
});