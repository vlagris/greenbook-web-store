import { fireEvent, screen } from "@testing-library/react";
import { renderWithProviders } from "@/utils/utilsForTests.tsx";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as cartActions from "@/store/cart";
import CartItem from "@pages/Cart/components/CartList/CartItem.tsx";



const cartItem = {
  id: "s1s1s1s1",
  title: "title",
  price: 10,
  image: "image",
  quantity: 2
}


describe('Card Item component', () => {
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(jest.fn());

  it('should call the remove button', () => {
    const mockedRemoveItemFromCart = jest.spyOn(cartActions, "removeItemFromCart").mockReturnValue(jest.fn())
    const component = renderWithProviders(<CartItem item={cartItem}/>);

    expect(component).toMatchSnapshot();

    fireEvent.click(screen.getByRole("removeButton"));
    expect(mockedRemoveItemFromCart).toHaveBeenCalledWith("s1s1s1s1")
  });
});