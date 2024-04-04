import {fireEvent, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import BurgerMenu from "@components/Header/BurgerMenu/index.tsx";
import * as reduxHooks from "@/hooks/useTypedReduxHooks";

const genres =[
  { id: "1", name: "name", pathName: "pathName" },
  { id: "2", name: "name2", pathName: "pathName2" },
  ]

describe('BurgerMenu component', () => {
  jest.spyOn(reduxHooks, "useAppSelector").mockReturnValue(genres);

  it('should return close BurgerMenu component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <BurgerMenu/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
  });

  it('should return open BurgerMenu component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <BurgerMenu/> </MemoryRouter>);

    fireEvent.click(screen.getByTestId('BurgerButton'));
    expect(component).toMatchSnapshot();

  });
});
