import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import {MemoryRouter} from "react-router-dom";
import CartPage from "@pages/Cart";
import * as CartForm from "@pages/Cart/components/CartForm.tsx";
import * as EmptyCart from "@pages/Cart/components/EmptyCart.tsx";
import * as cartSelectors from "@/store/cart/selectors.ts";


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

const emptyCart = {
  items: [],
  totalQuantity: 0
}


describe('Cart component', () => {
  const mockedCartSelectorsCart = jest.spyOn(cartSelectors, "cart")
  const mockedCartSelectorsLoading = jest.spyOn(cartSelectors, "loading")
  const mockedCartForm = jest.spyOn(CartForm, "default").mockImplementation(() => <div>cart form</div>)
  const mockedEmptyCart = jest.spyOn(EmptyCart, "default").mockImplementation(() => <div>empty cart</div>)

  it('should return loader', () => {
    mockedCartSelectorsLoading.mockReturnValue(true);
    const component = renderWithProviders(<CartPage/>);

    expect(component).toMatchSnapshot()
  });


  it('should return CartForm', () => {
    mockedCartSelectorsCart.mockReturnValue(cart);
    mockedCartSelectorsLoading.mockReturnValue(false);
    const component = renderWithProviders(<CartPage/>);

    expect(component).toMatchSnapshot();
    expect(mockedCartForm).toHaveBeenCalledWith({ cart: cart }, {});
  });


  it('should return EmptyCart', () => {
    mockedCartSelectorsCart.mockReturnValue(emptyCart);
    mockedCartSelectorsLoading.mockReturnValue(false);
    const component = renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <CartPage/>
      </MemoryRouter>
    );

    expect(component).toMatchSnapshot();
    expect(mockedEmptyCart).toHaveBeenCalled();
  });
});