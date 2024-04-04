import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as cartActions from "@/store/cart/actions.ts";
import CartList from "@pages/Cart/components/CartList";



const cartItem = {
  id: "s1s1s1s1",
  title: "title",
  price: 10,
  image: "image",
  quantity: 2
}


describe('CartList component', () => {
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(jest.fn());

  it('should call the update button', () => {
    const mockedFetchCart = jest.spyOn(cartActions, "fetchCart").mockReturnValue(jest.fn())
    const component = renderWithProviders(<CartList items={[cartItem]}/>);

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByRole("cartUpdate"));
    expect(mockedFetchCart).toHaveBeenCalled();
  });
});