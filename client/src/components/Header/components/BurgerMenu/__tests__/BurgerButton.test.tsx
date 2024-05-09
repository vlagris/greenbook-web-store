import {fireEvent, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import BurgerButton from "@components/Header/BurgerMenu/BurgerButton.tsx";



describe('BurgerButton component', () => {
  it('should return BurgerButton component', () => {
    const mockedOnClick = jest.fn();
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <BurgerButton onClick={mockedOnClick}/> </MemoryRouter>);

    expect(component).toMatchSnapshot();
    expect(screen.queryByTestId('BurgerButton')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('BurgerButton'));
    expect(mockedOnClick).toHaveBeenCalled()
  });
});
