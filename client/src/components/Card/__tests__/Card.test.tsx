import {fireEvent, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as CartActions from "@/store/cart/actions.ts";
import Card from "@components/Card";

const book = {
  id: "1",
  title: "title",
  price: 10,
  genres: ["genres"],
  authors: ["authors"],
  image: "image",
  rating: {
    rate: 4.5,
    count: 44,
  }
}

describe('Card component', () => {
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(jest.fn());
  const mockedAddItemToCart = jest.spyOn(CartActions, "addItemToCart").mockReturnValue(jest.fn());

  it('should return Card component', () => {
    const component = renderWithProviders(<MemoryRouter initialEntries={['/']}> <Card book={book}/> </MemoryRouter>);

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByText(/^В корзину/));
    expect(mockedAddItemToCart).toHaveBeenCalled();
    expect(mockedAddItemToCart).toHaveBeenCalledWith(book);
  });
});
