import {fireEvent, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import HeaderBottom from "@components/Header/components/HeaderBottom.tsx";
import * as BurgerMenu from "@components/Header/BurgerMenu";
import * as reduxHooks from "@/hooks/useTypedReduxHooks";
import * as authActions from "@/store/auth/actions.ts";
import * as useAuth from "@/hooks/useAuth";



describe('HeaderBottom component', () => {
  jest.spyOn(BurgerMenu, "default").mockReturnValue(<div/>);
  const mockedUseAuth = jest.spyOn(useAuth, "default");
  jest.spyOn(reduxHooks, "useAppSelector").mockReturnValue(10);
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(jest.fn());
  const mockedLogout = jest.spyOn(authActions, "logout").mockImplementation();

  it('should return HeaderBottom for the authorized user', () => {
    mockedUseAuth.mockReturnValue({isAuth: true})
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <HeaderBottom/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/10/i)).toBeInTheDocument();
    expect(screen.queryByTestId('logout')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('logout'));
    expect(mockedLogout).toHaveBeenCalled()
  });

  it('should return HeaderTop for unknown user', () => {
    mockedUseAuth.mockReturnValue({isAuth: false})
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <HeaderBottom/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/10/i)).toBeInTheDocument();
    expect(screen.queryByTestId('logout')).toBeNull();
  });
});
