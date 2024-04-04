import {renderWithProviders} from "@/utils/utilsForTests.tsx";
import Count from "@pages/Cart/components/CartList/Count.tsx";
import * as reduxHooks from "@/hooks/useTypedReduxHooks.ts";
import * as cartActions from "@/store/cart/actions.ts";
import {fireEvent} from "@testing-library/react";



describe('Count component', () => {
  jest.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(jest.fn());
  const mockedUpdateItemInCart = jest.spyOn(cartActions, "updateItemInCart").mockReturnValue(jest.fn())

  afterEach(() => {
    mockedUpdateItemInCart.mockClear();
  })

  it('should call the plus button', () => {
    const component = renderWithProviders(<Count id="asd" quantity={1}/>);
    const button = component.container.querySelectorAll("button")[1];

    expect(component).toMatchSnapshot();

    fireEvent.click(button);
    expect(mockedUpdateItemInCart).toHaveBeenCalledWith({id: "asd", quantity: 2})
  });

  it('should call the minus button', () => {
    const component = renderWithProviders(<Count id="asd" quantity={1}/>);
    const button = component.container.querySelectorAll("button")[0];

    fireEvent.click(button);
    expect(mockedUpdateItemInCart).toHaveBeenCalledTimes(0)
  });



  it('should cause input blurring with a value greater than 1', () => {
    const component = renderWithProviders(<Count id="asd" quantity={1}/>);
    const input = component.container.querySelectorAll("input")[0];

    fireEvent.change(input, {target: { value: 10 }});
    fireEvent.blur(input);
    expect(mockedUpdateItemInCart).toHaveBeenCalledWith({ id: "asd", quantity: 10 })

    fireEvent.change(input, {target: { value: 1 }});
    fireEvent.blur(input);
    expect(mockedUpdateItemInCart).toHaveBeenCalledWith({ id: "asd", quantity: 1 })
  });

  it('should cause input blurring with a value less than 1', () => {
    const component = renderWithProviders(<Count id="asd" quantity={1}/>);
    const input = component.container.querySelectorAll("input")[0];

    fireEvent.change(input, {target: { value: 'asd' }});
    fireEvent.blur(input);
    expect(mockedUpdateItemInCart).toHaveBeenCalledWith({ id: "asd", quantity: 1 })
  });
});