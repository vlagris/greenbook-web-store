import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import {MemoryRouter} from "react-router-dom";
import * as CartList from "@pages/Cart/components/CartList";
import * as Order from "@pages/Cart/components/Order.tsx";
import CartForm from "@pages/Cart/components/CartForm.tsx";

const cartItem = {
  id: "1",
  title: "title",
  price: 10,
  image: "image",
  quantity: 2
}

const cart = {
  items: [cartItem, cartItem],
  totalQuantity: 4
}

describe('CartForm component', () => {
  it('should return CartForm', () => {
    const mockedCardList = jest.spyOn(CartList, "default").mockReturnValue(<div>card list</div>)
    const mockedOrder = jest.spyOn(Order, "default").mockReturnValue(<div>order</div>)

    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CartForm cart={cart}/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(mockedCardList).toHaveBeenCalledWith({ items: cart.items }, {});
    expect(mockedOrder).toHaveBeenCalledWith({ total: 40 }, {});
  });
});