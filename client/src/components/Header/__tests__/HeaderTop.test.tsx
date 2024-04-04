import { screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import HeaderTop from "@components/Header/HeaderTop.tsx";
import * as useAuth from "@/hooks/useAuth";



describe('HeaderTop component', () => {
  const mockedUseAuth = jest.spyOn(useAuth, "default");

  it('should return HeaderTop for the authorized user', () => {
    mockedUseAuth.mockReturnValue({isAuth: true})
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <HeaderTop/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/^Войти/)).toBeNull();
  });

  it('should return HeaderTop for unknown user', () => {
    mockedUseAuth.mockReturnValue({isAuth: false})
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <HeaderTop/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByText(/^Войти/)).toBeInTheDocument();
  });
});
